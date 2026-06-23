import api from "./axiosConfig";

// Empleado model: nombre, rol (enum: VETERINARIO/POTRADOR/CUIDADOR/ADMINISTRADOR), contacto
function normalizeEmployeePayload(payload) {
  const rolRaw = payload.rol || payload.role || "CUIDADOR";
  return {
    nombre:   payload.nombre || payload.name,
    rol:      rolRaw.toUpperCase(), // FIX: "Cuidador" → "CUIDADOR"
    contacto: payload.contacto || payload.contact || payload.phone || payload.email,
  };
}

function normalizeShiftPayload(payload) {
  return {
    fecha:       payload.fecha || payload.date,
    horaInicio:  payload.horaInicio || payload.startTime,
    horaFin:     payload.horaFin || payload.endTime,
    descripcion: payload.descripcion || payload.notes || "",
  };
}

function normalizeTaskPayload(payload) {
  return {
    titulo:      payload.titulo || payload.title,
    descripcion: payload.descripcion || payload.description || "",
    prioridad:   (payload.prioridad || payload.priority || "MEDIA").toUpperCase(),
    fechaLimite: payload.fechaLimite || payload.dueDate,
    estado:      (payload.estado || payload.status || "PENDIENTE").toUpperCase(),
  };
}

export async function getPersonal() {
  const { data } = await api.get("/personal");
  return data;
}
export async function getEmpleadoById(id) {
  const { data } = await api.get(`/personal/${id}`);
  return data;
}
export async function createEmpleado(payload) {
  const { data } = await api.post("/personal", normalizeEmployeePayload(payload));
  return data;
}
export async function updateEmpleado(id, payload) {
  const { data } = await api.put(`/personal/${id}`, normalizeEmployeePayload(payload));
  return data;
}
export async function deleteEmpleado(id) {
  const { data } = await api.delete(`/personal/${id}`);
  return data;
}
export async function getTurnosEmpleado(id) {
  const { data } = await api.get(`/personal/${id}/turnos`);
  return data;
}
export async function createTurnoEmpleado(id, payload) {
  const { data } = await api.post(`/personal/${id}/turnos`, normalizeShiftPayload(payload));
  return data;
}
export async function getTareasEmpleado(id) {
  const { data } = await api.get(`/personal/${id}/tareas`);
  return data;
}
export async function createTareaEmpleado(id, payload) {
  const { data } = await api.post(`/personal/${id}/tareas`, normalizeTaskPayload(payload));
  return data;
}
