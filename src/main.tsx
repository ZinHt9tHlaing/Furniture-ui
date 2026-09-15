import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="top-right" richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
