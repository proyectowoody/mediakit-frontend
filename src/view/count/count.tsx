import { useState, useEffect } from "react";
import { FaMoneyBillWave, FaSave, FaUser, FaLock, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { HandleData } from "../../validation/password/handle";
import Message from "../../components/message";
import { HandleCash } from "../../validation/admin/count/handle";
import { getUserEmail } from "../../components/ts/emailFromToken";
import useAuthProtection from "../../components/ts/useAutProteccion";
import { handleGetUserSession } from "../../components/ts/fetchUser";
import { handleGetAddress } from "../../validation/address/handleGet";
import { Address } from "../buy/buy";
import { useNavigate } from "react-router-dom";

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

function AccountSettings() {

    useAuthProtection();

    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    const navigate = useNavigate();

    const [email, setEmail] = useState<string | null>(null);
    const [cash, setCash] = useState("EUR");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState("personal");

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
        setDropdownOpen(false);
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
        verPassword
    );

    const { handleSubmitCount, isLoadingCount } = HandleCash(cash);

    const [address, setAddress] = useState<Address | null>(null);

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

    return (
        <div>
            <Header />
            <div className="flex flex-col md:flex-row mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="w-full md:w-1/4 p-4 bg-[#FAF3E0] min-h-full flex flex-col">
                    <ul className="w-full">
                        <li className={`p-3 cursor-pointer ${selectedSection === "personal" ? "bg-[#6E9475] text-white" : ""}`} onClick={() => setSelectedSection("personal")} data-translate>
                            <FaUser className="inline-block mr-2" /> Información
                        </li>
                        <li className={`p-3 cursor-pointer ${selectedSection === "password" ? "bg-[#6E9475] text-white" : ""}`} onClick={() => setSelectedSection("password")} data-translate>
                            <FaLock className="inline-block mr-2" /> Contraseña
                        </li>
                        <li className={`p-3 cursor-pointer ${selectedSection === "direccion" ? "bg-[#6E9475] text-white" : ""}`}
                            onClick={() => setSelectedSection("direccion")} data-translate>
                            <FaMapMarkerAlt className="inline-block mr-2" /> Dirección
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-3/4 p-6">
                    {selectedSection === "personal" && (
                        <div className="p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-6" data-translate>Información</h2>
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
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                                className="w-full flex justify-between items-center px-4 py-2 bg-[#FAF3E0] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                            >
                                                <span>{currencyOptions.find(c => c.code === cash)?.name}</span>
                                                <FaMoneyBillWave className="text-[#6E9475]" />
                                            </button>
                                            {dropdownOpen && (
                                                <div className="absolute mt-2 w-full bg-gray-100 border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                                    {currencyOptions.map((currency) => (
                                                        <button
                                                            type="button"
                                                            key={currency.code}
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                handleCurrencyChange(currency.code);
                                                                setDropdownOpen(false);
                                                            }}
                                                            className="mt-4 block w-full text-lg px-4 py-3 text-black hover:bg-gray-200 text-left"
                                                        >
                                                            {currency.symbol} {currency.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="mt-6 w-full bg-[#6E9475] text-white py-2 px-4 rounded-lg hover:bg-[#5C8465] flex items-center justify-center" data-translate>
                                    {isLoadingCount ? "Procesando..." : "Guardar"} <FaSave className="ml-2" />
                                </button>
                            </form>
                        </div>
                    )}
                    {selectedSection === "password" && (
                        <div>
                            <div className="p-6 rounded-lg">
                                <Message />
                                <form onSubmit={handleSubmit} className="mt-6">
                                    <h2 className="text-2xl font-semibold text-gray-700 mb-6" data-translate>Contraseña</h2>
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

                                    <button className="mt-6 w-full bg-[#6E9475] text-white py-2 px-4 rounded-lg hover:bg-[#5C8465] flex items-center justify-center" data-translate>
                                        <FaSave className="mr-2" />{isLoading ? "Procesando..." : "Restablecer Contraseña"}
                                    </button>
                                </form>
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
                                        <div><p className="font-semibold">Calle:</p><p>{address.calle}</p></div>
                                        <div><p className="font-semibold">Número:</p><p>{address.numero}</p></div>
                                        {address.piso_puerta && (<div><p className="font-semibold">Piso / Puerta:</p><p>{address.piso_puerta}</p></div>)}
                                        <div><p className="font-semibold">Código Postal:</p><p>{address.codigo_postal}</p></div>
                                        <div><p className="font-semibold">Ciudad:</p><p>{address.ciudad}</p></div>
                                        <div><p className="font-semibold">Provincia:</p><p>{address.provincia}</p></div>
                                        <div><p className="font-semibold">Comunidad Autónoma:</p><p>{address.comunidad_autonoma}</p></div>
                                        <div><p className="font-semibold">País:</p><p>{address.pais}</p></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 italic mb-4">
                                    Aún no has registrado una dirección.
                                </div>
                            )}

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => navigate("/direccion")}
                                    className="inline-block bg-[#6E9475] hover:bg-[#5C8465] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                                >
                                    {address ? "Actualizar Dirección" : "Agregar Dirección"}
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AccountSettings;


