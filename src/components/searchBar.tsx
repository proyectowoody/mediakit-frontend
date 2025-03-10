import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { handleGetSearch } from "../validation/admin/article/handleGet";
import { SubmitCar } from "../validation/car/submit";
import AuthModal from "./toast";

interface SearchItem {
  id: number;
  type: "category" | "product";
  name: string;
  price?: string;
  image?: string;
  description?: string;
  estado?: string;
}

function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SearchItem | null>(null);

  useEffect(() => {
    if (query.length > 1) {
      fetchResults(query);
    } else {
      setResults([]);
      setSelectedProduct(null);
    }
  }, [query]);

  const fetchResults = async (searchTerm: string): Promise<void> => {
    try {
      const data = await handleGetSearch(searchTerm);

      const formattedResults: SearchItem[] = data.map((articulo) => ({
        id: articulo.id,
        type: "product",
        name: articulo.nombre,
        price: articulo.precio ? `${articulo.precio} €` : "Precio no disponible",
        estado: articulo.estado,
        image: articulo.imagenes?.length > 0 ? articulo.imagenes[0].url : "https://via.placeholder.com/100",
        description: articulo.descripcion,
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

  const [cartItem, setCartItem] = useState<number | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  useEffect(() => {
    const userToken = localStorage.getItem("ACCESS_TOKEN");
    setIsAuth(!!userToken);
  }, []);

  useEffect(() => {
    SubmitCar(cartItem);
  }, [cartItem]);

  const handleAddToCart = (product: number) => {
    if (!isAuth) {
      setShowAuthModal(true);
      return;
    }
    setCartItem(product);
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
          <div className="p-2 border-b font-semibold text-gray-700">PRODUCTOS</div>
          {results.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectProduct(item)}
            >
              <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded mr-2" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.price}</p>
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
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-24 h-24 object-contain rounded bg-gray-100"
              />
            </div>
            <h3 className="text-md font-semibold text-center mt-2 text-gray-800">
              {selectedProduct.name}
            </h3>
            <p className="text-center text-gray-700 font-bold">{selectedProduct.price}</p>
            <p className="text-center text-gray-600">Estado: {selectedProduct.estado}</p>

            <p className="text-xs text-gray-500 mt-2 text-center">
              {selectedProduct.description}
            </p>

            <button
              className="w-full mt-3 bg-[#6E9475] text-white py-2 rounded-md text-sm hover:bg-[#5C8465] transition duration-300"
              onClick={() => handleAddToCart(selectedProduct.id)}>
              Añadir al Carrito
            </button>
          </div>
        </div>
      )}

      {showAuthModal && (
        <AuthModal isVisible={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          title="¡Debes registrarte!"
          message="Para usar esta funcionalidad, necesitas iniciar sesión o registrarte.">
          <p className="text-center text-[#2F4F4F] my-4">
            Para usar esta funcionalidad, necesitas iniciar sesión o registrarte.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-[#6E9475] text-white px-4 py-2 rounded hover:bg-[#5C8465] transition"
              onClick={() => window.location.href = "/login"}
            >
              Iniciar sesión
            </button>
            <button
              className="bg-[#D4C9B0] text-[#2F4F4F] px-4 py-2 rounded hover:bg-[#BBA98A] transition"
              onClick={() => window.location.href = "/register"}
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
