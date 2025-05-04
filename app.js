import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import { auditLogMiddleware } from "./prisma/auditLog.middleware.js";
import { auditMiddleware } from "./prisma/audit.middleware.js";

// 🔀 Роутери
import authRoutes from "./routes/auth.routes.js";
import medicationRoutes from "./routes/medication.routes.js";
import clientRoutes from "./routes/client.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";
import saleRoutes from "./routes/sale.routes.js";
import userRoutes from "./routes/user.routes.js";
import auditLogRoutes from "./routes/audit-log.routes.js";

// 🌐 Ініціалізація .env
dotenv.config();

// ✅ Prisma Client
export const prisma = new PrismaClient();

// 🛡️ Middleware Prisma (аудит + лог)
prisma.$use(auditMiddleware("userId")); // Audit trail (createdBy / updatedBy / deletedBy)
prisma.$use(async (params, next) => {
  const actionsToLog = ["create", "update", "delete"];
  if (!actionsToLog.includes(params.action.toLowerCase())) {
    return next(params); // ❌ Пропускаємо read-запити
  }

  return auditLogMiddleware()(params, next); // ✅ Тільки для змін
});

// 🚀 Express App
const app = express();

// 🛡️ HTTP Middleware
app.use(cors());
app.use(express.json());

// 🔀 API Роути
app.use("/api/auth", authRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/audit-log", auditLogRoutes);

// 🧪 Root тест
app.get("/", (req, res) => {
  res.send("Pharma Management System Backend is running... 🧪");
});


// ❌ Error Handler
app.use((err, req, res, next) => {
  console.error("❌", err.stack);
  res.status(500).send("Internal Server Error");
});

export { app };
