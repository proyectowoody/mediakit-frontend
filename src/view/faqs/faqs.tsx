import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import roleAdmin from "../../components/ts/roleAdmin";

function Faqs() {
    const navigate = useNavigate();

    useEffect(() => {
        roleAdmin(navigate);
    }, [navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

    const faqs = [
        {
            id: 1,
            question: "¿Qué es el calzado respetuoso?",
            answer: "El calzado respetuoso es aquel que está diseñado para adaptarse al movimiento natural del pie, proporcionando comodidad, flexibilidad y apoyo sin restringir el movimiento natural.",
        },
        {
            id: 2,
            question: "¿Cuáles son los beneficios de los zapatos sostenibles?",
            answer: "Los zapatos sostenibles reducen la huella de carbono, están hechos con materiales ecológicos y promueven la moda ética, cuidando tanto el medio ambiente como la salud del usuario.",
        },
        {
            id: 3,
            question: "¿Cómo elijo la talla correcta?",
            answer: "Para elegir la talla correcta, mide tu pie en centímetros y revisa nuestra guía de tallas. También es recomendable leer opiniones de otros clientes sobre el ajuste del calzado.",
        },
        {
            id: 4,
            question: "¿Cómo puedo cuidar mis zapatos para que duren más?",
            answer: "Limpia tus zapatos con productos adecuados, evita la humedad extrema y guárdalos en un lugar fresco y seco. Alternar su uso también ayuda a prolongar su vida útil.",
        },
        {
            id: 5,
            question: "¿Cuánto tarda el envío?",
            answer: "El tiempo de envío varía según la ubicación, pero generalmente tarda entre 3 y 7 días hábiles. Recibirás un correo con los detalles de seguimiento una vez que tu pedido sea enviado.",
        },
    ];

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16">
                <div className="mt-20 max-w-screen-lg mx-auto">
                    <h1 className="text-4xl font-bold text-[#2F4F4F] text-center mb-6">
                        Preguntas Frecuentes
                    </h1>
                    <p className="text-center text-[#2F4F4F] mb-8">
                        Encuentra respuestas a las dudas más comunes sobre nuestros productos y servicios.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">{faq.question}</h2>
                                <p className="text-[#2F4F4F] mb-4">
                                    {expandedQuestion === faq.id ? faq.answer : faq.answer.substring(0, 60) + "..."}
                                </p>
                                <button
                                    onClick={() => setExpandedQuestion(expandedQuestion === faq.id ? null : faq.id)}
                                    className="px-5 py-2 bg-[#6E9475] text-white rounded-lg text-sm font-medium hover:bg-[#5C8465] hover:scale-105 transition-transform duration-300"
                                >
                                    {expandedQuestion === faq.id ? "Ver menos" : "Ver más"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Faqs;
