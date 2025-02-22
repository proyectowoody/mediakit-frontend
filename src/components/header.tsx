import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaChevronDown } from "react-icons/fa";
import logo from "../assets/img/logo.png";
import menuIcon from "../assets/img/menu.png";
import closeIcon from "../assets/img/close.png";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const categorias = [
        {
            nombre: "Hombre",
            subcategorias: ["Deporte", "Casual", "Formal"]
        },
        {
            nombre: "Mujer",
            subcategorias: ["Deporte", "Casual", "Tacones"]
        },
        {
            nombre: "Niños",
            subcategorias: ["Escolar", "Deporte", "Casual"]
        }
    ];

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

    // Cierra el dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.getElementById("dropdownMenu");
            if (dropdown && !dropdown.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className={`bg-[#FAF3E0] shadow-md fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">

                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-10" />
                    <span className="text-xl font-bold text-[#2F4F4F]">Respectful Shoes</span>
                </Link>

                <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
                    <Link to="/" className="text-[#2F4F4F] hover:text-[#6E9475]">Inicio</Link>

                    {/* Dropdown Tienda */}
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
                                            <Link
                                                key={sub}
                                                to={`/tienda/${categoria.nombre.toLowerCase()}/${sub.toLowerCase()}`}
                                                className="block px-6 py-1 text-sm text-[#2F4F4F] hover:bg-[#FAF3E0]"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Login y Menú Hamburguesa */}
                <div className="flex items-center space-x-4">
                    <Link to="/login" className="hidden md:flex items-center space-x-2 px-4 py-2 bg-[#6E9475] text-white rounded hover:bg-[#5C8465]">
                        <FaUser className="h-5 w-5" />
                    </Link>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                        <img src={isOpen ? closeIcon : menuIcon} alt="Menú" className="h-8" />
                    </button>
                </div>
            </div>

            {/* Menú Móvil */}
            {isOpen && (
                <nav className="md:hidden bg-[#FAF3E0] border-t border-[#D4C9B0] p-4">
                    <ul className="flex flex-col space-y-4">
                        <li><Link to="/" className="text-[#2F4F4F] hover:text-[#6E9475]">Inicio</Link></li>
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
                                                <Link
                                                    key={sub}
                                                    to={`/tienda/${categoria.nombre.toLowerCase()}/${sub.toLowerCase()}`}
                                                    className="block px-6 py-1 text-sm text-[#2F4F4F] hover:bg-[#FAF3E0]"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {sub}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                        <li>
                            <Link to="/login" className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#6E9475] text-white rounded hover:bg-[#5C8465]">
                                <FaUser className="h-5 w-5" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default Header;
