import { useEffect, useRef, useState } from "react";
import { SessionModal } from "./toast";
import { useNavigate } from "react-router-dom";
import { handleGetUserSession } from "./ts/fetchUser";

function CierreSesion() {

    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const INACTIVITY_TIME = 60 * 60 * 1000;
    // const INACTIVITY_TIME = 5 * 1000; 
    const inactivityTimer = useRef<number | null>(null);

    const resetInactivityTimer = () => {
        if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
        }

        inactivityTimer.current = setTimeout(() => {
            setShowModal(true);
        }, INACTIVITY_TIME);
    };

    useEffect(() => {

        if (isLogged) {
            setIsLogged(true);
            resetInactivityTimer();

            window.addEventListener("mousemove", resetInactivityTimer);
            window.addEventListener("keydown", resetInactivityTimer);

            return () => {
                if (inactivityTimer.current) {
                    clearTimeout(inactivityTimer.current);
                }
                window.removeEventListener("mousemove", resetInactivityTimer);
                window.removeEventListener("keydown", resetInactivityTimer);
            };
        }

    }, [isLogged]);

    return (
        <div>
            {isLogged && (
                <SessionModal
                    isVisible={showModal}
                    onClose={() => {
                        localStorage.clear();
                        localStorage.removeItem("guest_cart");
                        setIsLogged(false);
                        navigate("/iniciar-sesion");
                        setShowModal(false);
                        resetInactivityTimer();
                    }}
                    onContinueSession={() => {
                        setShowModal(false);
                        localStorage.setItem("TOKEN_EXPIRATION", (Date.now() + INACTIVITY_TIME).toString());
                        resetInactivityTimer();
                    }}
                    countdownStart={60}
                />
            )}
        </div>
    );
}

export default CierreSesion;