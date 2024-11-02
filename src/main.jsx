import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import BooleanProvider from "./context/booleanContext.jsx";
import SidebarProvider from "./context/SidebarContext.jsx";
import SearchProvider from "./context/SearchContext.jsx";
import AddingShelfProvider from "./context/AddingShelfContext.jsx";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <BooleanProvider>
          <SidebarProvider>
            <SearchProvider>
              <AddingShelfProvider>
                <App />
              </AddingShelfProvider>
            </SearchProvider>
          </SidebarProvider>
        </BooleanProvider>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
