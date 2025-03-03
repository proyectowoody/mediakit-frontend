import axios from "axios";
import { linkBackend } from "../../url";

export async function handleGet() {
    try {

        const response = await axios.get(`${linkBackend}/articulos`);

        return response.data;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}


export async function handleGetOfertas() {
    try {

        const response = await axios.get(`${linkBackend}/articulos/ofertas`);

        return response.data;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}
