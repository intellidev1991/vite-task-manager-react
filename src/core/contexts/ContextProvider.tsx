import React, { useState, useMemo, createContext, useContext } from "react";

interface INotify {
  id: string;
  title: string;
}
interface IAppContext {
  notify: INotify[];
  setNotify: (item: INotify[]) => void;
}

const defaultState: IAppContext = {
  notify: [],
  setNotify: () => {},
};

const AppContext = createContext<IAppContext>(defaultState);

interface IContextProviderProps {}

const ContextProvider: React.FC<IContextProviderProps> = ({ children }) => {
  const [notify, setNotify] = useState<INotify[]>([]);

  const value = useMemo(
    () => ({
      notify,
      setNotify,
    }),
    [notify],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { ContextProvider, AppContext };
