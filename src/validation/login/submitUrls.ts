import axios from "axios";
import { mostrarMensaje } from "../../components/toast";
import { api } from "../url";


export interface TokensData {
    token: any;
    name: string;
    email: string;
}

export const submitUrls= async (tokens: any): Promise<TokensData | null> => {
    const MensajeErrUsuario = document.getElementById("MensajeErrUsuario");
    const MensajeActUsuario = document.getElementById("MensajeActUsuario");

    const isVerified: boolean = true;

    try {
        const responseSesion = await axios.patch(`${api}/users/tokens`, { isVerified }, {
            headers: {
                Authorization: `Bearer ${tokens}`,
            },
        });
        const token = responseSesion.data.token;
        const name = responseSesion.data.name;
        const emaile = responseSesion.data.email;

        mostrarMensaje(responseSesion.data.message, MensajeActUsuario);
        return { token, name, email: emaile };
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErrUsuario);
        return null;
    }
}