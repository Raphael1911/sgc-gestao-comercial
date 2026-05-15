// frontend/src/services/api.ts
import axios from "axios";

// Configura a base da URL apontando para o FastAPI
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

// INTERCEPTADOR: Injeta o Token JWT antes de qualquer requisição sair
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@sgc_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- FUNÇÕES DO ESTOQUE (Adaptadas para o Axios e para o FastAPI) ---

export const buscarItens = async () => {
  const resposta = await api.get('/produtos');
  return resposta.data;
};

export const criarItem = async (item: any) => {
  const resposta = await api.post('/produtos', item);
  return resposta.data;
};

export const atualizarItem = async (id: string, item: any) => {
  const resposta = await api.put(`/produtos/${id}`, item);
  return resposta.data;
};

export const deletarItem = async (id: string) => {
  const resposta = await api.delete(`/produtos/${id}`);
  return resposta.data;
};