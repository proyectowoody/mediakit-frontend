import Footer from "../../components/footer";
import Header from "../../components/header";

function ShippingPolicies() {

    return (
        <div>
            <Header />
            <div className="min-h-screen py-10 px-6 md:px-16 flex justify-center bg-[#FAF3E0]">
                <div className="mt-20 max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-[#2F4F4F] text-center mb-6" data-translate>Política de Envíos</h1>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>1. Zonas de Envío y Plazos de Entrega</h2>
                            <ul className="list-disc list-inside text-gray-700 mt-2">
                                <li data-translate>Envíos en España: Plazo estimado: [NÚMERO_DÍAS] días hábiles.</li>
                                <li data-translate>Envíos a Europa: Plazo estimado: [NÚMERO_DÍAS] días hábiles.</li>
                                <li data-translate>Envíos Internacionales: Consultar previamente, ya que pueden variar.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>2. Costes de Envío</h2>
                            <p className="text-gray-700 mt-2" data-translate>Los gastos de envío se calcularán en función del destino, peso y dimensiones del pedido. Estos costes se mostrarán en el carrito de compra antes de confirmar la transacción.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>3. Proveedores y Modalidades de Envío</h2>
                            <p className="text-gray-700 mt-2" data-translate>Utilizamos servicios de mensajería reconocidos para asegurar la entrega en condiciones óptimas. Se podrá elegir entre diferentes modalidades (envío estándar, urgente, etc.) durante el proceso de compra.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>4. Seguimiento del Pedido</h2>
                            <p className="text-gray-700 mt-2" data-translate>Una vez despachado el pedido, se enviará al cliente un número de seguimiento para monitorizar el estado de la entrega.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>5. Retrasos o Incidencias</h2>
                            <p className="text-gray-700 mt-2" data-translate>En caso de retrasos o incidencias, [NOMBRE_EMPRESA] se compromete a informar al cliente y buscar soluciones adecuadas. El cliente podrá contactar a [EMAIL_CONTACTO]para cualquier incidencia.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ShippingPolicies;
