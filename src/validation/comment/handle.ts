import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { SubmitComment } from "./submit";

function HandleComment(
  id: string,
  buy_id: string,
  descripcion: string,
) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await SubmitComment(
      event,
      id,
      buy_id,
      descripcion
    );

    if (response) {
      setTimeout(() => {
        navigate("/buy"); 
      }, 1000);
      
      return true;
    }

    setIsLoading(false);
  };

  return { handleSubmit, isLoading };
}

export default HandleComment;
