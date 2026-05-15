import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./components/Layout"; // Ajuste o caminho se seu Layout não estiver em /ui
import ProtectedRoute from "./components/ProtectedRoute"; // <-- Importamos o guarda
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      
      // Rotas exclusivas de Gestor
      { 
        path: "dashboard", 
        element: <ProtectedRoute allowedRoles={["gestor"]}><Dashboard /></ProtectedRoute> 
      },
      { 
        path: "relatorios", 
        element: <ProtectedRoute allowedRoles={["gestor"]}><Reports /></ProtectedRoute> 
      },
      { 
        path: "configuracoes", 
        element: <ProtectedRoute allowedRoles={["gestor"]}><Settings /></ProtectedRoute> 
      },

      // Rotas compartilhadas (Gestor e Vendedor)
      { 
        path: "pdv", 
        element: <ProtectedRoute allowedRoles={["gestor", "vendedor"]}><POS /></ProtectedRoute> 
      },
      { 
        path: "estoque", 
        element: <ProtectedRoute allowedRoles={["gestor", "vendedor"]}><Inventory /></ProtectedRoute> 
      },
      
      { path: "*", Component: NotFound },
    ],
  },
]);