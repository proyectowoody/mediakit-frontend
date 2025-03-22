import { FormEvent } from "react";
import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";
import api from "../axios.config";

export const SubmitComment = async (
    event: FormEvent,
    descripcion: string
): Promise<void> => {
    event.preventDefault();  

    const MensajeErr = document.getElementById("err");
    const MensajeSucces = document.getElementById("success");

    if (!descripcion.trim()) {  
        mostrarMensaje("Ingrese un comentario válido", MensajeErr);
        return;
    }

    try {
        await api.post(`${linkBackend}/comment/`, { descripcion }); 
        mostrarMensaje("Comentario guardado correctamente", MensajeSucces);
    } catch (error: any) {
        const message = error.response?.data?.message || "Error al guardar el comentario";
        mostrarMensaje(message, MensajeErr);
    }
};
