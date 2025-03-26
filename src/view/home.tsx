import { useState, useEffect, useRef } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import Nosotros from "../components/nosotros";
import Presumir from "../components/presumir";
import Testimonios from "../components/testimonios";
import { handleGetFavorito } from "../validation/favorite/handle";
import { handleDelete } from "../validation/favorite/handleDelete";
import BannerImage from "../components/bannerImage";
import TopProduct from "../components/topProduct";
import Offers from "../components/offers";
import Sold from "../components/sold";
import { SubmitFavorite } from "../validation/favorite/submitFavorite";
import VerificationUrls from "../validation/login/verificationUrls";
import { handleGetUserSession } from "../components/ts/fetchUser";
import { useAdminRedirect } from "../components/ts/useAutProteccion";
import DetaillsProduct from "../components/detailsProduct";

export interface Product {
  id: number;
  name: string;
  description: string;
  estatus: string;
  price: number;
  priceAct: number;
  discount: number;
  imagenes: string[];
}

function Home() {

  useAdminRedirect();

  VerificationUrls();

  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  useEffect(() => {
    handleGetUserSession(setIsLogged);
  }, []);

  useEffect(() => {
    if (isLogged) {
      handleGetFavorito()
        .then((favoritos) => setFavorites(favoritos.map((fav: any) => fav.article.id)))
        .catch((error) => console.error("Error al obtener favoritos:", error));
    }
  }, [isLogged]);

  const toggleFavorite = async (productId: number) => {
    const isFavorito = favorites.includes(productId);

    try {
      if (isFavorito) {
        await handleDelete(productId);
        setFavorites(favorites.filter((id) => id !== productId));
      } else {
        await SubmitFavorite(productId);
        setFavorites([...favorites, productId]);
      }
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const descripcionRef = useRef<HTMLDivElement | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);

  const handleProductoSeleccionado = (producto: any) => {
    setProductoSeleccionado(producto);
    setTimeout(() => {
      if (descripcionRef.current) {
        const offsetTop = descripcionRef.current.offsetTop;
        window.scrollTo({
          top: offsetTop - 50,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <div className="font-quicksand">
      <Header />
      <BannerImage />
      <Nosotros />
      <DetaillsProduct
        productoSeleccionado={productoSeleccionado}
        setProductoSeleccionado={setProductoSeleccionado}
        descripcionRef={descripcionRef}
      />
      <SearchBar/>
      <TopProduct
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        setProductoSeleccionado={handleProductoSeleccionado}
      />
      <Presumir />
      <Offers
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        setProductoSeleccionado={handleProductoSeleccionado}
      />
      <Testimonios />
      <Sold
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        setProductoSeleccionado={handleProductoSeleccionado}
      />

      <Footer />
    </div>
  );
}

export default Home;


