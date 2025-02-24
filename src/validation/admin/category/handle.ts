import { FormEvent, useState } from "react";
import { handleSubmit } from "./handleSubmit";


function Handle(
    id: number, nombre: string, descripcion: string, 
) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const respuesta = await handleSubmit(event, id, nombre, descripcion);

        if (respuesta?.data?.message) {
            window.location.reload();
        }

        setIsLoading(false);
    };

    return { handleSubmitForm, isLoading };

}

export default Handle;
