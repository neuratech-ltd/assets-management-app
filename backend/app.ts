import express from "express";
import { prisma } from "./lib/prisma";
import cors from "cors";

const app: express.Application = express();
app.use(cors());

// Middleware
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
