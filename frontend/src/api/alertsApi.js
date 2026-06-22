import api from "./axiosConfig";

export const getAlerts = async () => {
  const response = await api.get("/alertas");
  return response.data;
};

export const getUnreadAlerts = async () => {
  const response = await api.get("/alertas/no-leidas");
  return response.data;
};

export const markAlertAsRead = async (id) => {
  const response = await api.put(`/alertas/${id}/leer`);
  return response.data;
};

export const generateAlerts = async () => {
  const response = await api.post("/alertas/generar");
  return response.data;
};

export const alertsApi = {
  getAlerts,
  getUnreadAlerts,
  markAlertAsRead,
  generateAlerts
};