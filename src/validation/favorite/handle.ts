import { linkBackend } from "../url";
import api from "../axios.config";

export const handleGetFavorito = async () => {
  try {
    const response = await api.get(`${linkBackend}/favorito`);
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener los favoritos:", error);
    return [];
  }
};
