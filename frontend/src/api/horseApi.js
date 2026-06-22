import api from "./axiosConfig";

export const getHorses = async () => {
  const response = await api.get("/caballos");
  return response.data;
};

export const getHorseById = async (id) => {
  const response = await api.get(`/caballos/${id}`);
  return response.data;
};

export const createHorse = async (horseData) => {
  const response = await api.post("/caballos", horseData);
  return response.data;
};

export const updateHorse = async (id, horseData) => {
  const response = await api.put(`/caballos/${id}`, horseData);
  return response.data;
};

export const deleteHorse = async (id) => {
  const response = await api.delete(`/caballos/${id}`);
  return response.data;
};

export const getMedicalHistory = async (horseId) => {
  const response = await api.get(`/caballos/${horseId}/historial`);
  return response.data;
};

export const createMedicalHistory = async (horseId, historyData) => {
  const response = await api.post(`/caballos/${horseId}/historial`, historyData);
  return response.data;
};

export const deleteMedicalHistory = async (historyId) => {
  const response = await api.delete(`/caballos/historial/${historyId}`);
  return response.data;
};

export const horsesApi = {
  getHorses,
  getHorseById,
  createHorse,
  updateHorse,
  deleteHorse,
  getMedicalHistory,
  createMedicalHistory,
  deleteMedicalHistory
};