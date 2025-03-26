import axios from "axios";
import { linkBackend } from "../../url";

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  subcategorias: { id: number; nombre: string }[]; 
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
  precioActual: number;
  discount: number;
  imagenes: Imagen[];
}

export async function handleGetSearch(query: string = ""): Promise<Articulo[]> {
  try {
    const response = await axios.get<Articulo[]>(`${linkBackend}/articulos?search=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud GET:", error);
    throw error;
  }
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

export async function handleGetAllArticle(): Promise<Articulo[]> {
  try {
    const response = await axios.get<Articulo[]>(`${linkBackend}/articulos/all`);
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
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud GET:", error);
    throw error;
  }
}
