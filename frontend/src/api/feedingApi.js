import api from "./axiosConfig";

export async function getFeedingPlans() {
  const { data } = await api.get("/feeding-plans");
  return data;
}

export async function createFeedingPlan(payload) {
  const { data } = await api.post("/feeding-plans", payload);
  return data;
}

export async function updateFeedingPlan(id, payload) {
  const { data } = await api.put(`/feeding-plans/${id}`, payload);
  return data;
}

export async function deleteFeedingPlan(id) {
  const { data } = await api.delete(`/feeding-plans/${id}`);
  return data;
}

export async function getSupplyRecords() {
  const { data } = await api.get("/supply-records");
  return data;
}

export async function createSupplyRecord(payload) {
  const { data } = await api.post("/supply-records", payload);
  return data;
}