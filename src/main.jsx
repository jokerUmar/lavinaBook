import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import BooleanProvider from "./context/booleanContext.jsx";
import SearchProvider from "./context/SearchContext.jsx";
import AddingShelfProvider from "./context/AddingShelfContext.jsx";
import { MantineProvider } from "@mantine/core";
import AuthBoolProvider from "./context/AuthBoolContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <BooleanProvider>
          <SearchProvider>
            <AddingShelfProvider>
              <AuthBoolProvider>
                <App />
              </AuthBoolProvider>
            </AddingShelfProvider>
          </SearchProvider>
        </BooleanProvider>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
