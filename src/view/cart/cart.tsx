import { useState, useEffect, FormEvent } from "react";
import { FaTrash} from "react-icons/fa";
import Footer from "../../components/footer";
import BannerImage from "../../components/bannerImage";
import Header from "../../components/header";
import { handleGetCar } from "../../validation/car/handle";
import { handleDelete, handleDeleteCarArticle } from "../../validation/car/handleDelete";
// import { handleSubmitPaypal } from "../../validation/paypal/Submit";
import useAuthProtection from "../../components/ts/useAutProteccion";
import { handleGetUserSession } from "../../components/ts/fetchUser";
import { handleSubmit } from "../../validation/car/submit";
import Message from "../../components/message";
import api from "../../validation/axios.config";

export interface ProductCar {
    id: number;
    name: string;
    descripcion: string;
    estado: string;
    images: string[];
    cantidad: number;
    price: number;
    discount: number;
    priceAct: number;
    subtotal: number;
    total: number;
}

function Cart() {

    useAuthProtection();

    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    const [car, setCar] = useState<ProductCar[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [descuentoAplicado, setDescuentoAplicado] = useState<number>(0);
    const [currency, setCurrency] = useState<string>("EUR");
    const [conversionRate, setConversionRate] = useState<number>(1);
    // const [isLoading, setIsLoading] = useState(false);

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
        let interval: any;

        if (isLogged) {
            const fetchCart = () => {
                handleGetCar()
                    .then((data) => {
                        const totalConvertido = parseFloat((data.total * (currency === "EUR" ? 1 : conversionRate)).toFixed(2));
                        setTotal(totalConvertido);
                        setDescuentoAplicado(data.descuentoAplicado);
                        const formattedCars: ProductCar[] = data.articles.map((car: any) => ({
                            id: car.article.id,
                            name: car.article.nombre,
                            images: car.article.imagenes || [],
                            descripcion: car.article.descripcion,
                            estado: car.article.estado,
                            cantidad: car.cantidad,
                            price: parseFloat((car.article.precio * (currency === "EUR" ? 1 : conversionRate)).toFixed(2)),
                            discount: car.article.discount,
                            priceAct: parseFloat((car.article.precioAct * (currency === "EUR" ? 1 : conversionRate)).toFixed(2)),
                            subtotal: parseFloat((car.subtotal * (currency === "EUR" ? 1 : conversionRate)).toFixed(2)),
                        }));
                        setCar(formattedCars);
                    })
                    .catch((error) => {
                        console.error("Error obteniendo los carritos:", error);
                    });
            };

            fetchCart();
            interval = setInterval(fetchCart, 500);
        }

        return () => clearInterval(interval);
    }, [currency, conversionRate, isLogged]);

    const removeCars = async (productId: number) => {
        try {
            await handleDelete(productId);
            const updatedCart = car.filter((product) => product.id !== productId);
            setCar(updatedCart);
        } catch (error) {
            console.error("Error eliminando del carrito:", error);
        }
    };

    // const handleClick = async () => {
    //     setIsLoading(true);
    //     try {
    //         await handleSubmitPaypal();
    //     } catch (error) {
    //         console.error("Error en la compra:", error);
    //     }
    //     setIsLoading(false);
    // };

    const formatPrice = (value: number): string => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
        }).format(value);
    };

    const [codigo, setCodigo] = useState('');
    const [isLoading2, setIsLoading2] = useState(false);

    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading2(true);
        await handleSubmit(codigo);
        setIsLoading2(false);
        setCodigo('');
    };

    const handleClearCart = async () => {
        try {
            await api.delete("/carrito/all");
            window.location.reload();
        } catch (error) {
            console.error("Error al vaciar carrito:", error);
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
                                                src={product.images.length > 0 ? product.images[0] : "/placeholder.png"}
                                                alt={product.name}
                                                className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-md border border-gray-300"
                                            />
                                            <div className="ml-2 md:ml-4 text-left text-xs md:text-sm">
                                                <h3 className="font-semibold text-[#2F4F4F]" data-translate>{product.name}</h3>
                                                <p className="text-gray-500" data-translate>{product.descripcion}</p>
                                                <p className="text-gray-500" data-translate>{product.estado}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-gray-500 md:hidden">Cantidad</span>
                                            <div className="flex items-center">
                                                <div className="flex items-center">
                                                    <button
                                                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-l-md"
                                                        onClick={async () => {
                                                            if (product.cantidad > 1) {
                                                                await handleDeleteCarArticle('-1', product.id);
                                                                setCar((prevCart) =>
                                                                    prevCart.map((item) =>
                                                                        item.id === product.id
                                                                            ? { ...item, cantidad: item.cantidad - 1 }
                                                                            : item
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        -
                                                    </button>

                                                    <span className="px-3 py-1 border bg-white">{product.cantidad}</span>

                                                    <button
                                                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-r-md"
                                                        onClick={async () => {
                                                            await handleDeleteCarArticle('+1', product.id);
                                                            setCar((prevCart) =>
                                                                prevCart.map((item) =>
                                                                    item.id === product.id
                                                                        ? { ...item, cantidad: item.cantidad + 1 }
                                                                        : item
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-gray-500 md:hidden">Precio</span>
                                            <p className="text-gray-700 font-medium">{formatPrice(product.price)}</p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-gray-500 md:hidden">Descuento</span>
                                            <p className="text-red-500 font-bold">{product.discount} %</p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-gray-500 md:hidden">Precio Actual</span>
                                            <p className="text-blue-500 font-bold">{formatPrice(product.priceAct)}</p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-gray-500 md:hidden">Subtotal</span>
                                            <p className="text-[#6E9475] font-bold">{formatPrice(product.subtotal)}</p>
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

                            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 w-full bg-[#f9f9f9] p-4 rounded-lg shadow-sm">

                                <Message />
                                <form onSubmit={handleSubmitForm} className="flex flex-row items-center gap-2 flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Código de descuento"
                                        className="flex-grow border px-4 py-2 rounded-lg text-sm"
                                        value={codigo}
                                        onChange={(e) => setCodigo(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="px-3 py-2 bg-[#D4C9B0] hover:bg-[#BBA98A] text-xs rounded-lg font-bold text-[#2F4F4F] whitespace-nowrap"
                                        disabled={isLoading2}
                                    >
                                        Aplicar
                                    </button>
                                </form>

                                <div className="w-full flex justify-center">
                                    <div className="flex flex-row items-center gap-4 flex-shrink-0 whitespace-nowrap text-center">
                                        {descuentoAplicado > 0 && (
                                            <p className="text-sm font-bold text-red-400">
                                                Descuento: {descuentoAplicado} %
                                            </p>
                                        )}
                                        <p className="text-sm font-bold text-[#2F4F4F]">
                                            Total: {formatPrice(total)}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full md:w-auto flex flex-col md:flex-row justify-center md:justify-end items-stretch md:items-center gap-2">

                                    <button className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-sm font-semibold text-[#2F4F4F] bg-[#E2E8F0] hover:bg-[#CBD5E1] rounded-lg transition w-full md:w-auto" onClick={handleClearCart}>
                                        <span>Vaciar</span>
                                    </button>

                                    <a href="/order">
                                        <button className='flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg transition w-full md:w-auto bg-gray-700 hover:bg-gray-600'> Continuar
                                        </button>
                                    </a>

                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500" data-translate>No tienes artículos en tu carrito.</p>
                    )}
                </div>

            </section>


            <Footer />
        </div>
    );
}

export default Cart;







