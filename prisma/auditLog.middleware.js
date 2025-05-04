import { prisma } from "../app.js";

export const auditLogMiddleware = () => {
  return async (params, next) => {
    const { model } = params;
    let action = params.action;

    const auditableModels = [
      "User",
      "Client",
      "Medication",
      "Prescription",
      "Sale",
      "SaleItem",
    ];

    if (!auditableModels.includes(model)) {
      return next(params);
    }

    const userId = params.context?.userId || null;

    let before = null;

    // Якщо це soft delete
    if (action === "update" && params.args?.data?.deletedAt) {
      action = "SOFT_DELETE";
    }

    // Зберігаємо стан "до" для update/delete
    if (["update", "delete"].includes(action)) {
      try {
        before = await prisma[model.toLowerCase()].findUnique({
          where: params.args.where,
        });
      } catch (e) {
        console.warn(`⚠️ Не вдалося отримати ${model} перед дією:`, e.message);
      }
    }

    const result = await next(params);

    const after = action === "create" ? result : params.args?.data;

    try {
      await prisma.auditLog.create({
        data: {
          model,
          action: action.toUpperCase(),
          entityId: result?.id || before?.id || null,
          userId,
          dataBefore: before,
          dataAfter: after,
        },
      });
    } catch (logErr) {
      console.warn("⚠️ Не вдалося записати лог аудиту:", logErr.message);
    }

    return result;
  };
};
