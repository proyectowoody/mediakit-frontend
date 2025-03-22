import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Submit } from './submit';

function Handle(
    name: string,
    lastName: string,
    email: string,
    password: string
) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        await Submit(event, name, lastName, email, password)
        navigate("/verificacion");
        setIsLoading(false);
    };

    return { handleSubmit, isLoading };
}

export default Handle;