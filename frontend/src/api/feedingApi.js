import api from "./axiosConfig";

export const getFeedingPlansByHorse = async (horseId) => {
  const response = await api.get(`/alimentacion/planes/${horseId}`);
  return response.data;
};

export const createFeedingPlan = async (planData) => {
  const response = await api.post("/alimentacion/planes", planData);
  return response.data;
};

export const deleteFeedingPlan = async (id) => {
  const response = await api.delete(`/alimentacion/planes/${id}`);
  return response.data;
};

export const createSupplyRecord = async (supplyData) => {
  const response = await api.post("/alimentacion/suministros", supplyData);
  return response.data;
};

export const getSupplyRecordsByHorse = async (horseId) => {
  const response = await api.get(`/alimentacion/suministros/${horseId}`);
  return response.data;
};

export const getInventory = async () => {
  const response = await api.get("/alimentacion/inventario");
  return response.data;
};

export const createInventoryItem = async (itemData) => {
  const response = await api.post("/alimentacion/inventario", itemData);
  return response.data;
};

export const updateInventoryItem = async (id, itemData) => {
  const response = await api.put(`/alimentacion/inventario/${id}`, itemData);
  return response.data;
};

export const getLowStockItems = async () => {
  const response = await api.get("/alimentacion/inventario/stock-bajo");
  return response.data;
};

export const feedingApi = {
  getFeedingPlansByHorse,
  createFeedingPlan,
  deleteFeedingPlan,
  createSupplyRecord,
  getSupplyRecordsByHorse,
  getInventory,
  createInventoryItem,
  updateInventoryItem,
  getLowStockItems
};