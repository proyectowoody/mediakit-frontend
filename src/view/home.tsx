import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import roleAdmin from "../components/ts/roleAdmin";
import { SubmitFavorite } from "../validation/favorite/submitFavorite";
import VerificationUrls from "../validation/login/verificationUrls";

export interface Product {
  id: number;
  name: string;
  description: string;
  estatus: string;
  price: number;
  discountPrice: number;
  images: string[];
  sales: number;
}

function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  const tokens = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (tokens) {
      const verify = async () => {
        await VerificationUrls(tokens, navigate);
      };
      verify();
    }
  }, [tokens, navigate]);

  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    handleGetFavorito()
      .then((favoritos) => setFavorites(favoritos.map((fav: any) => fav.article.id)))
      .catch((error) => console.error("Error al obtener favoritos:", error));
  }, []);

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

  return (
    <div className="font-quicksand">
      <Header />
      <BannerImage />
      <Nosotros />
      <SearchBar />
      <TopProduct
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <Presumir />
      <Offers
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <Testimonios />
      <Sold
        favorites={favorites}
        toggleFavorite={toggleFavorite} />
      <Footer />
    </div>
  );
}

export default Home;
