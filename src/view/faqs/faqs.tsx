import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Faqs() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

    const faqs = [

        { id: 1, question: "¿Cuáles son los métodos de pago aceptados?", answer: "En Respectful-shoes ofrecemos una variedad de métodos de pago para facilitar el proceso de compra y garantizar la seguridad de las transacciones. Puedes pagar mediante tarjetas de crédito y débito (Visa, MasterCard, etc.), a través de PayPal, y en algunos casos mediante transferencia bancaria directa. Todos los pagos se procesan mediante plataformas seguras que cumplen con los estándares internacionales de seguridad (como el protocolo SSL), lo que asegura que tus datos financieros y personales estén protegidos. Además, trabajamos con proveedores certificados para garantizar la rapidez y la seguridad en cada transacción. Si tienes alguna duda sobre el proceso de pago o encuentras alguna dificultad, nuestro equipo de atención al cliente está disponible para ayudarte a resolver cualquier problema." },

        { id: 2, question: "¿Cuánto tiempo tardan los envíos en llegar a mi domicilio?", answer: "El tiempo de entrega puede variar en función del destino y del tipo de envío seleccionado durante el proceso de compra. Para envíos dentro de España, generalmente el plazo de entrega es de [NÚMERO] días hábiles, mientras que para envíos a otros países de la Unión Europea el plazo suele ser de [NÚMERO] días hábiles. Estos plazos pueden verse afectados por factores externos como condiciones climáticas, picos de demanda (especialmente en fechas festivas) o incidencias logísticas. En el momento de confirmar tu compra, se te proporcionará una estimación del plazo de entrega junto con el número de seguimiento para que puedas monitorizar el estado de tu pedido." },

        { id: 3, question: "¿Puedo hacer seguimiento de mi pedido?", answer: "Sí, en Respectful-shoes valoramos la transparencia en el proceso de entrega. Una vez que tu pedido se haya procesado y enviado, recibirás un correo electrónico con un número de seguimiento proporcionado por nuestro servicio de mensajería. Este número te permitirá rastrear el estado de tu envío en la web del transportista. Además, en tu cuenta de usuario (si decides crear una) podrás ver el historial de tus pedidos y el estado actual de cada uno. Si en algún momento tienes dificultades para rastrear tu pedido, nuestro servicio de atención al cliente estará encantado de asistirte para resolver cualquier inconveniente." },

        { id: 4, question: "¿Qué productos puedo devolver?", answer: "Nuestro compromiso es ofrecerte productos de alta calidad, pero entendemos que en ocasiones pueda surgir la necesidad de realizar una devolución. Podrás devolver aquellos productos que se encuentren en perfecto estado, sin señales de uso, y en su embalaje original. Es importante tener en cuenta que algunos artículos tienen restricciones específicas: por ejemplo, alimentos perecederos, productos de higiene personal y artículos personalizados no son elegibles para devolución debido a normativas sanitarias y de seguridad. En cada producto se indicarán las condiciones de devolución específicas, y te invitamos a revisar la Política de Devoluciones para obtener información detallada sobre las excepciones y condiciones particulares." },

        {
            id: 5, question: "¿Cómo solicito una devolución o ejerzo mi derecho de desistimiento?", answer: `Para ejercer tu derecho de desistimiento, que puedes hacer sin necesidad de justificar tu decisión dentro de los 14 días naturales siguientes a la recepción del producto, debes ponerte en contacto con nuestro servicio de atención al cliente a través de Info@respectfulshoes.com o llamando al [TELÉFONO_CONTACTO]. 
        
        El proceso de devolución incluye varios pasos:
        
        Paso 1: Notificar tu intención de desistir de la compra, indicando el número de pedido y el motivo de la devolución.
        
        Paso 2: Recibirás instrucciones detalladas y, en su caso, una etiqueta de envío prepagada para facilitar la devolución.
        
        Paso 3: Una vez recibido y verificado el estado del producto, se gestionará el reembolso en un plazo máximo de 14 días.

        Es importante que el producto se devuelva en las mismas condiciones en las que lo recibiste para que el proceso se lleve a cabo sin inconvenientes.`
        },

        { id: 6, question: "¿Qué hago si recibo un producto defectuoso?", answer: "En Respectful-shoes nos comprometemos a ofrecer productos de calidad, pero si recibes un artículo defectuoso o que no funciona correctamente, tienes derecho a reclamar la garantía legal. En estos casos, lo primero es que te pongas en contacto con nuestro servicio de atención al cliente a través de Info@respectfulshoes.com o [TELÉFONO_CONTACTO]. Te solicitaremos algunos detalles, como el número de pedido y una descripción del defecto, e incluso, si es posible, fotos del producto dañado. Una vez verificado el problema, se procederá a gestionar la reparación, la sustitución o el reembolso, de acuerdo con la situación. La garantía legal cubre defectos de fabricación y fallos que no sean consecuencia de un mal uso o de condiciones inadecuadas de almacenamiento." },

        { id: 7, question: "¿Ofrecen garantía en sus productos?", answer: "Todos nuestros productos nuevos cuentan con una garantía legal de 3 años a partir de la fecha de compra, tal y como establece la normativa vigente. Esta garantía cubre defectos de fabricación y fallos de funcionamiento que se presenten de manera inesperada. En el caso de productos de segunda mano (si los ofrecieras), la garantía es de 1 año. La garantía no cubre daños ocasionados por mal uso, accidentes, negligencia o desgaste natural. Si necesitas hacer uso de la garantía, te recomendamos que te pongas en contacto con nuestro servicio postventa, que te guiará en el proceso de reclamación y te indicará si procede la reparación, sustitución o reembolso del producto. Además, siempre te informaremos sobre los plazos y condiciones específicas para cada caso." },

        { id: 8, question: "¿Realizan envíos internacionales?", answer: "Sí, en Respectful-shoes nos esforzamos por llegar a clientes en toda la Unión Europea. Actualmente, realizamos envíos a la mayoría de los países de Europa, y los plazos y costes de envío varían en función del destino y del peso y dimensiones del pedido. Para asegurarte de que tu dirección se encuentra dentro de nuestra cobertura de envíos, puedes consultar la sección de Política de Envíos en nuestro sitio web o ponerte en contacto con nuestro servicio de atención al cliente. En el caso de envíos a destinos especiales o fuera de la UE, te recomendamos que nos consultes previamente, ya que podrían aplicar condiciones particulares o costes adicionales por aduanas e impuestos." },

        { id: 9, question: "¿Puedo modificar o cancelar mi pedido una vez realizado?", answer: "Entendemos que en ocasiones puedas necesitar modificar o cancelar un pedido. Si deseas hacerlo, es importante que te pongas en contacto con nosotros lo antes posible a través de Info@respectfulshoes.com o [TELÉFONO_CONTACTO]. Si el pedido aún no ha sido procesado para su envío, haremos todo lo posible para realizar los cambios o cancelar la transacción sin problemas. Sin embargo, una vez que el pedido se haya enviado, las modificaciones o cancelaciones pueden complicarse y, en ese caso, deberás gestionar la devolución siguiendo el procedimiento de desistimiento. Por ello, te recomendamos revisar tu pedido cuidadosamente antes de confirmar la compra y, en caso de duda, contactar con nuestro equipo para asistencia inmediata." },

        {
            id: 10, question: "¿Cómo puedo contactar con el servicio de atención al cliente?", answer: `Nuestro objetivo es ofrecerte una experiencia de compra excepcional, por lo que contamos con un equipo de atención al cliente dedicado a resolver tus dudas y asistirte en cualquier incidencia. Puedes contactarnos de varias formas:
        
        Correo electrónico: Envía tus consultas a Info@respectfulshoes.com y te responderemos en el menor tiempo posible.
        
        Teléfono: Llama al [TELÉFONO_CONTACTO] durante nuestro horario de atención para hablar directamente con uno de nuestros agentes.
        
        Formulario de contacto: Rellena el formulario disponible en la sección Atención al Cliente de nuestro sitio web y nos pondremos en contacto contigo.
        
        Además, contamos con canales a través de redes sociales como [ENLACE_FACEBOOK], [ENLACE_INSTAGRAM], donde también puedes enviarnos tus dudas o comentarios.
        
        Nuestro horario de atención es de [DÍAS_Y_HORARIO], y trabajamos para ofrecerte una respuesta rápida y efectiva ante cualquier consulta.`
        }

    ];

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16">
                <div className="mt-20 max-w-screen-lg mx-auto">
                    <h1 className="text-4xl font-bold text-[#2F4F4F] text-center mb-6" data-translate>Preguntas Frecuentes</h1>
                    <p className="text-center text-[#2F4F4F] mb-8" data-translate>Encuentra respuestas a las dudas más comunes sobre nuestros productos y servicios.</p>
                    <div className="space-y-2">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="bg-white border border-[#D4C9B0] rounded-lg">
                                <button
                                    onClick={() => setExpandedQuestion(expandedQuestion === faq.id ? null : faq.id)}
                                    className="w-full text-left px-4 py-3 flex justify-between items-center text-[#6E9475] font-medium" data-translate
                                >
                                    {faq.question}
                                    <span className="text-xl" data-translate>{expandedQuestion === faq.id ? "−" : "+"}</span>
                                </button>
                                {expandedQuestion === faq.id && (
                                    <div className="px-4 py-3 bg-white text-[#2F4F4F]" data-translate>
                                        {faq.answer}
                                    </div>
                                )}
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
