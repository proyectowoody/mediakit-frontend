import { linkBackend } from "../../url";
import api from "../../axios.config";

export const handleGetCash = async () => {

    try {
        const response = await api.get(`${linkBackend}/cash`);
        return { currency: response.data.currency, conversionRate: response.data.conversionRate };
    } catch (error: any) {
        console.error("Error al obtener la moneda y tasa de cambio:", error);
        return null;
    }
};
