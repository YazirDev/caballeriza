import api from "./axiosConfig";

function normalizeReservationPayload(payload) {
  const tipoRaw = payload.tipo || payload.type || "";
  const estadoRaw = payload.estado || payload.status || "PENDIENTE";
  return {
    caballo: { id: Number(payload.caballoId || payload.caballo?.id) },  // FIX: objeto con id
    tipo: tipoRaw.toUpperCase(),         // FIX: "Paseo" → "PASEO"
    fecha: payload.fecha || payload.date,
    estado: estadoRaw.toUpperCase(),     // FIX: "Confirmada" → "CONFIRMADA"
    notas: payload.notas || payload.notes || "",
  };
}

export async function getReservas() {
  const { data } = await api.get("/reservas");
  return data;
}
export async function getReservaById(id) {
  const { data } = await api.get(`/reservas/${id}`);
  return data;
}
export async function createReserva(payload) {
  const { data } = await api.post("/reservas", normalizeReservationPayload(payload));
  return data;
}
export async function updateReserva(id, payload) {
  const { data } = await api.put(`/reservas/${id}`, normalizeReservationPayload(payload));
  return data;
}
export async function cancelarReserva(id) {
  const { data } = await api.put(`/reservas/${id}/cancelar`);
  return data;
}
export async function deleteReserva(id) {
  const { data } = await api.delete(`/reservas/${id}`);
  return data;
}
export async function getReservasByTipo(tipo) {
  const { data } = await api.get(`/reservas/tipo/${tipo}`);
  return data;
}