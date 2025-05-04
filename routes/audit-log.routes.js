import express from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";
import { getAuditLog } from "../controllers/audit-log.controller.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles("ADMIN"), getAuditLog);

export default router;
