import bcrypt from "bcryptjs";
import { prisma } from "../app.js";

// ➕ Створення користувача
export const createUser = async (data) => {
  const {
    email,
    password,
    role,
    firstName,
    lastName,
    phoneNumber,
    address,
  } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      userInfo: {
        create: {
          firstName,
          lastName,
          phoneNumber,
          address,
        },
      },
    },
    include: { userInfo: true },
  });
};

// 🛠️ Оновлення користувача
export const updateUser = async (userId, data) => {

  const {
    email,
    role,
    password,
    firstName,
    lastName,
    phoneNumber,
    address,
  } = data;

  const updateData = {
    email,
    role,
    ...(password && password.trim() && {
      password: await bcrypt.hash(password, 10),
    }),
  };

  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  // 🧼 Скинути UserInfo якщо немає нічого? — ні. Оновлюємо тільки якщо є щось
  const userInfoUpdate = {};
  if (firstName) userInfoUpdate.firstName = firstName;
  if (lastName) userInfoUpdate.lastName = lastName;
  if (phoneNumber) userInfoUpdate.phoneNumber = phoneNumber;
  if (address) userInfoUpdate.address = address;

  if (Object.keys(userInfoUpdate).length > 0) {
    await prisma.userInfo.upsert({
      where: { userId },
      update: userInfoUpdate,
      create: {
        userId,
        firstName: firstName || " ",
        lastName: lastName || " ",
        phoneNumber,
        address,
      },
    });
  }

  return await prisma.user.findUnique({
    where: { id: userId },
    include: { userInfo: true },
  });
};

  

export const getAllUsers = async () => {
  return prisma.user.findMany({
    where: { deletedAt: null },
    include: { userInfo: true },
  });
};

export const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    include: { userInfo: true },
  });
};

export const deleteUser = async (id) => {
  return prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};


