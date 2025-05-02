import {
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
  } from "../services/user.service.js";
  
  // ✅ Отримати всіх
  export const getUsers = async (req, res) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Помилка отримання користувачів." });
    }
  };
  
  // ✅ Отримати одного
  export const getSingleUser = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await getUserById(userId);
      if (!user) return res.status(404).json({ message: "Користувача не знайдено." });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Помилка отримання користувача." });
    }
  };
  
  // ➕ Створити
  export const createNewUser = async (req, res) => {
    try {
      const user = await createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Помилка створення користувача." });
    }
  };
  
  // 🛠️ Оновити
  export const updateExistingUser = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await updateUser(userId, req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Помилка оновлення користувача." });
    }
  };
  
  // ❌ Видалити
  export const removeUser = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      await deleteUser(userId);
      res.json({ message: "Користувача видалено." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Помилка видалення користувача." });
    }
  };
  
  // 👤 Поточний користувач
  export const getCurrentUser = async (req, res) => {
    try {
      const user = await getUserById(req.user.userId);
      if (!user) return res.status(404).json({ message: "Користувача не знайдено." });
      const { id, email, role, userInfo } = user;
      res.json({ id, email, role, ...userInfo });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Помилка при отриманні профілю." });
    }
  };
  