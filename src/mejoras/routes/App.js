import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "./stateManagement/AppContext";
import { AppRouter } from "./routes/Router";

function App() {
  return (
    <Router>
      <AppContextProvider>
        <Suspense fallback={<></>}>
          <AppRouter />
        </Suspense>
      </AppContextProvider>
    </Router>
  );
}

export default App;
