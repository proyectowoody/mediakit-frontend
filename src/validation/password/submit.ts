import { FormEvent } from "react";
import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";
import api from "../axios.config";

export interface upEmailData {
  token: string;
}

export const Submit = async (
  event: FormEvent,
  password: string,
  verPassword: string,
): Promise<upEmailData | null> => {
  
  event.preventDefault();
  const MensajeErr = document.getElementById("err");
  const MensajeAct = document.getElementById("success");

  if (password === "") {
    mostrarMensaje("Ingrese su nueva contraseña", MensajeErr);
    return null;
  }

  if (verPassword === "") {
    mostrarMensaje(
      "Ingrese la verificación de su nueva contraseña",
      MensajeErr
    );
    return null;
  }

  if (password !== verPassword) {
    mostrarMensaje("Las contraseñas no coinciden", MensajeErr);
    return null;
  }

  try {

    const responseSesion = await api.patch(
      `${linkBackend}/users/password`,
      { password, verPassword }
    );

    mostrarMensaje(responseSesion.data.message, MensajeAct);
    return { token: responseSesion.data.token };
  } catch (error: any) {
    const message =
      error.response?.data.message || "Ocurrió un error inesperado.";
    mostrarMensaje(message, MensajeErr);
    return null;
  }
};
