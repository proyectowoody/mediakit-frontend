import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { SubmitAddress } from "../address/submit";

function HandleAddress(
  id: string,
  calle: string,
  numero: string,
  piso_puerta: string,
  codigo_postal: string,
  ciudad: string,
  provincia: string,
  comunidad_autonoma: string
) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await SubmitAddress(event, id, calle, numero, piso_puerta, codigo_postal, ciudad,
      provincia, comunidad_autonoma);

    if (response) {
      setTimeout(() => {
        navigate("/comprar"); 
      }, 1000);
      
      return true;
    }

    setIsLoading(false);
  };

  return { handleSubmit, isLoading };
}

export default HandleAddress;
