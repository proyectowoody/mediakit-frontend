
import { linkBackend } from "../url";
import api from "../axios.config";

export async function handleGetCountArticulos() {
    try {
        const response = await api.get(`${linkBackend}/articulos/count`);
        return response.data.total;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}

export async function handleGetCountProveedor() {
    try {
        const response = await api.get(`${linkBackend}/supplier/count`);
        return response.data.total;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}

export async function handleGetCountClientes() {
    try {
        const response = await api.get(`${linkBackend}/users/count`);
        return response.data.total;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}