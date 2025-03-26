import { useState, useEffect } from "react";
import { FaMoneyBillWave, FaSave, FaUser, FaEye, FaEyeSlash, FaMapMarkerAlt, FaHandshake, FaHeart, FaUserSlash, FaShoppingCart, FaLock } from "react-icons/fa";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { HandleData } from "../../validation/password/handle";
import Message from "../../components/message";
import { HandleCash } from "../../validation/admin/count/handle";
import { getUserEmail } from "../../components/ts/emailFromToken";
import useAuthProtection from "../../components/ts/useAutProteccion";
import { handleGetUserSession } from "../../components/ts/fetchUser";
import { handleGetAddress } from "../../validation/address/handleGet";
import BuyPage, { Address } from "../buy/buy";
import { useParams } from "react-router-dom";
import logo from '../../assets/img/logo.png';
import FavoriteProducts from "../favorit/favorite";
import { handleGetUserData } from "../../validation/dataUser/handleGet";
import { HandleDatosEliminar } from "../../validation/dataUser/handle";

const currencyOptions = [
    { code: "EUR", symbol: "€", name: "Euros (EUR)" },
    { code: "USD", symbol: "$", name: "Dólar Estadounidense (USD)" },
    { code: "BGN", symbol: "лв", name: "Lev Búlgaro (BGN)" },
    { code: "HRK", symbol: "kn", name: "Kuna Croata (HRK)" },
    { code: "CZK", symbol: "Kč", name: "Corona Checa (CZK)" },
    { code: "DKK", symbol: "kr", name: "Corona Danesa (DKK)" },
    { code: "HUF", symbol: "Ft", name: "Forinto Húngaro (HUF)" },
    { code: "PLN", symbol: "zł", name: "Zloty Polaco (PLN)" },
    { code: "RON", symbol: "lei", name: "Leu Rumano (RON)" },
    { code: "SEK", symbol: "kr", name: "Corona Sueca (SEK)" }
];

export interface PersonalData {
    fecha_nacimiento: string;
    tipo_documento: string;
    numero_documento: string;
    genero: string;
    telefono: string;
    user: {
        name: string;
        lastName: string;
    }
}

