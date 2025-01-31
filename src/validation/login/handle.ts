import { useNavigate } from "react-router-dom";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Submit } from "./submit";

export interface UserData {
  name: string;
  email: string;
  role: string;
  id: number;
}

function Handle(
  email: string,
  password: string,
  setEmail: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>
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
      setEmail,
      setPassword
    );

    if (shipment) {
      const { token, name, email, role, id } = shipment;

      localStorage.setItem("ACCESS_TOKEN", token);

      const sessionData: UserData = {
        name,
        email,
        role,
        id,
      };

      localStorage.setItem("USER_SESSION", JSON.stringify(sessionData));

      setTimeout(() => {
        navigate("/authguard");
      }, 3000);
    }

    setIsLoading(false);
  };

  return { handleSubmit, isLoading };
}

export default Handle;
