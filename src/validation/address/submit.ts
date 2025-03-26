import { FormEvent } from "react";
import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";
import api from "../axios.config";

export const SubmitAddress = async (
  event: FormEvent,
  id: number | null,
  pais: string,
  provincia: string,
  localidad: string,
  codigo_postal: string,
  tipo_via: string,
  envio: boolean,
  facturacion: boolean,
  adicional: string,
  indicacion: string,
  ruta: string
): Promise<string | null> => {
  event.preventDefault();

  const MensajeErr = document.getElementById("err");
  const MensajeSucces = document.getElementById("success");

  if (!pais) {
    mostrarMensaje("Ingrese el país", MensajeErr);
    return null;
  }
  if (!provincia) {
    mostrarMensaje("Ingrese la provincia", MensajeErr);
    return null;
  }
  if (!localidad) {
    mostrarMensaje("Ingrese la localidad", MensajeErr);
    return null;
  }
  if (!codigo_postal || codigo_postal.length !== 5 || isNaN(Number(codigo_postal))) {
    mostrarMensaje("Ingrese un código postal válido (5 dígitos)", MensajeErr);
    return null;
  }
  if (!tipo_via) {
    mostrarMensaje("Ingrese el tipo de vía y nombre", MensajeErr);
    return null;
  }

  try {
    const data = {
      pais,
      provincia,
      localidad,
      codigo_postal,
      tipo_via,
      envio,
      facturacion,
      adicional,
      indicacion,
    };

    if (id) {
      await api.patch(`${linkBackend}/address/${id}`, data);
      mostrarMensaje("Dirección actualizada correctamente", MensajeSucces);
      window.location.href = ruta;
      return "Éxito: Dirección actualizada correctamente";
    } else {
      await api.post(`${linkBackend}/address`, data);
      mostrarMensaje("Dirección guardada correctamente", MensajeSucces);
      window.location.href = ruta;
      return "Éxito: Dirección guardada correctamente";
    }
  } catch (error: any) {
    const message = error.response?.data.message || "Error al guardar la dirección";
    mostrarMensaje(message, MensajeErr);
    return `Error: ${message}`;
  }
};
