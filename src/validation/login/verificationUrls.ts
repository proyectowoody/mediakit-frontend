import { submitUrls } from "./submitUrls";

async function VerificationUrls(tokens: any, navigate: (path: string) => void): Promise<boolean> {

    if (tokens) {
        const tokenData = await submitUrls(tokens);

        if (tokenData) {
            const { token } = tokenData;

            localStorage.setItem("ACCESS_TOKEN", token);

            setTimeout(() => {
                navigate("/home");
            }, 1000);

            return true;
        }
    }

    return false;
}

export default VerificationUrls;