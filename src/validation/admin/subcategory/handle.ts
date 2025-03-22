import { FormEvent, useState } from "react";
import { handleSubmit } from "./handleSubmit";
import { useNavigate } from "react-router-dom";

function Handle(
    id:number, nombre:string, categoriaId:number
) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const respuesta = await handleSubmit(event, id, nombre, categoriaId);

        if (respuesta?.data?.message) {
            navigate('/subcategorias');
        }

        setIsLoading(false);
    };

    return { handleSubmitForm, isLoading };

}

export default Handle;
