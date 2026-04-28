import type { UserProvider } from "../services/user_service.js";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        email: string;
        provider: UserProvider;
      };
    }

    interface User {
      user: {
        id: string;
        email: string;
        display_name: string | null;
        avatar_url: string | null;
        provider: UserProvider;
      };
      access_token: string;
      expires_in: number;
      refresh_token: string;
    }
  }
}

export {};
