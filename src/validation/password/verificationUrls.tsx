import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { linkBackend } from "../url";

function VerificationUrls() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const token: string | null = urlParams.get("token");

  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/iniciar-sesion");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axios.get(`${linkBackend}/users/validate-token`, {
          params: { token },
          withCredentials: true,
        });

        setIsValid(response.data.success);
      } catch (error) {
        console.error("Error validando token:", error);
        setIsValid(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  useEffect(() => {
    if (isValid === false) {
      navigate("/iniciar-sesion");
    }
  }, [isValid, navigate]);

  return isValid === null ? <p>Validando token...</p> : <></>;
}

export default VerificationUrls;
