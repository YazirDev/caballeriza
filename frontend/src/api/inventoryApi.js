import api from "./axiosConfig";

function normalizeInventoryPayload(payload) {
  const tipoRaw = payload.tipo || payload.category || "OTRO";
  return {
    nombre: payload.nombre || payload.name,
    tipo: tipoRaw.toUpperCase(),         // FIX: enum ALIMENTO/MEDICINA/OTRO
    cantidad: Number(payload.stockActual || payload.currentStock || payload.cantidad),  // FIX: campo correcto
    stockMinimo: Number(payload.stockMinimo || payload.minimumStock),
    unidad: payload.unidad || payload.unit,
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