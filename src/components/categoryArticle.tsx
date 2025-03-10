import { FaHeart } from "react-icons/fa";
import Carousel from "../components/carrousel";
import { useEffect, useState } from "react";
import { handleGet } from "../validation/admin/article/handleGet";
import { SubmitCar } from "../validation/car/submit";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../view/home";
import { AuthModal } from "./toast";

interface CategoryArticleProps {
    favorites: number[];
    toggleFavorite: (productId: number) => void;
    categoria?: string;
    subcategoria?: string;
}

function CategoryArticle({ favorites, toggleFavorite, categoria, subcategoria }: CategoryArticleProps) {

    const [cartItem, setCartItem] = useState<number | null>(null);
    const [animatedProduct, setAnimatedProduct] = useState<Product | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

    useEffect(() => {
        const userToken = localStorage.getItem("ACCESS_TOKEN");
        setIsAuth(!!userToken);
    }, []);

    useEffect(() => {
        SubmitCar(cartItem);
    }, [cartItem]);

    const handleAddToCart = (product: Product) => {
        if (!isAuth) {
            setShowAuthModal(true);
            return;
        }
        setAnimatedProduct(product);
        setCartItem(product.id);
        setTimeout(() => setAnimatedProduct(null), 1500);
    };

    const handleToggleFavorite = (productId: number) => {
        if (!isAuth) {
            setShowAuthModal(true);
            return;
        }
        toggleFavorite(productId);
    };

    const [articulos, setArticulos] = useState<
        {
            id: number;
            nombre: string;
            descripcion: string;
            categoria: {
                id: number;
                nombre: string;
                subcategorias: { id: number; nombre: string }[];
            };
            fecha: string;
            estado: string;
            imagen: string;
            precio: number;
            imagenes: { id: number; url: string }[];
        }[]
    >([]);

    useEffect(() => {
        handleGet()
            .then((data) => {
                setArticulos(data);
            })
            .catch((error) => console.error("Error al obtener los artículos:", error));
    }, []);

    const filteredProducts = articulos.filter((articulo) => {
        return (
            (!categoria || (articulo.categoria?.nombre && articulo.categoria.nombre.toLowerCase() === categoria.toLowerCase())) &&
            (!subcategoria || articulo.categoria?.subcategorias?.some(sub => sub.nombre.trim().toLowerCase() === subcategoria.toLowerCase()))
        );
    });

    const products: Product[] = filteredProducts.map((articulo) => ({
        id: articulo.id,
        name: articulo.nombre,
        estatus: articulo.estado,
        description: articulo.descripcion,
        price: articulo.precio,
        discountPrice: articulo.precio * 0.9,
        images: articulo.imagenes.map((img) => img.url),
        sales: 150,
    }));

    return (
        <section id="mejores-productos" className="py-16 bg-white">
            <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10">
                {categoria ? `Categoría: ${categoria}` : "Categorías"}
                {subcategoria && ` - Subcategoría: ${subcategoria}`}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative">
                            <button
                                className="absolute top-2 right-2 text-red-500 hover:text-red-600 z-10"
                                onClick={() => handleToggleFavorite(product.id)}
                            >
                                <FaHeart size={24} className={favorites.includes(product.id) ? "fill-red-500" : "fill-gray-500"} />
                            </button>
                            {product.images.length > 0 ? <Carousel images={product.images} /> : <p className="text-center text-gray-400">Sin imágenes</p>}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-[#2F4F4F]">{product.name}</h3>
                                <p className="text-[#6E9475] font-bold">{product.price.toFixed(2)} €</p>
                                <button className="w-full mt-4 bg-[#6E9475] text-white py-2 rounded hover:bg-[#5C8465]" onClick={() => handleAddToCart(product)}>
                                    Añadir al Carrito
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No hay productos disponibles.</p>
                )}
            </div>

            {showAuthModal && (
                <AuthModal isVisible={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    title="¡Debes registrarte!"
                    message="Para usar esta funcionalidad, necesitas iniciar sesión o registrarte.">
                    <p className="text-center text-[#2F4F4F] my-4">
                        Para usar esta funcionalidad, necesitas iniciar sesión o registrarte.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-[#6E9475] text-white px-4 py-2 rounded hover:bg-[#5C8465] transition"
                            onClick={() => window.location.href = "/login"}
                        >
                            Iniciar sesión
                        </button>
                        <button
                            className="bg-[#D4C9B0] text-[#2F4F4F] px-4 py-2 rounded hover:bg-[#BBA98A] transition"
                            onClick={() => window.location.href = "/register"}
                        >
                            Registrarse
                        </button>
                    </div>
                </AuthModal>
            )}

            <AnimatePresence>
                {animatedProduct && animatedProduct.images.length > 0 && (
                    <motion.img
                        src={animatedProduct.images[0]}
                        initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                        animate={{ scale: 0.1, x: 300, y: -300, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="fixed w-32 h-32 object-cover top-1/2 left-1/2 z-50"
                        alt="Animación producto"
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

export default CategoryArticle;
