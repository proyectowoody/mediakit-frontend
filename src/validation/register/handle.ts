import { useState, FormEvent, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { Submit } from './submit';

function Handle(
    name: string,
    lastName:string,
    email: string,
    password: string,
    isVerified: boolean,
    setName: Dispatch<SetStateAction<string>>,
    setLastName: Dispatch<SetStateAction<string>>,
    setEmail: Dispatch<SetStateAction<string>>,
    setPassword: Dispatch<SetStateAction<string>>,
    setisVerified: Dispatch<SetStateAction<boolean>>
) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const shipment = await Submit(event, name, lastName, email, password, isVerified, setName, setLastName, setEmail, setPassword, setisVerified);

        if (shipment) {
            setTimeout(() => {
                navigate("/verification");
            }, 1000);
        }

        setIsLoading(false);
    };

    return { handleSubmit, isLoading };
}

export default Handle;
