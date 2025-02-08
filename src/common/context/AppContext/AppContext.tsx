import React, { createContext, useReducer, ReactNode } from "react";
import { AppContextType } from "./AppContextTypes";
import { initialState } from "./initialState";
import { combinedReducers } from "./combinedReducers";
import { linkBackend } from "../../../validation/url";

export const AppContext = createContext<AppContextType>(null as any);

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({
  children,
}: AppContextProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(combinedReducers, initialState);

  const apiUrl = linkBackend;

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
