import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerificationUrls() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }
}

export default VerificationUrls;
