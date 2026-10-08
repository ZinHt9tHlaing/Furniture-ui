import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "./components/ui/sonner";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import 'react-image-crop/dist/ReactCrop.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ReactQueryProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster position="top-right" richColors duration={1500} />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ReactQueryProvider>
    </HelmetProvider>
  </StrictMode>
);
