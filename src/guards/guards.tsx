import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const AuthGuard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    const userSession = localStorage.getItem("USER_SESSION");
    if (!userSession) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userSession);
    setUser(user);
  }, [navigate]);

  useEffect(() => {
    if (user && !isRedirected) {
      const redirectRoutes = {
        "client": "/home",
        "admin": "/home",
      };

      const { role, verificado } = user;
      if (role && !verificado && redirectRoutes[role]) {
        setIsRedirected(true);
        navigate(redirectRoutes[role]);
      } 
    }
  }, [user, isRedirected, navigate]);

  return <></>;
};

export default AuthGuard;