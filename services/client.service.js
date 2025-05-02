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

// ➕ Створити нового клієнта
export const createClient = async (data) => {
  return prisma.client.create({ data });
};

// 🛠️ Оновити клієнта (якщо активний)
export const updateClient = async (id, data) => {
  return prisma.client.update({
    where: { id: parseInt(id) },
    data,
  });
};

// ❌ Мʼяке видалення (Soft Delete)
export const deleteClient = async (id) => {
  return prisma.client.update({
    where: { id: parseInt(id) },
    data: { deletedAt: new Date() },
  });
};
