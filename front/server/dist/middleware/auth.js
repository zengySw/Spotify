import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { HttpError } from "./error.js";
function isProvider(value) {
    return value === "local" || value === "google" || value === "discord";
}
export function requireAuth(req, _res, next) {
    const authorization = req.header("authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new HttpError(401, "UNAUTHORIZED", "Missing bearer token");
    }
    const token = authorization.slice("Bearer ".length).trim();
    try {
        const payload = jwt.verify(token, env.jwtAccessSecret);
        if (!payload.sub || !payload.email || !payload.provider || !isProvider(payload.provider)) {
            throw new HttpError(401, "UNAUTHORIZED", "Invalid access token payload");
        }
        req.auth = {
            userId: payload.sub,
            email: payload.email,
            provider: payload.provider,
        };
        next();
    }
    catch (error) {
        if (error instanceof HttpError) {
            throw error;
        }
        throw new HttpError(401, "UNAUTHORIZED", "Invalid or expired access token");
    }
}
