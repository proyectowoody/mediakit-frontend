import { linkBackend } from "../url";
import api from "../axios.config";

export const SubmitCar = async (articulo_id: number | null) => {

    if (articulo_id === 0 || articulo_id === null) {
        return;
    }
    
    try {
        await api.post( `${linkBackend}/carrito`, { articulo_id });
    } catch (error: any) {
        alert(error.response?.data?.message);
        throw new Error(error.response?.data?.message || "Error desconocido");
    }
};

