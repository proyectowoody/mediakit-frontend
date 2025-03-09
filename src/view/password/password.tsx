import { useEffect, useState } from "react";
import Message from "../../components/message";
import VerificationUrls from "../../validation/password/verificationUrls";
import Handle from "../../validation/password/handle";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Password() {
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  VerificationUrls();

  const { handleSubmit, isLoading } = Handle(
    password,
    verPassword
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);  

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
        <div className="w-full max-w-md bg-[#FAF3E0] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#2F4F4F] text-center">
            Recuperar Contraseña
          </h2>
          <p className="text-sm text-[#4E6E5D] mt-2 text-center">
            Ingresa tu nueva contraseña para restablecer tu cuenta.
          </p>
          <Message />
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-[#4E6E5D]">
                Nueva Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                placeholder="Nueva Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-[#6E9475] hover:text-[#4E6E5D]"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-[#4E6E5D]">
                Confirmar Contraseña
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                placeholder="Confirmar Contraseña"
                value={verPassword}
                onChange={(e) => setVerPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-9 right-3 text-[#6E9475] hover:text-[#4E6E5D]"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#6E9475] text-white font-medium rounded-md hover:bg-[#5C8465] focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Restablecer Contraseña"}
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
      <Footer />
    </div>
  );
}

export default Password;
