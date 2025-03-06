import axios from "axios";
import { linkBackend } from "../url";
import { getUserEmailFromToken } from "../../components/ts/emailFromToken";

export const handleGetComment = async (buy: any) => {
    if (Array.isArray(buy) && buy.length > 0) {
        const buy_id = buy[0]?.id;
        const email = getUserEmailFromToken();
        const token = localStorage.getItem("ACCESS_TOKEN");

        if (!email) {
            throw new Error("No se encontró el email en el token.");
        }

        try {
            const response = await axios.get(`${linkBackend}/comment/${email}/${buy_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            console.error("Error al obtener los comentarios:", error);
            return [];
        }
    }
};







