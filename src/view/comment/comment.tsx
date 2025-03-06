import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Message from "../../components/message";
import HandleComment from "../../validation/comment/handle";

function Comment() {

    const [searchParams] = useSearchParams();

    const [formData, setFormData] = useState({
        id: "",
        buy_id: "",
        descripcion: ""
    });

    useEffect(() => {
        setFormData({
            id: searchParams.get("id") || "",
            buy_id: searchParams.get("buy_id") || "",
            descripcion: searchParams.get("descripcion") || "",
        });
    }, [searchParams]);

    const { handleSubmit, isLoading } = HandleComment(
        formData.id,
        formData.buy_id,
        formData.descripcion,
    );

    return (
        <div className="font-quicksand">
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen flex flex-col items-center justify-center px-6">
                <div className="max-w-lg w-full bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6">
                    <h2 className="text-3xl font-semibold text-[#6E9475] text-center mb-4">
                        {formData.id ? "Actualizar Comentario" : "Agregar Comentario"}
                    </h2>
                    <Message />
                    <form onSubmit={handleSubmit} className="flex flex-col h-full">
                        <input type="hidden" name="id" value={formData.id} />
                        <input type="hidden" name="buy_id" value={formData.buy_id} />
                        <div className="mb-4 w-full flex flex-col h-full">
                            <label className="block text-[#2F4F4F] font-medium mb-1">Comentario</label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                className="w-full flex-grow px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475] resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#6E9475] text-white py-2 rounded-lg font-medium hover:bg-[#5C8465] transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? "Guardando..." : formData.id ? "Actualizar Comentario" : "Guardar Comentario"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default Comment;
