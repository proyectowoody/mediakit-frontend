import logo from '../assets/img/logo.png';
import paypal from '../assets/img/paypal.png';
import visa from '../assets/img/visa.png';
import mastercard from '../assets/img/mastercard.png';
import { FaPaperPlane, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHandleSuscribe } from '../validation/contact/handle';

function Footer() {

    const [email, setEmail] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const { handleSubmitSuscribe } = useHandleSuscribe(email, setEmail); // ✅ Hook aquí, no dentro de otra función

    const handleClickSubmit = (e: any) => {
        e.preventDefault();
        if (!isChecked) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }
        handleSubmitSuscribe(e); 
    }

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
                        <h2 className="mb-2 text-lg font-semibold" data-translate>Síguenos</h2>
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
                        <h2 className="mb-2 text-lg font-semibold" data-translate>Categorías</h2>
                        <ul className="text-[#4E6E5D] space-y-1">

                            <li><a href="#" onClick={(e) => handleClick(e, "mas-vendido")} className="hover:underline hover:text-[#6E9475]" data-translate>Más Vendidos</a></li>

                            <li><a href="/tienda" className="hover:underline hover:text-[#6E9475]" data-translate>Nuestras Categorías</a></li>

                            <li><a href="#" onClick={(e) => handleClick(e, "mejores-productos")} className="hover:underline hover:text-[#6E9475]" data-translate>Nuevos Productos</a></li>

                            <li><a href="#" onClick={(e) => handleClick(e, "mejores-ofertas")} className="hover:underline hover:text-[#6E9475]" data-translate>Ofertas Especiales</a></li>

                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold" data-translate>Sobre Nosotros</h2>
                        <ul className="text-[#4E6E5D] space-y-1">
                            <li><a href="/historial" className="hover:underline hover:text-[#6E9475]" data-translate>Nuestra historia</a></li>
                            <li><a href="/blog" className="hover:underline hover:text-[#6E9475]" data-translate>Noticias</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold"data-translate>Atención al Cliente</h2>
                        <ul className="text-[#4E6E5D] space-y-1">
                            <li><a href="/contacto" className="hover:underline hover:text-[#6E9475]" data-translate>Contacto</a></li>
                            <li><a href="/garantia" className="hover:underline hover:text-[#6E9475]" data-translate>Garantía y servicio post venta</a></li>
                            <li><a href="/politicas-devoluciones" className="hover:underline hover:text-[#6E9475]" data-translate>Política de devoluciones y derecho de desistimiento</a></li>
                            <li><a href="/politicas-envio" className="hover:underline hover:text-[#6E9475]" data-translate>Política de envíos</a></li>
                            <li><a href="/preguntas-frecuentes" className="hover:underline hover:text-[#6E9475]" data-translate>Preguntas Frecuentes (FAQ)</a></li>
                        </ul>
                    </div>

                </div>

                <hr className="my-6 border-[#D4C9B0]" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div>
                        <h2 className="mb-2 text-lg font-semibold" data-translate>Mi Cuenta</h2>
                        <ul className="text-[#4E6E5D] space-y-1">
                            <li><a href="/favoritos" className="hover:underline hover:text-[#6E9475]" data-translate>Lista de Deseos</a></li>
                            <li><a href="/cuenta" className="hover:underline hover:text-[#6E9475]" data-translate>Mi Cuenta</a></li>
                            <li><a href="/cuenta" className="hover:underline hover:text-[#6E9475]" data-translate>Mi Perfil</a></li>
                            <li><a href="/comprar" className="hover:underline hover:text-[#6E9475]" data-translate>Mis Pedidos</a></li>
                            <li><a href="/comprar" className="hover:underline hover:text-[#6E9475]" data-translate>Seguimiento de Envío</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold" data-translate>Información Legal</h2>
                        <ul className="text-[#4E6E5D] space-y-1">
                            <li><a href="/aviso-legal" className="hover:underline hover:text-[#6E9475]" data-translate>Aviso Legal </a></li>
                            <li><a href="/terminos-venta" className="hover:underline hover:text-[#6E9475]" data-translate>Condiciones Generales de Venta (CGV)</a></li>
                            <li><a href="/cookies" className="hover:underline hover:text-[#6E9475]" data-translate>Política de Cookies</a></li>

                            <li><a href="/terminos" className="hover:underline hover:text-[#6E9475]" data-translate>Términos y Condiciones</a></li>
                            <li><a href="/privacidad" className="hover:underline hover:text-[#6E9475]" data-translate>Política de Privacidad</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold" data-translate>Newsletter</h2>
                        <p className="text-[#4E6E5D]" data-translate>Accede a promociones exclusivas, descuentos y novedades</p>

                        <div className="relative mt-2">
                            <form onSubmit={handleClickSubmit} className="relative">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="p-2 w-full pr-12 rounded border border-[#D4C9B0] focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                        required
                                    />
                                    <button
                                        type='submit'
                                        className="-mr-2 absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#6E9475] text-white p-2 rounded hover:bg-[#5C8465] w-10 h-10 flex items-center justify-center"
                                    >
                                        <FaPaperPlane />
                                    </button>
                                </div>
                                <div className="mt-2 flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={isChecked}
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-700" data-translate>He leído y acepto los términos y condiciones</label>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

                <hr className="my-6 border-[#D4C9B0]" />

                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <h2 className="text-lg font-semibold" data-translate>Métodos de Pago</h2>
                        <img src={visa} alt="Visa" className="h-8" />
                        <img src={mastercard} alt="Mastercard" className="h-8" />
                        <img src={paypal} alt="PayPal" className="h-8" />
                    </div>

                    <div className="text-center md:text-right text-[#4E6E5D] text-sm" data-translate>
                        © 2025 Respectful Shoes. Todos los derechos reservados.
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
