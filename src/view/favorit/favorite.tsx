import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { handleGetFavorito } from "../../validation/favorite/handle";
import { handleDelete } from "../../validation/favorite/handleDelete";
import { handleGetUserSession } from "../../components/ts/fetchUser";
import useAuthProtection from "../../components/ts/useAutProteccion";

interface Product {
    id: number;
    name: string;
    price: number;
    images: string[];
    descripcion: string;
    estado: string;
    fecha: string;
}

function FavoriteProducts() {

    useAuthProtection();

    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    const [favorites, setFavorites] = useState<Product[]>([]);
    const [currency, setCurrency] = useState<string>("EUR");
    const [conversionRate, setConversionRate] = useState<number>(1);

    useEffect(() => {
        if (!isLogged) return;

        const stored = localStorage.getItem("cashData");
        if (stored) {
            const data = JSON.parse(stored);
            setCurrency(data.currency);
            setConversionRate(data.conversionRate);
        }

    }, [isLogged]);

    useEffect(() => {
        if (isLogged) {
            handleGetFavorito()
                .then((data) => {
                    const formattedFavorites = data.map((fav: any) => ({
                        id: fav.article.id,
                        name: fav.article.nombre,
                        price: parseFloat((fav.article.precio * (currency === "EUR" ? 1 : conversionRate)).toFixed(2)),
                        images: fav.article.imagenes || [],
                        descripcion: fav.article.descripcion,
                        estado: fav.article.estado,
                        fecha: new Date(fav.article.fecha).toLocaleDateString(),
                    }));
                    setFavorites(formattedFavorites);
                })
                .catch((error) => {
                    console.error("Error obteniendo favoritos:", error);
                });
        }
    }, [isLogged]);

    const removeFavorite = async (productId: number) => {
        try {
            await handleDelete(productId);
            setFavorites(favorites.filter((product) => product.id !== productId));
        } catch (error) {
            console.error("Error eliminando favorito:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formatPrice = (value: number): string => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
        }).format(value);
    };

    return (
        <section className="py-16 bg-white">
            <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10" data-translate>
                Tus Favoritos
            </h2>

            <div className="max-w-5xl mx-auto space-y-4 px-4">
                {favorites.length > 0 ? (
                    favorites.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col sm:flex-row items-start gap-4 border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition relative"
                        >
                            <button
                                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow z-20"
                                onClick={() => removeFavorite(product.id)}
                            >
                                <FaTrash size={16} className="text-red-500 hover:text-red-600" />
                            </button>

                            <div className="w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                {product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <p className="text-center text-gray-400 text-sm h-full flex items-center justify-center" data-translate>
                                        Sin imágenes
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col flex-1">
                                <h3 className="text-lg font-semibold text-[#2F4F4F]" data-translate>
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-600" data-translate>{product.descripcion}</p>
                                <p className="text-sm text-gray-500" data-translate><span className="font-bold">{product.estado}</span></p>
                                <p className="text-sm text-gray-500" data-translate>{product.fecha}</p>
                                <p className="text-[#6E9475] font-bold mt-2">{formatPrice(product.price)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500" data-translate>
                        No tienes artículos favoritos aún.
                    </p>
                )}
            </div>
        </section>

    );
}

export default FavoriteProducts;
