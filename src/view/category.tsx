import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VerificationUrls from "../validation/login/verificationUrls";
import { handleGetFavorito } from "../validation/favorite/handle";
import { handleDelete } from "../validation/favorite/handleDelete";
import { SubmitFavorite } from "../validation/favorite/submitFavorite";
import Header from "../components/header";
import Footer from "../components/footer";
import BannerImage from "../components/bannerImage";
import CategoryArticle from "../components/categoryArticle";
import SearchBar from "../components/searchBar";
import { handleGetUserSession } from "../components/ts/fetchUser";

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

function Category() {

    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        handleGetUserSession(setIsLogged);
    }, []);

    const navigate = useNavigate();

    const { categoria, subcategoria } = useParams();

    const tokens = new URLSearchParams(window.location.search).get("token");

    useEffect(() => {
        if (tokens) {
            const verify = async () => {
                await VerificationUrls();
            };
            verify();
        }
    }, [tokens, navigate]);

    const [favorites, setFavorites] = useState<number[]>([]);

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

    return (
        <div>
            <Header />
            <BannerImage />
            <SearchBar />
            <CategoryArticle
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                categoria={categoria}
                subcategoria={subcategoria}
            />
            <Footer />
        </div>
    );
}

export default Category;