import api from "../axios.config";
import { linkBackend } from "../url";

export const handleGetAddress = async () => {
  try {
    const response = await api.get(`${linkBackend}/address`);
    return response.data;
  } catch (error: any) {
    console.error("Error en la direccion:", error);
    return [];
  }
};
