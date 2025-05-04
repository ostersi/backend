import { prisma } from "../app.js";

export const getAuditLog = async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      include: {
        user: {
          include: {
            userInfo: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    res.json(logs);
  } catch (err) {
    console.error("Помилка логів:", err);
    res.status(500).json({ message: "Помилка при завантаженні логу." });
  }
};
