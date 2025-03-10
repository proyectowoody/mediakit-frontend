
import axios from "axios";
import { linkBackend } from "../url";

export async function handleGetCountArticulos() {
    try {
        const response = await axios.get(`${linkBackend}/articulos/count`);
        return response.data.total;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}

export async function handleGetCountProveedor() {
    try {
        const response = await axios.get(`${linkBackend}/supplier/count`);
        return response.data.total;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}

export async function handleGetCountClientes() {
    try {
        const response = await axios.get(`${linkBackend}/users/count`);
        return response.data.total;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}