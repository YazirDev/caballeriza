import api from "./axiosConfig";

export async function getAlertas() {
  const { data } = await api.get("/alertas");
  return data;
}

export async function getAlertasNoLeidas() {
  const { data } = await api.get("/alertas/no-leidas");
  return data;
}

export async function marcarAlertaLeida(id) {
  const { data } = await api.put(`/alertas/${id}/leer`);
  return data;
}

export async function generarAlertas() {
  const { data } = await api.post("/alertas/generar");
  return data;
}