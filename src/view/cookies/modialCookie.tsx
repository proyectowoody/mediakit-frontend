import { useState, useEffect } from "react";

const CookieModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const cookiesAccepted = document.cookie.includes("cookiesAccepted=true");
    if (!cookiesAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    const expireDate = new Date();
    expireDate.setFullYear(expireDate.getFullYear() + 1);
    document.cookie = `cookiesAccepted=true; expires=${expireDate.toUTCString()}; path=/`;

    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#FAF3E0] p-6 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-lg font-semibold" data-translate>Usamos cookies 🍪</h2>
        <p className="mt-2 text-gray-600" data-translate>
          Este sitio utiliza cookies para mejorar tu experiencia. Al continuar, aceptas nuestra política de cookies.
        </p>
        <button
          className="mt-4 bg-[#6E9475] text-white px-4 py-2 rounded hover:bg-[#5C8465]"
          onClick={handleAccept}
          data-translate
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default CookieModal;
