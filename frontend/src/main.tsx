import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { ThemeProvider } from "./app/context/ThemeProvider.tsx";
import { A11yProvider } from "./app/context/A11yProvider.tsx"; 

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <A11yProvider> 
      <App />
    </A11yProvider>
  </ThemeProvider>
);