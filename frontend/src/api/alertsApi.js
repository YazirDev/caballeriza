import api from "./axiosConfig";

export async function getAlerts(params = {}) {
  const { data } = await api.get("/alerts", { params });
  return data;
}

export async function getUnreadAlerts() {
  const { data } = await api.get("/alerts/unread");
  return data;
}

export async function markAlertAsRead(id) {
  const { data } = await api.patch(`/alerts/${id}/read`);
  return data;
}

export async function markAllAlertsAsRead() {
  const { data } = await api.patch("/alerts/read-all");
  return data;
}