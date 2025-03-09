import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useEffect } from "react";
import roleAdmin from "../../components/ts/roleAdmin";

function Privacy() {
    const navigate = useNavigate();

    useEffect(() => {
        roleAdmin(navigate);
    }, [navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16">
                <div className="mt-20 max-w-screen-lg mx-auto">
                    <h1 className="text-4xl font-bold text-[#2F4F4F] text-center mb-6">
                        Política de Privacidad
                    </h1>
                    <p className="text-center text-[#2F4F4F] mb-8">
                        Tu privacidad es importante para nosotros. A continuación, te explicamos cómo manejamos tu información personal.
                    </p>

                    <div className="bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6 space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">1. Introducción</h2>
                            <p className="text-[#2F4F4F]">
                                En <strong>Respectful Shoes</strong>, nos comprometemos a proteger tu privacidad y datos personales. Esta política explica qué datos recopilamos, cómo los usamos y cómo los protegemos.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">2. Información que recopilamos</h2>
                            <p className="text-[#2F4F4F]">
                                Podemos recopilar los siguientes datos cuando usas nuestra plataforma:
                            </p>
                            <ul className="list-disc list-inside text-[#2F4F4F] mt-2">
                                <li>Nombre y apellidos</li>
                                <li>Correo electrónico</li>
                                <li>Dirección de envío y facturación</li>
                                <li>Número de teléfono</li>
                                <li>Información de pago (cifrada y protegida)</li>
                                <li>Datos de navegación y cookies</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">3. Uso de la información</h2>
                            <p className="text-[#2F4F4F]">
                                Utilizamos la información recopilada para:
                            </p>
                            <ul className="list-disc list-inside text-[#2F4F4F] mt-2">
                                <li>Procesar pedidos y gestionar entregas</li>
                                <li>Proporcionar soporte al cliente</li>
                                <li>Mejorar nuestra plataforma y experiencia de usuario</li>
                                <li>Enviar promociones y ofertas personalizadas</li>
                                <li>Cumplir con requisitos legales y de seguridad</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">4. Protección de datos</h2>
                            <p className="text-[#2F4F4F]">
                                Implementamos medidas de seguridad para proteger tu información personal contra accesos no autorizados, alteraciones o divulgaciones indebidas.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">5. Uso de cookies</h2>
                            <p className="text-[#2F4F4F]">
                                Utilizamos cookies para mejorar la experiencia del usuario, personalizar contenido y analizar el tráfico en nuestro sitio. Puedes administrar tus preferencias de cookies en la configuración de tu navegador.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">6. Compartir información con terceros</h2>
                            <p className="text-[#2F4F4F]">
                                No vendemos ni compartimos tu información personal con terceros, excepto cuando sea necesario para procesar pedidos, cumplir con obligaciones legales o mejorar nuestros servicios.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">7. Derechos del usuario</h2>
                            <p className="text-[#2F4F4F]">
                                Tienes derecho a acceder, corregir o eliminar tus datos personales. Si deseas ejercer estos derechos, contáctanos en:{" "}
                                <a href="mailto:soporte@respectfulshoes.com" className="text-[#6E9475] font-medium hover:underline">
                                    soporte@respectfulshoes.com
                                </a>
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">8. Cambios en la política</h2>
                            <p className="text-[#2F4F4F]">
                                Nos reservamos el derecho de actualizar esta Política de Privacidad. Notificaremos cualquier cambio en esta página o a través de nuestros canales oficiales.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">9. Contacto</h2>
                            <p className="text-[#2F4F4F]">
                                Si tienes preguntas sobre nuestra Política de Privacidad, contáctanos en{" "}
                                <a href="mailto:soporte@respectfulshoes.com" className="text-[#6E9475] font-medium hover:underline">
                                    soporte@respectfulshoes.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Privacy;
