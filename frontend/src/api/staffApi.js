import api from "./axiosConfig";

export async function getStaff() {
  const { data } = await api.get("/staff");
  return data;
}

export async function getStaffById(id) {
  const { data } = await api.get(`/staff/${id}`);
  return data;
}

export async function createStaff(payload) {
  const { data } = await api.post("/staff", payload);
  return data;
}

export async function updateStaff(id, payload) {
  const { data } = await api.put(`/staff/${id}`, payload);
  return data;
}

export async function deleteStaff(id) {
  const { data } = await api.delete(`/staff/${id}`);
  return data;
}

export async function getStaffShifts(id) {
  const { data } = await api.get(`/staff/${id}/shifts`);
  return data;
}

export async function getStaffTasks(id) {
  const { data } = await api.get(`/staff/${id}/tasks`);
  return data;
}