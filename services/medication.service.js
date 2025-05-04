import { prisma } from "../app.js";

// ✅ Отримати всі медикаменти (НЕ видалені)
export const getAllMedications = async () => {
  return prisma.medication.findMany({
    where: { deletedAt: null },
    orderBy: { name: "asc" },
  });
};

// ✅ Отримати медикамент за ID (НЕ видалений)
export const getMedicationById = async (id) => {
  return prisma.medication.findFirst({
    where: {
      id: parseInt(id),
      deletedAt: null,
    },
  });
};

// ➕ Створити новий медикамент
export const createMedication = async (data, userId) => {
  return prisma.medication.create({
    data: {
      ...data,
      createdByUser: userId,
    },
  });
};

// ✏️ Оновити медикамент
export const updateMedication = async (id, data, userId) => {
  return prisma.medication.update({
    where: { id: parseInt(id) },
    data: {
      ...data,
      updatedAt: new Date(),
      updatedByUser: userId,
    },
  });
};

// 🧼 Мʼяке видалення медикаменту (soft delete)
export const deleteMedication = async (id, userId) => {
  return prisma.medication.update({
    where: { id: parseInt(id) },
    data: {
      deletedAt: new Date(),
      deletedByUser: userId,
    },
  });
};

// ✅ Тільки ті, що потребують рецепт і не видалені
export const getPrescriptionRequiredMedications = async () => {
  return prisma.medication.findMany({
    where: {
      requiresPrescription: true,
      deletedAt: null,
    },
    orderBy: {
      name: "asc",
    },
  });
};
