import { AxiosResponse } from "axios";
import { FormEvent } from "react";
import { mostrarMensaje } from "../../../components/toast";
import api from "../../axios.config";

interface CampanaResponse {
    message: string;
}

export const handleSubmit = async (
    event: FormEvent,
    id: number,
    nombre: string,
    descripcion: string,
    imagen: File | string | null, 
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

    try {
        let response: AxiosResponse<CampanaResponse>;

        if (id === 0) {
            
            const formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("descripcion", descripcion);
            if (imagen && typeof imagen !== "string") {
                formData.append("imagen", imagen);
            }

            response = await api.post("/supplier", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } else {

            const updateData: Record<string, any> = { nombre, descripcion };
            
            if (imagen && typeof imagen !== "string") {
                const formData = new FormData();
                formData.append("nombre", nombre);
                formData.append("descripcion", descripcion);
                formData.append("imagen", imagen);
                
                response = await api.patch(`/supplier/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await api.patch(`/supplier/${id}`, updateData);
            }
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
