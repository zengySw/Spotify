import dotenv from "dotenv";

dotenv.config();

type SameSiteValue = "lax" | "strict" | "none";

function requireString(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value === "") {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === "true" || normalized === "1") return true;
  if (normalized === "false" || normalized === "0") return false;

  throw new Error(`Invalid boolean value: ${value}`);
}

function parseNumber(value: string | undefined, defaultValue: number): number {
  if (value === undefined || value === "") {
    return defaultValue;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid numeric value: ${value}`);
  }

  return parsed;
}

function parseSameSite(value: string | undefined, defaultValue: SameSiteValue): SameSiteValue {
  if (!value) {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === "lax" || normalized === "strict" || normalized === "none") {
    return normalized;
  }

  throw new Error(`Invalid sameSite value: ${value}`);
}

const authCookieDomainRaw = process.env.AUTH_COOKIE_DOMAIN?.trim();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parseNumber(process.env.PORT, 4000),
  databaseUrl: requireString("DATABASE_URL"),

  jwtAccessSecret: requireString("JWT_ACCESS_SECRET"),
  jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES ?? "15m",

  refreshTokenTtlDays: parseNumber(process.env.REFRESH_TOKEN_TTL_DAYS, 7),
  refreshCookieName: process.env.REFRESH_COOKIE_NAME ?? "refresh_token",
  authCookieDomain: authCookieDomainRaw ? authCookieDomainRaw : undefined,
  authCookieSecure: parseBoolean(process.env.AUTH_COOKIE_SECURE, false),
  authCookieSameSite: parseSameSite(process.env.AUTH_COOKIE_SAME_SITE, "lax"),

  frontendUrl: requireString("FRONTEND_URL"),

  googleClientId: requireString("GOOGLE_CLIENT_ID"),
  googleClientSecret: requireString("GOOGLE_CLIENT_SECRET"),
  googleCallbackUrl: requireString("GOOGLE_CALLBACK_URL"),

  discordClientId: requireString("DISCORD_CLIENT_ID"),
  discordClientSecret: requireString("DISCORD_CLIENT_SECRET"),
  discordCallbackUrl: requireString("DISCORD_CALLBACK_URL"),
} as const;

export type Env = typeof env;
export type CookieSameSite = SameSiteValue;
