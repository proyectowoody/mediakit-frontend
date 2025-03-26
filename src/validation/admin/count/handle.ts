import { FormEvent, useState } from "react";
import { SubmitCash } from "./submit";
import { handleGetCash } from "./handleGet";

export function HandleCash(
    cash: string,
) {
    const [isLoadingCount, setIsLoadingCount] = useState(false);

    const handleSubmitCount = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoadingCount(true);

        await SubmitCash(event, cash);
        handleGetCash();

        setIsLoadingCount(false);
    };

    return { handleSubmitCount, isLoadingCount };
}