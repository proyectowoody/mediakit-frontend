import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useEffect } from "react";
import roleAdmin from "../../components/ts/roleAdmin";

function Faqs() {

    const navigate = useNavigate();

    useEffect(() => {
        roleAdmin(navigate);
    }, [navigate]);

    return (
        <div>
            <Header />
            <h1>Preguntas frecuentes</h1>
            <Footer />
            <h1>Faqs</h1>
        </div>
    );
}

export default Faqs;