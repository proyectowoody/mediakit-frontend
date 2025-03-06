import { useState, useEffect } from "react";
import { FaUser, FaChevronDown, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/img/logo.png";
import menuIcon from "../assets/img/menu.png";
import closeIcon from "../assets/img/close.png";
import { Modal } from "./toast";
import { handleGetCountCar } from "../validation/car/handle";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);

    const categorias = [
        { nombre: "Hombre", subcategorias: ["Deporte", "Casual", "Formal"] },
        { nombre: "Mujer", subcategorias: ["Deporte", "Casual", "Tacones"] },
        { nombre: "Niños", subcategorias: ["Escolar", "Deporte", "Casual"] }
    ];

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        setIsLogged(!!token);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const nosotrosSection = document.getElementById("nosotros");
            const mitadNosotros = nosotrosSection ? (nosotrosSection.offsetTop + nosotrosSection.offsetHeight / 2) : 0;

            if (currentScrollY < 50) {
                setShowHeader(false);
            } else if (currentScrollY < mitadNosotros) {
                setShowHeader(true);
            } else if (currentScrollY > lastScrollY) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const showModal = () => setIsModalVisible(!isModalVisible);

    const logOut = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        setIsLogged(false);
    };    
    
    useEffect(() => {
        const interval = setInterval(() => {
            handleGetCountCar()
                .then((data) => {
                    setCartItemCount(data);
                })
                .catch((error) => {
                    console.error("Error del carrito:", error);
                });
        }, 500);

        return () => clearInterval(interval);
    }, [cartItemCount]);

    return (
        <div>
            <header className={`bg-[#FAF3E0] shadow-md fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">

                    <a href="/" className="flex items-center space-x-2">
                        <img src={logo} alt="Logo" className="h-10" />
                        <span className="text-xl font-bold text-[#2F4F4F]">Respectful Shoes</span>
                    </a>

                    <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        <a href="/" className="text-[#2F4F4F] hover:text-[#6E9475]">Inicio</a>
                        <div className="relative" id="dropdownMenu">
                            <button
                                className="flex items-center text-[#2F4F4F] hover:text-[#6E9475] focus:outline-none"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                Tienda <FaChevronDown className={`ml-1 text-sm transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    {categorias.map((categoria) => (
                                        <div key={categoria.nombre} className="border-b last:border-none">
                                            <div className="px-4 py-2 font-semibold text-[#2F4F4F] hover:bg-[#F0E6D6]">
                                                {categoria.nombre}
                                            </div>
                                            {categoria.subcategorias.map((sub) => (
                                                <a
                                                    key={sub}
                                                    href={`/tienda/${categoria.nombre.toLowerCase()}/${sub.toLowerCase()}`}
                                                    className="block px-6 py-1 text-sm text-[#2F4F4F] hover:bg-[#FAF3E0]"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    {sub}
                                                </a>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </nav>

                    <div className="flex items-center space-x-4 relative">
                        {isLogged && (
                            <a href="/cart" className="relative flex items-center text-[#2F4F4F] hover:text-[#6E9475]">
                                <FaShoppingCart className="h-6 w-6" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                        {cartItemCount}
                                    </span>
                                )}
                            </a>
                        )}

                        {isLogged ? (
                            <div className="relative hidden md:block">
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center px-4 py-2 bg-[#6E9475] text-white rounded hover:bg-[#5C8465]">
                                    <FaUser className="h-5 w-5" />
                                    <FaChevronDown className={`ml-1 text-sm transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                        <a href="/favorite" className="block px-4 py-2 text-[#2F4F4F] hover:bg-[#FAF3E0]">Favoritos</a>
                                        <a href="/buy" className="block px-4 py-2 text-[#2F4F4F] hover:bg-[#FAF3E0]">Compras</a>
                                        <button
                                            onClick={showModal}
                                            className="w-full text-left px-4 py-2 text-red-500 hover:bg-[#FAF3E0] flex items-center"
                                        >
                                            <FaSignOutAlt className="mr-2" /> Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a href="/login" className="hidden md:flex items-center space-x-2 px-4 py-2 bg-[#6E9475] text-white rounded hover:bg-[#5C8465]">
                                <FaUser className="h-5 w-5" />
                            </a>
                        )}

                        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                            <img src={isOpen ? closeIcon : menuIcon} alt="Menú" className="h-8" />
                        </button>
                    </div>

                </div>

                {isOpen && (
                    <nav className="md:hidden bg-[#FAF3E0] border-t border-[#D4C9B0] p-4">
                        <ul className="flex flex-col space-y-4">
                            <li><a href="/" className="text-[#2F4F4F] hover:text-[#6E9475]">Inicio</a></li>
                            <li className="relative">
                                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full text-left text-[#2F4F4F] hover:text-[#6E9475] flex justify-between items-center">
                                    Tienda <FaChevronDown className={`ml-1 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {dropdownOpen && (
                                    <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                                        {categorias.map((categoria) => (
                                            <div key={categoria.nombre} className="border-b last:border-none">
                                                <div className="px-4 py-2 font-semibold text-[#2F4F4F]">{categoria.nombre}</div>
                                                {categoria.subcategorias.map((sub) => (
                                                    <a
                                                        key={sub}
                                                        href={`/tienda/${categoria.nombre.toLowerCase()}/${sub.toLowerCase()}`}
                                                        className="block px-6 py-1 text-sm text-[#2F4F4F] hover:bg-[#FAF3E0]"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {sub}
                                                    </a>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </li>
                            {isLogged ? (
                                <>
                                    <li><a href="/favorite" className=" text-[#2F4F4F] hover:text-[#6E9475]">Favoritos</a></li>
                                    <li><a href="/buy" className=" text-[#2F4F4F] hover:text-[#6E9475]">Compras</a></li>
                                    <li>
                                        <button
                                            onClick={showModal}
                                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            <FaSignOutAlt /> <span>Cerrar sesión</span>
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <a href="/login" className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#6E9475] text-white rounded hover:bg-[#5C8465]">
                                        <FaUser className="h-5 w-5" />
                                    </a>
                                </li>
                            )}
                        </ul>
                    </nav>
                )}
            </header>
            <Modal
                onConfirm={() => {
                    showModal();
                    logOut();
                }}
                isVisible={isModalVisible}
                onClose={showModal}
                message="¿Estás seguro de cerrar sesión?"
            />
        </div>
    );
}

export default Header;
