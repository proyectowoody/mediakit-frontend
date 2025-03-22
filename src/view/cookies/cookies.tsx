import Footer from "../../components/footer";
import Header from "../../components/header";
import { useEffect } from "react";

function CookiesPolicy() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16">
                <div className="mt-20 max-w-screen-lg mx-auto">
                    <h1 className="text-4xl font-bold text-[#2F4F4F] text-center mb-6" data-translate>
                        Política de Cookies
                    </h1>

                    <div className="bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6 space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>1. ¿Qué son las cookies?</h2>
                            <p data-translate>Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario al navegar por nuestro sitio web. Su finalidad es mejorar la experiencia de usuario y recoger información de navegación.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>2. Tipos de Cookies Utilizadas</h2>
                            <ul className="list-disc list-inside mt-2">
                                <li data-translate>Cookies técnicas: Necesarias para el funcionamiento del sitio y el uso de sus servicios (p.ej., mantener la sesión iniciada).</li>
                                <li data-translate>Cookies de análisis: Permiten recopilar información anónima sobre la navegación para mejorar el rendimiento del sitio.</li>
                                <li data-translate>Cookies de publicidad:Se utilizan para mostrar anuncios más relevantes en función de los intereses del usuario.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>3. Gestión y Desactivación de Cookies</h2>
                            <p data-translate>El usuario puede aceptar o rechazar el uso de cookies mediante la configuración de su navegador. Para más información sobre cómo modificar esta configuración, consulte las instrucciones específicas de su navegador.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>4. Modificaciones</h2>
                            <p data-translate>[NOMBRE_EMPRESA] se reserva el derecho a modificar la presente política para adaptarla a novedades legislativas o cambios en el funcionamiento del sitio.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CookiesPolicy;
