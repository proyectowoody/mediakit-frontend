import { FormEvent, useState } from "react";
import { handleSubmit, handleSubmitDiscount } from "./handleSubmit";

function Handle(
    id: number, nombre: string,  categoria: string | number, 
    estado: string, imagen: File [] , 
    descripcion: string, precio:number,  supplier: string | number, 
) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const respuesta = await handleSubmit(event, id, nombre, categoria, estado, imagen, descripcion, precio, supplier);

        if (respuesta?.data?.message) {
            window.location.reload();
        }

        setIsLoading(false);
    };

    return { handleSubmitForm, isLoading };

}

export default Handle;

export function HandleDiscount(
    id: number, discount:number,
) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const respuesta = await handleSubmitDiscount(event, id, discount);

        if (respuesta?.data?.message) {
            window.location.reload();
        }

        setIsLoading(false);
    };

    return { handleSubmitForm, isLoading };

}





