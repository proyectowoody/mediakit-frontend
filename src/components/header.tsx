import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import cartIcon from "../assets/img/cart.png";
import heartIcon from "../assets/img/heart.png";
import menuIcon from "../assets/img/menu.png";
import closeIcon from "../assets/img/close.png";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-[#FAF3E0] shadow-md">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">

                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-10" />
                    <span className="text-xl font-bold text-[#2F4F4F]">Media Kit</span>
                </Link>

                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="text-[#2F4F4F] hover:text-[#6E9475]">Inicio</Link>
                    <Link to="/offer" className="text-[#2F4F4F] hover:text-[#6E9475]">Ofertas</Link>
                    <Link to="/contact" className="text-[#2F4F4F] hover:text-[#6E9475]">Contacto</Link>
                </nav>

                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="hidden md:block px-3 py-1 border border-[#D4C9B0] rounded-md text-[#2F4F4F] focus:outline-none"
                />

                <div className="flex items-center space-x-4">
                    <Link to="/favorite">
                        <img src={heartIcon} alt="Favoritos" className="h-6" />
                    </Link>
                    <Link to="/cart">
                        <img src={cartIcon} alt="Carrito" className="h-6" />
                    </Link>

                    <Link to="/login" className="hidden md:block px-4 py-2 bg-[#6E9475] text-white rounded hover:bg-[#5C8465]">
                        Iniciar sesión
                    </Link>
                    <Link to="/register" className="hidden md:block px-4 py-2 border border-[#6E9475] text-[#6E9475] rounded hover:bg-[#6E9475] hover:text-white">
                        Registrarse
                    </Link>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                        <img src={isOpen ? closeIcon : menuIcon} alt="Menú" className="h-8" />
                    </button>
                </div>
            </div>

            {isOpen && (
                <nav className="md:hidden bg-[#FAF3E0] border-t border-[#D4C9B0] p-4">
                    <ul className="flex flex-col space-y-4">
                        <li><Link to="/" className="text-[#2F4F4F] hover:text-[#6E9475]">Inicio</Link></li>
                        <li><Link to="/offert" className="text-[#2F4F4F] hover:text-[#6E9475]">Ofertas</Link></li>
                        <li><Link to="/contact" className="text-[#2F4F4F] hover:text-[#6E9475]">Contacto</Link></li>
                        <li><Link to="/favorite" className="text-[#2F4F4F] hover:text-[#6E9475]">Favoritos</Link></li>
                        <li><Link to="/cart" className="text-[#2F4F4F] hover:text-[#6E9475]">Carrito</Link></li>
                        <li>
                            <Link to="/login" className="block text-center px-4 py-2 bg-[#6E9475] text-white rounded hover:bg-[#5C8465]">
                                Iniciar sesión
                            </Link>
                        </li>
                        <li>
                            <Link to="/registe" className="block text-center px-4 py-2 border border-[#6E9475] text-[#6E9475] rounded hover:bg-[#6E9475] hover:text-white">
                                Registrarse
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default Header;
