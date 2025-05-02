import express from "express";
import {
  getUsers,
  getSingleUser,
  createNewUser,
  updateExistingUser,
  removeUser,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles("ADMIN"), getUsers);
router.get("/me", authenticateToken, getCurrentUser);
router.get("/:id", authenticateToken, authorizeRoles("ADMIN"), getSingleUser);
router.post("/", authenticateToken, authorizeRoles("ADMIN"), createNewUser);
router.put("/:id", authenticateToken, authorizeRoles("ADMIN"), updateExistingUser);
router.delete("/:id", authenticateToken, authorizeRoles("ADMIN"), removeUser);

export default router;
