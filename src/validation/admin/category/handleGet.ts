import axios from "axios";
import { linkBackend } from "../../url";

export async function handleGet() {
    try {

        const token = localStorage.getItem("ACCESS_TOKEN");
        if (!token) {
            throw new Error("No tienes permiso para realizar esta acción");
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${linkBackend}/categorias`, { headers });

        return response.data;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}
