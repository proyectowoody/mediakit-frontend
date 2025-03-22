import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { submitUrls } from "./submitUrls";

function VerificationUrls() {
  
  const navigate = useNavigate();
  const tokens = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (tokens) {
      const verify = async () => {
        await submitUrls(tokens);
        navigate("/authguard");
      };
      verify();
    }
  }, [tokens, navigate]);

  return null;
}

export default VerificationUrls;
