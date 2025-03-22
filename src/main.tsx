import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./css/index.css";
import router from "./router/router";
import CookieModal from "./view/cookies/modialCookie";
import { I18nextProvider } from "react-i18next";
import i18n from "./translate/i18n";
import { LanguageProvider } from "./translate/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <LanguageProvider> 
      <React.StrictMode>
        <div>
          <CookieModal />
          <RouterProvider router={router} />
        </div>
      </React.StrictMode>
    </LanguageProvider>
  </I18nextProvider>
);
