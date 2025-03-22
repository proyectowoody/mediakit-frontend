import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Message from "../../components/message";
import HandleComment from "../../validation/comment/handle";
import useAuthProtection from "../../components/ts/useAutProteccion";

function Comment() {

    useAuthProtection();

    const [descripcion, setDescripcion] = useState('');
    const { handleSubmit, isLoading } = HandleComment(descripcion);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-quicksand">
            <Header />
            <div className="mb-10 mt-32 max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative">
                <div className="px-6 py-6 lg:px-8">

                    <h2 className="text-3xl font-semibold text-[#6E9475] text-center mb-4" data-translate>
                        ¡Cuéntanos tu experiencia de compra!
                    </h2>

                    <p className="text-gray-600 text-center mb-6">
                        Queremos mejorar nuestro servicio. ¿Cómo fue tu experiencia con tu compra? 🛍️
                    </p>

                    <Message />

                    <form onSubmit={handleSubmit} className="flex flex-col h-full">
                        <div className="mb-4 w-full flex flex-col h-full">
                            <label className="block text-[#2F4F4F] font-medium mb-1" data-translate>
                                Escribe tu comentario:
                            </label>
                            <textarea
                                name="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                className="w-full flex-grow px-4 py-3 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475] resize-none"
                                placeholder="Ejemplo: Me encantó la rapidez del envío y la calidad del producto."
                                rows={4}
                            />
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-[#6E9475] text-white py-2 rounded-lg font-medium hover:bg-[#5C8465] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading || descripcion.trim() === ""}
                            data-translate
                        >
                            {isLoading ? "Enviando..." : "Enviar comentario"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Comment;
