import api from "../axios.config";

export interface SesionData {
    token: string;
  }

export const submitUrls = async (token: string): Promise<SesionData | null> =>  {
    try {
        const response = await api.patch("/users/tokens", { token });
        return { token: response.data.token };
    } catch (error: any) {
        console.error("Error en submitUrls:", error);
        return null;
    }
};
