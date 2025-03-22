import Footer from "../../components/footer";
import Header from "../../components/header";

function LegalNotice() {

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16 flex justify-center">
                <div className="mt-20 max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl  text-[#2F4F4F] font-bold mb-4" data-translate>Aviso Legal</h1>

                    <h2 className="text-xl font-semibold mt-4 text-[#6E9475]" data-translate>1. Datos de Identificación</h2>
                    <p data-translate>Nombre de la empresa: [NOMBRE_EMPRESA]</p>
                    <p data-translate>Domicilio social: [DIRECCIÓN_COMPLETA]</p>
                    <p data-translate>CIF/NIF: [CIF/NIF]</p>
                    <p data-translate>Correo electrónico:[EMAIL_CONTACTO]</p>
                    <p data-translate>Teléfono:[TELÉFONO_CONTACTO]</p>

                    <h2 className="text-xl font-semibold mt-4 text-[#6E9475]" data-translate>2. Objeto y Alcance</h2>
                    <p data-translate>El presente Aviso Legal regula el acceso y uso de la página web [DOMINIO_DEL_SITIO]. Al acceder y navegar por este sitio, el usuario acepta íntegramente las condiciones aquí expuestas.</p>

                    <h2 className="text-xl font-semibold mt-4 text-[#6E9475]" data-translate>3. Propiedad Intelectual e Industrial</h2>
                    <p data-translate>Todos los contenidos del sitio web, incluyendo, entre otros, textos, imágenes, gráficos, logotipos, iconos, software y códigos fuente, son propiedad de [NOMBRE_EMPRESA] o de terceros que han autorizado su uso. Queda expresamente prohibida la reproducción total o parcial sin autorización previa por escrito.</p>

                    <h2 className="text-xl font-semibold mt-4 text-[#6E9475]" data-translate>4. Condiciones de Uso</h2>
                    <ul className="list-disc list-inside">
                        <li data-translate>Realizar actividades que puedan dañar, inutilizar o sobrecargar el sitio.</li>
                        <li data-translate>Incluir contenidos que infrinjan derechos de terceros.</li>
                        <li data-translate>Cualquier uso no autorizado que pueda generar responsabilidades legales.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-4 text-[#6E9475]" data-translate>5. Responsabilidad</h2>
                    <p data-translate>[NOMBRE_EMPRESA] no se responsabiliza de los errores u omisiones, de los contenidos del sitio web o de otros contenidos a los que se pueda acceder a través del mismo. El usuario es responsable del uso que realice de la información publicada.</p>

                    <h2 className="text-xl font-semibold mt-4 text-[#6E9475]" data-translate>6. Legislación Aplicable y Jurisdicción</h2>
                    <p data-translate>La relación entre [NOMBRE_EMPRESA] y el usuario se regirá por la legislación española. Para la resolución de cualquier controversia, serán competentes los juzgados y tribunales de [CIUDAD/LOCALIDAD].</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LegalNotice;
