import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as DiscordStrategy } from "passport-discord";
import { env } from "../config/env.js";
import { loginOrCreateOAuthUser } from "./auth_service.js";
let isConfigured = false;
function getPrimaryEmail(profile) {
    return profile.emails?.[0]?.value?.trim().toLowerCase() ?? null;
}
function getAvatarUrl(profile) {
    return profile.photos?.[0]?.value ?? null;
}
async function handleOAuthLogin(req, provider, providerId, email, displayName, avatarUrl) {
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
export function configureOAuthStrategies() {
    if (isConfigured) {
        return;
    }
    isConfigured = true;
    passport.use("google", new GoogleStrategy({
        clientID: env.googleClientId,
        clientSecret: env.googleClientSecret,
        callbackURL: env.googleCallbackUrl,
        passReqToCallback: true,
    }, async (req, _accessToken, _refreshToken, profile, done) => {
        try {
            const result = await handleOAuthLogin(req, "google", profile.id, getPrimaryEmail(profile), profile.displayName ?? null, getAvatarUrl(profile));
            done(null, result);
        }
        catch (error) {
            done(error);
        }
    }));
    passport.use("discord", new DiscordStrategy({
        clientID: env.discordClientId,
        clientSecret: env.discordClientSecret,
        callbackURL: env.discordCallbackUrl,
        scope: ["identify", "email"],
        passReqToCallback: true,
    }, async (req, _accessToken, _refreshToken, profile, done) => {
        try {
            const displayName = profile.displayName ?? profile.username ?? null;
            const result = await handleOAuthLogin(req, "discord", profile.id, getPrimaryEmail(profile), displayName, getAvatarUrl(profile));
            done(null, result);
        }
        catch (error) {
            done(error);
        }
    }));
}
