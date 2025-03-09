import { FormEvent } from "react";
import axios from "axios";
import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";


export const SubmitSuscribe = async (
    event: FormEvent,
    email: string,
) => {
    event.preventDefault();

    const MensajeErrUsuario = document.getElementById("errSuscribe");
    const MensajeActUsuario = document.getElementById("successSuscribe");

    if (email === "") {
        mostrarMensaje("Ingrese su correo", MensajeErrUsuario);
        return false;
    }

    try {
        const responseRegister = await axios.post(`${linkBackend}/contact/suscribe`, { email });
        const mensaje = responseRegister.data.message;
        mostrarMensaje(mensaje, MensajeActUsuario);
        return true;
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErrUsuario);
        return false;
    }
};