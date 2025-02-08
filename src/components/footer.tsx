import logo from '../assets/img/logo.png';
import paypal from '../assets/img/paypal.png';
import visa from '../assets/img/visa.png';
import mastercard from '../assets/img/mastercard.png';
import appStore from '../assets/img/appstore.png';
import googlePlay from '../assets/img/playstore.png';

function Footer() {
    return (
        <footer className="bg-[#FAF3E0] text-[#2F4F4F]">
            <div className="mx-auto w-full max-w-screen-xl p-6 lg:py-10">

                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-14" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Sobre Nosotros</h2>
                        <ul className="text-[#4E6E5D]">
                            <li><a href="/history" className="hover:underline hover:text-[#6E9475]">Nuestra historia</a></li>
                            <li><a href="/blog" className="hover:underline hover:text-[#6E9475]">Blog</a></li>
                            <li><a href="/contact" className="hover:underline hover:text-[#6E9475]">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Categorías</h2>
                        <ul className="text-[#4E6E5D]">
                            <li><a href="/" className="hover:underline hover:text-[#6E9475]">Ofertas Especiales</a></li>
                            <li><a href="/" className="hover:underline hover:text-[#6E9475]">Nuevos Productos</a></li>
                            <li><a href="/" className="hover:underline hover:text-[#6E9475]">Más Vendidos</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Atención al Cliente</h2>
                        <ul className="text-[#4E6E5D]">
                            <li><a href="/faqs" className="hover:underline hover:text-[#6E9475]">Preguntar frecuentes</a></li>
                            <li><a href="/returns" className="hover:underline hover:text-[#6E9475]">Devoluciones</a></li>
                            <li><a href="/payment" className="hover:underline hover:text-[#6E9475]">Métodos de Pago</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Legal</h2>
                        <ul className="text-[#4E6E5D]">
                            <li><a href="/terms" className="hover:underline hover:text-[#6E9475]">Términos y Condiciones</a></li>
                            <li><a href="/privacy" className="hover:underline hover:text-[#6E9475]">Política de Privacidad</a></li>
                        </ul>
                    </div>

                </div>

                <hr className="my-6 border-[#D4C9B0]" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Mi Cuenta</h2>
                        <ul className="text-[#4E6E5D]">
                            <li><a href="/orders" className="hover:underline hover:text-[#6E9475]">Mis Pedidos</a></li>
                            <li><a href="/follow-up" className="hover:underline hover:text-[#6E9475]">Seguimiento de Envío</a></li>
                            <li><a href="/favorite" className="hover:underline hover:text-[#6E9475]">Lista de Deseos</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Síguenos</h2>
                        <div className="flex space-x-4">
                            <a target='_blank' href="https://facebook.com/" className="hover:text-[#6E9475]">Facebook</a>
                            <a target='_blank' href="https://instagram.com" className="hover:text-[#6E9475]">Instagram</a>
                            <a target='_blank' href="https://x.com" className="hover:text-[#6E9475]">X</a>
                            <a target='_blank' href="https://youtube.com" className="hover:text-[#6E9475]">YouTube</a>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Suscríbete</h2>
                        <p className="text-[#4E6E5D]">Recibe ofertas exclusivas y novedades.</p>
                        <input
                            type="email"
                            placeholder="Tu correo"
                            className="mt-2 p-2 w-full rounded border border-[#D4C9B0]"
                        />
                        <button className="mt-2 px-4 py-2 bg-[#6E9475] text-white rounded hover:bg-[#5C8465]">
                            Suscribirse
                        </button>
                    </div>
                </div>

                <hr className="my-6 border-[#D4C9B0]" />

                <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Métodos de Pago</h2>
                        <div className="flex space-x-4">
                            <img src={visa} alt="Visa" className="h-8" />
                            <img src={mastercard} alt="Mastercard" className="h-8" />
                            <img src={paypal} alt="PayPal" className="h-8" />
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Descarga Nuestra App</h2>
                        <div className="flex space-x-4">
                            <img src={appStore} alt="App Store" className="h-10" />
                            <img src={googlePlay} alt="Google Play" className="h-10" />
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-[#4E6E5D] text-sm">
                    © 2025 Media Kit. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
