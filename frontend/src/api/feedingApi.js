import api from "./axiosConfig";

function normalizePlanPayload(payload) {
  return {
    caballo: { id: Number(payload.caballoId || payload.horseId) },  // FIX: objeto con id
    tipoAlimento: payload.tipoAlimento || payload.foodType,
    cantidad: Number(payload.cantidad || payload.quantity),
    frecuencia: payload.frecuencia || payload.frequency,
    observaciones: payload.observaciones || payload.notes || "",
  };
}

function normalizeSupplyPayload(payload) {
  return {
    caballo: { id: Number(payload.caballoId || payload.horseId) },  // FIX: objeto con id
    tipoAlimento: payload.tipoAlimento || payload.foodType,
    cantidad: Number(payload.cantidad || payload.quantity),
    fecha: payload.fecha || payload.dateTime || new Date().toISOString(),
    responsable: payload.responsable || payload.responsible,
  };
}

export async function getPlanesByCaballo(caballoId) {
  const { data } = await api.get(`/alimentacion/planes/${caballoId}`);
  return data;
}
export async function createPlanAlimentacion(payload) {
  const { data } = await api.post("/alimentacion/planes", normalizePlanPayload(payload));
  return data;
}
export async function deletePlanAlimentacion(id) {
  const { data } = await api.delete(`/alimentacion/planes/${id}`);
  return data;
}
export async function createSuministro(payload) {
  const { data } = await api.post("/alimentacion/suministros", normalizeSupplyPayload(payload));
  return data;
}
export async function getSuministrosByCaballo(caballoId) {
  const { data } = await api.get(`/alimentacion/suministros/${caballoId}`);
  return data;
}