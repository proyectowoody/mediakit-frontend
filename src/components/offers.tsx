import { FaHeart } from "react-icons/fa";
import Carousel from "../components/carrousel";
import { Product } from "../view/home";

interface OffersProps {
    offerProducts: Product[];
    favorites: number[];
    toggleFavorite: (productId: number) => void;
}

function Offers({ offerProducts, favorites, toggleFavorite }: OffersProps) {
    return (
        <section className="py-16 bg-white">
            <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10">Nuestras Ofertas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                {offerProducts.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative">
                        <button className="absolute top-2 right-2 text-red-500 hover:text-red-600 z-10" onClick={() => toggleFavorite(product.id)}>
                            <FaHeart size={24} className={favorites.includes(product.id) ? "fill-red-500" : "fill-gray-500"} />
                        </button>
                        {product.images.length > 0 ? <Carousel images={product.images} /> : <p className="text-center text-gray-400">Sin imágenes</p>}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-[#2F4F4F]">{product.name}</h3>
                            <p className="text-red-500 font-bold line-through">{product.price.toFixed(2)} €</p>
                            <p className="text-[#6E9475] font-bold">{product.discountPrice.toFixed(2)} €</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Offers;
