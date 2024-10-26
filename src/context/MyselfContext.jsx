import { createContext, useState } from "react";

export const MyselfContext = createContext();

export default function BooleanProvider({ children }) {
  const [bool, setBool] = useState(false);

  return (
    <MyselfContext.Provider value={{ bool, setBool }}>
      {children}
    </MyselfContext.Provider>
  );
}
