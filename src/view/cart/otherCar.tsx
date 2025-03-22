import { useState, useEffect } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import Footer from "../../components/footer";
import BannerImage from "../../components/bannerImage";
import Header from "../../components/header";
import AuthModal from "../../components/toast";
import { handleGetUserSession } from "../../components/ts/fetchUser";

interface Product {
    id: number;
    name: string;
    description: string;
    estatus: string;
    price: number;
    priceAct: number;
    discount: number;
    imagenes: string[];
    cantidad: number;
    subtotal: number;
}

function OtherCar() {

    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [car, setCar] = useState<Product[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    const cargarCarrito = () => {
        const storedCart = localStorage.getItem("guest_cart");
        let guestCart: Product[] = storedCart ? JSON.parse(storedCart) : [];

        guestCart = guestCart.map((item) => {
            const discountAmount = (item.price * item.discount) / 100;
            const priceWithDiscount = item.price - discountAmount;
            return {
                ...item,
                priceAct: priceWithDiscount,
                cantidad: item.cantidad || 1,
                subtotal: priceWithDiscount * (item.cantidad || 1),
            };
        });

        setCar(guestCart);
        actualizarTotal(guestCart);
    };

    useEffect(() => {
        cargarCarrito();
    }, []);

    const actualizarTotal = (cart: Product[]) => {
        const totalCalculated = cart.reduce((acc, item) => acc + item.subtotal, 0);
        setTotal(parseFloat(totalCalculated.toFixed(2)));
    };

    const removeCars = (productId: number) => {
        const updatedCart = car.filter((product) => product.id !== productId);
        setCar(updatedCart);
        actualizarTotal(updatedCart);
        localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
    };

    const updateQuantity = (productId: number, change: number) => {
        const updatedCart = car.map((item) =>
            item.id === productId
                ? {
                    ...item,
                    cantidad: item.cantidad + change,
                    subtotal: item.priceAct * (item.cantidad + change),
                }
                : item
        ).filter((item) => item.cantidad > 0);

        setCar(updatedCart);
        actualizarTotal(updatedCart);
        localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
    };

    const handleAddToCart = () => {
        if (!isLogged) {
            setShowAuthModal(true);
            return;
        }
    };

    return (
        <div className="font-quicksand bg-gray-100 min-h-screen">
            <Header />
            <BannerImage />

            <section className="py-16 bg-white">
                <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10" data-translate>
                    Tu carrito de compra
                </h2>

                <div className="max-w-5xl mx-auto px-4">
                    {car.length > 0 ? (
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">

                            <div className="hidden md:grid grid-cols-8 gap-4 p-4 bg-gray-100 text-gray-700 font-semibold text-center">
                                <span className="col-span-2" data-translate>Producto</span>
                                <span data-translate>Cantidad</span>
                                <span data-translate>Precio</span>
                                <span data-translate>Descuento</span>
                                <span data-translate>Precio Actual</span>
                                <span data-translate>Subtotal</span>
                                <span data-translate>Acción</span>
                            </div>

                            <div className="divide-y divide-gray-200 overflow-x-auto">
                                {car.map((product) => (
                                    <div key={product.id} className="grid grid-cols-2 md:grid-cols-8 gap-4 items-center py-4 px-4 text-center">

                                        <div className="flex items-center col-span-2">
                                            <img
                                                src={product.imagenes.length > 0 ? product.imagenes[0] : "/placeholder.png"}
                                                alt={product.name}
                                                className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-md border border-gray-300"
                                            />
                                            <div className="ml-2 md:ml-4 text-left text-xs md:text-sm">
                                                <h3 className="font-semibold text-[#2F4F4F]" data-translate>{product.name}</h3>
                                                <p className="text-gray-500" data-translate>{product.description}</p>
                                                <p className="text-gray-500" data-translate>Estado: <span className="font-bold">{product.estatus}</span></p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-gray-500 md:hidden">Cantidad</span>
                                            <div className="flex items-center">
                                                <button className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-l-md"
                                                    onClick={() => updateQuantity(product.id, -1)}
                                                    disabled={product.cantidad <= 1}>
                                                    -
                                                </button>
                                                <span className="px-3 py-1 border bg-white">{product.cantidad}</span>
                                                <button className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-r-md"
                                                    onClick={() => updateQuantity(product.id, 1)}>
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-gray-500 md:hidden">Precio</span>
                                            <p className="text-gray-700 font-medium">{product.price.toFixed(2)} EUR</p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-gray-500 md:hidden">Descuento</span>
                                            <p className="text-red-500 font-bold">{product.discount}%</p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-gray-500 md:hidden">Precio Actual</span>
                                            <p className="text-blue-500 font-bold">{product.priceAct.toFixed(2)} EUR</p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-gray-500 md:hidden">Subtotal</span>
                                            <p className="text-[#6E9475] font-bold">{product.subtotal.toFixed(2)} EUR</p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-gray-500 md:hidden">Acción</span>
                                            <button onClick={() => removeCars(product.id)} className="p-2 rounded-md hover:bg-gray-200">
                                                <FaTrash size={20} className="text-red-500 hover:text-red-600" />
                                            </button>
                                        </div>

                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-6 border-t border-gray-300 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">

                                <h3 className="text-lg md:text-2xl font-bold text-[#2F4F4F]">
                                    Total: {total.toFixed(2)} EUR
                                </h3>

                                <button
                                    onClick={handleAddToCart}
                                    className="flex items-center justify-center px-6 py-3 text-lg font-bold rounded-lg text-white bg-[#6E9475] hover:bg-[#5C8465] w-full md:w-auto"
                                >
                                    <FaShoppingCart className="text-xl" /> <span>Comprar ahora</span>
                                </button>

                            </div>

                        </div>
                    ) : (
                        <p className="text-center text-gray-500" data-translate>No tienes artículos en tu carrito.</p>
                    )}
                </div>

            </section>

            {showAuthModal && (
                <AuthModal isVisible={showAuthModal} onClose={() => setShowAuthModal(false)}
                    title="¡Debes registrarte!" message="Para usar esta funcionalidad, necesitas iniciar sesión o registrarte." />
            )}
            <Footer />
        </div>
    );
}

export default OtherCar;



