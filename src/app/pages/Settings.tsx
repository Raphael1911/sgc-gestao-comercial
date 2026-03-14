import React, { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Store,
  Save,
  Shield,
  Users,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Settings() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState("perfil");
  const [name, setName] = useState(user?.name || "");
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    stockAlert: true,
    dailySummary: true,
    newSale: false,
    weeklyReport: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { key: "perfil", label: "Perfil", icon: User },
    { key: "empresa", label: "Empresa", icon: Store },
    { key: "notificacoes", label: "Notificações", icon: Bell },
    { key: "seguranca", label: "Segurança", icon: Lock },
    { key: "usuarios", label: "Usuários", icon: Users },
  ];

  const USERS_LIST = [
    { name: "Carlos Mendes", email: "gestor@sgc.com", role: "Gestor", status: "Ativo", avatar: "CM" },
    { name: "Ana Paula", email: "vendedor@sgc.com", role: "Vendedor", status: "Ativo", avatar: "AP" },
    { name: "Pedro Lima", email: "pedro@sgc.com", role: "Vendedor", status: "Inativo", avatar: "PL" },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900" style={{ fontWeight: 700, fontSize: 22 }}>Configurações</h1>
        <p className="text-gray-400 text-sm mt-0.5">Gerencie preferências do sistema</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-56 flex-shrink-0">
          <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm transition-all border-b border-gray-50 last:border-0 ${
                  activeTab === tab.key
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                style={{ fontWeight: activeTab === tab.key ? 700 : 500 }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.key && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "perfil" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-gray-800 mb-6" style={{ fontWeight: 700, fontSize: 16 }}>Dados do Perfil</h2>
              <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-50">
                <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-2xl" style={{ fontWeight: 700 }}>{user?.avatar}</span>
                </div>
                <div>
                  <p className="text-gray-800" style={{ fontWeight: 700 }}>{user?.name}</p>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                  <span className="inline-flex mt-2 px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-600" style={{ fontWeight: 600 }}>
                    {user?.role === "gestor" ? "Gestor" : "Vendedor"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Nome Completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>E-mail</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Telefone</label>
                  <input
                    type="text"
                    defaultValue="(11) 99999-0000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Cargo</label>
                  <input
                    type="text"
                    value={user?.role === "gestor" ? "Gestor Comercial" : "Vendedor"}
                    readOnly
                    className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-400"
                  />
                </div>
              </div>
              <button
                onClick={handleSave}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm transition-all hover:opacity-90"
                style={{ background: saved ? "#10B981" : "linear-gradient(135deg, #1E3A5F, #2B6CB0)", fontWeight: 600 }}
              >
                <Save className="w-4 h-4" />
                {saved ? "Salvo!" : "Salvar Alterações"}
              </button>
            </div>
          )}

          {activeTab === "notificacoes" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-gray-800 mb-6" style={{ fontWeight: 700, fontSize: 16 }}>Preferências de Notificação</h2>
              <div className="flex flex-col gap-4">
                {[
                  { key: "stockAlert", label: "Alertas de Estoque Baixo", desc: "Receba alertas quando produtos atingirem o nível mínimo" },
                  { key: "dailySummary", label: "Resumo Diário", desc: "Relatório com o resumo de vendas ao final do dia" },
                  { key: "newSale", label: "Nova Venda Realizada", desc: "Notificação em tempo real para cada venda" },
                  { key: "weeklyReport", label: "Relatório Semanal", desc: "Análise completa enviada toda segunda-feira" },
                ].map((n) => (
                  <div key={n.key} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50/50">
                    <div>
                      <p className="text-sm text-gray-800" style={{ fontWeight: 600 }}>{n.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                      className="transition-colors"
                    >
                      {notifications[n.key as keyof typeof notifications] ? (
                        <ToggleRight className="w-8 h-8 text-blue-600" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-gray-300" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "usuarios" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-50">
                <div>
                  <h2 className="text-gray-800" style={{ fontWeight: 700, fontSize: 16 }}>Usuários do Sistema</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Gerencie os acessos da equipe</p>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #1E3A5F, #2B6CB0)", fontWeight: 600 }}
                >
                  <Users className="w-4 h-4" />
                  Convidar
                </button>
              </div>
              <div className="flex flex-col divide-y divide-gray-50">
                {USERS_LIST.map((u) => (
                  <div key={u.email} className="flex items-center gap-4 px-6 py-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs" style={{ fontWeight: 700 }}>{u.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800" style={{ fontWeight: 600 }}>{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        background: u.role === "Gestor" ? "#EEF2FF" : "#F0FDF4",
                        color: u.role === "Gestor" ? "#4F46E5" : "#059669",
                        fontWeight: 600,
                      }}
                    >
                      {u.role}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        background: u.status === "Ativo" ? "#F0FDF4" : "#F9FAFB",
                        color: u.status === "Ativo" ? "#10B981" : "#9CA3AF",
                        fontWeight: 600,
                      }}
                    >
                      {u.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === "empresa" || activeTab === "seguranca") && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-gray-800 mb-6" style={{ fontWeight: 700, fontSize: 16 }}>
                {activeTab === "empresa" ? "Dados da Empresa" : "Segurança"}
              </h2>
              {activeTab === "empresa" ? (
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { label: "Nome Fantasia", value: "Mercearia Central" },
                    { label: "CNPJ", value: "12.345.678/0001-90" },
                    { label: "Endereço", value: "Rua das Flores, 123" },
                    { label: "Cidade / UF", value: "São Paulo / SP" },
                    { label: "Telefone", value: "(11) 3333-4444" },
                    { label: "E-mail Comercial", value: "contato@mercearia.com" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>{f.label}</label>
                      <input
                        type="text"
                        defaultValue={f.value}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-5 max-w-md">
                  {[
                    { label: "Senha Atual" },
                    { label: "Nova Senha" },
                    { label: "Confirmar Nova Senha" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>{f.label}</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handleSave}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm hover:opacity-90 transition-all"
                style={{ background: saved ? "#10B981" : "linear-gradient(135deg, #1E3A5F, #2B6CB0)", fontWeight: 600 }}
              >
                <Save className="w-4 h-4" />
                {saved ? "Salvo!" : "Salvar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
