import { linkBackend } from "../url";
import api from "../axios.config";

export const SubmitFavorite = async (
  articulo_id: number,
) => {

  try {
    await api.post(
      `${linkBackend}/favorito`, { articulo_id },
    );
  } catch (error: any) {
    alert(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};
