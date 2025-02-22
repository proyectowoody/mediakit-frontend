import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchItem {
  id: number;
  type: "category" | "product";
  name: string;
  price?: string;
  image?: string;
  description?: string;
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
      const data: SearchItem[] = await mockSearch(searchTerm);
      setResults(data);
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

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8">

      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
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
        <div className="absolute z-50 bg-white border border-gray-300 mt-2 rounded-lg w-full max-h-64 overflow-y-auto">
          <div className="p-2 border-b text-sm text-gray-700 font-semibold">CATEGORÍAS</div>
          {results
            .filter((item) => item.type === "category")
            .map((item) => (
              <div
                key={item.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectProduct(item)}
              >
                {item.name}
              </div>
            ))}

          <div className="p-2 border-b text-sm text-gray-700 font-semibold">PRODUCTOS</div>
          {results
            .filter((item) => item.type === "product")
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectProduct(item)}
              >
                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded mr-2" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.price} €</p>
                </div>
              </div>
            ))}
        </div>
      )}

      {selectedProduct && (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-32 h-32 object-cover mx-auto rounded" />
          <h3 className="text-lg font-semibold text-center mt-2">{selectedProduct.name}</h3>
          <p className="text-center text-gray-600">{selectedProduct.price} €</p>
          <p className="text-sm text-gray-500 mt-2">{selectedProduct.description}</p>
          <button className="w-full mt-4 bg-[#6E9475] text-white py-2 rounded hover:bg-[#5C8465]">
            Seleccionar Opciones
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;

const mockSearch = (searchTerm: string): Promise<SearchItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: SearchItem[] = [
        { id: 1, type: "category", name: "Blazer" },
        { id: 2, type: "category", name: "Camisas" },
        { id: 3, type: "product", name: "Kent Handmade Tick-Weave Blazer", price: "4.917,36", image: "https://via.placeholder.com/100", description: "Blazer de alta calidad para eventos formales." },
        { id: 4, type: "product", name: "Cotton Blazer Cardigan", price: "2.685,95", image: "https://via.placeholder.com/100", description: "Cardigan cómodo con diseño moderno." },
        { id: 5, type: "product", name: "Slim Fit Cotton Broadcloth Dress Shirt", price: "78,51", image: "https://via.placeholder.com/100", description: "Perfecto para usar debajo de un blazer." }
      ];

      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      resolve(filtered);
    }, 500);
  });
};
