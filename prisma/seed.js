import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const roles = {
  ADMIN: "ADMIN",
  PHARMACIST: "PHARMACIST",
  DOCTOR: "DOCTOR",
  USER: "USER",
};

const hash = (pw) => bcrypt.hashSync(pw, 10);

const createUserWithInfo = async (email, password, role, firstName, lastName) => {
  return prisma.user.create({
    data: {
      email,
      password: hash(password),
      role,
      userInfo: {
        create: {
          firstName,
          lastName,
          phoneNumber: "0987654321",
          address: "вул. Прикладна, 1",
        },
      },
    },
  });
};

const run = async () => {
  console.log("🧨 Очистка таблиць...");
  await prisma.saleItem.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.medication.deleteMany();
  await prisma.client.deleteMany();
  await prisma.userInfo.deleteMany();
  await prisma.user.deleteMany();

  console.log("👤 Створення користувачів...");

  // 2 адміністратори
  await createUserWithInfo("admin1@example.com", "admin123", roles.ADMIN, "Олег", "Адмін");
  await createUserWithInfo("admin2@example.com", "admin123", roles.ADMIN, "Ірина", "Адмін");

  // 1 звичайний користувач
  await createUserWithInfo("user@example.com", "user123", roles.USER, "Марія", "Клієнт");

  // 3 лікарі
  for (let i = 1; i <= 3; i++) {
    await createUserWithInfo(
      `doctor${i}@example.com`,
      "doctor123",
      roles.DOCTOR,
      `Лікар${i}`,
      `Прізвище${i}`
    );
  }

  // 5 фармацевтів
  for (let i = 1; i <= 5; i++) {
    await createUserWithInfo(
      `pharma${i}@example.com`,
      "pharma123",
      roles.PHARMACIST,
      `Фарм${i}`,
      `Фармацевт${i}`
    );
  }

  console.log("💊 Додавання 30 медикаментів...");

  for (let i = 1; i <= 30; i++) {
    await prisma.medication.create({
      data: {
        name: `Медикамент ${i}`,
        description: `Опис препарату ${i}`,
        stock: 10 + i,
        price: 10 + i * 2.5,
        requiresPrescription: i % 3 === 0,
      },
    });
  }

  console.log("👥 Додавання 10 клієнтів...");

  for (let i = 1; i <= 10; i++) {
    await prisma.client.create({
      data: {
        fullName: `Клієнт ${i}`,
        contactInfo: `+38063123456${i}`,
      },
    });
  }

  console.log("✅ Seed успішно завершено!");
  await prisma.$disconnect();
};

run().catch((err) => {
  console.error("❌ Помилка при seed:", err);
  prisma.$disconnect();
  process.exit(1);
});
