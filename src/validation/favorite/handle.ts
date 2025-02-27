import axios from "axios";
import { linkBackend } from "../url";
import { getUserEmailFromToken } from "../../components/ts/emailFromToken";

export const handleGetFavorito = async () => {
  const email = getUserEmailFromToken();
  const token = localStorage.getItem("ACCESS_TOKEN");

  if (!email) {
    throw new Error("No se encontró el email en el token.");
  }

  try {
    const response = await axios.get(`${linkBackend}/favorito/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener los favoritos:", error);
    return [];
  }
};
