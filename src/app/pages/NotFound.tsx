import React from "react";
import { Link } from "react-router";
import { Home, AlertCircle } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

export default function NotFound() {
  return (
    // Adicionado min-h-screen e bg-gray adaptável ao tema
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 gap-4 text-gray-400 dark:text-gray-500 transition-colors duration-300 relative">
      
      {/* Botão de tema no topo para manter a consistência */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <AlertCircle className="w-12 h-12" />
      <h2 className="text-gray-700 dark:text-gray-300" style={{ fontWeight: 700, fontSize: 20 }}>Página não encontrada</h2>
      <Link
        to="/dashboard"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm hover:opacity-90 transition-opacity"
        style={{ background: "linear-gradient(135deg, #1E3A5F, #2B6CB0)", fontWeight: 600 }}
      >
        <Home className="w-4 h-4" />
        Voltar ao início
      </Link>
    </div>
  );
}