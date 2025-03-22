import Footer from "../../components/footer";
import Header from "../../components/header";

function Guarantee() {

  return (
    <div>
      <Header />
      <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16 flex justify-center">
        <div className="mt-20 max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#2F4F4F] text-center mb-6" data-translate>Política de Garantía</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>1. Garantía Legal</h2>
              <p className="text-gray-700 mt-2" data-translate>Todos los productos nuevos cuentan con una garantía legal de 3 años a partir de la fecha de compra, conforme al Real Decreto-ley 7/2021. Los productos de segunda mano, si los hubiese, cuentan con una garantía de 1 año.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>2. Alcance de la Garantía</h2>
              <p className="text-gray-700 mt-2" data-translate>La garantía cubre:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li data-translate>Defectos de fabricación.</li>
                <li data-translate>Mal funcionamiento no imputable a un uso inadecuado.</li>
              </ul>
              <p className="text-gray-700 mt-2" data-translate>No quedan cubiertos:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li data-translate>Daños ocasionados por mal uso, accidente, negligencia o alteraciones.</li>
                <li data-translate>Desgaste natural por el uso normal del producto.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>3. Proceso para Reclamaciones</h2>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li data-translate>Paso 1: El cliente debe contactar a [EMAIL_CONTACTO] o [TELÉFONO_CONTACTO] indicando el número de pedido y describiendo el problema.</li>
                <li data-translate>Paso 2:Se evaluará el caso y, si procede, se ofrecerá la reparación, sustitución o reembolso según la situación.</li>
                <li data-translate>Paso 3: Los gastos de envío para la devolución del producto serán gestionados conforme a lo establecido en las Condiciones Generales de Venta.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475]" data-translate>4. Servicio Postventa</h2>
              <p className="text-gray-700 mt-2" data-translate>Contamos con un servicio de atención al cliente especializado para resolver cualquier incidencia o duda postventa. Consulta nuestros canales de atención para recibir soporte en el proceso de reclamación.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Guarantee;