function AccountSettings() {

    useAuthProtection();

    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    const [email, setEmail] = useState<string | null>(null);
    const [cash, setCash] = useState("EUR");
    const [showCurrencyModal, setShowCurrencyModal] = useState(false);
    const { accion } = useParams();
    const [selectedSection, setSelectedSection] = useState("bienvenida");

    useEffect(() => {
        if (accion) {
            setSelectedSection(accion);
        }
    }, [accion]);

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
        const savedCurrency = localStorage.getItem("cash");
        if (savedCurrency) {
            setCash(savedCurrency);
        }
    }, []);

    const handleCurrencyChange = (currencyCode: any) => {
        setCash(currencyCode);
        localStorage.setItem("cash", currencyCode);
    };

    const [password, setPassword] = useState("");
    const [verPassword, setVerPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { handleSubmit, isLoading } = HandleData(
        password,
        setPassword,
        verPassword,
        setVerPassword
    );

    const { handleSubmitCount, isLoadingCount } = HandleCash(cash);

    const [address, setAddress] = useState<Address | null>(null);
    const [personalData, setpersonalData] = useState<PersonalData | null>(null);

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

    const handleActualizar = (direccion?: Address) => {
        const data = direccion || {};
        localStorage.setItem("selected_address", JSON.stringify(data));
        const backAccion = 'direccion';
        const currentPath = window.location.pathname.split("/")[1];
        const finalBackPath = backAccion ? `/${currentPath}/${backAccion}` : window.location.pathname;

        localStorage.setItem("direccion_back", finalBackPath);
        window.location.href = "/direccion";
    };

    const handleEditarDatos = (personalData?: PersonalData) => {
        const data = personalData || {};
        localStorage.setItem("selected_person", JSON.stringify(data));
        const backAccion = 'personal';
        const currentPath = window.location.pathname.split("/")[1];
        const finalBackPath = backAccion ? `/${currentPath}/${backAccion}` : window.location.pathname;

        localStorage.setItem("direccion_back", finalBackPath);
        window.location.href = "/datos-personales";
    };

    const [confirmacion, setConfirmacion] = useState("");

    const { handleSubmitDelete, isLoadingDelete } = HandleDatosEliminar(confirmacion, setConfirmacion);

    return (
        <div>
            <Header />
            <div className="flex flex-col md:flex-row mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="w-full md:w-1/4 p-4 bg-[#FAF3E0] min-h-full flex flex-col">
                    <ul className="w-full">

                        <li className={`p-3 cursor-pointer ${selectedSection === "bienvenida" ? "bg-[#6E9475] text-white" : ""}`} onClick={() => setSelectedSection("bienvenida")} data-translate>
                            <FaHandshake className="inline-block mr-2" /> Bienvenida
                        </li>

                        <li className={`p-3 cursor-pointer ${selectedSection === "favoritos" ? "bg-[#6E9475] text-white" : ""}`} onClick={() => setSelectedSection("favoritos")} data-translate>
                            <FaHeart className="inline-block mr-2" />Favoritos
                        </li>

                        <li className={`p-3 cursor-pointer ${selectedSection === "compras" ? "bg-[#6E9475] text-white" : ""}`}
                            onClick={() => setSelectedSection("compras")} data-translate>
                            <FaShoppingCart className="inline-block mr-2" /> Compras
                        </li>

                        <li className={`p-3 cursor-pointer ${selectedSection === "moneda" ? "bg-[#6E9475] text-white" : ""}`} onClick={() => setSelectedSection("moneda")} data-translate>
                            <FaMoneyBillWave className="inline-block mr-2" /> Moneda
                        </li>

                        <li className={`p-3 cursor-pointer ${selectedSection === "password" ? "bg-[#6E9475] text-white" : ""}`} onClick={() => setSelectedSection("password")} data-translate>
                            <FaLock className="inline-block mr-2" /> Contraseña
                        </li>

                        <li className={`p-3 cursor-pointer ${selectedSection === "personal" ? "bg-[#6E9475] text-white" : ""}`} onClick={() => setSelectedSection("personal")} data-translate>
                            <FaUser className="inline-block mr-2" /> Datos personales
                        </li>

                        <li className={`p-3 cursor-pointer ${selectedSection === "direccion" ? "bg-[#6E9475] text-white" : ""}`} onClick={() => setSelectedSection("direccion")} data-translate>
                            <FaMapMarkerAlt className="inline-block mr-2" /> Dirección
                        </li>

                        <li className={`p-3 cursor-pointer ${selectedSection === "eliminar" ? "bg-[#6E9475] text-white" : ""}`}
                            onClick={() => setSelectedSection("eliminar")} data-translate>
                            <FaUserSlash className="inline-block mr-2" /> Dar de baja
                        </li>

                    </ul>
                </div>
                <div className="w-full md:w-3/4 p-6">

                    {selectedSection === "bienvenida" && (
                        <div className="w-full h-full p-6 rounded-2xl bg-gradient-to-r from-[#fdfdfd] to-[#f0f4f2] shadow-xl border border-[#e6e6e6] text-center flex flex-col justify-center items-center">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-16 h-16 mx-auto mb-4"
                            />

                            <h2 className="text-xl font-bold text-[#6E9475] mb-2">¡Bienvenido de nuevo a nuestra tienda!</h2>
                            <p className="text-sm text-gray-700 max-w-md">
                                Nos alegra tenerte aquí. Esperamos que encuentres todo lo que necesitas y disfrutes de
                                una excelente experiencia de compra.
                            </p>
                        </div>
                    )}

                    {selectedSection === "favoritos" && (
                        <FavoriteProducts />
                    )}

                    {selectedSection === "compras" && (
                        <BuyPage />
                    )}

                    {selectedSection === "moneda" && (
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#fdfdfd] to-[#f0f4f2] shadow-md border border-[#e6e6e6]">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-6" data-translate>Cambia tu moneda</h2>
                            <Message />
                            <form onSubmit={handleSubmitCount}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700" data-translate>Email</label>
                                        <input
                                            type="email"
                                            value={email || ""}
                                            readOnly
                                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700" data-translate>Moneda</label>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrencyModal(true)}
                                                className="w-full flex justify-between items-center px-4 py-2 bg-[#FAF3E0] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                            >
                                                <span>{currencyOptions.find(c => c.code === cash)?.name}</span>
                                                <FaMoneyBillWave className="text-[#6E9475]" />
                                            </button>
                                        </div>

                                        {showCurrencyModal && (
                                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                                <div className="bg-white rounded-lg max-w-md w-full p-6">
                                                    <h3 className="text-xl font-semibold mb-4">Selecciona tu moneda</h3>
                                                    <div className="space-y-3 max-h-60 overflow-y-auto">
                                                        {currencyOptions.map(currency => (
                                                            <button
                                                                key={currency.code}
                                                                onClick={() => {
                                                                    handleCurrencyChange(currency.code);
                                                                    setShowCurrencyModal(false);
                                                                }}
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                                                            >
                                                                {currency.symbol} {currency.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={() => setShowCurrencyModal(false)}
                                                        className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-6 w-full bg-[#6E9475] text-white py-2 px-4 rounded-lg hover:bg-[#5C8465] flex items-center justify-center"
                                    data-translate
                                >
                                    {isLoadingCount ? "Procesando..." : "Guardar"}
                                    <FaSave className="ml-2" />
                                </button>
                            </form>
                        </div>
                    )}

                    {selectedSection === "password" && (
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#fdfdfd] to-[#f0f4f2] shadow-md border border-[#e6e6e6]">
                            <Message />
                            <form onSubmit={handleSubmit} className="mt-6">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-6" data-translate>Modifica tu contraseña</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="relative">
                                        <label className="block text-gray-700" data-translate>Nueva contraseña</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-gray-700" data-translate>Confirmar contraseña</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={verPassword}
                                                onChange={(e) => setVerPassword(e.target.value)}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="mt-6 w-full bg-[#6E9475] text-white py-2 px-4 rounded-lg hover:bg-[#5C8465] flex items-center justify-center"
                                    data-translate
                                >
                                    <FaSave className="mr-2" />
                                    {isLoading ? "Procesando..." : "Restablecer Contraseña"}
                                </button>
                            </form>
                        </div>
                    )}

                    {selectedSection === "personal" && (
                        <div className="rounded-2xl bg-gradient-to-r from-[#fdfdfd] to-[#f0f4f2] shadow-xl border border-[#e6e6e6] p-6">
                            {personalData ? (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-[#6E9475] flex items-center gap-2">
                                        <svg className="w-6 h-6 text-[#6E9475]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Datos personales
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
                                        <div><p className="font-semibold">Nombre:</p><p>{personalData.user.name}</p></div>
                                        <div><p className="font-semibold">Apellido:</p><p>{personalData.user.lastName}</p></div>
                                        <div><p className="font-semibold">Fecha de nacimiento:</p><p>{personalData.fecha_nacimiento}</p></div>
                                        <div><p className="font-semibold">Tipo de documento:</p><p>{personalData.tipo_documento}</p></div>
                                        <div><p className="font-semibold">Número de documento:</p><p>{personalData.numero_documento}</p></div>
                                        <div><p className="font-semibold">Género:</p><p>{personalData.genero}</p></div>
                                        <div><p className="font-semibold">Teléfono:</p><p>{personalData.telefono}</p></div>
                                    </div>

                                </div>
                            ) : (
                                <div className="text-center text-gray-500 italic mb-4">
                                    Aún no has registrado tus datos personales.
                                </div>
                            )}

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() =>
                                        personalData
                                            ? handleEditarDatos(personalData)
                                            : handleEditarDatos()
                                    }
                                    className="inline-block bg-[#6E9475] hover:bg-[#5C8465] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                                >
                                    {personalData ? "Actualizar Datos" : "Agregar Datos"}
                                </button>
                            </div>
                        </div>
                    )}

                    {selectedSection === "direccion" && (

                        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#fdfdfd] to-[#f0f4f2] shadow-xl border border-[#e6e6e6]">
                            <Message />

                            {address ? (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-[#6E9475] flex items-center gap-2">
                                        <svg className="w-6 h-6 text-[#6E9475]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Dirección registrada
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
                                        <div><p className="font-semibold">País:</p><p>{address.pais}</p></div>
                                        <div><p className="font-semibold">Provincia:</p><p>{address.provincia}</p></div>
                                        <div><p className="font-semibold">Localidad:</p><p>{address.localidad}</p></div>
                                        <div><p className="font-semibold">Código Postal:</p><p>{address.codigo_postal}</p></div>
                                        <div><p className="font-semibold">Tipo de vía:</p><p>{address.tipo_via}</p></div>
                                        <div><p className="font-semibold">Tipo:</p><p>{address.envio ? 'Envío' : ''} / {address.facturacion ? 'Facturación' : ''}</p></div>
                                        {address.adicional && (
                                            <div><p className="font-semibold">Información adicional:</p><p>{address.adicional}</p></div>
                                        )}
                                        {address.indicacion && (
                                            <div><p className="font-semibold">Indicaciones especiales:</p><p>{address.indicacion}</p></div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 italic mb-4">
                                    Aún no has registrado una dirección.
                                </div>
                            )}

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() =>
                                        address
                                            ? handleActualizar(address)
                                            : handleActualizar()
                                    }
                                    className="inline-block bg-[#6E9475] hover:bg-[#5C8465] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                                >
                                    {address ? "Actualizar Dirección" : "Agregar Dirección"}
                                </button>
                            </div>
                        </div>

                    )}

                    {selectedSection === "eliminar" && (
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#fdfdfd] to-[#f0f4f2] shadow-xl border border-[#e6e6e6]">
                            <h2 className="text-2xl font-bold text-red-600 mb-4">Dar de baja tu cuenta</h2>
                            <p className="text-gray-700 mb-6">
                                Esta acción eliminará tu cuenta de forma permanente. Perderás el acceso a tu historial, datos personales y cualquier información asociada.
                            </p>

                            <Message />
                            <form onSubmit={handleSubmitDelete}>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-gray-800 font-medium mb-1">Escribe <strong>ELIMINAR</strong> para confirmar</label>
                                        <input
                                            type="text"
                                            value={confirmacion}
                                            onChange={(e) => setConfirmacion(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                                            placeholder="ELIMINAR"
                                        />
                                    </div>
                                </div>

                                <button type="submit"
                                    disabled={isLoadingDelete || confirmacion !== "ELIMINAR"}
                                    className={`w-full text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ${confirmacion === "ELIMINAR"
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "bg-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    {isLoadingDelete ? "Eliminando..." : "Eliminar"}
                                </button>
                            </form>

                        </div>

                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AccountSettings;
