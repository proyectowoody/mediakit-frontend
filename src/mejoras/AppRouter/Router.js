import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routesElements";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.isPrivate ? (
              <PrivateRoute element={route.element} />
            ) : (
              route.element
            )
          }
        />
      ))}
    </Routes>
  );
};
