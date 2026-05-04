import React, { useState } from "react";
import { Navigate } from "react-router";
import { useApp } from "../context/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Package,
} from "lucide-react";

const DAILY_DATA = [
  { day: "Seg", vendas: 1200, meta: 1500 },
  { day: "Ter", vendas: 1850, meta: 1500 },
  { day: "Qua", vendas: 980, meta: 1500 },
  { day: "Qui", vendas: 2100, meta: 1500 },
  { day: "Sex", vendas: 2800, meta: 1500 },
  { day: "Sáb", vendas: 3200, meta: 1500 },
  { day: "Dom", vendas: 1400, meta: 1500 },
];

const ABC_DATA = [
  { name: "Coca-Cola 2L", valor: 4200, categoria: "A", pct: 28 },
  { name: "Água Mineral 500ml", valor: 3100, categoria: "A", pct: 21 },
  { name: "Suco Del Valle", valor: 2400, categoria: "A", pct: 16 },
  { name: "Biscoito Oreo", valor: 1600, categoria: "B", pct: 11 },
  { name: "Barra de Cereal", valor: 1100, categoria: "B", pct: 7 },
  { name: "Outros", valor: 2600, categoria: "C", pct: 17 },
];

const DONUT_DATA = [
  { name: "Curva A", value: 65, color: "#1E3A5F" },
  { name: "Curva B", value: 18, color: "#3B82F6" },
  { name: "Curva C", value: 17, color: "#93C5FD" },
];

const LOW_STOCK = [
  { name: "Coca-Cola 2L", qty: 4, min: 10 },
  { name: "Chips Lays 100g", qty: 2, min: 8 },
  { name: "Red Bull 250ml", qty: 1, min: 5 },
];

const RECENT_SALES = [
  { id: "#0234", client: "Balcão", value: 87.5, time: "14:32", method: "Cartão" },
  { id: "#0233", client: "João Silva", value: 45.0, time: "13:58", method: "PIX" },
  { id: "#0232", client: "Balcão", value: 120.9, time: "13:21", method: "Dinheiro" },
  { id: "#0231", client: "Maria Souza", value: 33.4, time: "12:47", method: "PIX" },
  { id: "#0230", client: "Balcão", value: 67.8, time: "11:55", method: "Cartão" },
];

const ABC_COLORS: Record<string, string> = {
  A: "#10B981",
  B: "#3B82F6",
  C: "#9CA3AF",
};

