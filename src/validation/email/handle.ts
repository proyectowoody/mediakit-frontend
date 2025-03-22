import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from 'react';
import { Submit } from "./submit";

function Handle(
    email: string,
) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
    
        await Submit(event, email);
        navigate("/verificacion");

        setIsLoading(false);
    };

    return { handleSubmit, isLoading };
}

export default Handle;