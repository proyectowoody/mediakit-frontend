import { useState, FormEvent } from "react";
import { SubmitSuscribe } from "./submit";

export function useHandleSuscribe(email: string, setEmail: (value: string) => void) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitSuscribe = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const success = await SubmitSuscribe(event, email);

    setIsLoading(false);

    if (success) {
      setEmail("");
    }
  };

  return { handleSubmitSuscribe, isLoading };
}
