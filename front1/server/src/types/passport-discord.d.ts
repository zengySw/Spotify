declare module "passport-discord" {
  import type { Request } from "express";
  import type { Strategy as PassportStrategy } from "passport";

  export interface Profile {
    id: string;
    username?: string;
    displayName?: string;
    emails?: Array<{ value?: string }>;
    photos?: Array<{ value?: string }>;
  }

  export interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope?: string[];
    passReqToCallback?: boolean;
  }

  export class Strategy extends PassportStrategy {
    constructor(
      options: StrategyOptions,
      verify: (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: unknown, user?: unknown) => void
      ) => void
    );
  }
}
