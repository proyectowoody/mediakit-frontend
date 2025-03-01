import axios from "axios";
import { getUserEmailFromToken } from "../../components/ts/emailFromToken";
import { linkBackend } from "../url";

export const Submit = async (
  articulo_id: number,
)=> {
  const email_user = getUserEmailFromToken();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  };

  try {
   await axios.post(
      `${linkBackend}/favorito`,
      { articulo_id, email_user },
      { headers }
    );
  } catch (error: any) {
    alert(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};
