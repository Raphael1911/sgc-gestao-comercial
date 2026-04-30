import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingCart, Mail, ArrowLeft } from "lucide-react";

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

    // Simulação de envio (substitua por chamada real ao backend)
    await new Promise((r) => setTimeout(r, 1000)); // Mock delay

    // Aqui você chamaria o backend para gerar token e enviar email
    // Exemplo: await fetch('/api/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
    // Se sucesso, setMessage("Email enviado! Verifique sua caixa de entrada.");
    // Se erro, setError("Erro ao enviar email. Tente novamente.");

    // Mock: Sempre "sucesso" para demonstração
    const mockToken = "abc123"; // Em produção, gere um token real
    const resetLink = `http://localhost:5173/reset-password?token=${mockToken}`;
    console.log("Link de redefinição (mock):", resetLink); // Para copiar e testar
    setMessage(`Email enviado! Link mock: ${resetLink} (verifique console para copiar).`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #2D5282 60%, #2B6CB0 100%)" }}>
      {/* Left panel - Mesmo do Login */}
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
          <h2 className="text-gray-900 mb-1" style={{ fontWeight: 700, fontSize: 26 }}>Esqueceu a senha?</h2>
          <p className="text-gray-500 text-sm mb-8">Digite seu email para receber instruções.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="seu@email.com"
                required
              />
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
              <Mail className="w-4 h-4" />
              {loading ? "Enviando..." : "Enviar Email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}