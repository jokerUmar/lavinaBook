import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import BooleanProvider from "./context/booleanContext.jsx";
import SidebarProvider from "./context/SidebarContext.jsx";
import SearchProvider from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BooleanProvider>
        <SidebarProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </SidebarProvider>
      </BooleanProvider>
    </BrowserRouter>
  </StrictMode>
);
