import { createContext, useEffect, useMemo, useState } from "react";

export const AuthBoolContext = createContext();

export default function AuthBoolProvider({ children }) {
  const [authbool, setAuthbool] = useState(false);

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
