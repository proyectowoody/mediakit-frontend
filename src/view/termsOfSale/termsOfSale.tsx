import Footer from "../../components/footer";
import Header from "../../components/header";
import { useEffect } from "react";

function TermsOfSale() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16">
                <div className="mt-20 max-w-screen-lg mx-auto">

                    <h1 className="text-4xl font-bold text-[#2F4F4F] text-center mb-6" data-translate>
                        Condiciones Generales de Venta (CGV)
                    </h1>

                    <div className="bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6 space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>1. Identificación del Vendedor</h2>
                            <p data-translate>Tienda: [NOMBRE_TIENDA]</p>
                            <p data-translate>Titular: [NOMBRE_EMPRESA]</p>
                            <p data-translate>Domicilio: [DIRECCIÓN_COMPLETA]</p>
                            <p data-translate>CIF/NIF: [CIF/NIF]</p>
                            <p data-translate>Correo electrónico: [EMAIL_CONTACTO]</p>
                            <p data-translate>Teléfono: [TELÉFONO_CONTACTO]</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>2. Proceso de Compra</h2>
                            <ul className="list-disc list-inside mt-2">
                                <li data-translate>Paso 1: Selección de productos y verificación de disponibilidad.</li>
                                <li data-translate>Paso 2: Procedimiento de registro (si es necesario) y confirmación de datos de envío y facturación.</li>
                                <li data-translate>Paso 3: Selección del método de pago. Se aceptan: [MÉTODOS_DE_PAGO].</li>
                                <li data-translate>Paso 4: Confirmación y envío del pedido. El contrato se perfecciona en el momento de la confirmación del pago.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>3. Precios e Impuestos</h2>
                            <p data-translate>Todos los precios están expresados en euros e incluyen el IVA vigente. Cualquier cambio en los precios será notificado en el momento de la compra.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>4. Condiciones de Pago</h2>
                            <p data-translate>El pago se realizará a través de los métodos indicados. El proceso de pago es seguro y gestionado por proveedores externos certificados.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>5. Ejecución del Contrato</h2>
                            <p data-translate>Una vez confirmado el pedido, se enviará un correo electrónico de confirmación. La entrega se realizará conforme a la Política de Envíos de la tienda.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#6E9475] mb-2" data-translate>6. Modificación y Cancelación del Pedido</h2>
                            <p data-translate>El usuario podrá solicitar la modificación o cancelación de su pedido siempre que éste no haya sido procesado para su envío. Para ello, debe contactar a [EMAIL_CONTACTO] lo antes posible.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TermsOfSale;
