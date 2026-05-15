// frontend/src/services/user_api.ts
import { api } from "./api";

// Faz o login e devolve o Token JWT
export const loginAPI = async (email: string, senha: string) => {
  const response = await api.post("/auth/login", { email, senha });
  return response.data; 
};

// Busca os dados do usuário (usando aquelas rotas de teste do backend)
export const getPerfilAPI = async (role: "gestor" | "vendedor") => {
  const response = await api.get(`/auth/${role}`);
  return response.data; 
};

// Rota exclusiva para o Gestor criar novos usuários
export const criarUsuarioAPI = async (dadosUsuario: any) => {
  const response = await api.post("/usuarios/", dadosUsuario);
  return response.data;
};