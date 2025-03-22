import { FormEvent } from "react";
import { linkBackend } from "../url";
import { mostrarMensaje } from "../../components/toast";
import api from "../axios.config";

export const Submit = async (
    event: FormEvent,
    name: string,
    lastName:string,
    email: string,
    password: string,
) => {
    event.preventDefault();
    
    const MensajeErrUsuario = document.getElementById("err");
    const MensajeActUsuario = document.getElementById("success");

    if (name === "") {
        mostrarMensaje("Ingrese su nombre", MensajeErrUsuario);
        return false;
    }

    if (lastName === "") {
        mostrarMensaje("Ingrese su apellido", MensajeErrUsuario);
        return false;
    }

    if (email === "") {
        mostrarMensaje("Ingrese su correo", MensajeErrUsuario);
        return false;
    }

    if (password === "") {
        mostrarMensaje("Ingrese su password", MensajeErrUsuario);
        return false;
    }

    try {
        const responseRegister = await api.post(`${linkBackend}/users/register`, { name, lastName, email, password });
        const mensaje = responseRegister.data.message;
        mostrarMensaje(mensaje, MensajeActUsuario);
        return true;
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErrUsuario);
        return false;
    }
};
