import React, { useState } from "react";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Package,
} from "lucide-react";

// ... (constantes MONTHLY_DATA, TOP_CATEGORIES, DAILY_TREND mantidas iguais)
const MONTHLY_DATA = [
  { month: "Jan", receita: 32000, despesas: 18000, lucro: 14000 },
  { month: "Fev", receita: 28500, despesas: 16000, lucro: 12500 },
  { month: "Mar", receita: 35200, despesas: 19500, lucro: 15700 },
  { month: "Abr", receita: 41000, despesas: 22000, lucro: 19000 },
  { month: "Mai", receita: 38700, despesas: 20500, lucro: 18200 },
  { month: "Jun", receita: 44500, despesas: 23000, lucro: 21500 },
  { month: "Jul", receita: 48320, despesas: 25000, lucro: 23320 },
];

const TOP_CATEGORIES = [
  { name: "Bebidas", vendas: 4200, pct: 38 },
  { name: "Snacks", vendas: 2800, pct: 25 },
  { name: "Energéticos", vendas: 1900, pct: 17 },
  { name: "Higiene", vendas: 1400, pct: 13 },
  { name: "Farmácia", vendas: 800, pct: 7 },
];

const DAILY_TREND = [
  { day: "1", vendas: 980 }, { day: "5", vendas: 1200 }, { day: "10", vendas: 1800 },
  { day: "15", vendas: 2200 }, { day: "20", vendas: 1900 }, { day: "25", vendas: 2800 },
  { day: "30", vendas: 3100 },
];

