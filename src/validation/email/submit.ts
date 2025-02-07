import { FormEvent } from "react";
import axios from "axios";
import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";

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
        await axios.post(`${linkBackend}/users/email`, { email });
        return { email };
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErr);
        return null;
    }
};