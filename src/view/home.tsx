import { useState, useEffect } from "react";
// import Card from "../components/card";
import Footer from "../components/footer";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import { motion, AnimatePresence } from "framer-motion";
import Nosotros from "../components/nosotros";
import Presumir from "../components/presumir";
import Testimonios from "../components/testimonios";
import { handleGet } from "../validation/admin/article/handleGet";
import { handleGetFavorito } from "../validation/favorite/handle";
import { handleDelete } from "../validation/favorite/handleDelete";
import { Submit } from "../validation/favorite/Submit";
import BannerImage from "../components/bannerImage";
import TopProduct from "../components/topProduct";
import Offers from "../components/offers";
import Sold from "../components/sold";

export interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  images: string[];
  sales: number;
}

function Home() {

  const tokens = new URLSearchParams(window.location.search).get("token");
  if (tokens) {
    localStorage.setItem("ACCESS_TOKEN", tokens);
  }

  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [offerProducts, setOfferProducts] = useState<Product[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [animatedProduct, setAnimatedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  console.log(cartItems);

  const [articulos, setArticulos] = useState<
    {
      id: number;
      nombre: string;
      descripcion: string;
      categoria: {
        id: number;
        nombre: string;
        descripcion: string;
      };
      fecha: string;
      estado: string;
      imagen: string;
      precio: number;
      imagenes: { id: number; url: string }[];
    }[]
  >([]);

  useEffect(() => {
    handleGet()
      .then((data) => setArticulos(data))
      .catch((error) => console.error(error));

    handleGetFavorito()
      .then((favoritos) => setFavorites(favoritos.map((fav: any) => fav.article.id)))
      .catch((error) => console.error("Error al obtener favoritos:", error));
  }, []);

  const products: Product[] = articulos.map((articulo) => ({
    id: articulo.id,
    name: articulo.nombre,
    price: articulo.precio,
    discountPrice: articulo.precio * 0.9,
    images: articulo.imagenes.map((img) => img.url),
    sales: 150,
  }));

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 8);
    setTopProducts(sortedProducts);

    const discountedProducts = [...products].slice(0, 8);
    setOfferProducts(discountedProducts);

    const bestSellers = [...products].sort((a, b) => b.sales - a.sales).slice(0, 8);
    setBestSellingProducts(bestSellers);
  }, [products]);

  const handleAddToCart = (product: Product) => {
    setAnimatedProduct(product);
    setCartItems((prevItems) => [...prevItems, product]);
    setTimeout(() => setAnimatedProduct(null), 1500);
  };

  const toggleFavorite = async (productId: number) => {
    const isFavorito = favorites.includes(productId);

    try {
      if (isFavorito) {
        await handleDelete(productId);
        setFavorites(favorites.filter((id) => id !== productId));
      } else {
        await Submit(productId);
        setFavorites([...favorites, productId]);
      }
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
    }
  };

  return (
    <div className="font-quicksand">
      <Header />
      <BannerImage />
      <Nosotros />
      <SearchBar />
      <TopProduct
        topProducts={topProducts}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        handleAddToCart={handleAddToCart}
      />
      <Presumir />
      <Offers
        offerProducts={offerProducts}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <Testimonios />
      <Sold
        bestSellingProducts={bestSellingProducts}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <AnimatePresence>
        {animatedProduct && animatedProduct.images.length > 0 && (
          <motion.img
            src={animatedProduct.images[0]}
            initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
            animate={{ scale: 0.1, x: 300, y: -300, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed w-32 h-32 object-cover top-1/2 left-1/2 z-50"
            alt="Animación producto"
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default Home;
