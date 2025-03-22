import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { SubmitComment } from "./submit";

function HandleComment(
  descripcion: string,
) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    await SubmitComment(event, descripcion);
    navigate("/comprar");

    setIsLoading(false);
  };

  return { handleSubmit, isLoading };
}

export default HandleComment;
