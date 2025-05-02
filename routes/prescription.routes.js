
import express from "express";
import {
  getPrescriptions,
  getPrescription,
  createNewPrescription,
  updateExistingPrescription,
  removePrescription,
  getAllPrescriptions // ← Додай цей рядок
} from "../controllers/prescription.controller.js";

import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/all", authenticateToken, authorizeRoles("ADMIN", "PHARMACIST"), getAllPrescriptions);

// Переглянути всі рецепти
router.get("/", authenticateToken, authorizeRoles("DOCTOR"), getPrescriptions);

// Переглянути конкретний рецепт
router.get("/:id", authenticateToken, authorizeRoles("DOCTOR"), getPrescription);

// Створити рецепт
router.post("/", authenticateToken, authorizeRoles("DOCTOR"), createNewPrescription);

// Оновити рецепт
router.put("/:id", authenticateToken, authorizeRoles("ADMIN"), updateExistingPrescription);

// Видалити рецепт
router.delete("/:id", authenticateToken, authorizeRoles("ADMIN"), removePrescription);


export default router;
