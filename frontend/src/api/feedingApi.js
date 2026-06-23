import api from "./axiosConfig";

// PlanAlimentacion model fields: caballo, tipoAlimento, cantidad, unidad, frecuencia, notas
function normalizePlanPayload(payload) {
  return {
    caballo:      { id: Number(payload.caballoId || payload.horseId) },
    tipoAlimento: payload.tipoAlimento || payload.foodType,
    cantidad:     Number(payload.cantidad || payload.quantity),
    frecuencia:   payload.frecuencia || payload.frequency,
    notas:        payload.notas || payload.notes || payload.observaciones || "",
  };
}

// Suministro model fields: caballo, fecha (LocalDate), tipo, cantidad, unidad
function normalizeSupplyPayload(payload) {
  // dateTime comes as "2024-06-22T10:00" → take only date part for LocalDate
  const rawDate = payload.fecha || payload.dateTime || "";
  const fecha   = rawDate.includes("T") ? rawDate.split("T")[0] : rawDate;

  return {
    caballo:  { id: Number(payload.caballoId || payload.horseId) },
    tipo:     payload.tipo || payload.foodType || payload.tipoAlimento,
    cantidad: Number(payload.cantidad || payload.quantity),
    unidad:   payload.unidad || payload.unit || "kg",
    fecha:    fecha || new Date().toISOString().split("T")[0],
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
