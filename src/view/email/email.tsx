import { useEffect, useState } from "react";
import Handle from "../../validation/email/handle";
import Message from "../../components/message";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { handleGetUserSession } from "../../components/ts/fetchUser";
import { useNavigate } from "react-router-dom";

function Email() {

  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    handleGetUserSession(setIsLogged);
  }, []);

  useEffect(() => {
    if (isLogged) {
      navigate("/"); 
    }
  }, [isLogged, navigate]);

  const [email, setEmail] = useState("");

  const { handleSubmit, isLoading } = Handle(email);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
        <div className="w-full max-w-md bg-[#FAF3E0] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#2F4F4F] text-center" data-translate>
            Recuperar Contraseña
          </h2>
          <p className="text-sm text-[#4E6E5D] mt-2 text-center" data-translate>
            Ingresa tu correo electrónico para restablecer tu contraseña.
          </p>
          <Message />
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#4E6E5D]" data-translate
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#6E9475] text-white font-medium rounded-md hover:bg-[#5C8465] focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
              disabled={isLoading} data-translate
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-[#4E6E5D]" data-translate>
            ¿Recordaste tu contraseña?
          </p>

          <a href="/iniciar-sesion"
            className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-[#B2C9AB] rounded-md hover:bg-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-[#6E9475]" data-translate
          >
            Inicia sesión aquí
          </a>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default Email;
