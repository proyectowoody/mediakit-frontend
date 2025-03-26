import { useState, useEffect } from "react";
import { handleGet } from "../../validation/buy/handle";
import useAuthProtection from "../../components/ts/useAutProteccion";
import { handleGetUserSession } from "../../components/ts/fetchUser";

export interface Address {
    id: number;
    pais: string;
    provincia: string;
    localidad: string;
    codigo_postal: string;
    tipo_via: string;
    numero: string;
    envio: boolean;
    facturacion: boolean;
    adicional?: string;
    indicacion?: string;
}

export interface Article {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagenes: { id: number; url: string }[];
}

export interface DetailBuy {
    id: number;
    fecha: string;
    article: Article;
}

export interface Buy {
    id: number;
    fecha: string;
    details: DetailBuy[];
}

function BuyPage() {

    useAuthProtection();

    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    const [purchases, setPurchases] = useState<Buy[]>([]);

    useEffect(() => {
        if (isLogged) {
            handleGet()
                .then((data) => {
                    const formattedPurchases = data.map((buy: any) => ({
                        id: buy.id,
                        fecha: new Date(buy.fecha).toLocaleDateString(),
                        details: buy.details.map((detail: any) => ({
                            id: detail.id,
                            fecha: new Date(detail.fecha).toLocaleDateString(),
                            article: {
                                id: detail.article.id,
                                nombre: detail.article.nombre,
                                precio: detail.article.precio ?? null,
                                descripcion: detail.article.descripcion,
                                imagenes: detail.article.imagenes || [],
                            },
                        })),
                    }));

                    setPurchases(formattedPurchases);
                })
                .catch((error) => {
                    console.error("Error obteniendo compras:", error);
                });
        }
    }, [isLogged]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="py-16 bg-white">
            <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-2" data-translate>
                Tus Compras
            </h2>

            <div className="max-w-4xl mx-auto px-4">
                {purchases.length > 0 ? (
                    purchases.map((purchase) => (
                        <div
                            key={purchase.id}
                            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition duration-300 mb-6 p-4"
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-2 mb-3">
                                Compra del
                                <h3 className="text-base sm:text-lg font-semibold text-[#2F4F4F]" data-translate>
                                    {purchase.fecha}
                                </h3>
                                <button
                                    className="mt-2 sm:mt-0 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs font-semibold"
                                    onClick={() => console.log(`Iniciar devolución para la compra #${purchase.id}`)} data-translate
                                >
                                    Devolver
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {purchase.details.map((detail) => (
                                    <div
                                        key={detail.id}
                                        className="bg-[#F8F8F8] rounded-lg p-3 shadow-sm hover:shadow-md transition text-sm max-w-sm w-full mx-auto"
                                    >
                                        {detail.article.imagenes.length > 0 ? (
                                            <img
                                                src={detail.article.imagenes[0].url}
                                                alt={detail.article.nombre}
                                                className="w-full h-32 object-cover rounded-md mb-2"
                                            />
                                        ) : (
                                            <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded-md text-gray-400 text-xs" data-translate>
                                                Sin imágenes
                                            </div>
                                        )}
                                        <h4 className="font-semibold text-[#2F4F4F] truncate" data-translate>{detail.article.nombre}</h4>
                                        <p className="text-gray-600 line-clamp-2" data-translate>{detail.article.descripcion}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-12 text-sm" data-translate>
                        No tienes compras registradas aún.
                    </p>
                )}
            </div>
        </section>
    );
}

export default BuyPage;

