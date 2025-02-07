import { FormEvent } from "react";
import axios from "axios";
import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";

export interface SesionData {
  token: string;
}

export const Submit = async (
  event: FormEvent,
  email: string,
  password: string,
): Promise<SesionData | null> => {
  event.preventDefault();

  const MensajeErrUsuario = document.getElementById("err");

  if (email === "") {
    mostrarMensaje("Ingrese su correo", MensajeErrUsuario);
    return null;
  }

  if (password === "") {
    mostrarMensaje("Ingrese su contraseña", MensajeErrUsuario);
    return null;
  }

  try {
    const responseSesion = await axios.post(`${linkBackend}/users/login`, {
      email, 
      password,
    });
    const token = responseSesion.data.token;
    return { token };
  } catch (error: any) {
    const message = error.response?.data.message;
    mostrarMensaje(message, MensajeErrUsuario);
    return null;
  }
};
