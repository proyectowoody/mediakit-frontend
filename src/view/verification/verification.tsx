import { Link } from "react-router-dom";
import authRedirectToken from "../../validation/authRedirectToken";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Verification() {
  authRedirectToken("/explorar");

  return (
    <div>
      <Header />
      <div className="relative min-h-screen flex items-center justify-center bg-[#F5F5DC]">
        <section className="font-quicksand text-center z-10">
          <div className="px-4 py-8 sm:py-12 max-w-2xl mx-auto bg-[#FAF3E0] rounded-lg shadow-lg">
            <h1 className="mb-6 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-[#2F4F4F]">
              Verificación
            </h1>
            <p className="mb-8 text-lg sm:text-xl text-[#4E6E5D]">
              Revisa tu correo electrónico, te hemos enviado un enlace para
              completar el proceso.
            </p>
            <Link to="/login">
              <button className="px-6 py-3 rounded-lg bg-[#6E9475] text-white text-lg font-semibold shadow-lg hover:bg-[#5C8465] hover:scale-105 transition-transform duration-300">
                Ir a sesión
              </button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Verification;
