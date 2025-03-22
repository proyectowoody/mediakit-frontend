import api from "../../validation/axios.config"; 

export async function getUserEmail(): Promise<string | null> {
    try {
        const response = await api.get("/users/me"); 
        return response.data.email || null;
    } catch (error) {
        console.error("Error obteniendo el email del usuario:", error);
        return null;
    }
}
