import { FaHeart } from "react-icons/fa";
import Carousel from "../components/carrousel";
import { useEffect, useState } from "react";
import { handleGet } from "../validation/admin/article/handleGet";
import { SubmitCar } from "../validation/car/submit";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../view/home";
import { AuthModal } from "./toast";
import { handleGetUserSession } from "./ts/fetchUser";

interface CategoryArticleProps {
    favorites: number[];
    toggleFavorite: (productId: number) => void;
    categoria?: string;
    subcategoria?: string;
    setProductoSeleccionado: (producto: any) => void;
}

function CategoryArticle({ favorites, toggleFavorite, categoria, subcategoria, setProductoSeleccionado }: CategoryArticleProps) {

    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    const [animatedProduct, setAnimatedProduct] = useState<Product | null>(null);
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
            categoria: {
                id: number;
                nombre: string;
                subcategorias: { id: number; nombre: string }[];
            };
            fecha: string;
            estado: string;
            imagen: string;
            precio: number;
            discount: number;
            precioActual: number;
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
        const categoriaNombre = articulo.categoria?.nombre?.toLowerCase().trim();
        const subcategorias = articulo.categoria?.subcategorias || [];

        const subcategoriasNormalizadas = subcategorias.map(sub => sub.nombre.toLowerCase().trim());

        return (
            (!categoria || categoriaNombre === categoria.toLowerCase().trim()) &&
            (!subcategoria || subcategoriasNormalizadas.includes(subcategoria.toLowerCase().trim()))
        );
    });

    useEffect(() => {
        if (!isLogged) return;

        const stored = localStorage.getItem("cashData");
        if (stored) {
            const data = JSON.parse(stored);
            setCurrency(data.currency);
            setConversionRate(data.conversionRate);
        }

    }, [isLogged]);

    const products: Product[] = filteredProducts.map((articulo) => ({
        id: articulo.id,
        name: articulo.nombre,
        description: articulo.descripcion,
        estatus: articulo.estado,
        price: parseFloat((articulo.precio * (currency === "EUR" ? 1 : conversionRate)).toFixed(2)),
        priceAct: parseFloat((articulo.precioActual * (currency === "EUR" ? 1 : conversionRate)).toFixed(2)),
        discount: articulo.discount,
        imagenes: articulo.imagenes.map((img) => img.url)
    }));

    const formatPrice = (value: number): string => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
        }).format(value);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("default");

    const itemsPerPage = 8;

    let sortedProducts = [...products];

    if (sortOrder === "priceAsc") {
        sortedProducts.sort((a, b) => a.priceAct - b.priceAct);
    } else if (sortOrder === "priceDesc") {
        sortedProducts.sort((a, b) => b.priceAct - a.priceAct);
    }

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const Animated = (product: Product) => {
        setAnimatedProduct(product);
        setTimeout(() => {
            setAnimatedProduct(null);
        }, 2000);
    };

    return (
        <section id="mejores-productos" className="py-16 bg-white">
            <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10" data-translate>
            </h2>
            <div className="max-w-6xl mx-auto px-4 flex justify-end mb-4">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm text-[#2F4F4F] focus:outline-none"
                >
                    <option value="default">Ordenar por</option>
                    <option value="priceAsc">Precio: Menor a Mayor</option>
                    <option value="priceDesc">Precio: Mayor a Menor</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                {products.length > 0 ? (
                    paginatedProducts.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative">
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
                                <h3 className="text-sm text-lg text-[#2F4F4F]" data-translate>
                                    {product.description.length > 50 ? product.description.substring(0, 50) + "..." : product.description}
                                </h3>
                                <h3 className="text-sm text-lg text-[#2F4F4F]" data-translate>{product.estatus}</h3>
                                <div className="flex items-center gap-2">
                                    {product.discount > 0 ? (
                                        <>
                                            <p className="text-red-500 line-through font-bold">{formatPrice(product.price)}</p>
                                            <p className="text-[#6E9475] font-bold">{formatPrice(product.priceAct)}</p>
                                        </>
                                    ) : (
                                        <p className="text-[#6E9475] font-bold">{formatPrice(product.priceAct)}</p>
                                    )}
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
                    ))
                ) : (
                    <p className="text-center text-gray-500" data-translate>No hay productos disponibles.</p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-4">
                    <button
                        className="px-4 py-2 rounded bg-[#6E9475] text-white hover:bg-[#5C8465] disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2 text-[#2F4F4F] font-semibold">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        className="px-4 py-2 rounded bg-[#6E9475] text-white hover:bg-[#5C8465] disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            )}
            {showAuthModal && (
                <AuthModal isVisible={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    title="¡Debes registrarte!"
                    message="Para usar esta funcionalidad, necesitas iniciar sesión o registrarte.">
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
        </section>
    );
}

export default CategoryArticle;
