import axios from "axios";
import { linkBackend } from "../../url";
import { mostrarMensaje } from "../../../components/toast";
const token = localStorage.getItem("ACCESS_TOKEN");

export function handleDelete(art: any) {

    const MensajeNegToast = document.getElementById("toast-negative");

    axios
        .delete(`${linkBackend}/articulos/${art}`, {
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
            }
        });
}

export function handleDeleteOffer(art: any) {
    const MensajeNegToast = document.getElementById("toast-negative");

    axios.patch(`${linkBackend}/articulos/offer/${art}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
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
