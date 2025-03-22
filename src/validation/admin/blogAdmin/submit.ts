import { FormEvent } from "react";
import { mostrarMensaje } from "../../../components/toast";
import { linkBackend } from "../../url";
import { AxiosResponse } from "axios";
import api from "../../axios.config";

interface CampanaResponse {
    message: string;
}

export const handleSubmit = async (
    event: FormEvent,
    id: number, titulo: string, descripcion: string, slug: string,
    contenido: string, categoria: string, imagenesFile: File[]
): Promise<AxiosResponse<CampanaResponse> | null> => {
    event.preventDefault();
    const mensajeError = document.getElementById("err");
    const mensajeExito = document.getElementById("success");

    if (!titulo || !categoria || !slug || !descripcion || !contenido) {
        mostrarMensaje("Todos los campos son obligatorios", mensajeError);
        return null;
    }

    try {
        let response: AxiosResponse<CampanaResponse>;

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("slug", slug);
        formData.append("categoria", categoria.toString());
        formData.append("descripcion", descripcion);
        formData.append("contenido", contenido);

        imagenesFile.forEach((file) => {
            formData.append("imagenes", file);
        });

        if (id === 0) {
            response = await api.post(`/blog`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } else {
            response = await api.patch(`/blog/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        }

        mostrarMensaje(response.data.message, mensajeExito);
        return response;
    } catch (error: any) {
        console.error("Error en la solicitud:", error);
        mostrarMensaje(
            error.response?.data?.message || "Error al enviar los datos",
            mensajeError
        );
        return null;
    }
};

export const handleSubmitDiscount = async (
    event: FormEvent,
    id: number,
    discount: number
): Promise<AxiosResponse<CampanaResponse> | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    if (id === 0) {
        mostrarMensaje("Error con el id", MensajeErr);
        return null;
    }

    if (!discount) {
        mostrarMensaje("Ingrese el nombre", MensajeErr);
        return null;
    }

    try {
        let response: AxiosResponse<CampanaResponse>;

        const updateData = { discount };

        response = await api.patch(`${linkBackend}/articulos/discount/${id}`, JSON.stringify(updateData));

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

export function handleDeleteImage(imageUrl: string) {


    const encodedImageUrl = encodeURIComponent(imageUrl);

    api
        .delete(`${linkBackend}/articulos?imageUrl=${encodedImageUrl}`)
        .then(() => {
        })
        .catch((error) => {
            console.error("Error eliminando la imagen:", error);
        });

    const articuloSeleccionado = localStorage.getItem("articuloSeleccionado");

    if (articuloSeleccionado) {
        let articulo = JSON.parse(articuloSeleccionado);
        if (Array.isArray(articulo.imagenes)) {
            articulo.imagenes = articulo.imagenes.filter((img: string) => img !== imageUrl);
        }
        localStorage.setItem("articuloSeleccionado", JSON.stringify(articulo));
    }
}

