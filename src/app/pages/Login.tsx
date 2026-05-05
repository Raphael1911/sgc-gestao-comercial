import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useApp, UserRole } from "../context/AppContext";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  ShoppingCart,
  Eye,
  EyeOff,
  BarChart3,
  Lock,
} from "lucide-react";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("gestor@sgc.com");
  const [password, setPassword] = useState("••••••••");
  const [role, setRole] = useState<UserRole>("gestor");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 700));
    const ok = login(email, password, role);
    setLoading(false);
    if (ok) {
      navigate(role === "gestor" ? "/dashboard" : "/pdv");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

return (
    <div className="min-h-screen flex relative bg-gradient-to-br from-[#1E3A5F] via-[#2D5282] to-[#2B6CB0] dark:from-gray-900 dark:via-slate-900 dark:to-black transition-colors duration-500">
      
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center items-start px-16 w-1/2 text-white">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl tracking-tight" style={{ fontWeight: 700 }}>SGC</span>
        </div>
        <h1 className="text-5xl text-white mb-4" style={{ fontWeight: 800, lineHeight: 1.1 }}>
          Gestão Comercial<br />para quem empreende
        </h1>
        {/* AQUI: text-blue-200 trocado para text-blue-100 */}
        <p className="text-blue-100 text-lg mb-12 opacity-90" style={{ maxWidth: 400 }}>
          Controle suas vendas, estoque e finanças em um único sistema simples e poderoso.
        </p>
        <div className="flex flex-col gap-5">
          {[
            { icon: BarChart3, title: "Relatórios em tempo real", desc: "Faturamento, ticket médio e Curva ABC" },
            { icon: ShoppingCart, title: "PDV ultrarrápido", desc: "Menos cliques, mais vendas" },
            { icon: Lock, title: "Controle de acesso", desc: "Perfis Gestor e Vendedor separados" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                <f.icon className="w-5 h-5 text-blue-100" />
              </div>
              <div>
                <p className="text-white text-sm" style={{ fontWeight: 600 }}>{f.title}</p>
                {/* AQUI: text-blue-300 trocado para text-blue-100 com opacidade para legibilidade perfeita */}
                <p className="text-blue-100 text-xs opacity-80">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-10 transition-colors relative">
          
          <div className="absolute top-6 right-6 z-10">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 mb-2 lg:hidden">
            <ShoppingCart className="w-6 h-6 text-blue-700 dark:text-blue-400" />
            <span className="text-xl text-blue-900 dark:text-white" style={{ fontWeight: 700 }}>SGC</span>
          </div>
          
          <h2 className="text-gray-900 dark:text-white mb-1" style={{ fontWeight: 700, fontSize: 26 }}>Bem-vindo de volta</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">Faça login para acessar o sistema</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1.5" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Perfil de Acesso
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["gestor", "vendedor"] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      setEmail(r === "gestor" ? "gestor@sgc.com" : "vendedor@sgc.com");
                    }}
                    className={`py-2.5 rounded-xl text-sm transition-all border-2 ${
                      role === r
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    {r === "gestor" ? " Gestor" : " Vendedor"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1.5" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-gray-600 dark:text-gray-300" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  style={{ fontWeight: 500 }}
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pr-12 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white text-sm transition-all disabled:opacity-70 mt-2"
              style={{ background: loading ? "#93C5FD" : "linear-gradient(135deg, #1E3A5F, #2B6CB0)", fontWeight: 600 }}
            >
              {loading ? "Entrando..." : "Entrar no Sistema"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}