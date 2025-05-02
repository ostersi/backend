import express from "express";
import { createNewSale, getSales } from "../controllers/sale.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Створити новий продаж
router.post("/new", authenticateToken, authorizeRoles("PHARMACIST", "ADMIN"), createNewSale);

// Перегляд історії продажів
router.get("/history", authenticateToken, authorizeRoles("PHARMACIST", "ADMIN"), getSales);

export default router;
