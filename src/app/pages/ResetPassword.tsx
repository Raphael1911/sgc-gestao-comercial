import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ShoppingCart, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";

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

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 text-center">
          <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-gray-900 mb-2" style={{ fontWeight: 700, fontSize: 26 }}>Link Inválido</h2>
          <p className="text-gray-500 text-sm mb-6">O link de redefinição é inválido ou expirou.</p>
          <button
            onClick={() => navigate("/forgot-password")}
            className="w-full py-3.5 rounded-xl text-white text-sm transition-all"
            style={{ background: "linear-gradient(135deg, #1E3A5F, #2B6CB0)", fontWeight: 600 }}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #2D5282 60%, #2B6CB0 100%)" }}>
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
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Login
          </button>
          <div className="flex items-center gap-2 mb-2 lg:hidden">
            <ShoppingCart className="w-6 h-6 text-blue-700" />
            <span className="text-xl text-blue-900" style={{ fontWeight: 700 }}>SGC</span>
          </div>
          <h2 className="text-gray-900 mb-1" style={{ fontWeight: 700, fontSize: 26 }}>Nova Senha</h2>
          <p className="text-gray-500 text-sm mb-8">Digite sua nova senha abaixo.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Nova Senha
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white text-sm transition-all disabled:opacity-70 flex items-center justify-center gap-2"
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