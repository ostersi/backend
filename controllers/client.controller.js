import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../services/client.service.js";

// 📄 Отримати всіх клієнтів
export const getClients = async (req, res) => {
  try {
    const clients = await getAllClients();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// 📄 Отримати клієнта по ID
export const getClient = async (req, res) => {
  try {
    const client = await getClientById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Клієнта не знайдено" });
    }
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// ➕ Створити нового клієнта
export const createNewClient = async (req, res) => {
  try {
    const userId = req.user.userId;
    const newClient = await createClient(req.body, userId);
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// 🛠️ Оновити клієнта
export const updateExistingClient = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updatedClient = await updateClient(req.params.id, req.body, userId);
    res.json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// ❌ Видалити клієнта (soft delete)
export const removeClient = async (req, res) => {
  try {
    const userId = req.user.userId;
    await deleteClient(req.params.id, userId);
    res.json({ message: "Клієнта видалено" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};
