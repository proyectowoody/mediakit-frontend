

import { FormEvent, useState } from "react";
import { SubmitAddress } from "../address/submit";

function HandleAddress(
  id: number,
  pais: string,
  provincia: string,
  localidad: string,
  codigo_postal: string,
  tipo_via: string,
  envio: boolean,
  facturacion: boolean,
  adicional: string,
  indicacion: string,
  ruta: string
) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    await SubmitAddress(
      event,
      id,
      pais,
      provincia,
      localidad,
      codigo_postal,
      tipo_via,
      envio,
      facturacion,
      adicional,
      indicacion,
      ruta
    );

    setIsLoading(false);
  };

  return { handleSubmit, isLoading };
}

export default HandleAddress;
