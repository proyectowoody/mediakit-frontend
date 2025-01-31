import { submitUrls } from "./submitUrls";


export interface UserData {
    name: string;
    email: string;
}

async function VerificationUrls(tokens: any, navigate: (path: string) => void): Promise<boolean> {
    if (tokens) {
        const tokenData = await submitUrls(tokens);

        if (tokenData) {
            const { token, name, email } = tokenData;

            localStorage.setItem("ACCESS_TOKEN", token);

            const sessionData: UserData = {
                name,
                email,
            };

            localStorage.setItem("USER_SESSION", JSON.stringify(sessionData));

            setTimeout(() => {
                navigate("/home");
            }, 1000);

            return true;
        }
    }

    return false;
}

export default VerificationUrls;
