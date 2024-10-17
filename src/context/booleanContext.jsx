import { createContext, useState } from "react";

export const BooleanContext = createContext();

export default function BooleanProvider({ children }) {
  const [bool, setBool] = useState(false);

  return (
    <BooleanContext.Provider value={{ bool, setBool }}>
      {children}
    </BooleanContext.Provider>
  );
}
