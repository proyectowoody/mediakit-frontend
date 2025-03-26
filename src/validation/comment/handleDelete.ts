import { mostrarMensaje } from "../../components/toast";
import api from "../axios.config";
import { linkBackend } from "../url";


export function handleDeleteComment(id: any) {
  const MensajeNegToast = document.getElementById("toast-negative");

  api
    .delete(`${linkBackend}/commentarticle/${id}`)
    .then(() => {
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

export function handleDeleteCommentBuy(id: any) {
    const MensajeNegToast = document.getElementById("toast-negative");
  
    api
      .delete(`${linkBackend}/comment/${id}`)
      .then(() => {
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
