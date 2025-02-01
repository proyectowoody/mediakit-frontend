import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { appInitialState } from "./initialState";
import appContextReducer from "./AppContextReducer";

export const AppContext = React.createContext();

export function AppContextProvider({ children }) {
  const [appData, setAppData] = useReducer(appContextReducer, appInitialState);
  const value = React.useMemo(() => ({ appData, setAppData }), [appData]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
