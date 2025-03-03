import axios from "axios";
import { linkBackend } from "../url";
import { getUserEmailFromToken } from "../../components/ts/emailFromToken";

export async function handleSubmitPaypal() {
    const email = getUserEmailFromToken();
    try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const responsePaypal = await axios.get(`${linkBackend}/paypal/create/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const primerEnlace = responsePaypal.data.primerEnlace;
        const hrefDelEnlace = primerEnlace.href;
        window.location.href = hrefDelEnlace;
    } catch (error) {
        throw error;
    }
}