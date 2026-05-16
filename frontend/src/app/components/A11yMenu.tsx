import React, { useState, useRef, useEffect } from "react";
import { Type, Plus, Minus, RotateCcw, Eye, BookOpen, Space } from "lucide-react";
import { useA11y } from "../context/A11yProvider";
import { Button } from "./ui/button";

export function A11yMenu() {
  const { 
    fontSize, increaseFontSize, decreaseFontSize, resetFontSize,
    highContrast, toggleHighContrast,
    dyslexicFont, toggleDyslexicFont,
    spacing, toggleSpacing
  } = useA11y();
  
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Componente de Interruptor (Toggle) customizado para não depender de libs externas
  const ToggleRow = ({ icon: Icon, label, isActive, onClick }: any) => (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
        <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <span>{label}</span>
      </div>
      <button 
        type="button"
        onClick={onClick}
        className={`w-10 h-5 rounded-full relative transition-colors duration-300 focus:outline-none ${isActive ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform duration-300 shadow-sm ${isActive ? 'left-5' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="relative" ref={menuRef}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        title="Acessibilidade"
      >
        <Type className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </Button>
      
      {isOpen && (
        <div className="absolute top-11 right-0 w-72 p-5 z-[100] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 backdrop-blur-sm">
          <div className="mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">Opções de Acessibilidade</h4>
          </div>
          
          <div className="space-y-5">
            {/* Bloco 1: Fonte */}
            <div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2 font-bold uppercase tracking-widest">Tamanho do Texto ({fontSize}%)</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" type="button" onClick={decreaseFontSize} disabled={fontSize <= 90} className="rounded-lg h-9 w-9 border-gray-200 dark:border-gray-700">
                  <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </Button>
                <Button variant="outline" size="icon" type="button" onClick={resetFontSize} title="Restaurar padrão" className="rounded-lg h-9 w-9 border-gray-200 dark:border-gray-700">
                  <RotateCcw className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </Button>
                <Button variant="outline" size="icon" type="button" onClick={increaseFontSize} disabled={fontSize >= 130} className="rounded-lg h-9 w-9 border-gray-200 dark:border-gray-700">
                  <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </Button>
              </div>
            </div>
            
            {/* Bloco 2: Alternadores Rápidos */}
            <div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-3 font-bold uppercase tracking-widest">Ajustes Visuais</p>
              <div className="flex flex-col gap-3">
                <ToggleRow 
                  icon={Eye} 
                  label="Alto Contraste (Cores)" 
                  isActive={highContrast} 
                  onClick={toggleHighContrast} 
                />
                <ToggleRow 
                  icon={BookOpen} 
                  label="Fonte para Dislexia" 
                  isActive={dyslexicFont} 
                  onClick={toggleDyslexicFont} 
                />
                <ToggleRow 
                  icon={Space} 
                  label="Aumentar Espaçamento" 
                  isActive={spacing} 
                  onClick={toggleSpacing} 
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}