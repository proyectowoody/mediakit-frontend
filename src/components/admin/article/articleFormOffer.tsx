import { useEffect, useState } from "react";
import User from "../../../validation/admin/article/user";
import Message from "../../message";
import { HandleDiscount } from "../../../validation/admin/article/handle";

function ArticleFormOffer() {
    const {
        id,
        setId,
        precio,
        setPrecio,
    } = User();

    const [discount, setDiscount] = useState(precio);

    useEffect(() => {
        const articuloSeleccionado = localStorage.getItem("articuloOfferSeleccionado");
        if (articuloSeleccionado) {
            const articulo = JSON.parse(articuloSeleccionado);
            setId(articulo.id || "");
            setPrecio(articulo.precio || 0);
        }
    }, []);

    const { handleSubmitForm, isLoading } = HandleDiscount(
        id,
        discount
    );

    return (
        <div className="mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative p-6">
            <div className="absolute top-6 right-6 flex space-x-2">
                <a className="text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-xs px-3 py-1.5" href="/ofertas" data-translate>
                    Oferta
                </a>
                <a className="text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-xs px-3 py-1.5" href="/articulos" data-translate>
                    Artículo
                </a>
            </div>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-[#2F4F4F]" data-translate>Descuentos</h3>
                <Message />
                <form className="space-y-6" onSubmit={handleSubmitForm}>
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                            Precio
                        </label>
                        <input
                            type="number"
                            className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5 placeholder-[#D4C9B0]"
                            placeholder="Precio"
                            value={precio}
                            onChange={(e) => setPrecio(Number(e.target.value))}
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                            Descuento (%)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5"
                            placeholder="Ingrese el descuento"
                            value={discount}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="mb-10 mt-5 w-full text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            disabled={isLoading} data-translate
                        >
                            {isLoading ? "Agregando..." : "Agregar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ArticleFormOffer;
