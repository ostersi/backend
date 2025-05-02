import {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
  } from "../services/client.service.js";
  
  export const getClients = async (req, res) => {
    try {
      const clients = await getAllClients();
      res.json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  };
  
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
  
  export const createNewClient = async (req, res) => {
    try {
      const newClient = await createClient(req.body);
      res.status(201).json(newClient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  };
  
  export const updateExistingClient = async (req, res) => {
    try {
      const updatedClient = await updateClient(req.params.id, req.body);
      res.json(updatedClient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  };
  
  export const removeClient = async (req, res) => {
    try {
      await deleteClient(req.params.id);
      res.json({ message: "Клієнта видалено" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  };
  