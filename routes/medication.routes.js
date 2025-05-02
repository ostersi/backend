import express from "express";
import { prisma } from "../app.js";
import {
  getMedications,
  getMedication,
  createNewMedication,
  updateExistingMedication,
  softDeleteMedication,
  getPrescriptionRequired ,
} from "../controllers/medication.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Отримати всі медикаменти
router.get("/", authenticateToken, getMedications);

router.get("/prescription-required", authenticateToken, getPrescriptionRequired);
// Отримати медикамент за id
router.get("/:id", authenticateToken, getMedication);

// Створити новий медикамент
router.post("/", authenticateToken, authorizeRoles("PHARMACIST", "ADMIN"), createNewMedication);

// Оновити медикамент
router.put("/:id", authenticateToken, authorizeRoles("PHARMACIST", "ADMIN"), updateExistingMedication);

// Видалити медикамент
router.put("/:id/delete", authenticateToken, authorizeRoles("ADMIN"), softDeleteMedication);


export default router;
