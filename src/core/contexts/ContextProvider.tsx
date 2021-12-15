import React, { useState, useMemo, createContext } from "react";

const AppContext = createContext({});

interface IContextProviderProps {}

const ContextProvider: React.FC<IContextProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const value = useMemo(
    () => ({
      authUser,
      setAuthUser,
    }),
    [authUser],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { ContextProvider };
