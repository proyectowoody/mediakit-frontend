import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import roleAdmin from "../../components/ts/roleAdmin";
import { useEffect } from "react";

function Terms() {

  const navigate = useNavigate();

    useEffect(() => {
        roleAdmin(navigate);
    }, [navigate]);

  return (
    <div>
      <Header />
      <h1>Terms</h1>
      <Footer />
    </div>
  );
}

export default Terms;