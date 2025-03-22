import api from "../axios.config";
import { linkBackend } from "../url";

export const handleGet = async () => {
  try {
    const response = await api.get(`${linkBackend}/buy`);
    return response.data;
  } catch (error: any) {
    console.error("Error en la compra:", error);
    return [];
  }
};