export default function Reports() {
  const [period, setPeriod] = useState("mensal");

  // Inteligência de Cores
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const chartColors = {
    receita: isDark ? "#60A5FA" : "#1E3A5F",
    despesas: isDark ? "#F87171" : "#EF4444",
    lucro: isDark ? "#34D399" : "#10B981",
    grid: isDark ? "#374151" : "#F3F4F6",
    text: isDark ? "#9CA3AF" : "#6B7280",
    tooltipBg: isDark ? "#1F2937" : "#FFFFFF",
    tooltipBorder: isDark ? "#374151" : "#E5E7EB",
    tooltipText: isDark ? "#F9FAFB" : "#111827",
    hoverCursor: isDark ? "#374151" : "#F8FAFC",
  };

  const PAYMENT_METHODS = [
    { name: "PIX", value: 42, color: chartColors.receita },
    { name: "Cartão Crédito", value: 28, color: "#3B82F6" },
    { name: "Cartão Débito", value: 18, color: "#93C5FD" },
    { name: "Dinheiro", value: 12, color: "#D1D5DB" },
  ];

  return (
    <div className="p-4 md:p-6 flex flex-col gap-6">
      
      {/* Header Responsivo (flex-col no celular) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: 22 }}>
            Relatórios
          </h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">Análise financeira e de desempenho</p>
        </div>
        <div className="flex flex-row items-center justify-between w-full sm:w-auto gap-3">
          <div className="flex flex-1 sm:flex-none justify-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1 transition-colors">
            {["semanal", "mensal", "anual"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs transition-all capitalize ${
                  period === p 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
                style={{ fontWeight: 600 }}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          {/* Botão exportar que encolhe de forma inteligente em telas pequenas */}
          <button
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ fontWeight: 600 }}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Receita Total", value: "R$ 48.320", trend: "+12%", icon: DollarSign, color: "#10B981" },
          { label: "Lucro Bruto", value: "R$ 23.320", trend: "+8%", icon: TrendingUp, color: chartColors.receita },
          { label: "Ticket Médio", value: "R$ 67,40", trend: "-3%", icon: ShoppingBag, color: "#3B82F6" },
          { label: "Produtos", value: "716 un.", trend: "+15%", icon: Package, color: "#8B5CF6" },
        ].map((k) => (
          <div key={k.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-colors" style={{ background: k.color + "18" }}>
                <k.icon className="w-4 h-4 transition-colors" style={{ color: k.color }} />
              </div>
              <span
                className={`text-[10px] sm:text-xs flex items-center gap-0.5 px-2 py-1 rounded-full ${
                  k.trend.startsWith("+") 
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" 
                    : "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400"
                }`}
                style={{ fontWeight: 600 }}
              >
                {k.trend.startsWith("+") ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {k.trend}
              </span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-[11px] sm:text-xs mb-1" style={{ fontWeight: 500 }}>{k.label}</p>
            <p className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: 18 }}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-gray-800 dark:text-white text-sm sm:text-base" style={{ fontWeight: 700 }}>Receita × Despesas × Lucro</h3>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">Evolução mensal 2025</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {[
                { label: "Receita", color: chartColors.receita },
                { label: "Despesas", color: chartColors.despesas },
                { label: "Lucro", color: chartColors.lucro },
              ].map((l) => (
                <span key={l.label} className="flex items-center gap-1.5 text-gray-400 dark:text-gray-400">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block transition-colors" style={{ background: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <div className="-ml-4 sm:ml-0">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={MONTHLY_DATA} barSize={12} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: chartColors.text }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: chartColors.text }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} width={50} />
                <Tooltip
                  cursor={{ fill: chartColors.hoverCursor }}
                  formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, ""]}
                  contentStyle={{ borderRadius: 12, border: `1px solid ${chartColors.tooltipBorder}`, fontSize: 12, backgroundColor: chartColors.tooltipBg, color: chartColors.tooltipText }}
                  itemStyle={{ color: chartColors.tooltipText }}
                />
                <Bar dataKey="receita" fill={chartColors.receita} radius={[4, 4, 0, 0]} />
                <Bar dataKey="despesas" fill={chartColors.despesas} radius={[4, 4, 0, 0]} />
                <Bar dataKey="lucro" fill={chartColors.lucro} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
          <h3 className="text-gray-800 dark:text-white mb-1" style={{ fontWeight: 700 }}>Formas de Pagamento</h3>
          <p className="text-gray-400 dark:text-gray-500 text-xs mb-5">Distribuição no período</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie
                data={PAYMENT_METHODS}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {PAYMENT_METHODS.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, ""]} contentStyle={{ borderRadius: 10, border: `1px solid ${chartColors.tooltipBorder}`, fontSize: 12, backgroundColor: chartColors.tooltipBg, color: chartColors.tooltipText }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-4">
            {PAYMENT_METHODS.map((m) => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors" style={{ background: m.color }} />
                  <span className="text-xs text-gray-600 dark:text-gray-300">{m.name}</span>
                </div>
                <span className="text-xs text-gray-800 dark:text-white" style={{ fontWeight: 700 }}>{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors overflow-hidden">
          <h3 className="text-gray-800 dark:text-white mb-1" style={{ fontWeight: 700 }}>Tendência Diária de Vendas</h3>
          <p className="text-gray-400 dark:text-gray-500 text-xs mb-5">Julho 2025</p>
          <div className="-ml-4 sm:ml-0">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={DAILY_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: chartColors.text }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: chartColors.text }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v/1000).toFixed(1)}k`} width={50} />
                <Tooltip
                  cursor={{ stroke: chartColors.grid, strokeWidth: 2 }}
                  formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, "Vendas"]}
                  contentStyle={{ borderRadius: 12, border: `1px solid ${chartColors.tooltipBorder}`, fontSize: 12, backgroundColor: chartColors.tooltipBg, color: chartColors.tooltipText }}
                  itemStyle={{ color: chartColors.tooltipText }}
                />
                <Line type="monotone" dataKey="vendas" stroke={chartColors.receita} strokeWidth={3} dot={{ r: 4, fill: chartColors.receita, strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
          <h3 className="text-gray-800 dark:text-white mb-1" style={{ fontWeight: 700 }}>Ranking por Categoria</h3>
          <p className="text-gray-400 dark:text-gray-500 text-xs mb-5">Faturamento por linha de produto</p>
          <div className="flex flex-col gap-4 mt-2">
            {TOP_CATEGORIES.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-colors"
                  style={{ background: chartColors.receita, fontSize: 9, fontWeight: 700 }}
                >
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-700 dark:text-gray-200" style={{ fontWeight: 600 }}>{cat.name}</span>
                    <span className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400" style={{ fontWeight: 600 }}>
                      R$ {cat.vendas.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${cat.pct}%`,
                        background: `linear-gradient(90deg, ${chartColors.receita}, #3B82F6)`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 w-7 text-right" style={{ fontWeight: 600 }}>
                  {cat.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}