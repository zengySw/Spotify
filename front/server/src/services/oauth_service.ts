import passport from "passport";
import { Strategy as GoogleStrategy, type Profile as GoogleProfile } from "passport-google-oauth20";
import { Strategy as DiscordStrategy, type Profile as DiscordProfile } from "passport-discord";
import type { Request } from "express";
import { env } from "../config/env.js";
import { loginOrCreateOAuthUser, type AuthResponse } from "./auth_service.js";

let isConfigured = false;

function getPrimaryEmail(profile: { emails?: Array<{ value?: string }> }): string | null {
  return profile.emails?.[0]?.value?.trim().toLowerCase() ?? null;
}

function getAvatarUrl(profile: { photos?: Array<{ value?: string }> }): string | null {
  return profile.photos?.[0]?.value ?? null;
}

async function handleOAuthLogin(
  req: Request,
  provider: "google" | "discord",
  providerId: string,
  email: string | null,
  displayName: string | null,
  avatarUrl: string | null
): Promise<AuthResponse> {
  return loginOrCreateOAuthUser({
    provider,
    providerId,
    email,
    displayName,
    avatarUrl,
    ipAddress: req.ip ?? null,
    userAgent: req.get("user-agent") ?? null,
  });
}

export function configureOAuthStrategies(): void {
  if (isConfigured) {
    return;
  }

  isConfigured = true;

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: env.googleClientId,
        clientSecret: env.googleClientSecret,
        callbackURL: env.googleCallbackUrl,
        passReqToCallback: true,
      },
      async (
        req: Request,
        _accessToken: string,
        _refreshToken: string,
        profile: GoogleProfile,
        done: (error: unknown, user?: AuthResponse) => void
      ) => {
        try {
          const result = await handleOAuthLogin(
            req,
            "google",
            profile.id,
            getPrimaryEmail(profile),
            profile.displayName ?? null,
            getAvatarUrl(profile)
          );

          done(null, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "discord",
    new DiscordStrategy(
      {
        clientID: env.discordClientId,
        clientSecret: env.discordClientSecret,
        callbackURL: env.discordCallbackUrl,
        scope: ["identify", "email"],
        passReqToCallback: true,
      },
      async (
        req: Request,
        _accessToken: string,
        _refreshToken: string,
        profile: DiscordProfile,
        done: (error: unknown, user?: AuthResponse) => void
      ) => {
        try {
          const displayName = profile.displayName ?? profile.username ?? null;

          const result = await handleOAuthLogin(
            req,
            "discord",
            profile.id,
            getPrimaryEmail(profile),
            displayName,
            getAvatarUrl(profile)
          );

          done(null, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}
