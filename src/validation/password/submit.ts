import { FormEvent } from "react";
import axios from "axios";
import { mostrarMensaje } from "../../components/toast";
import { api } from "../url";

export interface upEmailData {
  tokens: string;
  name: string;
  email: string;
  role: string;
  id: number;
}

export const Submit = async (
  event: FormEvent,
  password: string,
  verPassword: string,
  setVerPassword: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>
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

  function resetForm() {
    setPassword("");
    setVerPassword("");
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    const localToken = localStorage.getItem("ACCESS_TOKEN");

    const token = urlToken || localToken;

    if (!token) {
      throw new Error("No se encontró un token válido.");
    }

    const responseSesion = await axios.patch(
      `${api}/users/password`,
      { password, verPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    resetForm();
    mostrarMensaje(responseSesion.data.message, MensajeAct);
    const tokens = responseSesion.data.token;
    const name = responseSesion.data.name;
    const emaile = responseSesion.data.email;
    const role = responseSesion.data.role;
    const id = responseSesion.data.id;
    return { tokens, name, email: emaile, role, id };
  } catch (error: any) {
    const message =
      error.response?.data.message || "Ocurrió un error inesperado.";
    mostrarMensaje(message, MensajeErr);
    resetForm();
    return null;
  }
};
