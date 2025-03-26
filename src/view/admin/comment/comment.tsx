import { useState } from "react";
import CommentHeader from "../../../components/admin/comment/commentHeader";
import ComTableArt from "../../../components/admin/comment/comTableArt";
import ComTableBuy from "../../../components/admin/comment/comTableBuy";

function ComentarioAdmin() {
    const [vista, setVista] = useState<"articulo" | "compra">("compra");

    return (
        <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
            <CommentHeader setVista={setVista} vista={vista} />
            {vista === "compra" ? <ComTableBuy /> : <ComTableArt />}
        </div>
    );
}

export default ComentarioAdmin;
