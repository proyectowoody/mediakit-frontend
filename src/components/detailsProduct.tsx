import { useEffect, useState } from "react";
const placeholderImage = "https://via.placeholder.com/600x400?text=Sin+imagen";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { Product } from "../view/home";
import { handleGetUserSession } from "./ts/fetchUser";
import { handleGetFavorito } from "../validation/favorite/handle";
import { SubmitCar } from "../validation/car/submit";
import { handleDelete } from "../validation/favorite/handleDelete";
import { SubmitFavorite } from "../validation/favorite/submitFavorite";
import AuthModal from "./toast";
import api from "../validation/axios.config";
import HandleDetails from "../validation/details/handle";
import Message from "./message";

interface DetaillsProductProps {
    productoSeleccionado: any;
    setProductoSeleccionado: (producto: any) => void;
    descripcionRef: React.RefObject<HTMLDivElement>;
}

function DetaillsProduct({ productoSeleccionado, setProductoSeleccionado, descripcionRef }: DetaillsProductProps) {

    const [favorites, setFavorites] = useState<number[]>([]);
    const [isLogged, setIsLogged] = useState<boolean | null>(null);
    const [currency, setCurrency] = useState<string>("EUR");
    const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({});
    const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
    const [animatedProduct, setAnimatedProduct] = useState<Product | null>(null);
    const [totalFavorite, setTotalFavorite] = useState(0);
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState<any[]>([]);

    const [articulos, setArticulos] = useState<{
        id: number;
        nombre: string;
        descripcion: string;
        estado: string;
        imagen: string;
        precio: number;
        precioActual: number;
        discount: number;
        imagenes: { id: number; url: string }[];
    } | null>(null);

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    useEffect(() => {
        if (isLogged) {
            handleGetFavorito()
                .then((favoritos) => setFavorites(favoritos.map((fav: any) => fav.article.id)))
                .catch((error) => console.error("Error al obtener favoritos:", error));
        }
    }, [isLogged]);

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

    const toggleFavorite = async (productId: number) => {
        const isFavorito = favorites.includes(productId);

        try {
            if (isFavorito) {
                await handleDelete(productId);
                setFavorites(favorites.filter((id) => id !== productId));
            } else {
                await SubmitFavorite(productId);
                setFavorites([...favorites, productId]);
            }
        } catch (error) {
            console.error("Error al actualizar favorito:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!isLogged) return;

        const stored = localStorage.getItem("cashData");
        if (stored) {
            const data = JSON.parse(stored);
            setCurrency(data.currency);
        }

    }, [isLogged]);

    const handleToggleFavorite = (productId: number) => {
        if (!isLogged) {
            setShowAuthModal(true);
            return;
        }
        toggleFavorite(productId);
    };

    useEffect(() => {
        if (!productoSeleccionado?.id) return;

        const fetchData = async () => {
            try {
                const [favoritoRes, comentariosRes, article] = await Promise.all([
                    api.get(`/favorito/count/${productoSeleccionado.id}`),
                    api.get(`/commentarticle/${productoSeleccionado.id}`),
                    api.get(`/articulos/${productoSeleccionado.id}`)
                ]);

                setTotalFavorite(favoritoRes.data.total);
                setComentarios(comentariosRes.data);
                setArticulos(article.data);
                console.log(article.data);
            } catch (err) {
                console.error("Error al obtener datos del producto:", err);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, [productoSeleccionado]);

    const handleSubmitComentario = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLogged) {
            setShowAuthModal(true);
            return;
        }

        handleSubmitForm(e);
    };

    const { handleSubmitForm, isLoading } = HandleDetails(productoSeleccionado?.id, comentario, setComentario);

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
        <div>

            <div ref={descripcionRef} className="max-w-5xl mx-auto px-4 py-6">
                {articulos && (
                    <div className="relative border rounded-md shadow p-4 flex flex-col md:flex-row gap-4 bg-white">

                        <button
                            onClick={() => setProductoSeleccionado(null)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold"
                        >
                            ×
                        </button>

                        <div className="w-full md:w-2/5 flex flex-col gap-4">

                            <img
                                src={articulos.imagenes?.[0]?.url || placeholderImage}
                                className="w-full h-56 object-cover rounded"
                            />

                            <div className="flex gap-2 overflow-x-auto">
                                {articulos.imagenes?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img.url}
                                        alt={`img-${index}`}
                                        className="w-14 h-14 object-cover rounded border"
                                    />
                                ))}
                            </div>

                            <h4 className="text-sm font-semibold text-[#2F4F4F] mb-2">Comentarios recientes:</h4>
                            <div className="border rounded p-2 max-h-32 overflow-y-auto">
                                {comentarios.map((coment: any) => (
                                    <div key={coment.id} className="text-sm border-b pb-2 mb-2">
                                        <p className="font-semibold text-[#2F4F4F]">Cliente</p>
                                        <p className="text-gray-600">{coment.comentario}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-3/5">
                            <h3 className="text-lg font-bold text-[#2F4F4F] mb-1">
                                {articulos.nombre}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                                {articulos.descripcion}
                            </p>

                            <div className="flex items-center gap-2">
                                {articulos.precioActual && articulos.precioActual !== articulos.precio ? (
                                    <>
                                        <p className="text-red-500 line-through font-bold">
                                            {formatPrice(articulos.precio)}
                                        </p>
                                        <p className="text-[#6E9475] font-bold">
                                            {formatPrice(articulos.precioActual)}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-[#6E9475] font-bold">
                                        {formatPrice(articulos.precio)}
                                    </p>
                                )}
                            </div>

                            <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                                {articulos.estado}
                            </p>

                            {isLogged ? (
                                <button
                                    className={`bg-[#6E9475] hover:bg-[#5C8465] text-white text-sm px-4 py-2 rounded mb-4 ${addedToCart[productoSeleccionado.id] ? "bg-gray-500 cursor-not-allowed" : "bg-[#6E9475] hover:bg-[#5C8465] text-white"}`}
                                    disabled={addedToCart[productoSeleccionado.id]}
                                    onClick={() => handleAddToCart(productoSeleccionado)}
                                    data-translate
                                >
                                    {addedToCart[productoSeleccionado.id] ? "Agregado ✅" : "Añadir al Carrito"}
                                </button>
                            ) : (
                                <button
                                    className={`bg-[#6E9475] hover:bg-[#5C8465] text-white text-sm px-4 py-2 rounded mb-4${addedToCart[productoSeleccionado.id] ? "bg-gray-500 cursor-not-allowed" : "bg-[#6E9475] hover:bg-[#5C8465] text-white"
                                        }`}
                                    disabled={addedToCart[productoSeleccionado.id]}
                                    onClick={() => {
                                        Animated(productoSeleccionado);
                                        const stored = localStorage.getItem("guest_cart");
                                        let guestCart = stored ? JSON.parse(stored) : [];

                                        const existingProductIndex = guestCart.findIndex((item: any) => item.id === productoSeleccionado.id);

                                        if (existingProductIndex !== -1) {
                                            guestCart[existingProductIndex].cantidad += 1;
                                            guestCart[existingProductIndex].subtotal = guestCart[existingProductIndex].cantidad * guestCart[existingProductIndex].price;
                                        } else {
                                            guestCart.push({ ...productoSeleccionado, cantidad: 1, subtotal: productoSeleccionado.price });
                                        }

                                        localStorage.setItem("guest_cart", JSON.stringify(guestCart));

                                        setAddedToCart((prev) => ({ ...prev, [productoSeleccionado.id]: true }));

                                        setTimeout(() => {
                                            setAddedToCart((prev) => ({ ...prev, [productoSeleccionado.id]: false }));
                                        }, 2000);
                                    }}
                                    data-translate
                                >
                                    {addedToCart[productoSeleccionado.id] ? "Agregado ✅" : "Añadir al Carrito"}
                                </button>
                            )}

                            <div className="border-t pt-3">
                                <div className="flex items-center gap-2 mb-3">

                                    <button
                                        className="text-red-500 hover:text-red-600 text-lg"
                                        onClick={() => handleToggleFavorite(productoSeleccionado.id)}
                                    >
                                        <FaHeart size={24} className={favorites.includes(productoSeleccionado.id) ? "fill-red-500" : "fill-gray-500"} />
                                    </button>
                                    <span className="text-sm text-gray-700">
                                        {totalFavorite || 0} me gusta
                                    </span>
                                </div>
                                <Message />
                                <form onSubmit={handleSubmitComentario}>
                                    <p className="text-sm font-semibold text-[#2F4F4F] mb-2">Deja un comentario:</p>
                                    <textarea
                                        rows={2}
                                        placeholder="Escribe tu comentario aquí..."
                                        className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6E9475]"
                                        value={comentario}
                                        onChange={(e) => setComentario(e.target.value)}
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="mt-2 bg-[#6E9475] hover:bg-[#5C8465] text-white px-4 py-1.5 rounded text-sm"
                                        disabled={isLoading} data-translate
                                    >
                                        {isLoading ? "Agregando..." : "Agregar"}
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showAuthModal && (
                <AuthModal isVisible={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    title="¡Debes registrarte!"
                    message="Para usar esta funcionalidad, necesitas iniciar sesión o registrarte.">

                    <p></p>
                    <p className="text-center text-[#2F4F4F] my-4" data-translate>
                        Para usar esta funcionalidad, necesitas iniciar sesión o registrarte.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-[#6E9475] text-white px-4 py-2 rounded hover:bg-[#5C8465] transition"
                            onClick={() => window.location.href = "/login"} data-translate
                        >
                            Iniciar sesión
                        </button>
                        <button
                            className="bg-[#D4C9B0] text-[#2F4F4F] px-4 py-2 rounded hover:bg-[#BBA98A] transition"
                            onClick={() => window.location.href = "/register"} data-translate
                        >
                            Registrarse
                        </button>
                    </div>
                </AuthModal>
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

        </div>
    );
}

export default DetaillsProduct;
