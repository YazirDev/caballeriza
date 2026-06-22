import api from "./axiosConfig";

export const getStaff = async () => {
  const response = await api.get("/personal");
  return response.data;
};

export const getStaffById = async (id) => {
  const response = await api.get(`/personal/${id}`);
  return response.data;
};

export const createStaff = async (staffData) => {
  const response = await api.post("/personal", staffData);
  return response.data;
};

export const updateStaff = async (id, staffData) => {
  const response = await api.put(`/personal/${id}`, staffData);
  return response.data;
};

export const deleteStaff = async (id) => {
  const response = await api.delete(`/personal/${id}`);
  return response.data;
};

export const getShiftsByStaff = async (staffId) => {
  const response = await api.get(`/personal/${staffId}/turnos`);
  return response.data;
};

export const createShift = async (staffId, shiftData) => {
  const response = await api.post(`/personal/${staffId}/turnos`, shiftData);
  return response.data;
};

export const getTasksByStaff = async (staffId) => {
  const response = await api.get(`/personal/${staffId}/tareas`);
  return response.data;
};

export const createTask = async (staffId, taskData) => {
  const response = await api.post(`/personal/${staffId}/tareas`, taskData);
  return response.data;
};

export const staffApi = {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  getShiftsByStaff,
  createShift,
  getTasksByStaff,
  createTask
};