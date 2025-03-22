import Footer from "../../components/footer";
import Header from "../../components/header";
import { useEffect } from "react";

function Privacy() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16">
                <div className="mt-20 max-w-screen-lg mx-auto">
                    <h1 className="text-4xl font-bold text-[#2F4F4F] text-center mb-6" data-translate>
                        Política de Privacidad
                    </h1>

                    <div className="bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6 space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>1. Responsable del Tratamiento</h2>
                            <p data-translate>Responsable: [NOMBRE_EMPRESA]</p>
                            <p data-translate>Domicilio: [DIRECCIÓN_COMPLETA]</p>
                            <p data-translate>CIF/NIF: [CIF/NIF]</p>
                            <p data-translate>Correo electrónico: [EMAIL_CONTACTO]</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>2. Datos Recogidos</h2>
                            <p data-translate>Recabamos datos personales de nuestros usuarios cuando se registran, realizan una compra o se ponen en contacto con nosotros, incluyendo:</p>
                            <ul className="list-disc list-inside mt-2">
                                <li data-translate>Nombre y apellidos.</li>
                                <li data-translate>Dirección (envío y facturación).</li>
                                <li data-translate>Dirección de correo electrónico.</li>
                                <li data-translate>Número de teléfono.</li>
                                <li data-translate>Datos de pago (gestionados a través de terceros seguros).</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>3. Finalidad del Tratamiento</h2>
                            <p data-translate>Los datos se utilizarán para:</p>
                            <ul className="list-disc list-inside mt-2">
                                <li data-translate>Gestionar y procesar pedidos.</li>
                                <li data-translate>Enviar comunicaciones relativas a transacciones, actualizaciones de servicios y promociones (previa aceptación del usuario).</li>
                                <li data-translate>Mejorar la experiencia de navegación y personalizar contenidos.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>4. Base Jurídica</h2>
                            <p data-translate>El tratamiento se basa en:</p>
                            <ul className="list-disc list-inside mt-2">
                                <li data-translate>La ejecución de un contrato (compra y venta).</li>
                                <li data-translate>El consentimiento del usuario (para comunicaciones comerciales).</li>
                                <li data-translate>El interés legítimo de mejorar nuestros servicios.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>5. Conservación y Seguridad de los Datos</h2>
                            <p data-translate>Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recogen y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad. Se aplican medidas de seguridad técnicas y organizativas para proteger la información.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>6. Derechos de los Usuarios</h2>
                            <p data-translate>El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos dirigiéndose a [EMAIL_CONTACTO] e indicando claramente la solicitud.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Privacy;
