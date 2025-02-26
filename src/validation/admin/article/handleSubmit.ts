import { FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { mostrarMensaje } from "../../../components/toast";
import { linkBackend } from "../../url";

interface CampanaResponse {
  message: string;
}

export const handleSubmit = async (
  event: FormEvent,
  id: number,
  nombre: string,
  categoria: string | number,
  estado: string,
  imagen: File[],
  descripcion: string,
  precio: number
): Promise<AxiosResponse<CampanaResponse> | null> => {
  event.preventDefault();
  const MensajeErr = document.getElementById("err");
  const MensajeAct = document.getElementById("success");

  if (!nombre) {
    mostrarMensaje("Ingrese el nombre", MensajeErr);
    return null;
  }

  if (!categoria) {
    mostrarMensaje("Ingrese la categoría", MensajeErr);
    return null;
  }

  if (!estado) {
    mostrarMensaje("Ingrese el estado", MensajeErr);
    return null;
  }

  if (id === 0 && imagen.length === 0) {
    mostrarMensaje("Ingrese al menos una imagen", MensajeErr);
    return null;
  }

  if (!descripcion) {
    mostrarMensaje("Ingrese la descripción", MensajeErr);
    return null;
  }

  if (!precio) {
    mostrarMensaje("Ingrese el precio", MensajeErr);
    return null;
  }

  const token = localStorage.getItem("ACCESS_TOKEN");

  if (!token) {
    mostrarMensaje("No tienes permiso para realizar esta acción", MensajeErr);
    return null;
  }
  
  try {
    let response: AxiosResponse<CampanaResponse>;

    if (id === 0) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("categoria_id", categoria.toString());
      formData.append("estado", estado);
      formData.append("descripcion", descripcion);
      formData.append("precio", precio.toString());

      imagen.forEach((file) => {
        formData.append("imagenes", file);
      });

      response = await axios.post(`${linkBackend}/articulos`, formData, { headers });
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const updateData = {
        nombre,
        categoria_id: categoria,
        estado,
        descripcion,
        precio,
      };
      response = await axios.patch(`${linkBackend}/articulos/${id}`, JSON.stringify(updateData), { headers });
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
