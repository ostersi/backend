import { createSale, getSalesHistory } from "../services/sale.service.js";

export const createNewSale = async (req, res) => {
  try {
    const { clientId, items } = req.body;
    const pharmacistId = req.user.userId;

    if (!clientId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Некоректні дані для продажу." });
    }

    const sale = await createSale(pharmacistId, clientId, items);

    res.status(201).json({ message: "Продаж успішно завершено.", sale });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || "Помилка при створенні продажу." });
  }
};

export const getSales = async (req, res) => {
    try {
      const role = req.user.role;
      const pharmacistId = req.user.userId;
  
      const sales = await getSalesHistory(role, pharmacistId);
      res.json(sales);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  };