import api from "./axiosConfig";

function normalizeReservationPayload(payload) {
  return {
    caballoId: payload.caballoId || payload.horseId,
    cliente: payload.cliente || payload.clientName,
    tipo: payload.tipo || payload.type,
    fecha: payload.fecha || payload.date,
    horaInicio: payload.horaInicio || payload.startTime,
    horaFin: payload.horaFin || payload.endTime,
    estado: payload.estado || payload.status || "PENDIENTE",
    observaciones: payload.observaciones || payload.notes || "",
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