import api from "../axios.config";
import { linkBackend } from "../url";

export const handleGetUserData = async () => {
  try {
    const response = await api.get(`${linkBackend}/datauser`);
    return response.data;
  } catch (error: any) {
    console.error("Error en la direccion:", error);
    return [];
  }
};