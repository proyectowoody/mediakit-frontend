import React, { createContext, useReducer, ReactNode } from "react";
import { AppContextType } from "./AppContextTypes";
import { initialState } from "./initialState";
import { combinedReducers } from "./combinedReducers";

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(combinedReducers, initialState);

  const apiUrl =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_LOCAL;

  const value = React.useMemo(
    () => ({
      state,
      dispatch,
      apiUrl,
    }),
    [state, dispatch, apiUrl]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
