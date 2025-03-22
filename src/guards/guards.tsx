import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../validation/axios.config";
import { SubmitCar } from "../validation/car/submit";

interface User {
  email: string;
  user: "client" | "admin";
}

export const AuthGuard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me");
        setUser(response.data);
      } catch (error) {
        navigate("/iniciar-sesion");
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (user && !isRedirected) {
      const guestCart = localStorage.getItem("guest_cart");

      if (user.user === "client" && guestCart) {
        try {
          const cartItems: { id: number; cantidad?: number }[] = JSON.parse(guestCart);
          if (cartItems.length > 0) {
            cartItems.forEach((item) => {
              const cantidad = item.cantidad || 1; // Asegurar que si no tiene cantidad, sea 1
              for (let i = 0; i < cantidad; i++) {
                SubmitCar(item.id);
              }
            });

            setIsRedirected(true);
            navigate("/carrito"); 
            return;
          }
        } catch (error) {
          console.error("Error al parsear los datos del carrito:", error);
        }
      }

      const redirectRoutes: Record<string, string> = {
        client: "/",
        admin: "/inicio",
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
