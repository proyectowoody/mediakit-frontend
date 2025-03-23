import api from "../axios.config";

export interface SesionData {
    token: string;
  }

export const submitUrls = async (tokens: string) =>  {

    const token = decodeURIComponent(tokens.replace(/\s/g, '+'));

    try {
        const response = await api.patch("/users/tokens", { token });
        return { token: response.data.token };
    } catch (error: any) {
        console.error("Error en submitUrls:", error);
        return null;
    }
    
};
