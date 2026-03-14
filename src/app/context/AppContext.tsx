import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "gestor" | "vendedor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Carlos Mendes",
    email: "gestor@sgc.com",
    role: "gestor",
    avatar: "CM",
  },
  {
    id: "2",
    name: "Ana Paula",
    email: "vendedor@sgc.com",
    role: "vendedor",
    avatar: "AP",
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string, role: UserRole): boolean => {
    const found = MOCK_USERS.find((u) => u.role === role);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
