import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";
import api from "../axios.config";

export interface SesionData {
  token: string;
}

export const Submit = async (
  email: string,
  password: string,
): Promise<SesionData | null> => {

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
    const response = await api.post(`${linkBackend}/users/login`, {
      email,
      password,
    });

    return { token: response.data.token };
  } catch (error: any) {
    const message = error.response?.data.message;
    mostrarMensaje(message, MensajeErrUsuario);
    return null;
  }
};
