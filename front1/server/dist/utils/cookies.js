import { env } from "../config/env.js";
function getCookieOptions(maxAgeMs) {
    const secure = env.authCookieSecure || env.authCookieSameSite === "none";
    return {
        httpOnly: true,
        secure,
        sameSite: env.authCookieSameSite,
        domain: env.authCookieDomain,
        path: "/",
        maxAge: maxAgeMs,
    };
}
export function setRefreshTokenCookie(response, refreshToken) {
    const maxAgeMs = env.refreshTokenTtlDays * 24 * 60 * 60 * 1000;
    response.cookie(env.refreshCookieName, refreshToken, getCookieOptions(maxAgeMs));
}
export function clearRefreshTokenCookie(response) {
    response.clearCookie(env.refreshCookieName, {
        ...getCookieOptions(0),
        maxAge: undefined,
    });
}
