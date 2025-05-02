import { prisma } from "../app.js";

// 🟢 Створення продажу
export const createSale = async (pharmacistId, clientId, items) => {
  return prisma.$transaction(async (tx) => {
    let totalPrice = 0;

    for (const item of items) {
      const medication = await tx.medication.findUnique({
        where: { id: item.medicationId },
      });

      if (!medication) {
        throw new Error(`Медикамент з id ${item.medicationId} не знайдено.`);
      }

      if (medication.requiresPrescription) {
        const prescription = await tx.prescription.findFirst({
          where: {
            clientId,
            medicationId: item.medicationId,
            validUntil: { gte: new Date() },
            allowedUses: { gt: prisma.prescription.fields.usedUses },
            deletedAt: null, // 🛡️
          },
        });

        if (!prescription) {
          throw new Error(`Немає дійсного рецепта для ${medication.name}.`);
        }

        await tx.prescription.update({
          where: { id: prescription.id },
          data: { usedUses: { increment: 1 } },
        });
      }

      if (medication.stock < item.quantity) {
        throw new Error(`Недостатньо запасів для ${medication.name}.`);
      }

      await tx.medication.update({
        where: { id: medication.id },
        data: { stock: { decrement: item.quantity } },
      });

      totalPrice += item.quantity * medication.price;
    }

    const sale = await tx.sale.create({
      data: {
        pharmacistId,
        clientId,
        totalPrice,
        saleItems: {
          create: items.map((item) => ({
            medicationId: item.medicationId,
            quantity: item.quantity,
            priceAtSale: item.priceAtSale,
          })),
        },
      },
      include: {
        saleItems: true,
      },
    });

    return sale;
  });
};

// 📄 Історія продажів (тільки активні)
export const getSalesHistory = async (role, pharmacistId) => {
  const whereCondition = {
    deletedAt: null, // ✅ Soft delete підтримка
    ...(role === "PHARMACIST" ? { pharmacistId } : {}),
  };

  return prisma.sale.findMany({
    where: whereCondition,
    include: {
      client: true,
      pharmacist: {
        select: { id: true, email: true, role: true },
      },
      saleItems: {
        include: {
          medication: true,
        },
      },
    },
    orderBy: {
      saleDate: "desc",
    },
  });
};
