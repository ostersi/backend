import { prisma } from "../app.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { email, password, role, firstName, lastName, phoneNumber, address } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Користувач з таким email вже існує." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
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
    });

    res.status(201).json({ message: "Користувача створено!", user: { id: newUser.id, email: newUser.email, role: newUser.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email }, include: { userInfo: true } });
    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Невірний пароль." });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.userInfo?.firstName,
        lastName: user.userInfo?.lastName,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

export { register, login };
