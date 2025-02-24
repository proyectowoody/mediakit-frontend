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
