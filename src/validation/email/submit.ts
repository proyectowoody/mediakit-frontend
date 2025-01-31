import { FormEvent } from "react";
import axios from "axios";
import { mostrarMensaje } from "../../components/toast";
import { api } from "../url";

export interface emailData {
    email: string
}

export const Submit = async (
    event: FormEvent,
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
): Promise<emailData | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    if (email === "") {
        mostrarMensaje("Ingrese su correo electrónico", MensajeErr);
        return null;
    }

    function resetForm() {
        setEmail("");
    }

    try {
        const responseEmail = await axios.post(`${api}/users/email`, { email });
        resetForm();
        mostrarMensaje(responseEmail.data.message, MensajeAct);
        return { email };
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErr);
        resetForm();
        return null;
    }
};