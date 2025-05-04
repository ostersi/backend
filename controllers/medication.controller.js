import {
  getAllMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
  getPrescriptionRequiredMedications
} from "../services/medication.service.js";

// 📦 Отримати всі медикаменти
export const getMedications = async (req, res) => {
  try {
    const medications = await getAllMedications();
    res.json(medications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// 📦 Отримати медикамент за ID
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

// ➕ Створити новий медикамент
export const createNewMedication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const newMedication = await createMedication(req.body, userId);
    res.status(201).json(newMedication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// ✏️ Оновити існуючий медикамент
export const updateExistingMedication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updatedMedication = await updateMedication(req.params.id, req.body, userId);
    res.json(updatedMedication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// ❌ Мʼяке видалення медикаменту
export const softDeleteMedication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const medication = await deleteMedication(req.params.id, userId);
    res.json({ message: "Медикамент помічено як видалений.", medication });
  } catch (err) {
    console.error("Помилка soft delete:", err);
    res.status(400).json({ message: "Не вдалося видалити медикамент." });
  }
};

// 💊 Отримати тільки медикаменти, що потребують рецепта
export const getPrescriptionRequired = async (req, res) => {
  try {
    const medications = await getPrescriptionRequiredMedications();
    res.json(medications);
  } catch (err) {
    console.error("Помилка отримання медикаментів:", err);
    res.status(500).json({ message: "Помилка сервера" });
  }
};
