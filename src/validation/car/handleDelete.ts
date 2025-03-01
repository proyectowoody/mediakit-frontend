import { getUserEmailFromToken } from "../../components/ts/emailFromToken";
import { linkBackend } from "../url";
import axios from "axios";

export const handleDelete = async (articulo_id: number): Promise<void> => {
    const email_user = getUserEmailFromToken();
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    };

    try {
        await axios.delete(`${linkBackend}/carrito`, {
            headers,
            params: { articulo_id, email_user },
        });
    } catch (error: any) {
        alert(error.response?.data?.message);
        throw new Error(error.response?.data?.message || "Error desconocido");
    }
};