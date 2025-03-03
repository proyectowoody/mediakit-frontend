import axios from "axios";
import { linkBackend } from "../url";
import { getUserEmailFromToken } from "../../components/ts/emailFromToken";

export const handleGetCountCar = async () => {
  const email = getUserEmailFromToken();
  const token = localStorage.getItem("ACCESS_TOKEN");

  if (!token) {
    return null;
  }
  
  if (!email) {
    throw new Error("No se encontró el email en el token.");
  }

  try {
    const response = await axios.get(`${linkBackend}/carrito/count/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.total;
  } catch (error: any) {
    console.error("Error del carrito:", error);
    return [];
  }
};

export const handleGetCar = async () => {
  const email = getUserEmailFromToken();
  const token = localStorage.getItem("ACCESS_TOKEN");

  if (!email) {
    throw new Error("No se encontró el email en el token.");
  }

  try {
    const response = await axios.get(`${linkBackend}/carrito/${email}`, {
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

