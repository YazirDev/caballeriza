import api from "./axiosConfig";

export async function getInventoryItems() {
  const { data } = await api.get("/inventory");
  return data;
}

export async function createInventoryItem(payload) {
  const { data } = await api.post("/inventory", payload);
  return data;
}

export async function updateInventoryItem(id, payload) {
  const { data } = await api.put(`/inventory/${id}`, payload);
  return data;
}

export async function deleteInventoryItem(id) {
  const { data } = await api.delete(`/inventory/${id}`);
  return data;
}

export async function getLowStockItems() {
  const { data } = await api.get("/inventory/low-stock");
  return data;
}