import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingCart, Mail, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // Simulação de envio
    await new Promise((r) => setTimeout(r, 1000)); 

    const mockToken = "abc123";
    console.log("Link de redefinição (mock):", `http://localhost:5173/reset-password?token=${mockToken}`); 
    
    // Mensagem limpa e profissional
    setMessage("Email enviado com sucesso! Verifique sua caixa de entrada.");
    setLoading(false);
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
          Redefina sua senha<br />com segurança
        </h1>
        <p className="text-blue-200 text-lg mb-12" style={{ maxWidth: 400 }}>
          Digite seu email e enviaremos um link para redefinir sua senha.
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
          <h2 className="text-gray-900 dark:text-white mb-1 transition-colors" style={{ fontWeight: 700, fontSize: 26 }}>Esqueceu a senha?</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 transition-colors">Digite seu email para receber instruções.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 transition-colors" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="seu@email.com"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl transition-colors">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 dark:bg-emerald-900/30 border border-green-200 dark:border-emerald-800 text-green-600 dark:text-emerald-400 text-sm px-4 py-3 rounded-xl transition-colors flex flex-col gap-2">
                <p style={{ fontWeight: 600 }}>{message}</p>
                {/* Botão sutil para a demonstração */}
                <button
                  type="button"
                  onClick={() => navigate("/reset-password?token=abc123")}
                  className="text-left text-emerald-700 dark:text-emerald-300 underline hover:opacity-80 transition-opacity"
                  style={{ fontSize: 12, fontWeight: 700 }}
                >
                  [Modo Demo] Acessar link de redefinição
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white text-sm transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
              style={{ background: loading ? "#93C5FD" : "linear-gradient(135deg, #1E3A5F, #2B6CB0)", fontWeight: 600 }}
            >
              <Mail className="w-4 h-4" />
              {loading ? "Enviando..." : "Enviar Email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}