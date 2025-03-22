import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Carousel from "../../components/carrousel";
import { handleGetFavorito } from "../../validation/favorite/handle";
import { handleDelete } from "../../validation/favorite/handleDelete";
import Footer from "../../components/footer";
import BannerImage from "../../components/bannerImage";
import Header from "../../components/header";
import { handleGetUserSession } from "../../components/ts/fetchUser";
import { handleGetCash } from "../../validation/admin/count/handleGet";
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
            if (isLogged) {
                handleGetCash()
                    .then((data) => {
                        if (data) {
                            setCurrency(data.currency);
                            setConversionRate(data.conversionRate);
                        }
                    })
                    .catch((error) => console.error("Error al obtener cash:", error));
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

    return (
        <div className="font-quicksand">
            <Header />
            <BannerImage />

            <section className="py-16 bg-white">
                <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10" data-translate>Tus Favoritos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                    {favorites.length > 0 ? (
                        favorites.map((product) => (
                            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative p-4">

                                <button
                                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-20"
                                    onClick={() => removeFavorite(product.id)}
                                >
                                    <FaTrash size={20} className="text-red-500 hover:text-red-600" />
                                </button>

                                {product.images.length > 0 ? (
                                    <Carousel images={product.images} />
                                ) : (
                                    <p className="text-center text-gray-400" data-translate>Sin imágenes</p>
                                )}

                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-[#2F4F4F]" data-translate>{product.name}</h3>
                                    <p className="text-sm text-gray-600" data-translate>{product.descripcion}</p>
                                    <p className="text-sm text-gray-500" data-translate>Estado: <span className="font-bold">{product.estado}</span></p>
                                    <p className="text-sm text-gray-500" data-translate>Fecha: {product.fecha}</p>
                                    <p className="text-[#6E9475] font-bold mt-2">{product.price} {currency}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500" data-translate>No tienes artículos favoritos aún.</p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default FavoriteProducts;
