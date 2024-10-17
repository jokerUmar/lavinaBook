import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import BooleanProvider from "./context/booleanContext.jsx";
import SidebarProvider from "./context/SidebarContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BooleanProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </BooleanProvider>
    </BrowserRouter>
  </StrictMode>
);
