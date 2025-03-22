import { linkBackend } from "../../url";
import { mostrarMensaje } from "../../../components/toast";
import api from "../../axios.config";

export function handleDelete(art: any) {

    const MensajeNegToast = document.getElementById("toast-negative");

    api
        .delete(`${linkBackend}/articulos/${art}`, {
        })
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            if (error.response) {
                mostrarMensaje(error.response.data.error, MensajeNegToast);
            }
        });
}

export function handleDeleteOffer(art: any) {
    const MensajeNegToast = document.getElementById("toast-negative");

    api.patch(`${linkBackend}/articulos/offer/${art}`, {}, {
    })
    .then(() => {
        window.location.reload();
    })
    .catch((error) => {
        if (error.response) {
            mostrarMensaje(error.response.data.error, MensajeNegToast);
        }
    });
}
