import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "./submit";

export function Handle(id: number, codigo: string, descuento: number) {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const respuesta = await handleSubmit(event, id, codigo, descuento);

        if (respuesta?.data?.message) {
            navigate('/codigo-descuento');
        }

        setIsLoading(false);
    };

    return { handleSubmitForm, isLoading };
}