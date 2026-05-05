import { Router } from "express";
import passport from "passport";
import { env } from "../config/env.js";
import { loginLocal, logoutByRefreshToken, refreshAccessToken, registerLocal, } from "../services/auth_service.js";
import { clearRefreshTokenCookie, setRefreshTokenCookie } from "../utils/cookies.js";
import { HttpError } from "../middleware/error.js";
import { requireAuth } from "../middleware/auth.js";
import { findUserById, toAuthUserDTO } from "../services/user_service.js";
const router = Router();
function asyncHandler(fn) {
    return (req, res, next) => {
        void fn(req, res, next).catch(next);
    };
}
function getStringField(value, fieldName) {
    if (typeof value !== "string" || !value.trim()) {
        throw new HttpError(400, "VALIDATION_ERROR", `Field '${fieldName}' must be a non-empty string`);
    }
    return value.trim();
}
function stripRefreshToken(payload) {
    return {
        user: payload.user,
        access_token: payload.access_token,
        expires_in: payload.expires_in,
    };
}
router.post("/register", asyncHandler(async (req, res) => {
    const email = getStringField(req.body?.email, "email");
    const password = getStringField(req.body?.password, "password");
    const displayNameRaw = req.body?.display_name ?? req.body?.displayName;
    const displayName = typeof displayNameRaw === "string" && displayNameRaw.trim().length > 0
        ? displayNameRaw.trim()
        : undefined;
    const authResult = await registerLocal({
        email,
        password,
        displayName,
        ipAddress: req.ip ?? null,
        userAgent: req.get("user-agent") ?? null,
    });
    setRefreshTokenCookie(res, authResult.refresh_token);
    res.status(201).json(stripRefreshToken(authResult));
}));
router.post("/login", asyncHandler(async (req, res) => {
    const email = getStringField(req.body?.email, "email");
    const password = getStringField(req.body?.password, "password");
    const authResult = await loginLocal({
        email,
        password,
        ipAddress: req.ip ?? null,
        userAgent: req.get("user-agent") ?? null,
    });
    setRefreshTokenCookie(res, authResult.refresh_token);
    res.status(200).json(stripRefreshToken(authResult));
}));
router.post("/refresh", asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.[env.refreshCookieName];
    if (!refreshToken || typeof refreshToken !== "string") {
        throw new HttpError(401, "MISSING_REFRESH_TOKEN", "Refresh token cookie is required");
    }
    const authResult = await refreshAccessToken({
        refreshToken,
        ipAddress: req.ip ?? null,
        userAgent: req.get("user-agent") ?? null,
    });
    setRefreshTokenCookie(res, authResult.refresh_token);
    res.status(200).json({
        access_token: authResult.access_token,
        expires_in: authResult.expires_in,
    });
}));
router.post("/logout", asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.[env.refreshCookieName];
    if (refreshToken && typeof refreshToken === "string") {
        await logoutByRefreshToken(refreshToken);
    }
    clearRefreshTokenCookie(res);
    res.status(200).json({ success: true });
}));
router.get("/google", passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    prompt: "select_account",
}));
router.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: `${env.frontendUrl}/auth/callback?status=error`,
}), (req, res) => {
    const authResult = req.user;
    if (!authResult) {
        res.redirect(`${env.frontendUrl}/auth/callback?status=error`);
        return;
    }
    setRefreshTokenCookie(res, authResult.refresh_token);
    res.redirect(`${env.frontendUrl}/auth/callback?status=success`);
});
router.get("/discord", passport.authenticate("discord", {
    session: false,
    scope: ["identify", "email"],
}));
router.get("/discord/callback", passport.authenticate("discord", {
    session: false,
    failureRedirect: `${env.frontendUrl}/auth/callback?status=error`,
}), (req, res) => {
    const authResult = req.user;
    if (!authResult) {
        res.redirect(`${env.frontendUrl}/auth/callback?status=error`);
        return;
    }
    setRefreshTokenCookie(res, authResult.refresh_token);
    res.redirect(`${env.frontendUrl}/auth/callback?status=success`);
});
router.get("/me", requireAuth, asyncHandler(async (req, res) => {
    if (!req.auth) {
        throw new HttpError(401, "UNAUTHORIZED", "Unauthorized");
    }
    const user = await findUserById(req.auth.userId);
    if (!user) {
        throw new HttpError(404, "USER_NOT_FOUND", "User not found");
    }
    res.status(200).json({ user: toAuthUserDTO(user) });
}));
export default router;
