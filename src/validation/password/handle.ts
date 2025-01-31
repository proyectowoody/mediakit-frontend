import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Submit } from "./submit";

export interface UserData {
  name: string;
  email: string;
  role: string;
  id: number;
}

function Handle(
  password: string,
  verPassword: string,
  setPassword: Dispatch<SetStateAction<string>>,
  setVerPassword: Dispatch<SetStateAction<string>>
) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const shipment = await Submit(
      event,
      password,
      verPassword,
      setPassword,
      setVerPassword
    );

    if (shipment) {
      const { tokens, name, email, role, id } = shipment;
      localStorage.setItem("ACCESS_TOKEN", tokens);
      const sessionData: UserData = {
        name,
        email,
        role,
        id,
      };

      localStorage.setItem("USER_SESSION", JSON.stringify(sessionData));
      setTimeout(() => {
        navigate("/shopping");
      }, 3000);
    }
    setIsLoading(false);
  };

  return { handleSubmit, isLoading };
}

export default Handle;
