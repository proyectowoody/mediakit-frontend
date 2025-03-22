import { FormEvent, useState } from "react";
import { handleSubmit, handleSubmitDiscount } from "./handleSubmit";
import { useNavigate } from "react-router-dom";

export function Handle(
    id: number, nombre: string, categoria: string | number,
    estado: string, descripcion: string, precio: number, supplier: string | number,
    imagenesFile: File[]
) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const respuesta = await handleSubmit(event, id, nombre, categoria, estado, descripcion, precio, supplier, imagenesFile);

        if (respuesta?.data?.message) {
            navigate('/articulos');
        }

        setIsLoading(false);
    };

    return { handleSubmitForm, isLoading };
}

export function HandleDiscount(
    id: number, discount: number,
) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const respuesta = await handleSubmitDiscount(event, id, discount);

        if (respuesta?.data?.message) {
            navigate('/ofertas');
        }

        setIsLoading(false);
    };

    return { handleSubmitForm, isLoading };

}





