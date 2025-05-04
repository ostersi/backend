import { prisma } from "../app.js";

// Отримати ВСІ рецепти для перегляду фармацевтом або адміністратором
export const getAllPrescriptionsFull = async () => {
  return prisma.prescription.findMany({
    where: { deletedAt: null },
    include: {
      client: true,
      medication: true,
      prescribedBy: {
        include: {
          userInfo: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Отримати ВСІ рецепти для певного лікаря
export const getPrescriptionsByDoctorId = async (doctorId) => {
  return prisma.prescription.findMany({
    where: {
      prescribedById: doctorId,
      deletedAt: null,
    },
    include: {
      client: true,
      medication: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Отримати один рецепт за ID
export const getPrescriptionById = async (id) => {
  return prisma.prescription.findUnique({
    where: { id: parseInt(id) },
    include: {
      client: true,
      medication: true,
      prescribedBy: { select: { id: true, email: true } },
    },
  });
};

// Створити новий рецепт з createdByUser
export const createPrescription = async (data, userId) => {
  return prisma.prescription.create({
    data: {
      clientId: data.clientId,
      medicationId: data.medicationId,
      prescribedById: data.prescribedById,
      prescriberName: data.prescriberName,
      validUntil: new Date(data.validUntil),
      allowedUses: data.allowedUses,
      usedUses: 0,
      createdByUser: userId,
    },
  });
};

// Оновити рецепт з updatedByUser
export const updatePrescription = async (id, data, userId) => {
  return prisma.prescription.update({
    where: { id: parseInt(id) },
    data: {
      allowedUses: data.allowedUses,
      validUntil: new Date(data.validUntil),
      updatedByUser: userId,
    },
  });
};

// ❌ Soft delete рецепта з deletedByUser
export const deletePrescription = async (id, userId) => {
  return prisma.prescription.update({
    where: { id: parseInt(id) },
    data: {
      deletedAt: new Date(),
      deletedByUser: userId,
    },
  });
};
