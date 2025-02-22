import { useState, useEffect } from "react";
// import Card from "../components/card";
import Footer from "../components/footer";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import { motion, AnimatePresence } from "framer-motion";
import Nosotros from "../components/nosotros";
import Presumir from "../components/presumir";
import Testimonios from "../components/testimonios";

interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  image: string;
  sales: number;
}

function Home() {
  const banners = [
    { id: 1, img: "https://media.gq.com.mx/photos/64ff795dd175b7cca062a8dc/16:9/w_2560%2Cc_limit/zapatos-bespoke-que-son-y-como-usar-con-estilo.jpg", alt: "Banner 1" },
    { id: 2, img: "https://belenkacdn.com/media/2024/09/8/1/entice-neo-size-medium-v-1.png", alt: "Banner 2" },
    { id: 3, img: "https://media.revistagq.com/photos/5ce6c5959d80fc0c86e33ba7/16:9/w_2560%2Cc_limit/schuhe-putzen-quer.jpg", alt: "Banner 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [offerProducts, setOfferProducts] = useState<Product[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [animatedProduct, setAnimatedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    { id: 1, name: "Kent Handmade Tick-Weave Blazer", price: 4917.36, discountPrice: 3999.99, image: "https://tiendasanthonys.com/cdn/shop/products/10D28-BL_01_20221020091359.jpg?v=1709931798", sales: 150 },
    { id: 2, name: "Gregory Handmade Wool Dinner Jacket", price: 4090.91, discountPrice: 3499.99, image: "https://paylesschat.com/republicadominicana/19735-thickbox_default/zapatos_de_vestir_satin_partie.jpg", sales: 200 },
    { id: 3, name: "Burnham Suede Jacket", price: 2851.24, discountPrice: 2199.99, image: "https://ego.do/wp-content/uploads/255103-TAN-LTHR-Zapato-Noicy-Bronce-Democrata_01-1.jpg", sales: 300 },
    { id: 4, name: "Gregory Hand-Tailored Wool Dinner Jacket", price: 2685.95, discountPrice: 1999.99, image: "https://valetzshoes.com/cdn/shop/products/ZAPATO-MOCASIN-DUTY-ANTIFAZ-ULTRA-LIVIANO-NEGRO-PIEL-VALETZ-SHOES.jpg?v=1720710764&width=1445", sales: 400 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 8);
    setTopProducts(sortedProducts);

    const discountedProducts = [...products].slice(0, 8);
    setOfferProducts(discountedProducts);

    const bestSellers = [...products].sort((a, b) => b.sales - a.sales).slice(0, 8);
    setBestSellingProducts(bestSellers);
  }, []);

  const handleAddToCart = (product: Product) => {
    setAnimatedProduct(product);
    setCartItems((prevItems) => [...prevItems, product]);
    setTimeout(() => setAnimatedProduct(null), 1500);
  };

  return (
    <div className="font-quicksand">
      <Header />

      <div className="relative w-full h-screen overflow-hidden">
        {banners.map((banner, index) => (
          <img
            key={banner.id}
            src={banner.img}
            alt={banner.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
            ></div>
          ))}
        </div>
      </div>

      <Nosotros />
      <SearchBar />

      <section className="py-16 bg-white">
        <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10">Mejores Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {topProducts.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 relative">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#2F4F4F]">{product.name}</h3>
                <p className="text-[#6E9475] font-bold">{product.price.toFixed(2)} €</p>
                <button
                  className="w-full mt-4 bg-[#6E9475] text-white py-2 rounded hover:bg-[#5C8465]"
                  onClick={() => handleAddToCart(product)}
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Presumir />

      <section className="py-16 bg-white">
        <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10">Nuestras Ofertas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {offerProducts.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#2F4F4F]">{product.name}</h3>
                <p className="text-red-500 font-bold line-through">{product.price.toFixed(2)} €</p>
                <p className="text-[#6E9475] font-bold">{product.discountPrice.toFixed(2)} €</p>
                <button className="w-full mt-4 bg-[#6E9475] text-white py-2 rounded hover:bg-[#5C8465]">Ver Producto</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Testimonios />

      <section className="py-16 bg-white">
        <h2 className="text-4xl font-bold text-center text-[#2F4F4F] mb-10">Nuestros productos más vendidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {bestSellingProducts.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#2F4F4F]">{product.name}</h3>
                <p className="text-[#6E9475] font-bold">{product.price.toFixed(2)} €</p>
                <p className="text-sm text-gray-500">Ventas: {product.sales}</p>
                <button className="w-full mt-4 bg-[#6E9475] text-white py-2 rounded hover:bg-[#5C8465]">Ver Producto</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {animatedProduct && (
          <motion.img
            src={animatedProduct.image}
            initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
            animate={{ scale: 0.1, x: 300, y: -300, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed w-32 h-32 object-cover top-1/2 left-1/2 z-50"
            alt="Animación producto"
          />
        )}
      </AnimatePresence>
      
      {/* <Card />  */}
      <Footer />
    </div>
  );
}

export default Home;
