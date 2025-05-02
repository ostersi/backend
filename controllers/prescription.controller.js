import { prisma } from "../app.js";
import {
    getAllPrescriptionsFull,
    getPrescriptionById,
    createPrescription,
    updatePrescription,
    deletePrescription,
  } from "../services/prescription.service.js";

  export const getAllPrescriptions = async (req, res) => {
    try {
      const prescriptions = await getAllPrescriptionsFull();
      res.json(prescriptions);
    } catch (error) {
      console.error("Помилка отримання всіх рецептів:", error);
      res.status(500).json({ message: "Помилка сервера при отриманні всіх рецептів." });
    }
  };
  // Отримати всі рецепти
  export const getPrescriptions = async (req, res) => {
    try {
      const role = req.user.role;
      const userId = req.user.userId;
  
      let whereCondition = {};
  
      if (role === "DOCTOR") {
        whereCondition = { prescribedById: userId };
      }
  
      const prescriptions = await prisma.prescription.findMany({
        where: whereCondition,
        include: {
          client: true,
          medication: true,
          prescribedBy: {
            select: { id: true, email: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      res.json(prescriptions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка отримання рецептів." });
    }
  };
  
  
  // Отримати один рецепт
  export const getPrescription = async (req, res) => {
    try {
      const prescription = await getPrescriptionById(req.params.id);
      if (!prescription) {
        return res.status(404).json({ message: "Рецепт не знайдено." });
      }
      res.json(prescription);
    } catch (error) {
      console.error("Помилка отримання рецепта:", error);
      res.status(500).json({ message: "Помилка сервера при отриманні рецепта." });
    }
  };
  
  // Створити новий рецепт
  export const createNewPrescription = async (req, res) => {
    try {
        const { clientId, medicationId, validUntil, allowedUses } = req.body;
        const prescribedById = req.user.userId; 
  
      if (!clientId || !medicationId || !prescribedById || !validUntil || allowedUses == null) {
        return res.status(400).json({ message: "Будь ласка, заповніть усі поля." });
      }
  
      const newPrescription = await createPrescription({
        clientId: parseInt(clientId),
        medicationId: parseInt(medicationId),
        prescribedById: parseInt(prescribedById),
        validUntil: new Date(validUntil),
        allowedUses: parseInt(allowedUses),
        usedUses: 0,
      });
  
      res.status(201).json(newPrescription);
    } catch (error) {
      console.error("Помилка створення рецепта:", error);
      res.status(500).json({ message: "Помилка сервера при створенні рецепта." });
    }
  };
  
  // Оновити рецепт
  export const updateExistingPrescription = async (req, res) => {
    try {
      const updatedPrescription = await updatePrescription(req.params.id, req.body);
      res.json(updatedPrescription);
    } catch (error) {
      console.error("Помилка оновлення рецепта:", error);
      res.status(500).json({ message: "Помилка сервера при оновленні рецепта." });
    }
  };
  
  // Видалити рецепт
  export const removePrescription = async (req, res) => {
    try {
      await deletePrescription(req.params.id);
      res.json({ message: "Рецепт успішно видалено." });
    } catch (error) {
      console.error("Помилка видалення рецепта:", error);
      res.status(500).json({ message: "Помилка сервера при видаленні рецепта." });
    }
  };
  