import { useEffect, useRef, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { handleGet } from "../../validation/admin/article/handleGet";
import { handleGetUserSession } from "../../components/ts/fetchUser";
import { handleGetFavorito } from "../../validation/favorite/handle";
import { handleDelete } from "../../validation/favorite/handleDelete";
import { SubmitFavorite } from "../../validation/favorite/submitFavorite";
import AllProduct from "../../components/allProduct";
import DetaillsProduct from "../../components/detailsProduct";
const placeholderImage = "https://via.placeholder.com/600x400?text=Sin+imagen";
function OurCategories() {

    const [categorias, setCategorias] = useState<any[]>([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);

    useEffect(() => {
        handleGet()
            .then((data) => {
                const agrupadas: { [key: string]: any } = {};

                data.forEach((item: any) => {
                    const cat = item.categoria;
                    if (!agrupadas[cat.nombre.trim()]) {
                        agrupadas[cat.nombre.trim()] = {
                            id: cat.id,
                            nombre: cat.nombre.trim(),
                            descripcion: cat.descripcion,
                            imagen: cat.imagen || placeholderImage,
                            cantidad: 0,
                        };
                    }
                    agrupadas[cat.nombre.trim()].cantidad += 1;
                });

                setCategorias(Object.values(agrupadas));
            })
            .catch((error) => console.error("Error al obtener los artículos:", error));
    }, []);

    const [favorites, setFavorites] = useState<number[]>([]);
    const [isLogged, setIsLogged] = useState<boolean | null>(null);
    const descripcionRef = useRef<HTMLDivElement | null>(null);

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

            <div className="mt-10 max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#2F4F4F] mb-10 text-center">
                    Nuestras categorías
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {categorias.slice(0, 6).map((cat) => (
                        <div key={cat.id} className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                            <img
                                src={cat.imagen || placeholderImage}
                                alt={cat.nombre}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
                                <h3 className="text-xl font-bold">{cat.nombre}</h3>
                                <p className="text-sm">{cat.cantidad} productos</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DetaillsProduct
                productoSeleccionado={productoSeleccionado}
                setProductoSeleccionado={setProductoSeleccionado}
                descripcionRef={descripcionRef}
            />

            <AllProduct
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                setProductoSeleccionado={handleProductoSeleccionado}
            />
            <Footer />
        </div>
    );
}

export default OurCategories;
