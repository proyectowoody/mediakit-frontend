import { linkBackend } from "../url";
import api from "../axios.config";

export async function handleSubmitPaypal() {
    try {
        const responsePaypal = await api.get(`${linkBackend}/paypal/create`);

        const primerEnlace = responsePaypal.data.primerEnlace;
        const hrefDelEnlace = primerEnlace.href;
        window.location.href = hrefDelEnlace;
    } catch (error) {
        throw error;
    }
}