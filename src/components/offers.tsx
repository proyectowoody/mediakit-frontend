import { FaHeart } from "react-icons/fa";
import Carousel from "../components/carrousel";
import { useEffect, useState } from "react";
import { handleGetOfertas } from "../validation/admin/article/handleGet";
import { SubmitCar } from "../validation/car/submit";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../view/home";

interface TopProductProps {
    favorites: number[];
    toggleFavorite: (productId: number) => void;
}

function Offers({ favorites, toggleFavorite }: TopProductProps) {

    const [cartItem, setCartItem] = useState<number | null>(null);
    const [animatedProduct, setAnimatedProduct] = useState<Product | null>(null);
    const [topProducts, setTopProducts] = useState<Product[]>([]);

    useEffect(() => {
        SubmitCar(cartItem);
    }, [cartItem]);

    const handleAddToCart = (product: any) => {
        setAnimatedProduct(product);
        setCartItem(product.id);
        setTimeout(() => setAnimatedProduct(null), 1500);
    };

    const [articulos, setArticulos] = useState<
        {
            id: number;
            nombre: string;
            descripcion: string;
            discount: number;
            categoria: {
                id: number;
                nombre: string;
                descripcion: string;
            };
            fecha: string;
            estado: string;
            imagen: string;
            precio: number;
            imagenes: { id: number; url: string }[];
        }[]
    >([]);

    useEffect(() => {
        handleGetOfertas()
            .then((data) => setArticulos(data))
            .catch((error) => console.error(error));

    }, []);

    const products: Product[] = articulos.map((articulo) => ({
        id: articulo.id,
        name: articulo.nombre,
        description: articulo.descripcion,
        estatus: articulo.estado,
        price: articulo.precio,
        discountPrice: articulo.discount,
        images: articulo.imagenes.map((img) => img.url),
        sales: 150,
    }));

    useEffect(() => {
        if (!products || products.length === 0) return;

        const sortedProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 8);

        setTopProducts((prev) => {
            return JSON.stringify(prev) === JSON.stringify(sortedProducts) ? prev : sortedProducts;
        });

    }, [products]);

    return (
        <section className="py-16 bg-white">
            <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10">Ofertas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                {topProducts.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative">
                        <button
                            className="absolute top-2 right-2 text-red-500 hover:text-red-600 z-10"
                            onClick={() => toggleFavorite(product.id)}
                        >
                            <FaHeart size={24} className={favorites.includes(product.id) ? "fill-red-500" : "fill-gray-500"} />
                        </button>
                        {product.images.length > 0 ? <Carousel images={product.images} /> : <p className="text-center text-gray-400">Sin imágenes</p>}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-[#2F4F4F]">{product.name}</h3>
                            <h3 className="text-sm text-[#2F4F4F]">
                                {product.description.length > 50 ? product.description.substring(0, 50) + "..." : product.description}
                            </h3>
                            <h3 className="text-sm text-[#2F4F4F]">{product.estatus}</h3>
                            <div className="flex items-center gap-2">
                                <p className="text-red-500 line-through font-bold">{product.price.toFixed(2)} €</p>
                                <p className="text-[#6E9475] font-bold">{product.discountPrice.toFixed(2)} €</p>
                            </div>
                            <button className="w-full mt-4 bg-[#6E9475] text-white py-2 rounded hover:bg-[#5C8465]" onClick={() => handleAddToCart(product)}>
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
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

export default Offers;

