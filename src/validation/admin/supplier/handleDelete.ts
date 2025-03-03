import axios from "axios";
import { mostrarMensaje } from "../../../components/toast";
import { linkBackend } from "../../url";

export function handleDelete(art: any) {
  const MensajeNegToast = document.getElementById("toast-negative");

  const token = localStorage.getItem("ACCESS_TOKEN");

  if (!token) {
    mostrarMensaje("No tienes permiso para realizar esta acción", MensajeNegToast);
    return;
  }

  axios
    .delete(`${linkBackend}/supplier/${art}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      if (error.response) {
        mostrarMensaje(error.response.data.error, MensajeNegToast);
      } else {
        mostrarMensaje("Error al eliminar el elemento", MensajeNegToast);
      }
    });
}
