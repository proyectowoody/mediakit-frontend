import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./css/index.css";
import router from "./router/router";
import { AppContextProvider } from "./common/context/AppContext/AppContext.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
    <AppContextProvider>
      <RouterProvider router={router} />
      </AppContextProvider>
    </div>
  </React.StrictMode>
);
