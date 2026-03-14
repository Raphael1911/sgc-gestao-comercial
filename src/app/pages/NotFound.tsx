import React from "react";
import { Link } from "react-router";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
      <AlertCircle className="w-12 h-12" />
      <h2 className="text-gray-700" style={{ fontWeight: 700, fontSize: 20 }}>Página não encontrada</h2>
      <Link
        to="/dashboard"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm"
        style={{ background: "#1E3A5F", fontWeight: 600 }}
      >
        <Home className="w-4 h-4" />
        Voltar ao início
      </Link>
    </div>
  );
}
