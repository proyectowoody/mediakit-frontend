import Header from "../../components/header";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import roleAdmin from "../../components/ts/roleAdmin";

function MediaKit() {

    const navigate = useNavigate();

    useEffect(() => {
        roleAdmin(navigate);
    }, [navigate]);

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16">
                <div className="max-w-screen-lg mx-auto">
                    <h1 className="text-4xl font-bold text-[#2F4F4F] text-center mb-6">
                        Media Kit - Respectful Shoes
                    </h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#6E9475] mb-3">Nuestra Historia</h2>
                        <p className="text-[#2F4F4F]">
                            Respectful Shoes nació cuando, tras el nacimiento de nuestra hija, descubrimos el
                            calzado respetuoso. Conscientes de la importancia de un desarrollo saludable y
                            sostenible, decidimos crear una tienda que uniera estos valores, ofreciendo calzado
                            respetuoso no solo para niños, sino también para adultos.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#6E9475] mb-3">Misión y Visión</h2>
                        <p className="text-[#2F4F4F]">
                            Nuestra misión es proporcionar un calzado que respete el desarrollo natural del pie y
                            proteja el medio ambiente. Buscamos ser referentes en sostenibilidad y bienestar para
                            todas las edades, sin importar dónde estén.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#6E9475] mb-3">Valores</h2>
                        <ul className="list-disc pl-6 text-[#2F4F4F]">
                            <li>Respeto por el Desarrollo Natural</li>
                            <li>Sostenibilidad</li>
                            <li>Bienestar y Tranquilidad</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#6E9475] mb-3">Productos</h2>
                        <p className="text-[#2F4F4F]">
                            Ofrecemos una gama de calzado respetuoso para todas las edades, desde primeros pasos
                            hasta adultos. Cada modelo sigue principios de diseño que cuidan del desarrollo del
                            pie y del planeta.
                        </p>
                        <ul className="list-disc pl-6 text-[#2F4F4F] mt-2">
                            <li>Zero Drop</li>
                            <li>Caja Ancha para los Dedos</li>
                            <li>Flexibilidad</li>
                            <li>Ligereza</li>
                            <li>Materiales sostenibles</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-[#6E9475] mb-3">Audiencia Objetivo</h2>
                        <p className="text-[#2F4F4F]">
                            Nuestros clientes son padres, personas con conciencia ecológica y familias que valoran
                            la sostenibilidad. Nos dirigimos a clientes en todos los continentes, comprometidos
                            con la sostenibilidad y el desarrollo saludable.
                        </p>
                    </section>

                    <section className="text-center">
                        <h2 className="text-2xl font-semibold text-[#6E9475] mb-3">Contacto</h2>
                        <p className="text-[#2F4F4F] mb-4">Para más información, contáctanos:</p>
                        <a href="mailto:info@respectfulshoes.com" className="px-6 py-3 bg-[#6E9475] text-white rounded-lg shadow-md hover:bg-[#5C8465] transition-all">
                            info@respectfulshoes.com
                        </a>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MediaKit;
