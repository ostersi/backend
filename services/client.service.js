import { prisma } from "../app.js";

// 📄 Отримати всіх клієнтів (тільки активні)
export const getAllClients = async () => {
  return prisma.client.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
};

// 📄 Отримати одного клієнта (тільки якщо не видалено)
export const getClientById = async (id) => {
  return prisma.client.findFirst({
    where: { id: parseInt(id), deletedAt: null },
  });
};

// ➕ Створити нового клієнта (з createdByUser)
export const createClient = async (data, userId) => {
  return prisma.client.create({
    data: {
      ...data,
      createdByUser: userId,
    },
  });
};

// 🛠️ Оновити клієнта (якщо активний) + updatedByUser
export const updateClient = async (id, data, userId) => {
  return prisma.client.update({
    where: { id: parseInt(id) },
    data: {
      ...data,
      updatedAt: new Date(),
      updatedByUser: userId,
    },
  });
};

// ❌ Мʼяке видалення (Soft Delete) + deletedByUser
export const deleteClient = async (id, userId) => {
  return prisma.client.update({
    where: { id: parseInt(id) },
    data: {
      deletedAt: new Date(),
      deletedByUser: userId,
    },
  });
};
