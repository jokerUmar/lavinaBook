import { createContext, useState } from "react";

export const SidebarContext = createContext();

export default function SidebarProvider({ children }) {
  const [side, setSide] = useState(false);

  return (
    <SidebarContext.Provider value={{ side, setSide }}>
      {children}
    </SidebarContext.Provider>
  );
}
