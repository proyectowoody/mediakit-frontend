import { linkBackend } from "../../url";
import api from "../../axios.config";

export const handleGetCash = async () => {
    try {
        const response = await api.get(`${linkBackend}/cash`);
        const data = {
            currency: response.data.currency,
            conversionRate: response.data.conversionRate,
        };
        console.log(data);
        localStorage.setItem("cashData", JSON.stringify(data));
        return data;
    } catch (error: any) {
        console.error("Error al obtener la moneda y tasa de cambio:", error);
        return null;
    }
};

