import express from "express";
import {
  getClients,
  getClient,
  createNewClient,
  updateExistingClient,
  removeClient
} from "../controllers/client.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Переглянути всіх клієнтів
router.get("/", authenticateToken, authorizeRoles("PHARMACIST", "ADMIN", "DOCTOR"), getClients);

// Переглянути клієнта за id
router.get("/:id", authenticateToken, authorizeRoles("PHARMACIST", "ADMIN", "DOCTOR"), getClient);

// Створити нового клієнта
router.post("/", authenticateToken, authorizeRoles("PHARMACIST", "ADMIN", "DOCTOR"), createNewClient);

// Оновити клієнта
router.put("/:id", authenticateToken, authorizeRoles("PHARMACIST", "ADMIN", "DOCTOR"), updateExistingClient);

// Видалити клієнта
router.delete("/:id", authenticateToken, authorizeRoles("ADMIN"), removeClient);

export default router;
