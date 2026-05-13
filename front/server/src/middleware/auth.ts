import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { HttpError } from "./error.js";
import type { UserProvider } from "../services/user_service.js";

interface JwtClaims {
  sub: string;
  email: string;
  provider: UserProvider;
  iat?: number;
  exp?: number;
}

function isProvider(value: string): value is UserProvider {
  return value === "local" || value === "google" || value === "discord";
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const authorization = req.header("authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new HttpError(401, "UNAUTHORIZED", "Missing bearer token");
  }

  const token = authorization.slice("Bearer ".length).trim();

  try {
    const payload = jwt.verify(token, env.jwtAccessSecret) as JwtClaims;

    if (!payload.sub || !payload.email || !payload.provider || !isProvider(payload.provider)) {
      throw new HttpError(401, "UNAUTHORIZED", "Invalid access token payload");
    }

    req.auth = {
      userId: payload.sub,
      email: payload.email,
      provider: payload.provider,
    };

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError(401, "UNAUTHORIZED", "Invalid or expired access token");
  }
}
