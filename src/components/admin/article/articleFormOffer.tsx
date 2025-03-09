import { useEffect, useState } from "react";
import User from "../../../validation/admin/article/user";
import Message from "../../message";
import { HandleDiscount } from "../../../validation/admin/article/handle";

function ArticleFormOffer({ toggleModalOffer }: any) {
    const {
        id,
        setId,
        precio,
        setPrecio,
        isOpenOffer,
    } = User();

    const [descuento, setDescuento] = useState(0);
    const [discount, setDiscount] = useState(precio);

    useEffect(() => {
        if (toggleModalOffer) {
            const articuloSeleccionado = localStorage.getItem("articuloOfferSeleccionado");
            if (articuloSeleccionado) {
                const articulo = JSON.parse(articuloSeleccionado);
                setId(articulo.id || "");
                setPrecio(articulo.precio || 0);
            }
        }
    }, [toggleModalOffer]);

    useEffect(() => {
        calcularPrecioConDescuento();
    }, [precio, descuento]);

    const calcularPrecioConDescuento = () => {
        if (descuento >= 0 && descuento <= 100) {
            const precioConDescuento = precio - (precio * (descuento / 100));
            setDiscount(parseFloat(precioConDescuento.toFixed(2)));
        }
    };

    const handleClose = () => {
        localStorage.removeItem("articuloOfferSeleccionado");
        toggleModalOffer();
    };

    const { handleSubmitForm, isLoading } = HandleDiscount(
        id,
        discount
    );

    return (
        <div
            id="authentication-modal"
            className="bg-[#FAF3E0] bg-opacity-50 formPer fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
            aria-hidden={!isOpenOffer ? "true" : undefined}
        >
            <div
                className="relative w-full max-w-md max-h-full"
                aria-hidden={isOpenOffer ? "false" : "true"}
            >
                <div className="relative bg-[#FAF3E0] rounded-lg shadow-lg">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-[#2F4F4F] bg-transparent hover:bg-[#D4C9B0] hover:text-[#2F4F4F] rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                        data-modal-hide="authentication-modal"
                        onClick={handleClose}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-[#2F4F4F]">Oferta</h3>
                        <Message />
                        <form className="space-y-6" onSubmit={handleSubmitForm}>
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-medium text-[#2F4F4F]">
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
                                <label className="block mb-2 text-sm font-medium text-[#2F4F4F]">
                                    Descuento (%)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5"
                                    placeholder="Ingrese el descuento"
                                    value={descuento}
                                    onChange={(e) => {
                                        let value = Number(e.target.value);
                                        if (value < 0) value = 0;
                                        if (value > 100) value = 100;
                                        setDescuento(value);
                                    }}
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-medium text-[#2F4F4F]">
                                    Precio con descuento
                                </label>
                                <input
                                    type="text"
                                    className="bg-[#E5E5E5] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg block w-full p-2.5"
                                    value={discount}
                                    readOnly
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="mb-10 mt-5 w-full text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Agregando..." : "Agregar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleFormOffer;
