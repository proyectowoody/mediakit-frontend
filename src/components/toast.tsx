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
    <div className="bg-black/60 backdrop-blur-md fixed inset-0 flex justify-center items-center z-50">
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

        <h3 className="mb-5 text-lg font-semibold text-[#2F4F4F]">{message}</h3>

        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            type="button"
            className="transition duration-300 transform hover:scale-105 text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#6E9475] font-medium rounded-lg px-5 py-2.5"
          >
            ✅ Sí
          </button>
          <button
            onClick={onClose}
            type="button"
            className="transition duration-300 transform hover:scale-105 text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#6E9475] font-medium rounded-lg px-5 py-2.5"
          >
            ❌ No
          </button>
        </div>
      </div>
    </div>
  );
};
