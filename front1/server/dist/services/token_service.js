import ms from "ms";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";
export function createAccessToken(payload) {
    return jwt.sign(payload, env.jwtAccessSecret, {
        expiresIn: env.jwtAccessExpires,
        algorithm: "HS256",
    });
}
export function getAccessTokenExpiresInSeconds() {
    const parsed = ms(env.jwtAccessExpires);
    if (typeof parsed !== "number") {
        throw new Error(`Invalid JWT_ACCESS_EXPIRES format: ${env.jwtAccessExpires}`);
    }
    return Math.floor(parsed / 1000);
}
export function generateRefreshToken() {
    return crypto.randomBytes(64).toString("base64url");
}
export function hashRefreshToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}
export function getRefreshTokenExpiresAt() {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + env.refreshTokenTtlDays);
    return expiresAt;
}
