import api from "./axiosConfig";

export async function getHorses() {
  const { data } = await api.get("/horses");
  return data;
}

export async function getHorseById(id) {
  const { data } = await api.get(`/horses/${id}`);
  return data;
}

export async function createHorse(payload) {
  const { data } = await api.post("/horses", payload);
  return data;
}

export async function updateHorse(id, payload) {
  const { data } = await api.put(`/horses/${id}`, payload);
  return data;
}

export async function deleteHorse(id) {
  const { data } = await api.delete(`/horses/${id}`);
  return data;
}

export async function getHorseMedicalHistory(id) {
  const { data } = await api.get(`/horses/${id}/medical-history`);
  return data;
}

export async function addHorseMedicalRecord(id, payload) {
  const { data } = await api.post(`/horses/${id}/medical-history`, payload);
  return data;
}