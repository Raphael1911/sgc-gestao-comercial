import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { ThemeProvider } from "./app/context/ThemeProvider"; 

createRoot(document.getElementById("root")!).render(
  <ThemeProvider> 
    <App /> 
  </ThemeProvider>
); 