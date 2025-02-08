import { useContext } from "react";
import VerificationUrls from "../../validation/password/verificationUrls";
import { AppContext } from "../../common/context/AppContext/AppContext";
import useScreenResetPassword from "../../common/hooks/useScreenResetPassword";
import Message from "../../components/message";
import Header from "../../components/header";
import Footer from "../../components/footer";

function ResetPassword() {
  const { state } = useContext(AppContext);
  const resetPasswordHook = useScreenResetPassword();

  VerificationUrls();

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
          <form
            onSubmit={resetPasswordHook.handleSubmitResetPassword}
            className="mt-6"
          >
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-[#4E6E5D]">
                Nueva Contraseña
              </label>
              <input
                type={
                  state.screenResetPassword.showPassword ? "text" : "password"
                }
                className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                placeholder="Nueva Contraseña"
                value={state.screenResetPassword.password}
                onChange={(e) =>
                  resetPasswordHook.updateResetPasswordField(
                    "password",
                    e.target.value
                  )
                }
                required
              />
              <button
                type="button"
                onClick={() =>
                  resetPasswordHook.updateResetPasswordField(
                    "showPassword",
                    !state.screenResetPassword.showPassword
                  )
                }
                className="absolute top-9 right-3 text-[#6E9475] hover:text-[#4E6E5D]"
              >
                {state.screenResetPassword.showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-[#4E6E5D]">
                Confirmar Contraseña
              </label>
              <input
                type={
                  state.screenResetPassword.showConfirmPassword
                    ? "text"
                    : "password"
                }
                className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                placeholder="Confirmar Contraseña"
                value={state.screenResetPassword.verPassword}
                onChange={(e) =>
                  resetPasswordHook.updateResetPasswordField(
                    "verPassword",
                    e.target.value
                  )
                }
                required
              />
              showConfirmPassword
              <button
                type="button"
                onClick={() =>
                  resetPasswordHook.updateResetPasswordField(
                    "showConfirmPassword",
                    !state.screenResetPassword.showConfirmPassword
                  )
                }
                className="absolute top-9 right-3 text-[#6E9475] hover:text-[#4E6E5D]"
              >
                {state.screenResetPassword.showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#6E9475] text-white font-medium rounded-md hover:bg-[#5C8465] focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
              disabled={state.screenResetPassword.isLoading}
            >
              {state.screenResetPassword.isLoading
                ? "Procesando..."
                : "Restablecer Contraseña"}
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

export default ResetPassword;
