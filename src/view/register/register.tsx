import { useState } from "react";
import authRedirectToken from "../../validation/authRedirectToken";
import Handle from "../../validation/register/handle";
import Message from "../../components/message";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dni: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    address: "",
    city: "",
    newsletter: false,
    marketingSource: "",
    captchaValue: ""
  });

  authRedirectToken("/");

  const { handleSubmit, isLoading } = Handle(formData);

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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
            {step === 1 && (
              <>
                {[{ label: "DNI", name: "dni", type: "text" },
                { label: "Nombre", name: "name", type: "text" },
                { label: "Apellido", name: "lastName", type: "text" },
                { label: "Correo Electrónico", name: "email", type: "email" },
                { label: "Teléfono", name: "phone", type: "text" }].map(({ label, name, type }) => (
                  <div className="mb-4" key={name}>
                    <label className="block text-sm font-medium text-[#4E6E5D]">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                      // placeholder={label}
                      // value={formData[name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-[#6E9475] text-white font-medium rounded-md hover:bg-[#5C8465]"
                  onClick={nextStep}
                >
                  Siguiente
                </button>
              </>
            )}

            {step === 2 && (
              <>
                {[{ label: "Fecha de Nacimiento", name: "birthDate", type: "date" },
                { label: "Dirección Completa", name: "address", type: "text" },
                { label: "Ciudad", name: "city", type: "text" }].map(({ label, name, type }) => (
                  <div className="mb-4" key={name}>
                    <label className="block text-sm font-medium text-[#4E6E5D]">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      className="w-full px-3 py-2 border border-[#B2C9AB] rounded-md shadow-sm focus:outline-none focus:ring-[#6E9475] focus:border-[#6E9475]"
                      placeholder={label}
                      // value={formData[name]}
                      // onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="mb-6">
                  <label className="flex items-center text-sm text-[#4E6E5D]">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 border-[#B2C9AB] rounded focus:ring-[#6E9475]"
                      checked={isTermsAccepted}
                      onChange={(e) => setIsTermsAccepted(e.target.checked)}
                      required
                    />
                    Acepto los
                    <a href="/terms" className="text-[#6E9475] hover:text-[#4E6E5D] ml-1">
                      términos y condiciones
                    </a>
                  </label>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="py-2 px-4 bg-[#B2C9AB] text-white font-medium rounded-md hover:bg-[#A2B59F]"
                    onClick={prevStep}
                  >
                    Atrás
                  </button>

                  <button
                    type="submit"
                    disabled={!isTermsAccepted || isLoading || !formData.captchaValue}
                    className={`py-2 px-4 text-white font-medium rounded-md focus:outline-none focus:ring-2 ${isTermsAccepted && !isLoading && formData.captchaValue
                      ? "bg-[#6E9475] hover:bg-[#5C8465] focus:ring-[#6E9475]"
                      : "bg-gray-400 cursor-not-allowed"
                      }`}
                  >
                    {isLoading ? "Registrando..." : "Registrarse"}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#B2C9AB]"></div>
            <span className="mx-3 text-sm text-[#4E6E5D]">o</span>
            <div className="flex-grow border-t border-[#B2C9AB]"></div>
          </div>

          <p className="mt-6 text-sm text-center text-[#4E6E5D]">
            ¿Ya tienes una cuenta? {" "}
            <a href="/login" className="font-medium text-[#6E9475] hover:text-[#4E6E5D]">
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
