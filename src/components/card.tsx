import product1 from "../assets/img/zapatos.jpg";
// import product2 from "../assets/img/reloj.jpg";
// import product3 from "../assets/img/laptop.jpg";
// import product4 from "../assets/img/celular.jpg";
// import product5 from "../assets/img/auriculares.jpg";
// import product6 from "../assets/img/camara.jpg";

const products = [
    {
        id: 1,
        image: product1,
        title: "Zapatos Deportivos Nike",
        description: "Comodidad y estilo para el día a día.",
        price: "$120",
    },
    {
        id: 2,
        image: product1,
        title: "Reloj Inteligente Samsung",
        description: "Monitorea tu actividad física y recibe notificaciones.",
        price: "$199",
    },
    {
        id: 3,
        image: product1,
        title: "Laptop Dell XPS 13",
        description: "Potente y ligera, ideal para trabajar y estudiar.",
        price: "$999",
    },
    {
        id: 4,
        image: product1,
        title: "Smartphone iPhone 14 Pro",
        description: "La mejor cámara y rendimiento en un teléfono.",
        price: "$1099",
    },
    {
        id: 5,
        image: product1,
        title: "Auriculares Inalámbricos Sony",
        description: "Cancelación de ruido y sonido de alta calidad.",
        price: "$250",
    },
    {
        id: 6,
        image: product1,
        title: "Cámara Profesional Canon",
        description: "Perfecta para fotografía y video en alta calidad.",
        price: "$750",
    },
];

function ProductGrid() {
    return (
        <div className="max-w-screen-xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id} className="w-full max-w-sm bg-white border border-[#D4C9B0] rounded-lg shadow-md">
                    <a href="#">
                        <img className="p-6 rounded-t-lg w-full h-48 object-contain" src={product.image} alt={product.title} />
                    </a>
                    <div className="px-5 pb-5">
                        <a href="#">
                            <h5 className="text-lg font-semibold tracking-tight text-[#2F4F4F]">{product.title}</h5>
                        </a>
                        <p className="text-sm text-[#4E6E5D] mt-1">{product.description}</p>
                        {/* Precio y botón */}
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-2xl font-bold text-[#2F4F4F]">{product.price}</span>
                            <button className="px-5 py-2 bg-[#6E9475] text-white rounded-lg text-sm font-medium hover:bg-[#5C8465] hover:scale-105 transition-transform duration-300">
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductGrid;
