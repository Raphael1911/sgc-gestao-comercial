import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ShoppingCart, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Token inválido ou expirado.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    // Simulação de redefinição (substitua por chamada real ao backend)
    await new Promise((r) => setTimeout(r, 1000)); // Mock delay

    // Aqui você chamaria o backend: await fetch('/api/reset-password', { method: 'POST', body: JSON.stringify({ token, password }) });
    // Se sucesso, setMessage("Senha redefinida com sucesso!"); navigate("/");
    // Se erro, setError("Erro ao redefinir senha.");

    // Mock: Sempre "sucesso"
    setMessage("Senha redefinida com sucesso!");
    setTimeout(() => navigate("/"), 2000);
    setLoading(false);
  };

  // TELA DE ERRO (Token Inválido)
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-10 text-center relative transition-colors">
          <div className="absolute top-6 right-6 z-10">
            <ThemeToggle />
          </div>
          <Lock className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h2 className="text-gray-900 dark:text-white mb-2" style={{ fontWeight: 700, fontSize: 26 }}>Link Inválido</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">O link de redefinição é inválido ou expirou.</p>
          <button
            onClick={() => navigate("/forgot-password")}
            className="w-full py-3.5 rounded-xl text-white text-sm transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #1E3A5F, #2B6CB0)", fontWeight: 600 }}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // TELA PRINCIPAL (Redefinir Senha)
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
          Redefina sua senha<br />agora
        </h1>
        <p className="text-blue-200 text-lg mb-12" style={{ maxWidth: 400 }}>
          Crie uma nova senha forte para proteger sua conta.
        </p>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-10 relative transition-colors">
          
          <div className="absolute top-6 right-6 z-10">
            <ThemeToggle />
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Login
          </button>
          <div className="flex items-center gap-2 mb-2 lg:hidden">
            <ShoppingCart className="w-6 h-6 text-blue-700 dark:text-blue-400" />
            <span className="text-xl text-blue-900 dark:text-white" style={{ fontWeight: 700 }}>SGC</span>
          </div>
          <h2 className="text-gray-900 dark:text-white mb-1 transition-colors" style={{ fontWeight: 700, fontSize: 26 }}>Nova Senha</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 transition-colors">Digite sua nova senha abaixo.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 transition-colors" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Nova Senha
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pr-12 text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 transition-colors" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pr-12 text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl transition-colors">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 dark:bg-emerald-900/30 border border-green-200 dark:border-emerald-800 text-green-600 dark:text-emerald-400 text-sm px-4 py-3 rounded-xl transition-colors">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white text-sm transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
              style={{ background: loading ? "#93C5FD" : "linear-gradient(135deg, #1E3A5F, #2B6CB0)", fontWeight: 600 }}
            >
              <Lock className="w-4 h-4" />
              {loading ? "Redefinindo..." : "Redefinir Senha"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}