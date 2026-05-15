import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, Navigate } from "react-router";
import { useApp } from "../context/AppContext";
import { ThemeToggle } from "./ThemeToggle"; 
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Menu, 
  X,
  Lock,
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors duration-300 relative">
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`flex flex-col transition-all duration-300 flex-shrink-0 z-50 fixed md:relative h-full ${
          sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 w-64 md:w-16"
        } bg-[#1E3A5F] dark:bg-gray-900 border-r border-transparent dark:border-gray-800`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-9 h-9 bg-blue-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <Store className="w-5 h-5 text-blue-200" />
          </div>
          
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-white text-sm" style={{ fontWeight: 700 }}>SGC</p>
              <p className="text-blue-300" style={{ fontSize: 10 }}>Gestão Comercial</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-blue-300 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

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

        <nav className="flex-1 px-2 py-3 flex flex-col gap-1 overflow-y-auto">
          {sidebarOpen && (
            // AQUI: Mudei de text-blue-400/60 para text-blue-200/80 para melhor contraste
            <p className="px-3 py-2 text-blue-200/80 uppercase" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em" }}>
              <span className="hidden md:inline">Menu Principal</span>
              <span className="md:hidden">Sistema</span>
            </p>
          )}

          {visibleItems.map((item) => {
            const isAjustes = item.path === "/configuracoes";
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                className={({ isActive }) =>
                  // AQUI: Item inativo mudou para text-blue-200 ao invés de text-blue-300
                  `${isAjustes ? "flex" : "hidden md:flex"} items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-blue-200 hover:bg-white/10 hover:text-white"
                  } ${!sidebarOpen ? "md:justify-center" : ""}`
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
            );
          })}

          {user.role === "vendedor" && lockedItems.length > 0 && (
            <>
              {sidebarOpen && (
                <div className="hidden md:block mx-3 mt-4 mb-1">
                  <div className="border-t border-white/10 pt-3">
                    {/* AQUI: Ajuste do Acesso restrito para text-blue-200/80 */}
                    <p className="text-blue-200/80 uppercase" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em" }}>
                      🔒 Acesso Restrito
                    </p>
                  </div>
                </div>
              )}
              {lockedItems.map((item) => (
                <div
                  key={item.path}
                  className={`hidden md:flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-35 cursor-not-allowed select-none ${!sidebarOpen ? "md:justify-center" : ""}`}
                  title="Acesso restrito — somente Gestor"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0 text-blue-300" />
                  {sidebarOpen && (
                    <>
                      <span className="text-sm text-blue-300 line-through" style={{ fontWeight: 500 }}>
                        {item.label}
                      </span>
                      <Lock className="ml-auto w-3 h-3 text-blue-300 flex-shrink-0" />
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </nav>

        <div className="p-3 border-t border-white/10 flex flex-col gap-1">
          <button
            onClick={handleLogout}
            // AQUI: Mudei para text-blue-200
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-200 hover:bg-white/10 hover:text-white transition-all ${!sidebarOpen ? "md:justify-center" : ""}`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && (
              <span className="text-sm" style={{ fontWeight: 500 }}>Sair</span>
            )}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 md:px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-sm transition-colors duration-300 z-30 relative">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-gray-800 dark:text-white text-base" style={{ fontWeight: 700 }}>
                {user.role === "gestor" ? "Painel do Gestor" : "Painel do Vendedor"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 hidden sm:block" style={{ fontSize: 12 }}>
                {new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <div className="flex items-center gap-2 pl-3 border-l border-gray-100 dark:border-gray-800">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs" style={{ fontWeight: 700 }}>{user.avatar}</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-gray-800 dark:text-white text-sm" style={{ fontWeight: 600 }}>{user.name}</p>
                <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: 11, textTransform: "capitalize" }}>{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <Outlet />
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-around items-center px-2 py-2 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors duration-300">
          {visibleItems.filter(item => item.path !== "/configuracoes").map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 flex-1 py-1.5 transition-all ${
                  isActive 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px]" style={{ fontWeight: 700 }}>{item.label.split(" ")[0]}</span>
            </NavLink>
          ))}
          
          {user.role === "vendedor" && lockedItems.filter(item => item.path !== "/configuracoes").map((item) => (
            <div
              key={item.path}
              className="flex flex-col items-center gap-1 flex-1 py-1.5 transition-all text-gray-400 dark:text-gray-500 opacity-50 cursor-not-allowed"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px]" style={{ fontWeight: 700 }}>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}