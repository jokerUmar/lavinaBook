import { createContext, useState } from "react";

export const AddingShelfContext = createContext();

export default function AddingShelfProvider({ children }) {
  const [adding, setAdding] = useState([]);

  return (
    <AddingShelfContext.Provider value={{ adding, setAdding }}>
      {children}
    </AddingShelfContext.Provider>
  );
}
