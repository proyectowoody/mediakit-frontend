import logo from '../assets/img/logo.png';
import paypal from '../assets/img/paypal.png';
import visa from '../assets/img/visa.png';
import mastercard from '../assets/img/mastercard.png';
import { FaPaperPlane, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useState } from 'react';
import { HandleSuscribe } from '../validation/contact/handle';
import { useLocation, useNavigate } from 'react-router-dom';

function Footer() {
    const [email, setEmail] = useState("");

    const { handleSubmitSuscribe } = HandleSuscribe(email, setEmail);

    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (sectionId: any) => {
        setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    const handleClick = (event: any, sectionId: any) => {
        event.preventDefault();

        if (location.pathname === "/") {
            scrollToSection(sectionId);
        } else {
            navigate("/", { replace: false });
            setTimeout(() => scrollToSection(sectionId), 500);
        }
    };

    return (
        <footer className="bg-[#FAF3E0] text-[#2F4F4F]">
            <div className="mx-auto w-full max-w-screen-xl p-6 lg:py-10">

                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-14" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div>
                        <h2 className="mb-2 text-lg font-semibold">Síguenos</h2>
                        <div className="flex space-x-4 text-[#4E6E5D]">
                            <a target='_blank' rel="noopener noreferrer" href="https://facebook.com/" className="hover:text-[#6E9475]">
                                <FaFacebook size={24} />
                            </a>
                            <a target='_blank' rel="noopener noreferrer" href="https://instagram.com" className="hover:text-[#6E9475]">
                                <FaInstagram size={24} />
                            </a>
                            <a target='_blank' rel="noopener noreferrer" href="https://youtube.com" className="hover:text-[#6E9475]">
                                <FaYoutube size={24} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold">Categorías</h2>
                        <ul className="text-[#4E6E5D] space-y-1">
                            <li><a href="#" onClick={(e) => handleClick(e, "mejores-ofertas")} className="hover:underline hover:text-[#6E9475]">Ofertas Especiales</a></li>
                            <li><a href="#" onClick={(e) => handleClick(e, "mejores-productos")} className="hover:underline hover:text-[#6E9475]">Nuevos Productos</a></li>
                            <li><a href="#" onClick={(e) => handleClick(e, "mas-vendido")} className="hover:underline hover:text-[#6E9475]">Más Vendidos</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold">Sobre Nosotros</h2>
                        <ul className="text-[#4E6E5D] space-y-1">
                            <li><a href="/history" className="hover:underline hover:text-[#6E9475]">Nuestra historia</a></li>
                            <li><a href="/blog" className="hover:underline hover:text-[#6E9475]">Blog</a></li>
                            <li><a href="/contact" className="hover:underline hover:text-[#6E9475]">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold">Atención al Cliente</h2>
                        <ul className="text-[#4E6E5D] space-y-1">
                            <li><a href="/faqs" className="hover:underline hover:text-[#6E9475]">Preguntas Frecuentes</a></li>
                        </ul>
                    </div>

                </div>

                <hr className="my-6 border-[#D4C9B0]" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div>
                        <h2 className="mb-2 text-lg font-semibold">Mi Cuenta</h2>
                        <ul className="text-[#4E6E5D] space-y-1">
                            <li><a href="/buy" className="hover:underline hover:text-[#6E9475]">Mis compras</a></li>
                            <li><a href="/favorite" className="hover:underline hover:text-[#6E9475]">Favoritos</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold">Legal</h2>
                        <ul className="text-[#4E6E5D] space-y-1">
                            <li><a href="/terms" className="hover:underline hover:text-[#6E9475]">Términos y Condiciones</a></li>
                            <li><a href="/privacy" className="hover:underline hover:text-[#6E9475]">Política de Privacidad</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold">Suscríbete</h2>
                        <p className="text-[#4E6E5D]">Recibe ofertas exclusivas y novedades.</p>

                        <div className="relative mt-2">
                            <form onSubmit={handleSubmitSuscribe}>
                                <input type="email" placeholder="Tu correo" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="p-2 w-full pr-10 rounded border border-[#D4C9B0] focus:outline-none focus:ring-2 focus:ring-[#6E9475]" />
                                <button type='submit' className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#6E9475] text-white p-2 rounded hover:bg-[#5C8465]">
                                    <FaPaperPlane />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

                <hr className="my-6 border-[#D4C9B0]" />

                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <h2 className="text-lg font-semibold">Métodos de Pago</h2>
                        <img src={visa} alt="Visa" className="h-8" />
                        <img src={mastercard} alt="Mastercard" className="h-8" />
                        <img src={paypal} alt="PayPal" className="h-8" />
                    </div>

                    <div className="text-center md:text-right text-[#4E6E5D] text-sm">
                        © 2025 Media Kit. Todos los derechos reservados.
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
