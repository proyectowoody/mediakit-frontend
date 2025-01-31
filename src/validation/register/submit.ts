import { FormEvent } from "react";
import axios from "axios";
import { api } from "../url";
import { mostrarMensaje } from "../../components/toast";

export const Submit = async (
    event: FormEvent,
    name: string,
    lastName:string,
    email: string,
    password: string,
    isVerified: boolean,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setLastName: React.Dispatch<React.SetStateAction<string>>,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    setisVerified: React.Dispatch<React.SetStateAction<boolean>>
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

    function resetForm() {
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setisVerified(false);
    }

    try {
        const role = "client";
        const responseRegister = await axios.post(`${api}/users/register`, { name, lastName, email, password, isVerified, role });
        const mensaje = responseRegister.data.message;
        mostrarMensaje(mensaje, MensajeActUsuario);
        resetForm();
        return true;
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErrUsuario);
        resetForm();
        return false;
    }
};
