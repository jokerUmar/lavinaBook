import { createContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export const AuthBoolContext = createContext();

export default function AuthBoolProvider({ children }) {
  const [authbool, setAuthbool] = useState(false);
  const location = useLocation(); // Use location where it's actually needed

  const contextValue = useMemo(
    () => ({
      authbool,
      setAuthbool,
    }),
    [authbool]
  );

  return (
    <AuthBoolContext.Provider value={contextValue}>
      {children}
    </AuthBoolContext.Provider>
  );
}
