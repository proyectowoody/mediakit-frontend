import axios, { AxiosResponse } from "axios";
import { FormEvent } from "react";
import { mostrarMensaje } from "../../../components/toast";
import { linkBackend } from "../../url";

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

    const token = localStorage.getItem("ACCESS_TOKEN");

    if (!token) {
        mostrarMensaje("No tienes permiso para realizar esta acción", MensajeErr);
        return null;
    }

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        let response: AxiosResponse<CampanaResponse>;

        const requestData = {
            nombre,
            categoria_id: categoriaId, 
        };

        if (id === 0) {
            response = await axios.post(`${linkBackend}/subcategorias`, requestData, { headers });
        } else {
            response = await axios.patch(`${linkBackend}/subcategorias/${id}`, requestData, { headers });
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
