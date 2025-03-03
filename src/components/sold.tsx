
function Sold() {
    return (
        <section className="py-16 bg-white">
            <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10">Nuestros productos más vendidos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                {/* {bestSellingProducts.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative">
                        <button className="absolute top-2 right-2 text-red-500 hover:text-red-600 z-10" onClick={() => toggleFavorite(product.id)}>
                            <FaHeart size={24} className={favorites.includes(product.id) ? "fill-red-500" : "fill-gray-500"} />
                        </button>
                    </div>
                ))} */}
            </div>
        </section>
    );
}

export default Sold;
