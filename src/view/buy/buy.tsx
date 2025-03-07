import { useState, useEffect } from "react";
import BannerImage from "../../components/bannerImage";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { handleGet } from "../../validation/buy/handle";
import { handleGetAddress } from "../../validation/address/handleGet";
import { useNavigate } from "react-router-dom";
import { handleGetComment } from "../../validation/comment/handleGet";
import roleAdmin from "../../components/ts/roleAdmin";
import authRedirectNoToken from "../../validation/autRedirectNoToken";

interface Article {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagenes: { id: number; url: string }[];
}

interface DetailBuy {
    id: number;
    fecha: string;
    article: Article;
}

export interface Buy {
    id: number;
    fecha: string;
    details: DetailBuy[];
}

interface Address {
    id: number;
    calle: string;
    numero: string;
    piso_puerta?: string;
    codigo_postal: string;
    ciudad: string;
    provincia: string;
    comunidad_autonoma: string;
    pais: string;
}

interface Comments {
    id: number;
    buy_id: string;
    descripcion: string;
}

function BuyPage() {

    authRedirectNoToken("/");

    const navigate = useNavigate();

    useEffect(() => {
        roleAdmin(navigate);
    }, [navigate]);

    const [purchases, setPurchases] = useState<Buy[]>([]);
    const [address, setAddress] = useState<Address | null>(null);
    const [comment, setComment] = useState<Comments | null>(null);;

    useEffect(() => {
        handleGetAddress()
            .then((data) => {
                if (data && Object.keys(data).length > 0) {
                    setAddress(data);
                } else {
                    setAddress(null);
                }
            })
            .catch((error) => {
                console.error("Error obteniendo la dirección:", error);
            });
    }, []);

    useEffect(() => {
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
                handleGetComment(formattedPurchases)
                    .then((data) => {
                        setComment(data);
                    })
                    .catch((error) => {
                        console.error("Error obteniendo la dirección:", error);
                    });
            })
            .catch((error) => {
                console.error("Error obteniendo compras:", error);
            });
    }, []);

    const handleAddOrUpdateAddress = () => {
        if (address) {
            const queryParams = new URLSearchParams({
                id: address.id.toString(),
                calle: address.calle,
                numero: address.numero,
                piso_puerta: address.piso_puerta || "",
                codigo_postal: address.codigo_postal,
                ciudad: address.ciudad,
                provincia: address.provincia,
                comunidad_autonoma: address.comunidad_autonoma,
                pais: address.pais,
            }).toString();

            navigate(`/address?${queryParams}`);
        }
    };

    const handleComment = (purchaseId: number) => {
        const queryParams = new URLSearchParams({
            buy_id: purchaseId.toString(),
        }).toString();

        navigate(`/comment?${queryParams}`);
    };

    useEffect(() => {

    }, []);

    const handleAddOrUpdateComment = () => {
        if (comment) {
            const queryParams = new URLSearchParams({
                id: comment.id.toString(),
                descripcion: comment.descripcion,
            }).toString();

            navigate(`/comment?${queryParams}`);
        }
    };

    return (
        <div className="font-quicksand">
            <Header />
            <BannerImage />

            <section className="py-16 bg-white">
                <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-2">
                    Tus Compras
                </h2>

                <div className="text-center mb-6 text-gray-700">
                    {address ? (
                        <div>
                            <p>
                                <strong>Dirección de entrega:</strong> {address.calle}, {address.numero}, {address.piso_puerta ? `${address.piso_puerta}, ` : ""}
                                {address.codigo_postal}, {address.ciudad}, {address.provincia}, {address.comunidad_autonoma}, {address.pais}
                            </p>
                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition duration-300"
                                onClick={handleAddOrUpdateAddress}
                            >
                                Actualizar dirección
                            </button>
                        </div>
                    ) : (
                        <a href="/address">
                            <button
                                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition duration-300"
                            >
                                Agregar dirección
                            </button>
                        </a>
                    )}
                </div>

                <div className="max-w-6xl mx-auto px-4">
                    {purchases.length > 0 ? (
                        purchases.map((purchase) => (
                            <div
                                key={purchase.id}
                                className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 mb-6 p-4 relative"
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between items-center">
                                    <h3 className="text-xl font-bold text-[#2F4F4F]">
                                        Compra - Fecha: {purchase.fecha}
                                    </h3>
                                    <a href="https://wa.me/18098820434" target="_blank">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 text-xs sm:text-sm md:text-base rounded-lg font-semibold hover:bg-red-600 transition duration-300 w-auto sm:w-fit mt-2 sm:mt-0"
                                            onClick={() => console.log(`Iniciar devolución para la compra #${purchase.id}`)}
                                        >
                                            Hacer devolución
                                        </button>
                                    </a>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                    {purchase.details.map((detail) => (
                                        <div
                                            key={detail.id}
                                            className="border border-gray-200 rounded-lg shadow-sm p-4"
                                        >
                                            {detail.article.imagenes.length > 0 ? (
                                                <img
                                                    src={detail.article.imagenes[0].url}
                                                    alt={detail.article.nombre}
                                                    className="w-full h-40 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <p className="text-center text-gray-400">Sin imágenes</p>
                                            )}

                                            <h4 className="text-lg font-semibold text-[#2F4F4F] mt-2">
                                                {detail.article.nombre}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {detail.article.descripcion}
                                            </p>
                                            <p className="text-[#6E9475] font-bold mt-2">
                                                {detail.article.precio !== null
                                                    ? `${detail.article.precio.toFixed(2)} €`
                                                    : "Precio no disponible"}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 text-right">
                                    {comment ? (
                                        <div className="flex flex-col items-start space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                                            <p className="text-gray-700 text-sm sm:text-base">
                                                <strong>Comentario:</strong> {comment.descripcion}
                                            </p>
                                            <button
                                                className="w-full sm:w-auto bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition duration-300" onClick={handleAddOrUpdateComment}
                                            >
                                                Actualizar comentario
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition duration-300"
                                            onClick={() => handleComment(purchase.id)}
                                        >
                                            Comentar
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No tienes compras registradas aún.
                        </p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default BuyPage;

