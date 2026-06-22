import api from "./axiosConfig";

function normalizeInventoryPayload(payload) {
  return {
    nombre: payload.nombre || payload.name,
    tipo: payload.tipo || payload.category,
    stockActual: Number(payload.stockActual || payload.currentStock),
    stockMinimo: Number(payload.stockMinimo || payload.minimumStock),
    unidad: payload.unidad || payload.unit,
    fechaVencimiento: payload.fechaVencimiento || payload.expirationDate || null,
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