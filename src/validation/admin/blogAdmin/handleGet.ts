import axios from "axios";
import { linkBackend } from "../../url";

interface Imagen {
    id: number;
    url: string;
}

export interface Blog {
    id: number;
    titulo: string;
    descripcion: string;
    slug: string;
    categoria: string;
    contenido: string;
    imagenes: Imagen[];
}

export async function handleGet(): Promise<Blog[]> {
    try {
        const response = await axios.get<Blog[]>(`${linkBackend}/blog`);
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}
