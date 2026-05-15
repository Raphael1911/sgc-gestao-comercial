import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { loginAPI, getPerfilAPI } from "../../services/user_api";

export type UserRole = "gestor" | "vendedor" | "Gestor" | "Vendedor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica se o usuário já estava logado (quando atualiza a página)
  useEffect(() => {
    const carregarUsuario = async () => {
      const token = localStorage.getItem("@sgc_token");
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          const roleFormatada = decoded.role.toLowerCase() as "gestor" | "vendedor";
          
          const perfil = await getPerfilAPI(roleFormatada);
          
          setUser({
            id: String(perfil.id),
            name: perfil.nome,
            email: perfil.email,
            role: roleFormatada,
            avatar: perfil.nome.substring(0, 2).toUpperCase(),
          });
        } catch (error) {
          console.error("Token inválido ou expirado", error);
          localStorage.removeItem("@sgc_token");
        }
      }
      setLoading(false);
    };

    carregarUsuario();
  }, []);

  // A função de Login Integrada com o Backend
  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const data = await loginAPI(email, senha);
      const token = data.access_token;
      
      localStorage.setItem("@sgc_token", token);
      
      const decoded: any = jwtDecode(token);
      const roleFormatada = decoded.role.toLowerCase() as "gestor" | "vendedor";
      
      const perfil = await getPerfilAPI(roleFormatada);
      
      setUser({
        id: String(perfil.id),
        name: perfil.nome,
        email: perfil.email,
        role: roleFormatada,
        avatar: perfil.nome.substring(0, 2).toUpperCase(),
      });
      
      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("@sgc_token");
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {!loading && children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}