import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationUrls from "../../validation/login/verificationUrls";
import Handle from "../../validation/login/handle";
import Message from "../../components/message";
import authRedirectToken from "../../validation/authRedirectToken";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { FcGoogle } from "react-icons/fc";
import { linkBackend } from "../../validation/url";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  authRedirectToken("/");

  const navigate = useNavigate();
  const tokens = new URLSearchParams(window.location.search).get("token");
  if (tokens) {
    return
  }

  useEffect(() => {
    const verify = async () => {
      await VerificationUrls(tokens, navigate);
    };
    verify();
  }, [tokens, navigate]);

  const { handleSubmit, isLoading } = Handle(
    email,
    password,
  );

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
        <div className="w-full max-w-md bg-[#FAF3E0] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#2F4F4F] text-center">
            Ingresar
          </h2>
          <p className="text-sm text-[#4E6E5D] mt-2 text-center">
            Selecciona un método para acceder.
          </p>
          <Message />
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#4E6E5D]"
              >
                Correo Electrónico
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#4E6E5D]"
              >
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a
                  href="/email"
                  className="absolute right-2 top-2 text-sm text-[#6E9475] hover:text-[#4E6E5D]"
                >
                  Olvidé mi contraseña
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#6E9475] text-white font-medium rounded-md hover:bg-[#5C8465] focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
              disabled={isLoading}
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <a href={`${linkBackend}/google`}
            className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-[#B2C9AB] rounded-md hover:bg-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
          >
            <FcGoogle className="mr-2 text-xl" />
            Iniciar sesión con Google
          </a>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#B2C9AB]"></div>
            <span className="mx-3 text-sm text-[#4E6E5D]">o</span>
            <div className="flex-grow border-t border-[#B2C9AB]"></div>
          </div>

          <a href="/register">
            <button className="w-full py-2 px-4 text-[#4E6E5D] border border-[#B2C9AB] rounded-md hover:bg-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-[#6E9475]">
              Registrarse
            </button>
          </a>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
