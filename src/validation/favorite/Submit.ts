import axios from "axios";
import { getUserEmailFromToken } from "../../components/ts/emailFromToken";
import { linkBackend } from "../url";

export const Submit = async (
  articulo_id: number,
): Promise<number> => {
  const email_user = getUserEmailFromToken();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  };

  try {
    const response = await axios.post(
      `${linkBackend}/favorito`,
      { articulo_id, email_user },
      { headers }
    );

    return response.data.articulo_id;
  } catch (error: any) {
    alert(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};
