import { FormEvent } from "react";
import { mostrarMensaje } from "../../../components/toast";
import { linkBackend } from "../../url";
import api from "../../axios.config";

export interface upEmailData {
    tokens: string;
}

export const SubmitCash = async (
    event: FormEvent,
    cash: string,
): Promise<upEmailData | null> => {

    event.preventDefault();
    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");
    try {

        const responseSesion = await api.post(
            `${linkBackend}/cash`, { cash });

        mostrarMensaje(responseSesion.data.message, MensajeAct);
        const tokens = responseSesion.data.token;
        return { tokens };

    } catch (error: any) {
        const message = error.response?.data.message || "Ocurrió un error inesperado.";
        mostrarMensaje(message, MensajeErr);
        return null;
    }

};
