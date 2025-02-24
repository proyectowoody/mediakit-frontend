import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Submit } from "./submit";

function Handle(
  email: string,
  password: string,
) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const shipment = await Submit(
      event,
      email,
      password,
    );

    if (shipment) {
      const { token } = shipment;

      localStorage.setItem("ACCESS_TOKEN", token);

      setTimeout(() => {
        navigate("/authguard");
      }, 1000);
    }

    setIsLoading(false);
  };

  return { handleSubmit, isLoading };
}

export default Handle;
