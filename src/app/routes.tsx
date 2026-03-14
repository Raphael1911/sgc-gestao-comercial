import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./components/Layout";
import Login from "./pages/Login";
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
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", Component: Dashboard },
      { path: "pdv", Component: POS },
      { path: "estoque", Component: Inventory },
      { path: "relatorios", Component: Reports },
      { path: "configuracoes", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
]);