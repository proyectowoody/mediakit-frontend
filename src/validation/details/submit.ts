import { AxiosResponse } from "axios";
import { FormEvent } from "react";
import { mostrarMensaje } from "../../components/toast";
import api from "../axios.config";
import { linkBackend } from "../url";

interface CampanaResponse {
    message: string;
}

export const handleSubmitDetails = async (
    event: FormEvent,
    articulo_id: number,
    comentario: string,
): Promise<AxiosResponse<CampanaResponse> | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    if (comentario == ('')) {
        mostrarMensaje("Ingrese el nombre", MensajeErr);
        return null;
    }

    if (articulo_id == 0) {
        mostrarMensaje("Sin producto", MensajeErr);
        return null;
    }

    try {
        let response: AxiosResponse<CampanaResponse>;

        const requestData = { articulo_id, comentario }
        response = await api.post(`${linkBackend}/commentarticle`, requestData);
        mostrarMensaje(response.data.message, MensajeAct);
        return response;
    } catch (error: any) {
        console.error("Error en la solicitud:", error);
        mostrarMensaje(
            error.response?.data?.message || "Error al enviar los datos",
            MensajeErr
        );
        return null;
    }
};
