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
    nombre: string,
    categoriaId: number
): Promise<AxiosResponse<CampanaResponse> | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    if (!nombre.trim()) {
        mostrarMensaje("Ingrese el nombre", MensajeErr);
        return null;
    }

    if (!categoriaId || categoriaId <= 0 || isNaN(categoriaId)) {
        mostrarMensaje("Seleccione una categoría válida", MensajeErr);
        return null;
    }

    try {
        let response: AxiosResponse<CampanaResponse>;

        const requestData = {
            nombre,
            categoria_id: categoriaId, 
        };

        if (id === 0) {
            response = await api.post(`${linkBackend}/subcategorias`, requestData);
        } else {
            response = await api.patch(`${linkBackend}/subcategorias/${id}`, requestData);
        }

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
