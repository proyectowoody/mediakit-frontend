import { FaHeart } from "react-icons/fa";
import Carousel from "../components/carrousel";
import { useEffect, useState } from "react";
import { handleGetOfertas } from "../validation/admin/article/handleGet";
import { SubmitCar } from "../validation/car/submit";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../view/home";
import AuthModal from "./toast";
import { handleGetUserSession } from "./ts/fetchUser";

interface TopProductProps {
    favorites: number[];
    toggleFavorite: (productId: number) => void;
    setProductoSeleccionado: (producto: any) => void;
}

function Offers({ favorites, toggleFavorite, setProductoSeleccionado }: TopProductProps) {

    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    const [animatedProduct, setAnimatedProduct] = useState<Product | null>(null);
    const [topProducts, setTopProducts] = useState<Product[]>([]);
    const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
    const [currency, setCurrency] = useState<string>("EUR");
    const [conversionRate, setConversionRate] = useState<number>(1);

    const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({});

    const handleAddToCart = (product: Product) => {
        if (!isLogged) {
            setShowAuthModal(true);
            return;
        }

        setAnimatedProduct(product);
        SubmitCar(product.id);
        setAddedToCart((prev) => ({ ...prev, [product.id]: true }));

        setTimeout(() => {
            setAddedToCart((prev) => ({ ...prev, [product.id]: false }));
            setAnimatedProduct(null);
        }, 2000);
    };

    const handleToggleFavorite = (productId: number) => {
        if (!isLogged) {
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
            discount: number;
            estado: string;
            imagen: string;
            precio: number;
            precioActual: number;
            imagenes: { id: number; url: string }[];
        }[]
    >([]);

    useEffect(() => {
        handleGetOfertas()
            .then((data) => setArticulos(data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (!isLogged) return;

        const stored = localStorage.getItem("cashData");
        if (stored) {
            const data = JSON.parse(stored);
            setCurrency(data.currency);
            setConversionRate(data.conversionRate);
        }

    }, [isLogged]);

    const products: Product[] = articulos.map((articulo) => ({
        id: articulo.id,
        name: articulo.nombre,
        description: articulo.descripcion,
        estatus: articulo.estado,
        price: parseFloat((articulo.precio * (currency === "EUR" ? 1 : conversionRate)).toFixed(2)),
        priceAct: parseFloat((articulo.precioActual * (currency === "EUR" ? 1 : conversionRate)).toFixed(2)),
        discount: articulo.discount,
        imagenes: articulo.imagenes.map((img) => img.url)
    }));

    useEffect(() => {
        if (!products || products.length === 0) return;
        const sortedProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 8);
        setTopProducts((prev) => (JSON.stringify(prev) === JSON.stringify(sortedProducts) ? prev : sortedProducts));
    }, [products]);

    const formatPrice = (value: number): string => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
        }).format(value);
    };

    const Animated = (product: Product) => {
        setAnimatedProduct(product);
        setTimeout(() => {
            setAnimatedProduct(null);
        }, 2000);
    };

    return (
        <section id="mejores-ofertas" className="py-16 bg-white">
            <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10" data-translate>Ofertas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                {topProducts.map((product) => {

                    return (
                        <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative">
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                                -{product.discount}%
                            </div>
                            <button
                                className="absolute top-2 right-2 text-red-500 hover:text-red-600 z-10"
                                onClick={() => handleToggleFavorite(product.id)}
                            >
                                <FaHeart size={24} className={favorites.includes(product.id) ? "fill-red-500" : "fill-gray-500"} />
                            </button>
                            <div onClick={() => setProductoSeleccionado(product)}>
                                {product.imagenes.length > 0 ? <Carousel images={product.imagenes} /> : <p className="text-center text-gray-400">Sin imágenes</p>}
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-[#2F4F4F]" data-translate>{product.name}</h3>
                                <h3 className="text-sm text-[#2F4F4F]" data-translate>
                                    {product.description.length > 50 ? product.description.substring(0, 50) + "..." : product.description}
                                </h3>
                                <h3 className="text-sm text-[#2F4F4F]" data-translate>{product.estatus}</h3>

                                <div className="flex items-center gap-2">
                                    <p className="text-red-500 line-through font-bold">{formatPrice(product.price)}</p>
                                    <p className="text-[#6E9475] font-bold">{formatPrice(product.priceAct)}</p>
                                </div>

                                {isLogged ? (
                                    <button
                                        className={`w-full mt-3 py-2 rounded-md text-sm transition duration-300 ${addedToCart[product.id] ? "bg-gray-500 cursor-not-allowed" : "bg-[#6E9475] hover:bg-[#5C8465] text-white"}`}
                                        disabled={addedToCart[product.id]}
                                        onClick={() => handleAddToCart(product)}
                                        data-translate
                                    >
                                        {addedToCart[product.id] ? "Agregado ✅" : "Añadir al Carrito"}
                                    </button>
                                ) : (
                                    <button
                                        className={`w-full mt-3 py-2 rounded-md text-sm transition duration-300 ${addedToCart[product.id] ? "bg-gray-500 cursor-not-allowed" : "bg-[#6E9475] hover:bg-[#5C8465] text-white"
                                            }`}
                                        disabled={addedToCart[product.id]}
                                        onClick={() => {
                                            Animated(product);
                                            const stored = localStorage.getItem("guest_cart");
                                            let guestCart = stored ? JSON.parse(stored) : [];

                                            const existingProductIndex = guestCart.findIndex((item: any) => item.id === product.id);

                                            if (existingProductIndex !== -1) {
                                                guestCart[existingProductIndex].cantidad += 1;
                                                guestCart[existingProductIndex].subtotal = guestCart[existingProductIndex].cantidad * guestCart[existingProductIndex].price;
                                            } else {
                                                guestCart.push({ ...product, cantidad: 1, subtotal: product.price });
                                            }

                                            localStorage.setItem("guest_cart", JSON.stringify(guestCart));

                                            setAddedToCart((prev) => ({ ...prev, [product.id]: true }));

                                            setTimeout(() => {
                                                setAddedToCart((prev) => ({ ...prev, [product.id]: false }));
                                            }, 2000);
                                        }}
                                        data-translate
                                    >
                                        {addedToCart[product.id] ? "Agregado ✅" : "Añadir al Carrito"}
                                    </button>
                                )}

                            </div>
                        </div>
                    );
                })}
            </div>

            {showAuthModal && (
                <AuthModal
                    isVisible={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    title="¡Debes registrarte!"
                    message="Para usar esta funcionalidad, necesitas iniciar sesión o registrarte."
                />
            )}

            <AnimatePresence>
                {animatedProduct && animatedProduct.imagenes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -100, scale: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ scale: 0.2, opacity: 0, y: 50 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div className="w-56 h-44 bg-[#F3F4F6] rounded-xl border border-gray-300 shadow-xl flex flex-col items-center justify-center overflow-hidden">
                            <motion.img
                                src={animatedProduct.imagenes[0]}
                                alt="Producto"
                                initial={{ y: -100, opacity: 1, scale: 1 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 30, scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="w-20 h-20 object-cover rounded shadow-md"
                            />

                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "20px" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                                className="absolute bottom-0 left-0 w-full bg-[#D1D5DB] rounded-b-xl"
                            />

                            <p className="text-xs text-gray-700 mt-3 font-semibold">Producto agregado</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}

export default Offers;
