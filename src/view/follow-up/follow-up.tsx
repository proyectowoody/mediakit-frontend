import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useEffect } from "react";
import roleAdmin from "../../components/ts/roleAdmin";

function FollowUp() {

    const navigate = useNavigate();

    useEffect(() => {
        roleAdmin(navigate);
    }, [navigate]);

    return (
        <div>
            <Header />
            <h1>Follow Up</h1>
            <Footer />
        </div>
    );
}

export default FollowUp;