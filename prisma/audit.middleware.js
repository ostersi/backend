export const auditMiddleware = (userIdField = "userId") => {
    return async (params, next) => {
      const { model, action } = params;
  
      // Підтримує лише об'єкти (create/update/updateMany/delete)
      if (["create", "update", "delete"].includes(action)) {
        const userId = params.context?.[userIdField];
  
        if (!userId) return next(params); // немає userId — пропускаємо
  
        const now = new Date();
  
        // 💾 Audit поля
        if (action === "create") {
          params.args.data = {
            ...params.args.data,
            createdByUser: userId,
          };
        }
  
        if (action === "update" || action === "updateMany") {
          params.args.data = {
            ...params.args.data,
            updatedAt: now,
            updatedByUser: userId,
          };
        }
  
        if (action === "delete") {
          params.action = "update";
          params.args.data = {
            deletedAt: now,
            deletedByUser: userId,
          };
        }
      }
  
      return next(params);
    };
  };
  