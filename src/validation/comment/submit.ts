import { FormEvent } from "react";
import axios from "axios";
import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";
import { getUserEmailFromToken } from "../../components/ts/emailFromToken";

export const SubmitComment = async (
    event: FormEvent,
    id: string | null,
    buy_id: string | null,
    descripcion: string
) => {
    event.preventDefault();

    const MensajeErr = document.getElementById("err");
    const MensajeSucces = document.getElementById("success");

    if (!descripcion) {
        mostrarMensaje("Ingrese un comentario", MensajeErr);
        return null;
    }

    const token = localStorage.getItem("ACCESS_TOKEN");

    if (!token) {
        mostrarMensaje("No tienes permiso para realizar esta acción", MensajeErr);
        return null;
    }

    const email = getUserEmailFromToken();

    try {
        let response;

        if (id) {
            response = await axios.patch(
                `${linkBackend}/comment/${id}`,
                { descripcion },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            mostrarMensaje("Comentario actualizado correctamente", MensajeSucces);
            return "Éxito: Comentario actualizado correctamente";
        } else {
            response = await axios.post(
                `${linkBackend}/comment/${email}/${buy_id}`,
                { descripcion },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            mostrarMensaje("Comentario guardado correctamente", MensajeSucces);
            return "Éxito: Comentario guardado correctamente";
        }
    } catch (error: any) {
        const message = error.response?.data.message || "Error al guardar el comentario";
        mostrarMensaje(message, MensajeErr);
        return `Error: ${message}`;
    }
};

