import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import passport from "passport";
import authRoutes from "./routes/auth.js";
import { env } from "./config/env.js";
import { configureOAuthStrategies } from "./services/oauth_service.js";
import { errorHandler } from "./middleware/error.js";

configureOAuthStrategies();

const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
