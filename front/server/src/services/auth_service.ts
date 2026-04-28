import type { PoolClient, QueryResultRow } from "pg";
import { query, queryWithClient, withTransaction } from "../db/queries.js";
import { HttpError } from "../middleware/error.js";
import {
  createLocalUser,
  createOAuthUser,
  findUserByEmail,
  findUserById,
  findUserByProviderIdentity,
  toAuthUserDTO,
  updateUserProfile,
  type AuthUserDTO,
  type UserProvider,
  type UserRow,
} from "./user_service.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import {
  createAccessToken,
  generateRefreshToken,
  getAccessTokenExpiresInSeconds,
  getRefreshTokenExpiresAt,
  hashRefreshToken,
} from "./token_service.js";

interface RefreshTokenRow extends QueryResultRow {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  revoked_at: Date | null;
  replaced_by_token_hash: string | null;
}

export interface AuthResponse {
  user: AuthUserDTO;
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  displayName?: string;
  ipAddress: string | null;
  userAgent: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
  ipAddress: string | null;
  userAgent: string | null;
}

export interface RefreshInput {
  refreshToken: string;
  ipAddress: string | null;
  userAgent: string | null;
}

export interface OAuthInput {
  provider: UserProvider;
  providerId: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  ipAddress: string | null;
  userAgent: string | null;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function ensurePasswordStrength(password: string): void {
  if (password.length < 8) {
    throw new HttpError(400, "WEAK_PASSWORD", "Password must contain at least 8 characters");
  }
}

function buildAuthResponse(user: UserRow, refreshToken: string): AuthResponse {
  const accessToken = createAccessToken({
    sub: user.id,
    email: user.email,
    provider: user.provider,
  });

  return {
    user: toAuthUserDTO(user),
    access_token: accessToken,
    expires_in: getAccessTokenExpiresInSeconds(),
    refresh_token: refreshToken,
  };
}

async function createRefreshSession(
  client: PoolClient,
  args: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    ipAddress: string | null;
    userAgent: string | null;
    replacedByTokenHash?: string | null;
  }
): Promise<void> {
  await queryWithClient(
    client,
    `
      INSERT INTO refresh_tokens (
        user_id,
        token_hash,
        expires_at,
        replaced_by_token_hash,
        ip_address,
        user_agent
      )
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [
      args.userId,
      args.tokenHash,
      args.expiresAt,
      args.replacedByTokenHash ?? null,
      args.ipAddress,
      args.userAgent,
    ]
  );
}

async function issueAuthTokens(
  client: PoolClient,
  user: UserRow,
  ipAddress: string | null,
  userAgent: string | null
): Promise<AuthResponse> {
  const refreshToken = generateRefreshToken();
  const refreshTokenHash = hashRefreshToken(refreshToken);
  const refreshExpiresAt = getRefreshTokenExpiresAt();

  await createRefreshSession(client, {
    userId: user.id,
    tokenHash: refreshTokenHash,
    expiresAt: refreshExpiresAt,
    ipAddress,
    userAgent,
  });

  return buildAuthResponse(user, refreshToken);
}

export async function registerLocal(input: RegisterInput): Promise<AuthResponse> {
  const email = normalizeEmail(input.email);
  ensurePasswordStrength(input.password);

  return withTransaction(async (client) => {
    const existingUser = await findUserByEmail(email, client);
    if (existingUser) {
      throw new HttpError(409, "EMAIL_ALREADY_EXISTS", "Email is already registered");
    }

    const passwordHash = await hashPassword(input.password);
    const displayName = input.displayName?.trim() || null;

    const user = await createLocalUser(
      {
        email,
        passwordHash,
        displayName,
      },
      client
    );

    return issueAuthTokens(client, user, input.ipAddress, input.userAgent);
  });
}

export async function loginLocal(input: LoginInput): Promise<AuthResponse> {
  const email = normalizeEmail(input.email);

  return withTransaction(async (client) => {
    const user = await findUserByEmail(email, client);
    if (!user || !user.password_hash) {
      throw new HttpError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    const validPassword = await verifyPassword(input.password, user.password_hash);
    if (!validPassword) {
      throw new HttpError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    return issueAuthTokens(client, user, input.ipAddress, input.userAgent);
  });
}

export async function refreshAccessToken(input: RefreshInput): Promise<AuthResponse> {
  const currentTokenHash = hashRefreshToken(input.refreshToken);

  return withTransaction(async (client) => {
    const sessionResult = await queryWithClient<RefreshTokenRow>(
      client,
      `
        SELECT id, user_id, token_hash, expires_at, revoked_at, replaced_by_token_hash
        FROM refresh_tokens
        WHERE token_hash = $1
        LIMIT 1
        FOR UPDATE
      `,
      [currentTokenHash]
    );

    const session = sessionResult.rows[0];
    if (!session) {
      throw new HttpError(401, "INVALID_REFRESH_TOKEN", "Invalid refresh token");
    }

    if (session.revoked_at) {
      throw new HttpError(401, "REVOKED_REFRESH_TOKEN", "Refresh token has been revoked");
    }

    if (session.expires_at.getTime() <= Date.now()) {
      throw new HttpError(401, "EXPIRED_REFRESH_TOKEN", "Refresh token has expired");
    }

    const user = await findUserById(session.user_id, client);
    if (!user) {
      throw new HttpError(401, "INVALID_REFRESH_TOKEN", "Refresh token user does not exist");
    }

    const newRefreshToken = generateRefreshToken();
    const newRefreshTokenHash = hashRefreshToken(newRefreshToken);

    await queryWithClient(
      client,
      `
        UPDATE refresh_tokens
        SET revoked_at = NOW(), replaced_by_token_hash = $2
        WHERE id = $1
      `,
      [session.id, newRefreshTokenHash]
    );

    await createRefreshSession(client, {
      userId: user.id,
      tokenHash: newRefreshTokenHash,
      expiresAt: getRefreshTokenExpiresAt(),
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    });

    return buildAuthResponse(user, newRefreshToken);
  });
}

export async function logoutByRefreshToken(refreshToken: string): Promise<void> {
  const tokenHash = hashRefreshToken(refreshToken);

  await query(
    `
      UPDATE refresh_tokens
      SET revoked_at = NOW()
      WHERE token_hash = $1 AND revoked_at IS NULL
    `,
    [tokenHash]
  );
}

export async function loginOrCreateOAuthUser(input: OAuthInput): Promise<AuthResponse> {
  if (!input.email) {
    throw new HttpError(400, "OAUTH_EMAIL_REQUIRED", "OAuth provider did not return email");
  }

  const normalizedEmail = normalizeEmail(input.email);

  return withTransaction(async (client) => {
    let user = await findUserByProviderIdentity(input.provider, input.providerId, client);

    if (!user) {
      user = await findUserByEmail(normalizedEmail, client);
    }

    if (!user) {
      user = await createOAuthUser(
        {
          email: normalizedEmail,
          displayName: input.displayName,
          avatarUrl: input.avatarUrl,
          provider: input.provider,
          providerId: input.providerId,
        },
        client
      );
    } else {
      user = await updateUserProfile(
        {
          userId: user.id,
          displayName: input.displayName,
          avatarUrl: input.avatarUrl,
        },
        client
      );
    }

    return issueAuthTokens(client, user, input.ipAddress, input.userAgent);
  });
}

