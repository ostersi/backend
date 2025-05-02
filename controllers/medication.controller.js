import {
    getAllMedications,
    getMedicationById,
    createMedication,
    updateMedication,
    deleteMedication,
    getPrescriptionRequiredMedications
  } from "../services/medication.service.js";
  import { prisma } from "../app.js";

  export const getMedications = async (req, res) => {
    try {
      const medications = await getAllMedications();
      res.json(medications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  };
  
  export const getMedication = async (req, res) => {
    try {
      const medication = await getMedicationById(req.params.id);
      if (!medication) {
        return res.status(404).json({ message: "Медикамент не знайдено" });
      }
      res.json(medication);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  };
  
  export const createNewMedication = async (req, res) => {
    try {
      const newMedication = await createMedication(req.body);
      res.status(201).json(newMedication);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  };
  
  export const updateExistingMedication = async (req, res) => {
    try {
      const updatedMedication = await updateMedication(req.params.id, req.body);
      res.json(updatedMedication);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  };
  
  export const softDeleteMedication = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const medication = await prisma.medication.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      res.json({ message: "Медикамент помічено як видалений.", medication });
    } catch (err) {
      console.error("Помилка soft delete:", err);
      res.status(400).json({ message: "Не вдалося видалити медикамент." });
    }
  };

export const getPrescriptionRequired = async (req, res) => {
  try {
    const medications = await getPrescriptionRequiredMedications();
    res.json(medications);
  } catch (err) {
    console.error("Помилка отримання медикаментів:", err);
    res.status(500).json({ message: "Помилка сервера" });
  }
};
