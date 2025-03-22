import api from "../axios.config";
import { linkBackend } from "../url";

export const handleDelete = async (articulo_id: number): Promise<void> => {

    try {
        await api.delete(`${linkBackend}/favorito`, {params: { articulo_id, },});
    } catch (error: any) {
        alert(error.response?.data?.message);
        throw new Error(error.response?.data?.message || "Error desconocido");
    }
};