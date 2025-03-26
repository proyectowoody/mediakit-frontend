import { linkBackend } from "../url";
import api from "../axios.config";
import { AxiosResponse } from "axios";
import { mostrarMensaje } from "../../components/toast";

export const SubmitCar = async (articulo_id: number | null) => {

    if (articulo_id === 0 || articulo_id === null) {
        return;
    }

    try {
        await api.post(`${linkBackend}/carrito`, { articulo_id });
    } catch (error: any) {
        alert(error.response?.data?.message);
        throw new Error(error.response?.data?.message || "Error desconocido");
    }
};

interface CampanaResponse { message: string; }

export const handleSubmit = async (
    codigo: string,
): Promise<AxiosResponse<CampanaResponse> | null> => {

    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    if (codigo == '') {
        mostrarMensaje('Ingrese el descuento', MensajeErr);
        return null;
    }

    try {
        let response: AxiosResponse<CampanaResponse>;

        const requestData = { codigo };
        response = await api.post(`${linkBackend}/carrito/descuento`, requestData);
        mostrarMensaje(response.data.message, MensajeAct);

        return response;
    } catch (error: any) {
        mostrarMensaje(
            error.response?.data?.message || "Error al enviar los datos",
            MensajeErr
        );
        return null;
    }
};


