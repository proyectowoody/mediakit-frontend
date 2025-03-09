import axios from "axios";
import { linkBackend } from "../../url";

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Proveedor {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Imagen {
  id: number;
  url: string;
}

export interface Articulo {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: Categoria;
  supplier: Proveedor;
  fecha: string;
  estado: string;
  imagen: string;
  precio: number;
  discount: number;
  imagenes: Imagen[];
}

export async function handleGet(): Promise<Articulo[]> {
  try {
    const response = await axios.get<Articulo[]>(`${linkBackend}/articulos`);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud GET:", error);
    throw error;
  }
}

export async function handleGetOfertas() {
  try {
    const response = await axios.get(`${linkBackend}/articulos/ofertas`);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud GET:", error);
    throw error;
  }
}

export async function handleGetSelling() {
  try {
    const response = await axios.get(`${linkBackend}/detailbuy/top-selling`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud GET:", error);
    throw error;
  }
}
