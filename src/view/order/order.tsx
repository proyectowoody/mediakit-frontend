import { useEffect, useState } from "react";
import { handleGetUserSession } from "../../components/ts/fetchUser";
import useAuthProtection from "../../components/ts/useAutProteccion";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { handleGetCar, handleGetCountCar } from "../../validation/car/handle";
import { ProductCar } from "../cart/cart";
import { handleGetAddress } from "../../validation/address/handleGet";
import { Address } from "../buy/buy";
import { useParams } from "react-router-dom";
import { getUserEmail } from "../../components/ts/emailFromToken";
import { handleGetUserData } from "../../validation/dataUser/handleGet";
import { PersonalData } from "../count/count";
import paypal from '../../assets/img/paypal.png';
import redsys from '../../assets/img/redsys.jpg'

function Order() {

    useAuthProtection();

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    const { accion, subaccion } = useParams();
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [currency, setCurrency] = useState<string>("EUR");
    const [conversionRate, setConversionRate] = useState<number>(1);
    const [isCarLoaded, setIsCarLoaded] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [selectedSection, setSelectedSection] = useState("entrega");
    const [deliveryMethod, setDeliveryMethod] = useState("recogida");
    const [opcionConfirmada, setOpcionConfirmada] = useState<"recogida" | "envio" | null>(null);
    const [envioSeleccionado, setEnvioSeleccionado] = useState<"domicilio" | "express" | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<"paypal" | "redsys" | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [observacion, setObservaciones] = useState('');
    const [address, setAddress] = useState<Address | null>(null);
    const [personalData, setpersonalData] = useState<PersonalData | null>(null);
    const [car, setCar] = useState<ProductCar[]>([]);

    useEffect(() => {
        if (accion) {
            setSelectedSection(accion);
        }
        if (subaccion) {
            setDeliveryMethod(subaccion);
        }
    }, [accion, subaccion]);

    useEffect(() => {
        if (isLogged) {
            const fetchEmail = async () => {
                const userEmail = await getUserEmail();
                setEmail(userEmail);
            };

            fetchEmail();
        }
    }, [isLogged]);

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
        if (isLogged) {
            handleGetCar()
                .then((data) => {
                    const totalConvertido = parseFloat((data.total * (currency === "EUR" ? 1 : conversionRate)).toFixed(2));
                    setTotal(totalConvertido);
                    const formattedCars: ProductCar[] = data.articles.map((car: any) => ({
                        id: car.article.id,
                        name: car.article.nombre,
                        images: car.article.imagenes || [],
                        descripcion: car.article.descripcion,
                    }));
                    setCar(formattedCars);
                    setIsCarLoaded(true);
                })
                .catch((error) => {
                    console.error("Error obteniendo los carritos:", error);
                    setIsCarLoaded(true);
                });
        }
    }, [isLogged]);

    useEffect(() => {
        if (isLogged && isCarLoaded && car.length === 0) {
            window.location.href = "/carrito";
        }
    }, [isLogged, isCarLoaded, car]);

    useEffect(() => {
        const updateCartCount = () => {
            if (isLogged) {
                handleGetCountCar()
                    .then((data) => setCartItemCount(data))
                    .catch((error) => console.error("Error del carrito:", error));
            } else {
                const stored = localStorage.getItem("guest_cart");
                const guestCart: { cantidad?: number }[] = stored ? JSON.parse(stored) : [];

                const totalQuantity = guestCart.reduce((acc: number, item: { cantidad?: number }) => acc + (item.cantidad || 1), 0);

                setCartItemCount(totalQuantity);
            }
        };

        updateCartCount();
        const interval = setInterval(updateCartCount, 500);
        return () => clearInterval(interval);
    }, [isLogged]);

    const formatPrice = (value: number): string => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
        }).format(value);
    };

    useEffect(() => {
        if (isLogged) {
            handleGetAddress()
                .then((data) => {
                    if (data && Object.keys(data).length > 0) {
                        setAddress(data);
                    } else {
                        setAddress(null);
                    }
                })
                .catch((error) => {
                    console.error("Error obteniendo la dirección:", error);
                });
        }
    }, [isLogged]);

    useEffect(() => {
        if (isLogged) {
            handleGetUserData()
                .then((data) => {
                    if (data && data.length > 0) {
                        setpersonalData(data[0]);
                    } else {
                        setpersonalData(null);
                    }
                })
                .catch((error) => {
                    console.error("Error obteniendo la dirección:", error);
                });
        }
    }, [isLogged]);

    const handleActualizarDireccion = (direccion?: Address) => {
        const data = direccion || {};
        localStorage.setItem("selected_address", JSON.stringify(data));
        const backAccion = 'entrega'; const backAccion2 = 'envio';
        const currentPath = window.location.pathname.split("/")[1];
        const finalBackPath = backAccion ? `/${currentPath}/${backAccion}/${backAccion2}` : window.location.pathname;

        localStorage.setItem("direccion_back", finalBackPath);
        window.location.href = "/direccion";
    };

    const handleAgregarDireccion = () => {
        const backAccion = 'entrega'; const backAccion2 = 'envio';
        const currentPath = window.location.pathname.split("/")[1];
        const finalBackPath = backAccion ? `/${currentPath}/${backAccion}/${backAccion2}` : window.location.pathname;

        localStorage.setItem("direccion_back", finalBackPath);
        window.location.href = "/direccion";
    };

    const handleEditarDatos = (personalData?: PersonalData) => {
        const data = personalData || {};
        localStorage.setItem("selected_person", JSON.stringify(data));
        const backAccion = 'resumen';
        const currentPath = window.location.pathname.split("/")[1];
        const finalBackPath = backAccion ? `/${currentPath}/${backAccion}` : window.location.pathname;

        localStorage.setItem("direccion_back", finalBackPath);
        window.location.href = "/datos-personales";
    };

    const handleContinuar = () => {
        if (!opcionConfirmada) {
            alert("Debes seleccionar una opción de entrega.");
            return;
        }

        if (opcionConfirmada === "envio") {
            if (!address || !address.id) {
                alert("Debes agregar una dirección válida.");
                return;
            }

            if (!envioSeleccionado) {
                alert("Debes seleccionar un tipo de envío.");
                return;
            }

            localStorage.setItem("direccion_id", address.id.toString());
            localStorage.setItem("tipo_envio", envioSeleccionado);
        }

        if (opcionConfirmada === "recogida") {
            localStorage.setItem("direccion_id", "0");
            localStorage.removeItem("tipo_envio");
        }

        setSelectedSection("resumen");
    };

    const opcionesEnvio = {
        domicilio: {
            label: "Envío a domicilio",
            fecha: "Martes, 11 de marzo",
            costo: 5.9
        },
        express: {
            label: "Entrega en el día",
            fecha: "Hoy mismo",
            costo: 8.9
        }
    };

    const envioCosto = envioSeleccionado ? opcionesEnvio[envioSeleccionado].costo : 0;
    const totalFinal = deliveryMethod === "envio" ? total + envioCosto : total;

    const impuesto = totalFinal * 0.21;
    const totalConImpuesto = totalFinal + impuesto;

    return (
        <div>
            <Header />
            <div className="flex flex-col mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">

                <div className="w-full bg-[#FAF3E0]">
                    <ul className="flex justify-center space-x-4">
                        <ul className="flex justify-center space-x-4 select-none">
                            <li className={`p-3 ${selectedSection === "entrega" ? "bg-[#6E9475] text-white" : "text-gray-500"}`}>
                                <span className="notranslate">1.</span> <span data-translate>Entrega</span>
                            </li>
                            <li className={`p-3 ${selectedSection === "resumen" ? "bg-[#6E9475] text-white" : "text-gray-500"}`}>
                                2.<span data-translate>Resumen</span>
                            </li>
                            <li className={`p-3 ${selectedSection === "pago" ? "bg-[#6E9475] text-white" : "text-gray-500"}`}>
                                3.<span data-translate>Pago</span>
                            </li>
                        </ul>
                    </ul>
                </div>

                <div className="w-full p-6">

                    {selectedSection === "entrega" && (
                        <div className="p-6 rounded-lg">
                            <h2 className="text-xl font-bold text-gray-800 mb-4" data-translate>Tu pedido</h2>
                            <p className="text-sm text-gray-500 mb-2">{cartItemCount} <span data-translate>Productos</span></p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {car.map((product) => (
                                    <div key={product.id} className="border rounded-md p-3 flex gap-3 items-start bg-white shadow-sm">
                                        <img
                                            src={product.images.length > 0 ? product.images[0] : "/placeholder.png"}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded border"
                                        />
                                        <div className="flex flex-col text-sm">
                                            <span className="font-semibold text-gray-800" data-translate>{product.name}</span>
                                            <span className="text-gray-500" data-translate>{product.descripcion}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h3 className="text-base font-semibold text-gray-800 mb-2" data-translate>¿Cómo quieres recibirlo?</h3>

                            <div className="flex border rounded-lg overflow-hidden mb-4">
                                <button
                                    className={`w-1/2 py-2 text-sm font-medium transition-all ${deliveryMethod === "recogida" ? "bg-[#6E9475] text-white" : "bg-gray-100 text-gray-600"
                                        }`}
                                    onClick={() => {
                                        setDeliveryMethod("recogida");
                                        setOpcionConfirmada(null);
                                        setEnvioSeleccionado(null);
                                    }}
                                    data-translate
                                >
                                    Recogida
                                </button>

                                <button
                                    className={`w-1/2 py-2 text-sm font-medium transition-all ${deliveryMethod === "envio" ? "bg-[#6E9475] text-white" : "bg-gray-100 text-gray-600"}`}
                                    onClick={() => {
                                        setDeliveryMethod("envio");
                                        setOpcionConfirmada(null);
                                        setEnvioSeleccionado(null);
                                    }}
                                    data-translate
                                >
                                    Envío
                                </button>
                            </div>

                            {deliveryMethod === "recogida" && (
                                <div className="space-y-4">
                                    <div className="flex items-start gap-2">
                                        <input type="radio" name="pickup" className="mt-1"
                                            checked={opcionConfirmada === "recogida"}
                                            onChange={() => setOpcionConfirmada("recogida")} />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-700">Respectful Shoes</p>
                                            <p className="text-xs text-green-600 font-medium" data-translate>Gratis</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {deliveryMethod === "envio" && (
                                <div className="space-y-4">
                                    {address ? (
                                        <div className="flex items-start gap-2">
                                            <input
                                                type="radio"
                                                name="pickup"
                                                className="mt-1"
                                                checked={opcionConfirmada === "envio"}
                                                onChange={() => setOpcionConfirmada("envio")}
                                            />
                                            <div className="text-sm text-gray-700 flex flex-col md:flex-row md:flex-wrap gap-x-6 gap-y-1">
                                                <p><span className="font-semibold">País:</span> {address.pais}</p>
                                                <p><span className="font-semibold">Provincia:</span> {address.provincia}</p>
                                                <p><span className="font-semibold">Localidad:</span> {address.localidad}</p>
                                                <p><span className="font-semibold">Código Postal:</span> {address.codigo_postal}</p>
                                                <p><span className="font-semibold">Tipo de vía:</span> {address.tipo_via}</p>
                                                {address.adicional && (
                                                    <p><span className="font-semibold">Información adicional:</span> {address.adicional}</p>
                                                )}
                                                {address.indicacion && (
                                                    <p><span className="font-semibold">Indicaciones:</span> {address.indicacion}</p>
                                                )}
                                                <p><span className="font-semibold">¿Envío?:</span> {address.envio ? "Sí" : "No"}</p>
                                                <p><span className="font-semibold">¿Facturación?:</span> {address.facturacion ? "Sí" : "No"}</p>

                                                <button
                                                    className="mt-4 text-blue-600 text-sm font-medium underline w-fit hover:text-blue-800 transition"
                                                    onClick={() => handleActualizarDireccion(address)}
                                                    data-translate
                                                >
                                                    Actualizar dirección
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">No tienes dirección guardada.</p>
                                            <button
                                                className="text-white bg-[#6E9475] hover:bg-[#5C8465] text-sm font-medium px-4 py-2 rounded transition"
                                                onClick={() => handleAgregarDireccion()}
                                                data-translate
                                            >
                                                Agregar dirección
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {deliveryMethod === "envio" && address && (
                                <div className="border p-4 rounded-md mt-4 space-y-3">
                                    <p className="font-bold text-gray-700 uppercase">CASA</p>
                                    <p className="text-sm text-gray-600">{address.pais}, {address.codigo_postal} - {address.provincia}</p>

                                    <div className="space-y-2 mt-2">
                                        {Object.entries(opcionesEnvio).map(([key, data]) => (
                                            <label key={key} className="flex items-center justify-between border rounded px-3 py-2 cursor-pointer">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="tipo_envio"
                                                        checked={envioSeleccionado === key}
                                                        onChange={() => setEnvioSeleccionado(key as "domicilio" | "express")}
                                                    />
                                                    <div className="text-sm">
                                                        <p className="font-medium">{data.label}</p>
                                                        <p className="text-xs text-gray-500">{data.fecha}</p>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-semibold">{formatPrice(data.costo)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 text-sm text-gray-700 space-y-1">
                                <p className="flex justify-between">
                                    <span data-translate>Gastos de preparación:</span>
                                    <span className="text-green-600 font-medium" data-translate>Gratis</span>
                                </p>

                                {deliveryMethod === "envio" && (
                                    <p className="flex justify-between">
                                        <span data-translate>Envío:</span>
                                        <span className="text-gray-800 font-medium">{formatPrice(envioCosto)}</span>
                                    </p>
                                )}

                                <p className="flex justify-between font-bold mt-2">
                                    <span>Total:</span>
                                    <span>{formatPrice(totalFinal)}</span>
                                </p>
                            </div>

                            <div className="flex justify-between mt-6">
                                <a href="/carrito"><button className="border px-4 py-2 text-sm font-semibold text-[#2F4F4F] bg-[#E2E8F0] hover:bg-[#CBD5E1] rounded-lg" data-translate>Volver</button></a>
                                <button onClick={handleContinuar} className="bg-black text-white px-4 py-2 text-sm font-semibold bg-gray-700 hover:bg-gray-600 rounded-lg" data-translate>Continuar a resumen</button>
                            </div>

                        </div>
                    )}

                    {selectedSection === "resumen" && (
                        <div className="p-6 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-6">

                            <div className="space-y-6">

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 uppercase mb-1">Entrega a domicilio</h3>
                                    <p className="text-green-700 text-sm">
                                        {envioSeleccionado && opcionesEnvio[envioSeleccionado]?.fecha
                                            ? opcionesEnvio[envioSeleccionado].fecha
                                            : "Fecha estimada"}
                                    </p>
                                    <p className="text-sm text-gray-600">Persona de contacto: {email || "Nombre"}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 uppercase mb-1">Datos personales</h3>
                                    <p className="text-sm text-gray-600">{personalData?.user.name} {personalData?.user.lastName}</p>
                                    <label htmlFor="">Teléfono</label>
                                    <input
                                        type="text"
                                        className="w-full mt-2 px-3 py-2 text-sm border border-gray-300 rounded-md"
                                        placeholder="Teléfono"
                                        value={personalData?.telefono}
                                        readOnly
                                    />
                                    <label htmlFor="">{personalData?.tipo_documento}</label>
                                    <input
                                        type="text"
                                        className="w-full mt-2 px-3 py-2 text-sm border border-gray-300 rounded-md"
                                        placeholder="NIF"
                                        value={personalData?.numero_documento}
                                        readOnly
                                    />
                                    <div className="flex items-center gap-2 mt-2">
                                        <input type="checkbox" checked readOnly />
                                        <span className="text-sm">Soy mayor de edad</span>
                                    </div>
                                    <button
                                        className="mt-1 text-blue-600 text-xs underline"
                                        onClick={() => {
                                            if (personalData) {
                                                handleEditarDatos(personalData);
                                            }
                                        }}
                                    >
                                        Modificar datos personales
                                    </button>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 uppercase mb-1">Observaciones</h3>
                                    <textarea
                                        rows={3}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                                        placeholder="Ej. si no hay nadie en casa dejar al portero"
                                        value={observacion}
                                        onChange={(e) => setObservaciones(e.target.value)}
                                    />
                                </div>

                            </div>

                            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">Resumen de compra </h3>

                                {car.map((product) => (
                                    <div key={product.id} className="flex gap-4 border-b py-4">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded border"
                                        />
                                        <div className="text-sm">
                                            <p className="font-semibold">{product.name}</p>
                                            <p className="text-gray-500">{product.descripcion}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="text-sm mt-4 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                    {envioSeleccionado && (
                                        <div className="flex justify-between">
                                            <span>Gastos de envío</span>
                                            <span>{formatPrice(envioCosto)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold border-t pt-2 mt-2">
                                        <span>Total</span>
                                        <span>{formatPrice(totalFinal)}</span>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-600 mt-4">
                                    <p className="mb-1 font-semibold">Desglose por tipo de impuesto</p>
                                    <div className="flex justify-between">
                                        <span>21.00%</span>
                                        <span>{formatPrice((totalFinal * 0.21))}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-4 mt-6">
                                    <button
                                        onClick={() => setSelectedSection("entrega")}
                                        className="border px-4 py-2 text-sm font-semibold text-[#2F4F4F] bg-[#E2E8F0] hover:bg-[#CBD5E1] rounded-lg"
                                    >
                                        Regresar
                                    </button>
                                    <button
                                        onClick={() => setSelectedSection("pago")}
                                        className="text-white px-4 py-2 text-sm font-semibold bg-gray-700 hover:bg-gray-600 rounded-lg"
                                    >
                                        Continua a modos de pagos
                                    </button>
                                </div>

                            </div>

                        </div>
                    )}

                    {selectedSection === "pago" && (
                        <div className="p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-6" data-translate>Método de pago</h2>

                            <div className="p-6 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-6">

                                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Resumen de pago</h3>

                                    <div className="text-sm mt-4 space-y-1">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>{formatPrice(total)}</span>
                                        </div>
                                        {envioSeleccionado && (
                                            <div className="flex justify-between">
                                                <span>Gastos de envío</span>
                                                <span>{formatPrice(envioCosto)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between font-bold border-t pt-2 mt-2">
                                            <span>Total</span>
                                            <span>{formatPrice(totalFinal)}</span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-600 mt-4">
                                        <p className="mb-1 font-semibold">Desglose por tipo de impuesto</p>
                                        <div className="flex justify-between">
                                            <span>21.00%</span>
                                            <span>{formatPrice((totalFinal * 0.21))}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between font-bold mt-2">
                                        <span>Total con IVA:</span>
                                        <span>{formatPrice(totalConImpuesto)}</span>
                                    </div>

                                </div>

                                <div className="space-y-4">
                                    <label className="flex items-center justify-between border rounded px-4 py-3 cursor-pointer transition hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="metodo_pago"
                                                value="redsys"
                                                checked={selectedPayment === "redsys"}
                                                onChange={() => setSelectedPayment("redsys")}
                                            />
                                            <span className="text-sm font-medium text-gray-700">Tarjeta de crédito o débito (Redsys)</span>
                                        </div>
                                        <img src={redsys} alt="Redsys" className="w-6 h-6" />
                                    </label>

                                    <label className="flex items-center justify-between border rounded px-4 py-3 cursor-pointer transition hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="metodo_pago"
                                                value="paypal"
                                                checked={selectedPayment === "paypal"}
                                                onChange={() => setSelectedPayment("paypal")}
                                            />
                                            <span className="text-sm font-medium text-gray-700">Pagar con PayPal</span>
                                        </div>
                                        <img src={paypal} alt="PayPal" className="w-14" />
                                    </label>

                                    {selectedPayment === "paypal" && (
                                        <div className="mt-2 px-2 text-sm text-gray-600">
                                            Al pulsar el botón "Pagar con PayPal" serás redirigido para completar el pago con tus credenciales.
                                        </div>
                                    )}

                                    <div className="mt-6 flex justify-between">
                                        <button
                                            onClick={() => {
                                                setSelectedPayment(null);
                                                setSelectedSection("resumen");
                                            }}
                                            className="border px-4 py-2 text-sm font-semibold text-[#2F4F4F] bg-[#E2E8F0] hover:bg-[#CBD5E1] rounded-lg"
                                        >
                                            Regresar
                                        </button>

                                        <button
                                            // onClick={handleSubmitPago}
                                            disabled={!selectedPayment}
                                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${selectedPayment
                                                ? "text-white bg-gray-700 hover:bg-gray-600"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                                        >
                                            {selectedPayment === "paypal" ? "Pagar con PayPal" : "Pagar compra"}
                                        </button>
                                    </div>
                                </div>

                            </div>


                        </div>
                    )}

                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Order;