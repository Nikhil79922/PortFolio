import React from "react";
import ReactDOM from "react-dom/client";
// Self-hosted fonts: no requests to Google Fonts (privacy + strict CSP).
import "@fontsource-variable/inter/wght.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
