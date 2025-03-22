import { linkBackend } from "../url";
import api from "../axios.config";

export const handleGetCountCar = async () => {

  try {
    const response = await api.get(`${linkBackend}/carrito/count`);
    return response.data.total;
  } catch (error: any) {
    console.error("Error del carrito:", error);
    return [];
  }
};

export const handleGetGuestCartCount = () => {
  try {
    const stored = localStorage.getItem("guest_cart");
    const guestCart = stored ? JSON.parse(stored) : [];
    return guestCart.length;
  } catch (error) {
    console.error("Error al contar carrito de invitado:", error);
    return 0;
  }
};

export const handleGetCar = async () => {
  try {
    const response = await api.get(`${linkBackend}/carrito`);
    return response.data;
  } catch (error: any) {
    console.error("Error en el carrito:", error);
    return [];
  }
};

