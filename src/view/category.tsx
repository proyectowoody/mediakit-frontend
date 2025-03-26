import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationUrls from "../validation/login/verificationUrls";
import { handleGetFavorito } from "../validation/favorite/handle";
import { handleDelete } from "../validation/favorite/handleDelete";
import { SubmitFavorite } from "../validation/favorite/submitFavorite";
import Header from "../components/header";
import Footer from "../components/footer";
import CategoryArticle from "../components/categoryArticle";
import SearchBar from "../components/searchBar";
import { handleGetUserSession } from "../components/ts/fetchUser";
import BannerImage from "../components/bannerImage";
import DetaillsProduct from "../components/detailsProduct";

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
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get("categoria");
    const subcategoria = urlParams.get("subcategoria");
    const descripcion = urlParams.get('descripcion');
    const imagenUrl = urlParams.get("imagen");

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
        <div>
            <Header />
            {!imagenUrl ? (
                <BannerImage />
            ) : (
                <div className="relative w-full h-[50vh] overflow-hidden">
                    <img
                        src={imagenUrl}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute left-1/2 top-[70%] transform -translate-x-1/2 -translate-y-1/2 text-white z-10 bg-black/50 px-4 py-2 rounded text-center">
                        <h2 className="text-xl font-bold">{categoria}</h2>
                        <p className="text-base">{subcategoria}</p>
                        <p className="text-sm">{descripcion}</p>
                    </div>
                </div>
            )}
            <SearchBar />
            <DetaillsProduct
                productoSeleccionado={productoSeleccionado}
                setProductoSeleccionado={setProductoSeleccionado}
                descripcionRef={descripcionRef}
            />
            <CategoryArticle
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                categoria={categoria ?? undefined}
                subcategoria={subcategoria ?? undefined}
                setProductoSeleccionado={handleProductoSeleccionado}
            />
            <Footer />
        </div>
    );
}

export default Category;