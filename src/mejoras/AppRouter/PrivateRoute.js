import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../stateManagement/AppContext";
import { AuthContext } from "../stateManagement/AuthContext";
import { actionTypes_User } from "../stateManagement/actionTypes";
import { PATH } from "../routes/routesPaths";
import Spinner from "../common/components/Spinner/Spinner";
import { getCookie, setCookie } from "../common/utils/contextUtils";

export const PrivateRoute = ({ element }) => {
  const { setAppData } = useContext(AppContext);
  const { refreshAccessToken, validateToken, logout, checkMaintenanceStatus } =
    useContext(AuthContext);
  const [isValid, setIsValid] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const accessTokenCookie = getCookie("accessToken");

      if (accessTokenCookie) {
        const valid = await validateToken();
        if (!valid) {
          logout();
        } else {
          const mantenimiento = await checkMaintenanceStatus();
          if (mantenimiento === "off") {
            setIsValid(true);
            refreshAccessToken();
            // setInterval(() => {
            //   const mantenimiento = checkMaintenanceStatus();
            // }, 2 * 60 * 1000);
          } else {
            navigate(PATH.MAINTENANCE);
          }
        }
      } else {
        logout();
      }
    };

    setIsValid(null);
    checkToken();

    const timer = setTimeout(() => {
      setAppData({
        type: actionTypes_User.SET_EXPIRED_SESION_MODAL,
        payload: true,
      });
      setCookie("expiracion", "expiracion", 1);
      logout();
    }, 35 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isValid === null) {
    return <Spinner />;
  }

  return isValid ? element : null;
};
