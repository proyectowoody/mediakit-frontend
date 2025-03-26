import { FormEvent, useState } from "react";
import { SubmitDatosEliminar, SubmitDatosPersonales } from "./submit";
import { useNavigate } from "react-router-dom";

export function HandleDatosPersonales(
    id: number,
    fechaNacimiento: string,
    tipoDocumento: string,
    numeroDocumento: string,
    genero: string,
    telefono: string,
    ruta: string
) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        await SubmitDatosPersonales(
            event,
            id,
            fechaNacimiento,
            tipoDocumento,
            numeroDocumento,
            genero,
            telefono,
            ruta
        );

        setIsLoading(false);
    };

    return { handleSubmit, isLoading };
}

export function HandleDatosEliminar(
    confirmacion: string,
    setConfirmacion: any,
) {
    const [isLoadingDelete, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitDelete = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        await SubmitDatosEliminar(event, confirmacion);
        setTimeout(() => {
            navigate("/iniciar-sesion");
        }, 3000);
        setConfirmacion('');
        setIsLoading(false);
    };

    return { handleSubmitDelete, isLoadingDelete };
}


