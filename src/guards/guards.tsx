import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface User {
  email: string;
  user: "client" | "admin"; 
}

export const AuthGuard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      const payloadBase64 = accessToken.split(".")[1];
      const decodedPayload: User = JSON.parse(atob(payloadBase64));

      setUser(decodedPayload);
    } catch (error) {
      console.error("Error decodificando el token:", error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (user && !isRedirected) {
      const redirectRoutes: Record<string, string> = {
        "client": "/",
        "admin": "/home-admin",
      };

      if (user.user && redirectRoutes[user.user]) {
        setIsRedirected(true);
        navigate(redirectRoutes[user.user]);
      }
    }
  }, [user, isRedirected, navigate]);

  return <></>;
};

export default AuthGuard;
