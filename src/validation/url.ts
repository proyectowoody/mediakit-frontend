
const isProduction = import.meta.env.VITE_NODE_ENV === "production"
// const isProduction = import.meta.env.VITE_NODE_ENV === "development"

export const linkBackend = isProduction
  ? import.meta.env.VITE_BACKEND_URL_PROD
  : import.meta.env.VITE_BACKEND_URL;

export const linkFrontend = isProduction
  ? import.meta.env.VITE_FRONTEND_URL_PROD
  : import.meta.env.VITE_FRONTEND_URL;

  export const linkCAP = isProduction
  ? import.meta.env.VITE_CAP_PROD
  : import.meta.env.VITE_CAP;

  

  