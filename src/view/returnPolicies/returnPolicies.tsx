import Footer from "../../components/footer";
import Header from "../../components/header";

function ReturnPolicies() {

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16 flex justify-center">
                <div className="mt-20 max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-[#2F4F4F] text-center mb-6" data-translate>Política de Devoluciones</h1>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>1. Derecho de Desistimiento</h2>
                            <p className="text-gray-700 mt-2" data-translate>El cliente dispone de 14 días naturales desde la recepción del producto para ejercer el derecho de desistimiento sin necesidad de justificar su decisión, en conformidad con la Directiva Europea 2011/83/UE.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>2. Condiciones para la Devolución</h2>
                            <ul className="list-disc list-inside text-gray-700 mt-2">
                                <li data-translate>El producto debe estar en perfecto estado, sin signos de uso y en su embalaje original.</li>
                                <li data-translate>Quedan excluidos de devolución aquellos productos que, por su naturaleza, no puedan ser devueltos (p.ej., alimentos, productos de higiene, o aquellos personalizados).</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>3. Proceso de Devolución</h2>
                            <ul className="list-disc list-inside text-gray-700 mt-2">
                                <li data-translate>Paso 1: Contacta a nuestro servicio de atención a través de [EMAIL_CONTACTO] indicando el número de pedido y el motivo de la devolución.</li>
                                <li data-translate>Paso 2: Se te facilitará un formulario de devolución y, en caso necesario, una etiqueta de envío prepagada (según las condiciones acordadas).</li>
                                <li data-translate>Paso 3: Una vez recibido y verificado el estado del producto, se procederá al reembolso en un plazo máximo de 14 días.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>4. Costes de Devolución</h2>
                            <p className="text-gray-700 mt-2" data-translate>Salvo que se indique lo contrario, los gastos de envío de la devolución correrán a cargo del cliente.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ReturnPolicies;