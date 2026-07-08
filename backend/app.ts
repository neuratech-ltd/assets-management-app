import express from "express";
import { prisma } from "./lib/prisma";
import cors from "cors";
import cookieParser from "cookie-parser";

const allowedOrigins = ["http://localhost:3000", "http://192.168.68.125:3000"];

const app: express.Application = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

export { app, prisma };
