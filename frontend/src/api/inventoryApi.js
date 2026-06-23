import api from "./axiosConfig";

// Inventario model fields: nombre, tipo (enum), cantidad, unidad, stockMinimo
// NOTE: the model has NO fechaVencimiento field — that field doesn't exist in the backend
function normalizeInventoryPayload(payload) {
  const tipoRaw = payload.tipo || payload.category || "OTRO";

  // Map Spanish display names to enum values
  const tipoMap = {
    alimento: "ALIMENTO",
    medicina: "MEDICINA",
    limpieza: "OTRO",
    equipo:   "OTRO",
    otro:     "OTRO",
  };
  const tipoNorm = tipoMap[tipoRaw.toLowerCase()] || tipoRaw.toUpperCase();

  return {
    nombre:     payload.nombre || payload.name,
    tipo:       tipoNorm,                                                   // FIX: enum ALIMENTO/MEDICINA/OTRO
    cantidad:   Number(payload.stockActual || payload.currentStock || payload.cantidad || 0), // FIX: backend uses 'cantidad'
    stockMinimo:Number(payload.stockMinimo || payload.minimumStock || 0),
    unidad:     payload.unidad || payload.unit || "kg",
  };
}

export async function getInventario() {
  const { data } = await api.get("/alimentacion/inventario");
  return data;
}
export async function createInventarioItem(payload) {
  const { data } = await api.post("/alimentacion/inventario", normalizeInventoryPayload(payload));
  return data;
}
export async function updateInventarioItem(id, payload) {
  const { data } = await api.put(`/alimentacion/inventario/${id}`, normalizeInventoryPayload(payload));
  return data;
}
export async function getStockBajo() {
  const { data } = await api.get("/alimentacion/inventario/stock-bajo");
  return data;
}
