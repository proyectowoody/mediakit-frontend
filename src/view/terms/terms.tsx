import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import roleAdmin from "../../components/ts/roleAdmin";
import { useEffect } from "react";

function Terms() {
  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16">
        <div className="mt-20 max-w-screen-lg mx-auto">
          <h1 className="text-4xl font-bold text-[#2F4F4F] text-center mb-6">
            Términos y Condiciones
          </h1>
          <p className="text-center text-[#2F4F4F] mb-8">
            Por favor, lee atentamente estos términos antes de utilizar nuestra plataforma.
          </p>

          <div className="bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">1. Introducción</h2>
              <p className="text-[#2F4F4F]">
                Estos términos y condiciones regulan el uso del sitio web Respectful Shoes y todos los servicios proporcionados a través de él.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">2. Uso del sitio</h2>
              <p className="text-[#2F4F4F]">
                Al acceder a nuestro sitio web, aceptas utilizarlo únicamente con fines legales y de manera responsable. No se permite el uso del sitio para actividades fraudulentas, ilegales o que puedan afectar a otros usuarios.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">3. Registro y cuentas</h2>
              <p className="text-[#2F4F4F]">
                Para acceder a ciertas funciones, es posible que debas crear una cuenta. Eres responsable de mantener la seguridad de tu cuenta y de cualquier actividad realizada en ella.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">4. Compras y pagos</h2>
              <p className="text-[#2F4F4F]">
                Todos los pagos realizados en nuestra plataforma son procesados de manera segura. Nos reservamos el derecho de cancelar pedidos en caso de detectar actividades sospechosas o fraudes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">5. Política de devoluciones</h2>
              <p className="text-[#2F4F4F]">
                Si no estás satisfecho con tu compra, ofrecemos devoluciones dentro de un período de 30 días desde la fecha de recepción del producto. Para más detalles, consulta nuestra política de reembolsos.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">6. Protección de datos</h2>
              <p className="text-[#2F4F4F]">
                Respetamos tu privacidad y protegemos tus datos personales de acuerdo con nuestra política de privacidad. No compartimos tu información sin tu consentimiento.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">7. Modificaciones de los términos</h2>
              <p className="text-[#2F4F4F]">
                Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Se recomienda revisar esta página regularmente para estar al tanto de posibles cambios.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">8. Contacto</h2>
              <p className="text-[#2F4F4F]">
                Si tienes preguntas sobre estos términos, puedes contactarnos a través de nuestro correo electrónico de soporte:{" "}
                <a href="mailto:soporte@respectfulshoes.com" className="text-[#6E9475] font-medium hover:underline">
                  soporte@respectfulshoes.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
