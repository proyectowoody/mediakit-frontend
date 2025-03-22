import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "./submit";

export function Handle(
    id:number, titulo:string, descripcion: string, slug: string, 
    contenido: string, categoria: string, imagenesFile: File[]
) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const respuesta = await handleSubmit(event, id, titulo, descripcion, slug, categoria, contenido, imagenesFile);

        if (respuesta?.data?.message) {
            navigate('/blog-admin');
        }

        setIsLoading(false);
    };

    return { handleSubmitForm, isLoading };
}