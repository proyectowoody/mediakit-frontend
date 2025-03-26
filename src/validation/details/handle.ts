import { FormEvent, useState } from "react";
import { handleSubmitDetails } from "./submit";

function HandleDetails(
    id: number, comentario: string,     setComentario:any,
) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        await handleSubmitDetails(event, id, comentario);
        setIsLoading(false);
        setComentario('');
    };

    return { handleSubmitForm, isLoading };

}

export default HandleDetails;
