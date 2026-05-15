import React from "react";
import { Navigate } from "react-router";
import { useApp } from "../context/AppContext";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user } = useApp();

  // Se não tiver usuário logado (segurança extra, apesar do Layout já fazer isso)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // O pulo do gato: Verifica se a role do usuário está na lista de permitidos para esta rota
  if (!allowedRoles.includes(user.role)) {
    // Se for barrado, joga o vendedor de volta pro PDV e o gestor pro Dashboard
    return <Navigate to={user.role === "gestor" ? "/dashboard" : "/pdv"} replace />;
  }

  // Se passou na verificação, renderiza a página solicitada
  return <>{children}</>;
}