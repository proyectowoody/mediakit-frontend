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
      <div className="mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative">
        <div className="px-6 py-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#2F4F4F] text-center" data-translate>
            Recuperar Contraseña
          </h2>
          <p className="text-sm text-[#4E6E5D] mt-2 text-center" data-translate>
            Ingresa tu nueva contraseña para restablecer tu cuenta.
          </p>
          <Message />
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-[#4E6E5D]" data-translate>
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
                className="absolute top-9 right-3 text-[#6E9475] hover:text-[#4E6E5D]" data-translate
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-[#4E6E5D]" data-translate>
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
                className="absolute top-9 right-3 text-[#6E9475] hover:text-[#4E6E5D]" data-translate
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#6E9475] text-white font-medium rounded-md hover:bg-[#5C8465] focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
              disabled={isLoading} data-translate
            >
              {isLoading ? "Procesando..." : "Restablecer Contraseña"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Password;
