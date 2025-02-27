import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Carousel from "../../components/carrousel";
import { handleGetFavorito } from "../../validation/favorite/handle";
import { handleDelete } from "../../validation/favorite/handleDelete";
import Footer from "../../components/footer";
import BannerImage from "../../components/bannerImage";
import Header from "../../components/header";

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
    const [favorites, setFavorites] = useState<Product[]>([]);

    useEffect(() => {
        handleGetFavorito()
            .then((data) => {
                const formattedFavorites = data.map((fav: any) => ({
                    id: fav.article.id,
                    name: fav.article.nombre,
                    price: fav.article.precio,
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
    }, []);

    const removeFavorite = async (productId: number) => {
        try {
            await handleDelete(productId);
            setFavorites(favorites.filter((product) => product.id !== productId));
        } catch (error) {
            console.error("Error eliminando favorito:", error);
        }
    };

    return (
        <div className="font-quicksand">
            <Header />
            <BannerImage />

            <section className="py-16 bg-white">
                <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10">Tus Favoritos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                    {favorites.length > 0 ? (
                        favorites.map((product) => (
                            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative p-4">
                                
                                {/* Botón de eliminar con z-index alto */}
                                <button
                                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-50"
                                    onClick={() => removeFavorite(product.id)}
                                >
                                    <FaTrash size={20} className="text-red-500 hover:text-red-600" />
                                </button>

                                {product.images.length > 0 ? (
                                    <Carousel images={product.images} />
                                ) : (
                                    <p className="text-center text-gray-400">Sin imágenes</p>
                                )}

                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-[#2F4F4F]">{product.name}</h3>
                                    <p className="text-sm text-gray-600">{product.descripcion}</p>
                                    <p className="text-sm text-gray-500">Estado: <span className="font-bold">{product.estado}</span></p>
                                    <p className="text-sm text-gray-500">Fecha: {product.fecha}</p>
                                    <p className="text-[#6E9475] font-bold mt-2">{product.price.toFixed(2)} €</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No tienes artículos favoritos aún.</p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default FavoriteProducts;
