// middleware/context.middleware.js
import { prisma } from "../app.js"; // 🛡️ Імпортуємо клієнт Prisma

export const addPrismaContext = (req, res, next) => {
    prisma.$useParamsContext = {
      userId: req.user?.userId || null,
    };
    next();
  };
  