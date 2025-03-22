import { linkBackend } from "../../url";
import api from "../../axios.config";

export async function handleGetSup() {
    try {
        const response = await api.get(`${linkBackend}/supplier`);
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}
