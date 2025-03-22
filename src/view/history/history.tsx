import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect } from "react";

function MediaKit() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16 flex justify-center">
                <div className="mt-20 max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
                    <div className="mt-20 max-w-screen-lg mx-auto">
                        <h1 className="text-4xl font-bold text-[#2F4F4F] text-center mb-6" data-translate>
                            Respectful Shoes
                        </h1>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-3" data-translate>Nuestra Historia</h2>
                            <p className="text-[#2F4F4F]" data-translate>
                                Respectful Shoes nació cuando, tras el nacimiento de nuestra hija, descubrimos el
                                calzado respetuoso. Conscientes de la importancia de un desarrollo saludable y
                                sostenible, decidimos crear una tienda que uniera estos valores, ofreciendo calzado
                                respetuoso no solo para niños, sino también para adultos.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-3" data-translate>Misión y Visión</h2>
                            <p className="text-[#2F4F4F]" data-translate>
                                Nuestra misión es proporcionar un calzado que respete el desarrollo natural del pie y
                                proteja el medio ambiente. Buscamos ser referentes en sostenibilidad y bienestar para
                                todas las edades, sin importar dónde estén.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-3" data-translate>Valores</h2>
                            <ul className="list-disc pl-6 text-[#2F4F4F]">
                                <li data-translate>Respeto por el Desarrollo Natural</li>
                                <li data-translate>Sostenibilidad</li>
                                <li data-translate>Bienestar y Tranquilidad</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-3" data-translate>Productos</h2>
                            <p className="text-[#2F4F4F]" data-translate>
                                Ofrecemos una gama de calzado respetuoso para todas las edades, desde primeros pasos
                                hasta adultos. Cada modelo sigue principios de diseño que cuidan del desarrollo del
                                pie y del planeta.
                            </p>
                            <ul className="list-disc pl-6 text-[#2F4F4F] mt-2">
                                <li data-translate>Zero Drop</li>
                                <li data-translate>Caja Ancha para los Dedos</li>
                                <li data-translate>Flexibilidad</li>
                                <li data-translate>Ligereza</li>
                                <li data-translate>Materiales sostenibles</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-3" data-translate>Audiencia Objetivo</h2>
                            <p className="text-[#2F4F4F]" data-translate>
                                Nuestros clientes son padres, personas con conciencia ecológica y familias que valoran
                                la sostenibilidad. Nos dirigimos a clientes en todos los continentes, comprometidos
                                con la sostenibilidad y el desarrollo saludable.
                            </p>
                        </section>

                        <section className="text-center">
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-3" data-translate>Contacto</h2>
                            <p className="text-[#2F4F4F] mb-4" data-translate>Para más información, contáctanos:</p>
                            <a href="mailto:info@respectfulshoes.com" className="px-6 py-3 bg-[#6E9475] text-white rounded-lg shadow-md hover:bg-[#5C8465] transition-all">
                                info@respectfulshoes.com
                            </a>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MediaKit;
