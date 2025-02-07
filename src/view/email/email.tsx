import { useState } from "react";
import authRedirectToken from "../../validation/authRedirectToken";
import Handle from "../../validation/email/handle";
import Message from "../../components/message";

function Email() {
  const [email, setEmail] = useState("");

  authRedirectToken("/explorar");

  const { handleSubmit, isLoading } = Handle(email);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
      <div className="w-full max-w-md bg-[#FAF3E0] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#2F4F4F] text-center">
          Recuperar Contraseña
        </h2>
        <p className="text-sm text-[#4E6E5D] mt-2 text-center">
          Ingresa tu correo electrónico para restablecer tu contraseña.
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
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#4E6E5D]">
          ¿Recordaste tu contraseña?{" "}
          <a
            href="/login"
            className="font-medium text-[#6E9475] hover:text-[#4E6E5D]"
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}

export default Email;
