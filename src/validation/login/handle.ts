import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Submit } from "./submit";

function Handle(email: string, password: string) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const success = await Submit(email, password);

    if (success) {
      navigate("/authguard"); 
      return true;
    }

    setIsLoading(false);
  };

  return { handleSubmit, isLoading };
}

export default Handle;
