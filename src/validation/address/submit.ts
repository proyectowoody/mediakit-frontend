import { FormEvent } from "react";
import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";
import api from "../axios.config";

export const SubmitAddress = async (
  event: FormEvent,
  id: string | null,
  calle: string,
  numero: string,
  piso_puerta: string,
  codigo_postal: string,
  ciudad: string,
  provincia: string,
  comunidad_autonoma: string
): Promise<string | null> => {
  event.preventDefault();

  const MensajeErr = document.getElementById("err");
  const MensajeSucces = document.getElementById("success");

  if (!calle) {
    mostrarMensaje("Ingrese la calle", MensajeErr);
    return null;
  }
  if (!numero) {
    mostrarMensaje("Ingrese el número de la vivienda", MensajeErr);
    return null;
  }
  if (!codigo_postal || codigo_postal.length !== 5 || isNaN(Number(codigo_postal))) {
    mostrarMensaje("Ingrese un código postal válido (5 dígitos)", MensajeErr);
    return null;
  }
  if (!ciudad) {
    mostrarMensaje("Ingrese la ciudad", MensajeErr);
    return null;
  }
  if (!provincia) {
    mostrarMensaje("Ingrese la provincia", MensajeErr);
    return null;
  }
  if (!comunidad_autonoma) {
    mostrarMensaje("Ingrese la comunidad autónoma", MensajeErr);
    return null;
  }


  try {

    if (id) {

       await api.patch(
        `${linkBackend}/address/${id}`,
        {
          calle,
          numero,
          piso_puerta: piso_puerta || null,
          codigo_postal,
          ciudad,
          provincia,
          comunidad_autonoma,
        }
      );
      mostrarMensaje("Dirección actualizada correctamente", MensajeSucces);
      return "Éxito: Dirección actualizada correctamente";
    } else {

      await api.post(
        `${linkBackend}/address`,
        {
          calle,
          numero,
          piso_puerta: piso_puerta || null,
          codigo_postal,
          ciudad,
          provincia,
          comunidad_autonoma,
        }
      );
      mostrarMensaje("Dirección guardada correctamente", MensajeSucces);
      return "Éxito: Dirección guardada correctamente";
    }
  } catch (error: any) {
    const message = error.response?.data.message || "Error al guardar la dirección";
    mostrarMensaje(message, MensajeErr);
    return `Error: ${message}`;
  }
};
