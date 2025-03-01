import axios from "axios";
import { getUserEmailFromToken } from "../../components/ts/emailFromToken";
import { linkBackend } from "../url";

export const SubmitCar = async (articulo_id: number | null) => {
    const email_user = getUserEmailFromToken();

    const headers = {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    };

    if (articulo_id === 0 || articulo_id === null) {
        return;
    }
    
    try {
        await axios.post(
            `${linkBackend}/carrito`,
            { articulo_id, email_user },
            { headers }
        );
    } catch (error: any) {
        alert(error.response?.data?.message);
        throw new Error(error.response?.data?.message || "Error desconocido");
    }
};

