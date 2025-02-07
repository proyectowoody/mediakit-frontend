import axios from "axios";
import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";

export interface TokensData {
    token: any;
}

export const submitUrls = async (tokens: any): Promise<TokensData | null> => {
    const MensajeErrUsuario = document.getElementById("MensajeErrUsuario");

    try {
        const responseToken = await axios.patch(`${linkBackend}/users/tokens`, {}, {
            headers: {
                Authorization: `Bearer ${tokens}`,
            },
        });
        const token = responseToken.data.token;
        return { token };
    } catch (error: any) {
        console.error("Error in submitUrls:", error);
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErrUsuario);
        return null;
    }
}