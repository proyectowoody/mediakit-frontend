import { useState, useEffect } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import Carousel from "../../components/carrousel";
import Footer from "../../components/footer";
import BannerImage from "../../components/bannerImage";
import Header from "../../components/header";
import { handleGetCar } from "../../validation/car/handle";
import { handleDelete } from "../../validation/car/handleDelete";
import { handleSubmitPaypal } from "../../validation/paypal/Submit";
import { useNavigate } from "react-router-dom";
import roleAdmin from "../../components/ts/roleAdmin";
import authRedirectNoToken from "../../validation/autRedirectNoToken";

interface Product {
    id: number;
    name: string;
    price: number;
    images: string[];
    descripcion: string;
    estado: string;
    fecha: string;
    cantidad: number;
    subtotal: number;
}

function Cart() {

    authRedirectNoToken("/");

    const navigate = useNavigate();

    useEffect(() => {
        roleAdmin(navigate);
    }, [navigate]);

    const [car, setCar] = useState<Product[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        handleGetCar()
            .then((data) => {
                const formattedCars = data.articles.map((car: any) => ({
                    id: car.article.id,
                    name: car.article.nombre,
                    price: car.article.precio,
                    images: car.article.imagenes || [],
                    descripcion: car.article.descripcion,
                    estado: car.article.estado,
                    fecha: new Date(car.article.fecha).toLocaleDateString(),
                    cantidad: car.cantidad,
                    subtotal: car.subtotal,
                }));
                setCar(formattedCars);
                setTotal(data.total);
            })
            .catch((error) => {
                console.error("Error obteniendo los carritos:", error);
            });
    }, []);

    const removeCars = async (productId: number) => {
        try {
            await handleDelete(productId);
            const updatedCart = car.filter((product) => product.id !== productId);
            setCar(updatedCart);
            setTotal(updatedCart.reduce((acc, item) => acc + item.subtotal, 0));
        } catch (error) {
            console.error("Error eliminando del carrito:", error);
        }
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await handleSubmitPaypal();
        } catch (error) {
            console.error("Error en la compra:", error);
        }
        setIsLoading(false);
    };

    return (
        <div className="font-quicksand bg-gray-100 min-h-screen">
            <Header />
            <BannerImage />

            <section className="py-16 bg-white">
                <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10">Tu carrito de compra</h2>

                <div className="max-w-6xl mx-auto px-4">
                    {car.length > 0 ? (
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {car.map((product) => (
                                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative p-4 bg-white">

                                        <button
                                            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-50"
                                            onClick={() => removeCars(product.id)}
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
                                            <p className="text-sm text-gray-500">Cantidad: <span className="font-bold">{product.cantidad}</span></p>
                                            <p className="text-[#6E9475] font-bold mt-2">Subtotal: {product.subtotal.toFixed(2)} €</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 text-center">
                                <h3 className="text-2xl font-bold text-[#2F4F4F]">
                                    Total: {total.toFixed(2)} €
                                </h3>
                                <button
                                    onClick={handleClick}
                                    disabled={isLoading}
                                    className={`mt-4 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                                        } text-white font-bold py-3 px-6 rounded-lg text-lg transition flex items-center justify-center mx-auto`}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="animate-spin mr-2">⏳</span> Procesando...
                                        </>
                                    ) : (
                                        <>
                                            <FaShoppingCart className="mr-2" /> Comprar ahora
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No tienes artículos en tu carrito.</p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Cart;
