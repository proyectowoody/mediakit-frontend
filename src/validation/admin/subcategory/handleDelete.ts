import { mostrarMensaje } from "../../../components/toast";
import { linkBackend } from "../../url";
import api from "../../axios.config";

export function handleDelete(art: any) {
  const MensajeNegToast = document.getElementById("toast-negative");

  api
    .delete(`${linkBackend}/subcategorias/${art}`)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error al eliminar:", error);
      if (error.response) {
        mostrarMensaje(error.response.data.error, MensajeNegToast);
      } else {
        mostrarMensaje("Error al eliminar el elemento", MensajeNegToast);
      }
    });
}