function KPICard({
  title,
  value,
  sub,
  icon: Icon,
  trend,
  trendValue,
  color,
}: {
  title: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  trend: "up" | "down";
  trendValue: string;
  color: string;
}) {
  return (
    // Aplicando padrão de fundo e borda
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: color + "18" }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div
          // Ajustando o fundo das badges de tendência no dark mode para não ficarem "brilhantes" demais
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
            trend === "up"
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400"
          }`}
          style={{ fontWeight: 600 }}
        >
          {trend === "up" ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {trendValue}
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-xs mb-1" style={{ fontWeight: 500 }}>
        {title}
      </p>
      {/* Texto principal ajustado para branco no dark */}
      <p className="text-gray-900 dark:text-white mb-1" style={{ fontWeight: 700, fontSize: 22 }}>
        {value}
      </p>
      <p className="text-gray-400 dark:text-gray-500" style={{ fontSize: 11 }}>{sub}</p>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useApp();
  const [period, setPeriod] = useState<"diario" | "semanal" | "mensal">("semanal");

  if (user?.role === "vendedor") {
    return <Navigate to="/pdv" replace />;
  }

  const kpis = [
    {
      title: "Faturamento Hoje",
      value: "R$ 2.847,50",
      sub: "vs. ontem R$ 2.412,00",
      icon: DollarSign,
      trend: "up" as const,
      trendValue: "+18%",
      color: "#10B981",
    },
    {
      title: "Faturamento Mensal",
      value: "R$ 48.320,00",
      sub: "Meta: R$ 55.000,00",
      icon: TrendingUp,
      trend: "up" as const,
      trendValue: "+12%",
      color: "#1E3A5F",
    },
    {
      title: "Ticket Médio",
      value: "R$ 67,40",
      sub: "Baseado em 42 vendas",
      icon: ShoppingBag,
      trend: "down" as const,
      trendValue: "-3%",
      color: "#3B82F6",
    },
    {
      title: "Clientes Atendidos",
      value: "42",
      sub: "Hoje | Meta: 50",
      icon: Users,
      trend: "up" as const,
      trendValue: "+8%",
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {/* Título da página */}
          <h1 className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: 22 }}>
            Dashboard
          </h1>
          <p className="text-gray-400 dark:text-gray-400 text-sm mt-0.5">Visão geral do negócio</p>
        </div>
        <div className="flex gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
          {(["diario", "semanal", "mensal"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-lg text-xs transition-all capitalize ${
                period === p
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              style={{ fontWeight: 600 }}
            >
              {p === "diario" ? "Diário" : p === "semanal" ? "Semanal" : "Mensal"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-gray-800 dark:text-white" style={{ fontWeight: 700 }}>Vendas por Dia</h3>
              <p className="text-gray-400 text-xs mt-0.5">Comparativo com meta diária</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm inline-block bg-[#1E3A5F] dark:bg-blue-400" />
                Realizado
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 inline-block bg-[#10B981]" />
                Meta
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DAILY_DATA} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.3} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v/1000).toFixed(1)}k`} />
              <Tooltip
                formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, ""]}
                contentStyle={{ borderRadius: 12, border: "none", fontSize: 12, backgroundColor: "#1F2937", color: "#F9FAFB" }}
              />
              {/* O azul escuro padrão fica quase invisível no dark, coloquei uma cor alternativa caso precise, mas o azul 1E3A5F costuma ficar bom. Mantive a original. */}
              <Bar dataKey="vendas" fill="#1E3A5F" radius={[6, 6, 0, 0]} />
              <Bar dataKey="meta" fill="#3B82F6" opacity={0.2} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="mb-5">
            <h3 className="text-gray-800 dark:text-white" style={{ fontWeight: 700 }}>Curva ABC</h3>
            <p className="text-gray-400 text-xs mt-0.5">Distribuição por volume</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={DONUT_DATA}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {DONUT_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => [`${v}%`, ""]}
                contentStyle={{ borderRadius: 10, border: "none", fontSize: 12, backgroundColor: "#1F2937", color: "#F9FAFB" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-2">
            {DONUT_DATA.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-gray-600 dark:text-gray-300">{d.name}</span>
                </div>
                <span className="text-xs text-gray-800 dark:text-white" style={{ fontWeight: 700 }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ABC Table */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-50 dark:border-gray-700/50">
            <div>
              <h3 className="text-gray-800 dark:text-white" style={{ fontWeight: 700 }}>Produtos Mais Vendidos</h3>
              <p className="text-gray-400 text-xs mt-0.5">Ranking por faturamento — Curva ABC</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50">
                  <th className="text-left px-5 py-3 text-xs text-gray-400" style={{ fontWeight: 600 }}>#</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-400" style={{ fontWeight: 600 }}>Produto</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-400" style={{ fontWeight: 600 }}>Curva</th>
                  <th className="text-right px-5 py-3 text-xs text-gray-400" style={{ fontWeight: 600 }}>Faturamento</th>
                  <th className="text-right px-5 py-3 text-xs text-gray-400" style={{ fontWeight: 600 }}>% Total</th>
                </tr>
              </thead>
              <tbody>
                {ABC_DATA.map((item, i) => (
                  <tr key={item.name} className="border-t border-gray-50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-5 py-3 text-xs text-gray-400 dark:text-gray-500" style={{ fontWeight: 600 }}>{i + 1}</td>
                    <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200" style={{ fontWeight: 500 }}>{item.name}</td>
                    <td className="px-5 py-3">
                      <span
                        className="inline-flex px-2 py-0.5 rounded-full text-xs"
                        style={{
                          background: ABC_COLORS[item.categoria] + "18",
                          color: ABC_COLORS[item.categoria],
                          fontWeight: 700,
                        }}
                      >
                        {item.categoria}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-right text-gray-800 dark:text-white" style={{ fontWeight: 600 }}>
                      R$ {item.valor.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${item.pct}%`, background: ABC_COLORS[item.categoria] }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400" style={{ fontWeight: 600 }}>{item.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts + Recent */}
        <div className="flex flex-col gap-4">
          {/* Low stock alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-red-50 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/20">
              <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-400 text-sm" style={{ fontWeight: 700 }}>Alertas de Estoque</span>
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full" style={{ fontWeight: 700 }}>
                {LOW_STOCK.length}
              </span>
            </div>
            <div className="flex flex-col">
              {LOW_STOCK.map((item) => (
                <div key={item.name} className="flex items-center justify-between px-4 py-3 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-red-400 dark:text-red-500" />
                    <div>
                      <p className="text-xs text-gray-700 dark:text-gray-200" style={{ fontWeight: 600 }}>{item.name}</p>
                      <p className="text-red-500 dark:text-red-400" style={{ fontSize: 10 }}>Mín: {item.min} un.</p>
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    style={{ fontWeight: 700 }}
                  >
                    {item.qty} un.
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent sales */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-700/50">
              <span className="text-gray-800 dark:text-white text-sm" style={{ fontWeight: 700 }}>Últimas Vendas</span>
            </div>
            <div className="flex flex-col">
              {RECENT_SALES.slice(0, 4).map((sale) => (
                <div key={sale.id} className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                  <div>
                    <p className="text-xs text-gray-700 dark:text-gray-200" style={{ fontWeight: 600 }}>{sale.id}</p>
                    <p className="text-gray-400 dark:text-gray-500" style={{ fontSize: 10 }}>{sale.time} · {sale.method}</p>
                  </div>
                  <span className="text-sm text-emerald-600 dark:text-emerald-400" style={{ fontWeight: 700 }}>
                    R$ {sale.value.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}