import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useEffect } from "react";
import roleAdmin from "../../components/ts/roleAdmin";

function Privacy() {

    const navigate = useNavigate();

    useEffect(() => {
        roleAdmin(navigate);
    }, [navigate]);

    return (
        <div>
            <Header />
            <h1>Privacy</h1>
            <p>Privacy content</p>
            <Footer />
        </div>
    );
} 

export default Privacy;