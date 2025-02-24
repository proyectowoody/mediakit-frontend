import axios from "axios";
import { linkBackend } from "../../url";
import { mostrarMensaje } from "../../../components/toast";
const token = localStorage.getItem("ACCESS_TOKEN");

export function handleDelete(art: any) {
    const id = art.id;
    const MensajeNegToast = document.getElementById("toast-negative");

    axios
        .delete(`${linkBackend}/articulos/${id}`, {
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