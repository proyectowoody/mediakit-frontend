
export function mostrarMensaje(mensaje: string, elemento: HTMLElement | null) {
  if (elemento) {
    elemento.textContent = mensaje;
    elemento.classList.remove("hidden");
    setTimeout(() => {
      elemento.classList.add("hidden");
    }, 4000);
  }
}

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  message,
}) => {

  if (!isVisible) return null;

  return (
    <div className="bg-gray-600 bg-opacity-25 fixed inset-0 flex justify-center items-center z-50">
      <div
        id="popup-modal"
        className="relative rounded-2xl shadow-lg bg-[#FAF3E0] border-4 border-[#6E9475] p-6 max-w-md w-full text-center"
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 text-[#4E6E5D] hover:text-[#6E9475] transition duration-300 transform hover:scale-110"
        >
          ✖
        </button>

        <svg
          className="mx-auto mb-4 text-[#6E9475] w-14 h-14"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <h3 className="mb-5 text-lg font-semibold text-[#2F4F4F]" data-translate>{message}</h3>

        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            type="button"
            className="transition duration-300 transform hover:scale-105 text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#6E9475] font-medium rounded-lg px-5 py-2.5" data-translate
          >
            ✅ Sí
          </button>
          <button
            onClick={onClose}
            type="button"
            className="transition duration-300 transform hover:scale-105 text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#6E9475] font-medium rounded-lg px-5 py-2.5" data-translate
          >
            ❌ No
          </button>
        </div>
      </div>
    </div>
  );
};

type AuthModalProps = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  children?: React.ReactNode;
};

export const AuthModal: React.FC<AuthModalProps> = ({ isVisible, onClose, title, message }) => {

  if (!isVisible) return null;

  return (
    <div className="bg-gray-600 bg-opacity-25 fixed inset-0 flex justify-center items-center z-50">
      <div className="relative rounded-2xl shadow-lg bg-[#FAF3E0] border-4 border-[#6E9475] p-6 max-w-md w-full text-center">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 text-[#4E6E5D] hover:text-[#6E9475] transition duration-300 transform hover:scale-110"
        >
          ✖
        </button>

        <h3 className="mb-4 text-xl font-semibold text-[#2F4F4F]" data-translate>{title}</h3>
        <p className="mb-5 text-[#2F4F4F]" data-translate>{message}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => (window.location.href = "/iniciar-sesion")}
            className="transition duration-300 transform hover:scale-105 text-white bg-[#6E9475] hover:bg-[#5C8465] font-medium rounded-lg px-5 py-2.5" data-translate
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => (window.location.href = "/registro")}
            className="transition duration-300 transform hover:scale-105 text-[#2F4F4F] bg-[#D4C9B0] hover:bg-[#BBA98A] font-medium rounded-lg px-5 py-2.5" data-translate
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

import { useEffect, useState } from "react";

type SessionModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onContinueSession: () => void;
  countdownStart?: number;
};

export const SessionModal: React.FC<SessionModalProps> = ({
  isVisible,
  onClose,
  onContinueSession,
  countdownStart = 60, 
}) => {
  const [countdown, setCountdown] = useState<number>(countdownStart);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose(); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="bg-gray-600 bg-opacity-50 fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-[#FAF3E0] border-4 border-[#6E9475] rounded-2xl shadow-lg p-6 max-w-sm w-full text-center relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#4E6E5D] hover:text-[#6E9475] transition duration-300 transform hover:scale-110"
        >
          ✖
        </button>

        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 border-4 border-[#6E9475] rounded-full flex items-center justify-center text-[#6E9475] font-bold text-lg">
            {countdown}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-[#2F4F4F]" data-translate>
          ¿Quieres mantener activa la sesión?
        </h3>
        <p className="text-sm text-[#2F4F4F] mt-2" data-translate>
          Por tu seguridad, tu sesión se cerrará por inactividad.
        </p>

        <div className="mt-4 space-y-2">
          <button
            onClick={onContinueSession}
            className="w-full bg-[#6E9475] text-white py-2 rounded-lg font-semibold hover:bg-[#5C8465] transition" data-translate
          >
            Mantener sesión
          </button>
          <button
            onClick={onClose}
            className="w-full text-[#6E9475] font-semibold py-2 rounded-lg hover:underline" data-translate
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};




