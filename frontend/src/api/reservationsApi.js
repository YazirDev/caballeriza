import api from "./axiosConfig";

export async function getReservations(params = {}) {
  const { data } = await api.get("/reservations", { params });
  return data;
}

export async function createReservation(payload) {
  const { data } = await api.post("/reservations", payload);
  return data;
}

export async function updateReservation(id, payload) {
  const { data } = await api.put(`/reservations/${id}`, payload);
  return data;
}

export async function cancelReservation(id) {
  const { data } = await api.patch(`/reservations/${id}/cancel`);
  return data;
}

export async function deleteReservation(id) {
  const { data } = await api.delete(`/reservations/${id}`);
  return data;
}