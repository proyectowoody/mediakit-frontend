import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Submit } from './submit';

function Handle(formData: {
    dni: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: string,
    birthDate: string,
    address: string,
    city: string,
    newsletter: boolean,
    marketingSource: string,
    captchaValue: string
}) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        // const shipment = await Submit(event, formData);
        // if (shipment) {
        //     setTimeout(() => {
        //         navigate("/verification");
        //     }, 1000);
        // }

        setIsLoading(false);
    };

    return { handleSubmit, isLoading };
}

export default Handle;
