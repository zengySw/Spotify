import type { PoolClient, QueryResultRow } from "pg";
import { query, queryWithClient } from "../db/queries.js";

export type UserProvider = "local" | "google" | "discord";

export interface UserRow extends QueryResultRow {
  id: string;
  email: string;
  password_hash: string | null;
  display_name: string | null;
  avatar_url: string | null;
  provider: UserProvider;
  provider_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface AuthUserDTO {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  provider: UserProvider;
}

const SELECT_USER_FIELDS = `
  id,
  email,
  password_hash,
  display_name,
  avatar_url,
  provider,
  provider_id,
  created_at,
  updated_at
`;

function execute<T extends QueryResultRow>(
  client: PoolClient | undefined,
  text: string,
  params: readonly unknown[]
) {
  if (client) {
    return queryWithClient<T>(client, text, params);
  }
  return query<T>(text, params);
}

export function toAuthUserDTO(user: UserRow): AuthUserDTO {
  return {
    id: user.id,
    email: user.email,
    display_name: user.display_name,
    avatar_url: user.avatar_url,
    provider: user.provider,
  };
}

export async function findUserByEmail(email: string, client?: PoolClient): Promise<UserRow | null> {
  const result = await execute<UserRow>(
    client,
    `SELECT ${SELECT_USER_FIELDS} FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1`,
    [email]
  );

  return result.rows[0] ?? null;
}

export async function findUserById(id: string, client?: PoolClient): Promise<UserRow | null> {
  const result = await execute<UserRow>(
    client,
    `SELECT ${SELECT_USER_FIELDS} FROM users WHERE id = $1 LIMIT 1`,
    [id]
  );

  return result.rows[0] ?? null;
}

export async function findUserByProviderIdentity(
  provider: UserProvider,
  providerId: string,
  client?: PoolClient
): Promise<UserRow | null> {
  const result = await execute<UserRow>(
    client,
    `SELECT ${SELECT_USER_FIELDS} FROM users WHERE provider = $1 AND provider_id = $2 LIMIT 1`,
    [provider, providerId]
  );

  return result.rows[0] ?? null;
}

export async function createLocalUser(
  args: { email: string; passwordHash: string; displayName: string | null },
  client?: PoolClient
): Promise<UserRow> {
  const result = await execute<UserRow>(
    client,
    `
      INSERT INTO users (email, password_hash, display_name, provider)
      VALUES ($1, $2, $3, 'local')
      RETURNING ${SELECT_USER_FIELDS}
    `,
    [args.email, args.passwordHash, args.displayName]
  );

  return result.rows[0];
}

export async function createOAuthUser(
  args: {
    email: string;
    displayName: string | null;
    avatarUrl: string | null;
    provider: UserProvider;
    providerId: string;
  },
  client?: PoolClient
): Promise<UserRow> {
  const result = await execute<UserRow>(
    client,
    `
      INSERT INTO users (email, password_hash, display_name, avatar_url, provider, provider_id)
      VALUES ($1, NULL, $2, $3, $4, $5)
      RETURNING ${SELECT_USER_FIELDS}
    `,
    [args.email, args.displayName, args.avatarUrl, args.provider, args.providerId]
  );

  return result.rows[0];
}

export async function updateUserProfile(
  args: { userId: string; displayName: string | null; avatarUrl: string | null },
  client?: PoolClient
): Promise<UserRow> {
  const result = await execute<UserRow>(
    client,
    `
      UPDATE users
      SET
        display_name = COALESCE($2, display_name),
        avatar_url = COALESCE($3, avatar_url)
      WHERE id = $1
      RETURNING ${SELECT_USER_FIELDS}
    `,
    [args.userId, args.displayName, args.avatarUrl]
  );

  return result.rows[0];
}
