import { linkBackend } from "../url";
import api from "../axios.config";

export const handleGetComment = async () => {
    try {
        const response = await api.get(`${linkBackend}/comment/`);
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener los comentarios:", error);
        return [];
    }
};

export const handleGetCommentAdmin = async () => {
    try {
        const response = await api.get(`${linkBackend}/commentarticle/`);
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener los comentarios:", error);
        return [];
    }
};

export const handleGetCommentBuy = async () => {
    try {
        const response = await api.get(`${linkBackend}/comment/`);
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener los comentarios:", error);
        return [];
    }
};







