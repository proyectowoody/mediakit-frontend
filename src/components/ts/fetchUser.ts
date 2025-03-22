import api from "../../validation/axios.config";

export const handleGetUserSession = async (setIsLogged: (value: boolean) => void) => {
    try {
        const response = await api.get("/users/me", { withCredentials: true });
        if (response.data) {
            setIsLogged(true);
        }
    } catch (error) {
        console.error("Usuario no autenticado:", error);
        setIsLogged(false);
    }
};

