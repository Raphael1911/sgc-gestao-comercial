import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, Navigate } from "react-router";
import { useApp } from "../context/AppContext";
import { ThemeToggle } from "./ThemeToggle"; // Importando o nosso botão! (Ajuste o caminho se precisar: "../components/ThemeToggle")
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  Settings,
  LogOut,
  X,
  Lock,
  Bell,
  Store,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: string[];
  locked?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", roles: ["gestor"] },
  { label: "PDV / Vendas", icon: ShoppingCart, path: "/pdv", roles: ["gestor", "vendedor"] },
  { label: "Estoque", icon: Package, path: "/estoque", roles: ["gestor", "vendedor"] },
  { label: "Relatórios", icon: BarChart3, path: "/relatorios", roles: ["gestor"], locked: true },
  { label: "Configurações", icon: Settings, path: "/configuracoes", roles: ["gestor"] },
];

export default function Layout() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Guard — after hooks
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(user.role));
  const lockedItems = NAV_ITEMS.filter((item) => item.locked && !item.roles.includes(user.role));

  return (
    // Adicionado suporte ao fundo escuro na div principal
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      {/* Sidebar - Agora com suporte ao Dark Mode (repare no bg-[#1E3A5F] e dark:bg-gray-900) */}
      <aside
        className={`flex flex-col transition-all duration-300 flex-shrink-0 ${
          sidebarOpen ? "w-64" : "w-16"
        } bg-[#1E3A5F] dark:bg-gray-900 border-r border-transparent dark:border-gray-800`}
      >
        {/* Logo */}
        <div 
          className={`flex items-center border-b border-white/10 py-5 transition-all ${
            sidebarOpen ? "px-4 gap-3" : "justify-center cursor-pointer hover:bg-white/5"
          }`}
          onClick={() => !sidebarOpen && setSidebarOpen(true)}
          title={!sidebarOpen ? "Expandir menu" : ""}
        >
          <div className="w-9 h-9 bg-blue-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <Store className="w-5 h-5 text-blue-200" />
          </div>
          
          {sidebarOpen && (
            <>
              <div className="overflow-hidden">
                <p className="text-white text-sm" style={{ fontWeight: 700 }}>SGC</p>
                <p className="text-blue-300" style={{ fontSize: 10 }}>Gestão Comercial</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(false);
                }}
                className="ml-auto text-blue-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Role badge */}
        {sidebarOpen && (
          <div className="mx-3 mt-4 mb-2">
            <div
              className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 ${
                user.role === "gestor"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-blue-500/20 text-blue-300"
              }`}
              style={{ fontWeight: 600 }}
            >
              <span className="w-2 h-2 rounded-full bg-current" />
              {user.role === "gestor" ? " Gestor" : " Vendedor"}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 flex flex-col gap-1 overflow-y-auto">
          {sidebarOpen && (
            <p className="px-3 py-2 text-blue-400/60 uppercase" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em" }}>
              Menu Principal
            </p>
          )}

          {visibleItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-blue-300 hover:bg-white/10 hover:text-white"
                } ${!sidebarOpen ? "justify-center" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : ""}`} />
                  {sidebarOpen && (
                    <span className="text-sm" style={{ fontWeight: 500 }}>{item.label}</span>
                  )}
                  {sidebarOpen && isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-300" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Locked items */}
          {user.role === "vendedor" && lockedItems.length > 0 && (
            <>
              {sidebarOpen && (
                <div className="mx-3 mt-4 mb-1">
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-blue-400/40 uppercase" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em" }}>
                      🔒 Acesso Restrito
                    </p>
                  </div>
                </div>
              )}
              {lockedItems.map((item) => (
                <div
                  key={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-35 cursor-not-allowed select-none ${!sidebarOpen ? "justify-center" : ""}`}
                  title="Acesso restrito — somente Gestor"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0 text-blue-400" />
                  {sidebarOpen && (
                    <>
                      <span className="text-sm text-blue-400 line-through" style={{ fontWeight: 500 }}>
                        {item.label}
                      </span>
                      <Lock className="ml-auto w-3 h-3 text-blue-400 flex-shrink-0" />
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </nav>

        {/* User info + logout */}
        <div className="p-3 border-t border-white/10 flex flex-col gap-1">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-300 hover:bg-white/10 hover:text-white transition-all ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && (
              <span className="text-sm" style={{ fontWeight: 500 }}>Sair</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar - Adicionado bg-gray-900 e border-gray-800 para o dark mode */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-sm transition-colors duration-300">
          <div>
            {/* Títulos adaptáveis ao dark mode */}
            <h2 className="text-gray-800 dark:text-white text-base" style={{ fontWeight: 700 }}>
              {user.role === "gestor" ? "Painel do Gestor" : "Painel do Vendedor"}
            </h2>
            <p className="text-gray-400 dark:text-gray-500" style={{ fontSize: 12 }}>
              {new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            
            {/* AQUI ESTÁ O NOSSO BOTÃO DE TEMA */}
            <ThemeToggle />

            {/* Sino de notificação ajustado para dark mode */}
            <button className="relative w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-200 dark:border-gray-700">
              <Bell className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            
            <div className="flex items-center gap-2 pl-3 border-l border-gray-100 dark:border-gray-800">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs" style={{ fontWeight: 700 }}>{user.avatar}</span>
              </div>
              <div className="hidden sm:block">
                {/* Nome de usuário adaptável ao dark mode */}
                <p className="text-gray-800 dark:text-white text-sm" style={{ fontWeight: 600 }}>{user.name}</p>
                <p className="text-gray-400 dark:text-gray-500" style={{ fontSize: 11, textTransform: "capitalize" }}>{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}