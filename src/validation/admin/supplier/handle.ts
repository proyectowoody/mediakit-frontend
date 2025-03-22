import { FormEvent, useState } from "react";
import { handleSubmit } from "./handleSubmit";
import { useNavigate } from "react-router-dom";

function Handle(
    id: number, nombre: string, descripcion: string, imagen: File | null , 
) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const respuesta = await handleSubmit(event, id, nombre, descripcion, imagen );

        if (respuesta?.data?.message) {
            navigate('/proveedores');
        }

        setIsLoading(false);
    };

    return { handleSubmitForm, isLoading };

}

export default Handle;
