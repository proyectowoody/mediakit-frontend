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
    descripcion: string,
    imagen: File | null,
): Promise<AxiosResponse<CampanaResponse> | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    if (!nombre) {
        mostrarMensaje("Ingrese el nombre", MensajeErr);
        return null;
    }

    if (!descripcion) {
        mostrarMensaje("Ingrese la descripción", MensajeErr);
        return null;
    }

    if (id === 0 && !imagen) {
        mostrarMensaje("Ingrese la imagen", MensajeErr);
        return null;
    }


    const token = localStorage.getItem("ACCESS_TOKEN");

    if (!token) {
        mostrarMensaje("No tienes permiso para realizar esta acción", MensajeErr);
        return null;
    }

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": id === 0 ? "multipart/form-data" : "application/json",
    };

    try {
        let response: AxiosResponse<CampanaResponse>;

        if (id === 0) {
            const formData = new FormData();
            formData.append("nombre", nombre);
            if (imagen) formData.append("imagen", imagen);
            formData.append("descripcion", descripcion);

            response = await axios.post(`${linkBackend}/supplier`, formData, { headers });
        } else {
            const updateData = {
                nombre,
                descripcion
            };

            response = await axios.patch(`${linkBackend}/supplier'/${id}`, updateData, {
                headers,
            });
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
