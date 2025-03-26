import { FormEvent } from "react";
import { mostrarMensaje } from "../../components/toast";
import { linkBackend } from "../url";
import api from "../axios.config";

export const SubmitDatosPersonales = async (
    event: FormEvent,
    id: number | null,
    fechaNacimiento: string,
    tipoDocumento: string,
    numeroDocumento: string,
    genero: string,
    telefono: string,
    ruta: string
): Promise<string | null> => {
    event.preventDefault();

    const MensajeErr = document.getElementById("err");
    const MensajeSucces = document.getElementById("success");

    if (!fechaNacimiento) {
        mostrarMensaje("Ingrese la fecha de nacimiento", MensajeErr);
        return null;
    }
    if (!tipoDocumento) {
        mostrarMensaje("Seleccione el tipo de documento", MensajeErr);
        return null;
    }
    if (!numeroDocumento) {
        mostrarMensaje("Ingrese el número de documento", MensajeErr);
        return null;
    }
    if (!genero) {
        mostrarMensaje("Seleccione un género", MensajeErr);
        return null;
    }
    if (!telefono || isNaN(Number(telefono))) {
        mostrarMensaje("Ingrese un número de teléfono válido", MensajeErr);
        return null;
    }

    try {
        const data = {
            fecha_nacimiento: fechaNacimiento,
            tipo_documento: tipoDocumento,
            numero_documento: numeroDocumento,
            genero,
            telefono
        };

        if (id) {
            await api.patch(`${linkBackend}/datauser/${id}`, data);
            mostrarMensaje("Datos personales actualizados correctamente", MensajeSucces);
            window.location.href = ruta;
            return "Éxito: Datos personales actualizados";
        } else {
            await api.post(`${linkBackend}/datauser`, data);
            mostrarMensaje("Datos personales guardados correctamente", MensajeSucces);
            window.location.href = ruta;
            return "Éxito: Datos personales guardados";
        }
    } catch (error: any) {
        const message = error.response?.data.message || "Error al guardar los datos personales";
        mostrarMensaje(message, MensajeErr);
        return `Error: ${message}`;
    }
};

export const SubmitDatosEliminar = async (
    event: FormEvent,
    confirmacion: string
): Promise<string | null> => {
    event.preventDefault();

    const MensajeErr = document.getElementById("err");

    if (!confirmacion) {
        mostrarMensaje("Ingrese la conformacion", MensajeErr);
        return null;
    }

    try {
        await api.delete(`${linkBackend}/datauser`);
        await logOut();
        return "Eliminando...";
    } catch (error: any) {
        const message = error.response?.data.message || "Error al guardar los datos personales";
        mostrarMensaje(message, MensajeErr);
        return `Error: ${message}`;
    }
};

const logOut = async () => {
    try {
        await api.post("/users/logout", {}, { withCredentials: true });
        localStorage.clear();
    } catch (error) {
        console.error("Error cerrando sesión:", error);
    }
};

