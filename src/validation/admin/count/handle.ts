import { FormEvent, useState } from "react";
import { SubmitCash } from "./submit";

export function HandleCash(
    cash: string,
) {
    const [isLoadingCount, setIsLoadingCount] = useState(false);

    const handleSubmitCount = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoadingCount(true);

        await SubmitCash(event, cash);

        setIsLoadingCount(false);
    };

    return { handleSubmitCount, isLoadingCount };
}