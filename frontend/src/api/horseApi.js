import api from "./axiosConfig";

function normalizeHorsePayload(payload) {
  return {
    nombre: payload.nombre || payload.name,
    identificador: payload.identificador || payload.identifier,
    edad: Number(payload.edad || payload.age),
    raza: payload.raza || payload.breed,
    sexo: payload.sexo || payload.sex,
    peso: Number(payload.peso || payload.weight),
    fotoUrl: payload.fotoUrl || payload.photoUrl || payload.imageUrl || "",
  };
}

function normalizeMedicalPayload(payload) {
  return {
    tipo: payload.tipo || payload.type,
    descripcion: payload.descripcion || payload.description || payload.title,
    responsable: payload.responsable || payload.responsible,
    fecha: payload.fecha || payload.date,
    fechaVencimiento: payload.fechaVencimiento || payload.expirationDate || payload.dueDate || null,
  };
}

export async function getCaballos() {
  const { data } = await api.get("/caballos");
  return data;
}

export async function getCaballoById(id) {
  const { data } = await api.get(`/caballos/${id}`);
  return data;
}

export async function createCaballo(payload) {
  const { data } = await api.post("/caballos", normalizeHorsePayload(payload));
  return data;
}

export async function updateCaballo(id, payload) {
  const { data } = await api.put(`/caballos/${id}`, normalizeHorsePayload(payload));
  return data;
}

export async function deleteCaballo(id) {
  const { data } = await api.delete(`/caballos/${id}`);
  return data;
}

export async function getHistorialCaballo(id) {
  const { data } = await api.get(`/caballos/${id}/historial`);
  return data;
}

export async function addHistorialCaballo(id, payload) {
  const { data } = await api.post(`/caballos/${id}/historial`, normalizeMedicalPayload(payload));
  return data;
}

export async function deleteHistorialCaballo(historialId) {
  const { data } = await api.delete(`/caballos/historial/${historialId}`);
  return data;
}