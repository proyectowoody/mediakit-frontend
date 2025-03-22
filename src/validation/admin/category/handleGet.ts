import api from "../../axios.config";

export async function handleGet() {
    try {
        const response = await api.get("/categorias");
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}

export async function handleGetCategoriaClient() {
    try {
        const response = await api.get("/categorias/subcategorias");
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}
