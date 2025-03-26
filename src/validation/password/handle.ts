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

    const success = await Submit(
      event,
      password,
      verPassword
    );

    if (success) {
      navigate("/");
      return true;
    }

    setIsLoading(false);
  };

  return { handleSubmit, isLoading };
}

export default Handle;

export function HandleData(
  password: string,
  setPassword:any,
  verPassword: string,
  setVerPassword: any
) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    await Submit(
      event,
      password,
      verPassword
    );

    setIsLoading(false);
    setPassword('');
    setVerPassword('');
  };

  return { handleSubmit, isLoading };
}
