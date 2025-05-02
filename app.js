import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth.routes.js";
import medicationRoutes from "./routes/medication.routes.js";
import clientRoutes from "./routes/client.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";
import saleRoutes from "./routes/sale.routes.js";
import userRoutes from "./routes/user.routes.js";


// Ініціалізація
dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Middleware

app.use(cors());
app.use(express.json());

// Маршрути
app.use("/api/auth", authRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/users", userRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("Pharma Management System Backend is running... 🧪");
});

// Error handling (простий)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export { app, prisma };
