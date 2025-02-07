import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 


interface User {
  email: string;
  role: string;
}

export const AuthGuard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    if (!token) {
      // Si no hay token, redirigir al login
      navigate("/login");
      return;
    }

    try {
      // Decodificar el token para obtener email y role
      const decoded: User = jwtDecode(token);
      setUser(decoded);

      // Verificar si el token ha expirado
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      const decodedAny: any = jwtDecode(token); // Acceso al campo `exp`
      if (decodedAny.exp < currentTime) {
        console.error("El token ha expirado");
        localStorage.removeItem("ACCESS_TOKEN");
        navigate("/login");
        return;
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (user && !isRedirected) {
      const redirectRoutes: Record<string, string> = {
        client: "/home",
        admin: "/dashboard", // Ajusta la ruta según tu lógica
      };

      const { role } = user;

      if (role && redirectRoutes[role]) {
        setIsRedirected(true);
        navigate(redirectRoutes[role]);
      }
    }
  }, [user, isRedirected, navigate]);

  return <></>;
};

export default AuthGuard;
