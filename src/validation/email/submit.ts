import { FormEvent } from "react";
import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";
import api from "../axios.config";

export interface emailData {
    email: string
}

export const Submit = async (
    event: FormEvent,
    email: string,
): Promise<emailData | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("err");

    if (email === "") {
        mostrarMensaje("Ingrese su correo electrónico", MensajeErr);
        return null;
    }

    try {
        await api.post(`${linkBackend}/users/email`, { email });
        return { email };
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErr);
        return null;
    }
};