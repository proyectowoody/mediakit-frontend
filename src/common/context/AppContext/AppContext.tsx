import React, { createContext, useReducer, ReactNode } from "react";
import { AppContextType } from "./AppContextTypes";
import { initialState } from "./initialState";
import { combinedReducers } from "./combinedReducers";

export const AppContext = createContext<AppContextType>(null as any);

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({
  children,
}: AppContextProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(combinedReducers, initialState);

  const isProduction = import.meta.env.VITE_NODE_ENV === "development";

  const apiUrl = isProduction
    ? import.meta.env.VITE_BACKEND_URL_PROD
    : import.meta.env.VITE_BACKEND_URL;

  const value = React.useMemo(
    () => ({
      state,
      dispatch,
      apiUrl,
    }),
    [state, dispatch, apiUrl]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
