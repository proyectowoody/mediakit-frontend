import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../validation/axios.config";

interface User {
    email: string;
    user: "client" | "admin";
}

const PUBLIC_ROUTES = [
    "/tienda/:categoria?/:subcategoria?", "/iniciar-sesion", "/registro", "/verificacion",
    "/correo", "/recuperar-contrasena", "/contacto", "/garantia", "/politicas-envio",
    "/politicas-devoluciones", "/aviso-legal", "/cookies", "/terminos-venta", "/terminos",
    "/privacidad", "/preguntas-frecuentes", "/historial", "/blog"
];

const CLIENT_ROUTES = ["/favoritos", "/carrito", "/comprar", "/direccion", "/comentarios", "/cuenta"];
const ADMIN_ROUTES = ["/inicio", "/categorias", "/subcategorias", "/proveedores", "/articulos", "/ofertas", "/cuenta-admin"];

function useAuthProtection() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/users/me", {
                    withCredentials: true,
                    validateStatus: (status) => status < 500 
                });

                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (loading) return;

        const path = location.pathname;

        if (PUBLIC_ROUTES.includes(path)) return;

        if (!user) {
            if (path !== "/iniciar-sesion") {
                navigate("/iniciar-sesion");
            }
            return;
        }

        if (path === "/iniciar-sesion") {
            navigate(user.user === "admin" ? "/inicio" : "/");
            return;
        }

        if (user.user === "admin" && path === "/") {
            navigate("/inicio");
            return;
        }

        if (user.user === "admin" && CLIENT_ROUTES.includes(path) && path !== "/") {
            navigate("/inicio");
            return;
        }

        if (user.user === "client" && ADMIN_ROUTES.includes(path)) {
            navigate("/");
            return;
        }
    }, [user, location.pathname, navigate, loading]);

    return user;
}

export default useAuthProtection;

export function useAdminRedirect() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAdminRedirect = async () => {
            try {
                const response = await api.get("/users/me", {
                    withCredentials: true,
                    validateStatus: (status) => status < 500 
                });

                if (response.status === 200 && response.data.user === "admin" && location.pathname === "/") {
                    navigate("/inicio"); 
                }
            } catch (error) {
                console.error("Error verificando usuario:", error);
            }
        };

        checkAdminRedirect();
    }, [location.pathname, navigate]);
}


