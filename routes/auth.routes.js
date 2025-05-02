import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// Реєстрація (доступна для Admin)
router.post("/register", register);

// Вхід
router.post("/login", login);

export default router;
