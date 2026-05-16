import React, { createContext, useContext, useState, useEffect } from "react";

type A11yContextType = {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  dyslexicFont: boolean;
  toggleDyslexicFont: () => void;
  spacing: boolean;
  toggleSpacing: () => void;
};

const A11yContext = createContext<A11yContextType | undefined>(undefined);

export function A11yProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("sgc-font-size");
    return saved ? parseFloat(saved) : 100;
  });

  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [spacing, setSpacing] = useState(false);

  useEffect(() => {
    // 1. Tamanho da Fonte
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem("sgc-font-size", fontSize.toString());

    // 2. Fonte para Dislexia (Usa Comic Sans como fallback padrão universal)
    if (dyslexicFont) {
      document.body.style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive, sans-serif';
    } else {
      document.body.style.fontFamily = ''; 
    }

    // 3. Alto Contraste (Tons de cinza e aumento de contraste nativo do Tailwind)
    if (highContrast) {
      document.documentElement.classList.add("grayscale", "contrast-125");
    } else {
      document.documentElement.classList.remove("grayscale", "contrast-125");
    }

    // 4. Espaçamento de Leitura
    if (spacing) {
      document.body.style.letterSpacing = "0.08em";
      document.body.style.wordSpacing = "0.15em";
      document.body.style.lineHeight = "1.8";
    } else {
      document.body.style.letterSpacing = "";
      document.body.style.wordSpacing = "";
      document.body.style.lineHeight = "";
    }

  }, [fontSize, dyslexicFont, highContrast, spacing]);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 10, 130));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 10, 90));
  const resetFontSize = () => setFontSize(100);
  const toggleHighContrast = () => setHighContrast(!highContrast);
  const toggleDyslexicFont = () => setDyslexicFont(!dyslexicFont);
  const toggleSpacing = () => setSpacing(!spacing);

  return (
    <A11yContext.Provider value={{ 
      fontSize, increaseFontSize, decreaseFontSize, resetFontSize,
      highContrast, toggleHighContrast,
      dyslexicFont, toggleDyslexicFont,
      spacing, toggleSpacing
    }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const context = useContext(A11yContext);
  if (context === undefined) {
    throw new Error("useA11y deve ser usado dentro de um A11yProvider");
  }
  return context;
}