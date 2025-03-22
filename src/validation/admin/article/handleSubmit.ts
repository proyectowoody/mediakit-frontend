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
  id: number,
  nombre: string,
  categoria: string | number,
  estado: string,
  descripcion: string,
  precio: number,
  supplier: string | number,
  imagenesFile: File[],
): Promise<AxiosResponse<CampanaResponse> | null> => {
  event.preventDefault();
  const MensajeErr = document.getElementById("err");
  const MensajeAct = document.getElementById("success");

  if (!nombre || !categoria || !estado || !descripcion || !precio || !supplier) {
    mostrarMensaje("Todos los campos son obligatorios", MensajeErr);
    return null;
  }

  try {
    let response: AxiosResponse<CampanaResponse>;

    if (id === 0) {

      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("categoria_id", categoria.toString());
      formData.append("estado", estado);
      formData.append("descripcion", descripcion);
      formData.append("precio", precio.toString());
      formData.append("supplier_id", supplier.toString());

      imagenesFile.forEach((file) => {
        formData.append("imagenes", file);
      });

      response = await api.post(`/articulos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

    } else {

      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("categoria_id", categoria.toString());
      formData.append("estado", estado);
      formData.append("descripcion", descripcion);
      formData.append("precio", precio.toString());
      formData.append("supplier_id", supplier.toString());

      imagenesFile.forEach((file) => {
        formData.append("imagenes", file);
      });

      response = await api.patch(`/articulos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
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

