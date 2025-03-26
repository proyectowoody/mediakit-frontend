import { AxiosResponse } from "axios";
import { FormEvent } from "react";
import { mostrarMensaje } from "../../../components/toast";
import { linkBackend } from "../../url";
import api from "../../axios.config";

interface CampanaResponse {
    message: string;
}

export const handleSubmit = async (
    event: FormEvent,
    id: number,
    codigo: string,
    descuento: number
): Promise<AxiosResponse<CampanaResponse> | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    if (codigo == '') {
        mostrarMensaje("Ingrese el código", MensajeErr);
        return null;
    }
    if (descuento == 0) {
        mostrarMensaje('Ingrese el descuento', MensajeErr);
        return null;
    }

    try {
        let response: AxiosResponse<CampanaResponse>;
        const requestData = {codigo, descuento};

        if (id === 0) {
            response = await api.post(`${linkBackend}/descuento`, requestData);
        } else {
            response = await api.patch(`${linkBackend}/descuento/${id}`, requestData);
        }

        mostrarMensaje(response.data.message, MensajeAct);
        return response;
    } catch (error: any) {
        mostrarMensaje(
            error.response?.data?.message || "Error al enviar los datos",
            MensajeErr
        );
        return null;
    }
};
