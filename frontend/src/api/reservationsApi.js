import api from "./axiosConfig";

function normalizeReservationPayload(payload) {
  // El backend espera LocalDateTime → "2024-06-22T10:00:00"
  const fecha = payload.fecha || payload.date || "";
  const hora  = payload.horaInicio || payload.startTime || "00:00";
  const fechaHora = fecha ? `${fecha}T${hora}:00` : null;

  return {
    caballo: { id: Number(payload.caballoId || payload.horseId || payload.caballo?.id) },
    tipo:    (payload.tipo || payload.type || "PASEO").toUpperCase(),
    fecha:   fechaHora,
    estado:  (payload.estado || payload.status || "PENDIENTE").toUpperCase(),
    notas:   payload.notas || payload.notes || "",
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
  const { data } = await api.get(`/reservas/tipo/${tipo.toUpperCase()}`);
  return data;
}
