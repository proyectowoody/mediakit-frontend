import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { handleGetSearch } from "../validation/admin/article/handleGet";
import { SubmitCar } from "../validation/car/submit";
import AuthModal from "./toast";
import { handleGetUserSession } from "./ts/fetchUser";

interface SearchItem {
  id: number;
  type: "category" | "product";
  name: string;
  price?: number;
  imagenes?: string;
  description?: string;
  estado?: string;
}

function SearchBar() {

  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    handleGetUserSession(setIsLogged);
  }, []);

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SearchItem | null>(null);
  const [currency, setCurrency] = useState<string>("EUR");
  const [conversionRate, setConversionRate] = useState<number>(1);

  useEffect(() => {
    if (query.length > 1) {
      fetchResults(query);
    } else {
      setResults([]);
      setSelectedProduct(null);
    }
  }, [query]);

  useEffect(() => {
    if (!isLogged) return;

    const stored = localStorage.getItem("cashData");
    if (stored) {
      const data = JSON.parse(stored);
      setCurrency(data.currency);
      setConversionRate(data.conversionRate);
    }

  }, [isLogged]);

  const fetchResults = async (searchTerm: string): Promise<void> => {
    try {
      const data = await handleGetSearch(searchTerm);

      const formattedResults: SearchItem[] = data.map((articulo) => ({
        id: articulo.id,
        type: "product",
        name: articulo.nombre,
        price: parseFloat((articulo.precioActual * (currency === "EUR" ? 1 : conversionRate)).toFixed(2)),
        estado: articulo.estado,
        imagenes: articulo.imagenes?.length > 0 ? articulo.imagenes[0].url : "https://via.placeholder.com/100",
        description: articulo.descripcion
      }));

      setResults(formattedResults);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  const handleSelectProduct = (product: SearchItem): void => {
    setSelectedProduct(product);
  };

  const clearSearch = (): void => {
    setQuery("");
    setResults([]);
    setSelectedProduct(null);
  };

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({});

  const handleAddToCart = (productId: number) => {
    if (!isLogged) {
      setShowAuthModal(true);
      return;
    }

    SubmitCar(productId);
    setAddedToCart((prev) => ({ ...prev, [productId]: true }));

    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  const formatPrice = (value: number): string => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          className="w-full px-3 py-2 text-sm focus:outline-none"
          placeholder="Buscar productos o categorías..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query ? (
          <FaTimes className="cursor-pointer text-gray-500 mx-2" onClick={clearSearch} />
        ) : (
          <FaSearch className="text-gray-500 mx-2" />
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute z-50 bg-white border border-gray-300 mt-2 rounded-md w-full max-h-56 overflow-y-auto text-sm">
          <div className="p-2 border-b font-semibold text-gray-700" data-translate>PRODUCTOS</div>
          {results.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { handleSelectProduct(item) }}
            >
              <img src={item.imagenes} alt={item.name} className="w-8 h-8 object-cover rounded mr-2" />
              <div>
                <p className="font-medium" data-translate>{item.name}</p>
                <p className="text-xs text-gray-500">{formatPrice(item.price!)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs">
          <div className="bg-white border border-gray-300 rounded-md shadow-lg p-3 text-sm">
            <div className="flex justify-center">
              <img
                src={selectedProduct.imagenes}
                alt={selectedProduct.name}
                className="w-24 h-24 object-contain rounded bg-gray-100"
              />
            </div>
            <h3 className="text-md font-semibold text-center mt-2 text-gray-800" data-translate>
              {selectedProduct.name}
            </h3>
            <p className="text-center text-gray-700 font-bold">{formatPrice(selectedProduct.price!)} </p>
            <p className="text-center text-gray-600">Estado: <span data-translate>{selectedProduct.estado}</span></p>

            <p className="text-xs text-gray-500 mt-2 text-center" data-translate>
              {selectedProduct.description}
            </p>

            {isLogged ? (
              <button
                className={`w-full mt-3 py-2 rounded-md text-sm transition duration-300 ${addedToCart[selectedProduct.id] ? "bg-gray-500 cursor-not-allowed" : "bg-[#6E9475] hover:bg-[#5C8465] text-white"}`}
                disabled={addedToCart[selectedProduct.id]}
                onClick={() => handleAddToCart(selectedProduct.id)}
                data-translate
              >
                {addedToCart[selectedProduct.id] ? "Agregado ✅" : "Añadir al Carrito"}
              </button>
            ) : (
              <button
                className={`w-full mt-3 py-2 rounded-md text-sm transition duration-300 ${addedToCart[selectedProduct.id] ? "bg-gray-500 cursor-not-allowed" : "bg-[#6E9475] hover:bg-[#5C8465] text-white"
                  }`}
                disabled={addedToCart[selectedProduct.id]}
                onClick={() => {
                  const stored = localStorage.getItem("guest_cart");
                  let guestCart = stored ? JSON.parse(stored) : [];

                  const existingProductIndex = guestCart.findIndex((item: any) => item.id === selectedProduct.id);

                  if (existingProductIndex !== -1) {
                    guestCart[existingProductIndex].cantidad += 1;
                    guestCart[existingProductIndex].subtotal = guestCart[existingProductIndex].cantidad * guestCart[existingProductIndex].price;
                  } else {
                    guestCart.push({ ...selectedProduct, cantidad: 1, subtotal: selectedProduct.price });
                  }

                  localStorage.setItem("guest_cart", JSON.stringify(guestCart));

                  setAddedToCart((prev) => ({ ...prev, [selectedProduct.id]: true }));

                  setTimeout(() => {
                    setAddedToCart((prev) => ({ ...prev, [selectedProduct.id]: false }));
                  }, 2000);
                }}
                data-translate
              >
                {addedToCart[selectedProduct.id] ? "Agregado ✅" : "Añadir al Carrito"}
              </button>
            )}

          </div>
        </div>
      )}

      {showAuthModal && (
        <AuthModal isVisible={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          title="¡Debes registrarte!"
          message="Para usar esta funcionalidad, necesitas iniciar sesión o registrarte.">
          <p className="text-center text-[#2F4F4F] my-4" data-translate>
            Para usar esta funcionalidad, necesitas iniciar sesión o registrarte.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-[#6E9475] text-white px-4 py-2 rounded hover:bg-[#5C8465] transition" data-translate
              onClick={() => window.location.href = "/login"}
            >
              Iniciar sesión
            </button>
            <button
              className="bg-[#D4C9B0] text-[#2F4F4F] px-4 py-2 rounded hover:bg-[#BBA98A] transition"
              onClick={() => window.location.href = "/register"} data-translate
            >
              Registrarse
            </button>
          </div>
        </AuthModal>
      )}

    </div>
  );

}

export default SearchBar;
