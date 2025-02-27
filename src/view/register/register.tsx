import { useState } from "react";
import authRedirectToken from "../../validation/authRedirectToken";
import Handle from "../../validation/register/handle";
import Message from "../../components/message";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { FcGoogle } from "react-icons/fc";
import { linkBackend } from "../../validation/url";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  authRedirectToken("/");

  const { handleSubmit, isLoading } = Handle(
    name,
    lastName,
    email,
    password
  );

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
        <div className="w-full max-w-md bg-[#FAF3E0] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#2F4F4F] text-center">
            Registrarse
          </h2>
          <p className="text-sm text-[#4E6E5D] mt-2 text-center">
            Completa los campos para crear una cuenta.
          </p>
          <Message />
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-[#4E6E5D]"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="apellido"
                className="block text-sm font-medium text-[#4E6E5D]"
              >
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                placeholder="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#4E6E5D]"
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

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#4E6E5D]"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-sm text-[#6E9475] hover:text-[#4E6E5D]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center text-sm text-[#4E6E5D]">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 border-[#B2C9AB] rounded focus:ring-[#6E9475]"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                />
                Acepto los{" "}
                <a
                  href="/terms"
                  className="text-[#6E9475] hover:text-[#4E6E5D] ml-1"
                >
                  términos y condiciones
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isTermsAccepted || isLoading}
              className={`w-full py-2 px-4 text-white font-medium rounded-md focus:outline-none focus:ring-2 ${isTermsAccepted && !isLoading
                ? "bg-[#6E9475] hover:bg-[#5C8465] focus:ring-[#6E9475]"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              {isLoading ? "Registrando..." : "Regístrate"}
            </button>
          </form>

          <a href={`${linkBackend}/google`}
            className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-[#B2C9AB] rounded-md hover:bg-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
          >
            <FcGoogle className="mr-2 text-xl" />
            Registrate con Google
          </a>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#B2C9AB]"></div>
            <span className="mx-3 text-sm text-[#4E6E5D]">o</span>
            <div className="flex-grow border-t border-[#B2C9AB]"></div>
          </div>

          <p className="mt-6 text-sm text-center text-[#4E6E5D]">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="font-medium text-[#6E9475] hover:text-[#4E6E5D]"
            >
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;