import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Submit } from "./submit";

function Handle(
  password: string,
  verPassword: string
) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const shipment = await Submit(
      event,
      password,
      verPassword
    );

    if (shipment) {
      const { tokens } = shipment;
      localStorage.setItem("ACCESS_TOKEN", tokens);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
    setIsLoading(false);
  };

  return { handleSubmit, isLoading };
}

export default Handle;
