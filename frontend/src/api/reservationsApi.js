import api from "./axiosConfig";

export const getReservations = async () => {
  const response = await api.get("/reservas");
  return response.data;
};

export const getReservationById = async (id) => {
  const response = await api.get(`/reservas/${id}`);
  return response.data;
};

export const createReservation = async (reservationData) => {
  const response = await api.post("/reservas", reservationData);
  return response.data;
};

export const updateReservation = async (id, reservationData) => {
  const response = await api.put(`/reservas/${id}`, reservationData);
  return response.data;
};

export const cancelReservation = async (id) => {
  const response = await api.put(`/reservas/${id}/cancelar`);
  return response.data;
};

export const deleteReservation = async (id) => {
  const response = await api.delete(`/reservas/${id}`);
  return response.data;
};

export const getReservationsByType = async (type) => {
  const response = await api.get(`/reservas/tipo/${type}`);
  return response.data;
};

export const reservationsApi = {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  cancelReservation,
  deleteReservation,
  getReservationsByType
};