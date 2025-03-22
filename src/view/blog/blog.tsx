import { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { handleGet } from "../../validation/admin/blogAdmin/handleGet";

function Blog() {
    
    const [expandedPost, setExpandedPost] = useState<number | null>(null);
    const [currentImage, setCurrentImage] = useState<{ [key: number]: number }>({});
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 

    const [posts, setPosts] = useState<
        {
            id: number;
            titulo: string;
            descripcion: string;
            categoria: string;
            slug: string;
            contenido: string;
            fecha?: string;
            imagenes: { id: number; url: string }[];
        }[]
    >([]);

    const categories = [
        "Tecnología", "Negocios", "Salud", "Viajes", "Educación", "Moda",
        "Gastronomía", "Deportes", "Finanzas", "Entretenimiento", "Desarrollo Personal",
        "Cultura", "Noticias", "Fotografía", "Opiniones", "Ciencia", "Medio Ambiente", "Historia"
    ];

    useEffect(() => {
        handleGet()
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => {
                const newImages = { ...prev };
                posts.forEach(post => {
                    newImages[post.id] = (newImages[post.id] || 0) + 1;
                    if (newImages[post.id] >= post.imagenes.length) {
                        newImages[post.id] = 0;
                    }
                });
                return newImages;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [posts]);

    const filteredPosts = selectedCategory
        ? posts.filter(post => post.categoria.trim().toLowerCase() === selectedCategory.toLowerCase().trim())
        : posts;

    return (
        <div className="mt-10">
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16">
                <div className="max-w-screen-lg mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Noticias</h1>

                    <div className="flex flex-col md:flex-row gap-6">
                       
                        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/4 max-h-[400px] overflow-y-auto">
                            <h2 className="text-lg font-semibold text-black mb-3">Categorías</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li 
                                    className={`cursor-pointer ${selectedCategory === null ? "font-bold text-blue-600" : ""}`}
                                    onClick={() => setSelectedCategory(null)}
                                >
                                    📌 Ver todas
                                </li>
                                {(showAllCategories ? categories : categories.slice(0, 5)).map((category, index) => (
                                    <li 
                                        key={index} 
                                        className={`cursor-pointer hover:text-blue-500 transition ${
                                            selectedCategory === category ? "font-bold text-blue-600" : ""
                                        }`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setShowAllCategories(!showAllCategories)}
                                className="mt-4 px-4 py-2 border rounded-lg text-black border-black hover:text-black transition"
                            >
                                {showAllCategories ? "Ver menos" : "Ver todas las categorías"}
                            </button>
                        </div>

                        <div className="w-full md:w-3/4">
                            {filteredPosts.length === 0 ? (
                                <p className="text-gray-500 text-center">No hay publicaciones en esta categoría.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredPosts.map((post) => (
                                        <div key={post.id} className="bg-white border rounded-lg shadow-md overflow-hidden">
                                            <img
                                                src={post.imagenes[currentImage[post.id] || 0]?.url}
                                                alt={post.titulo}
                                                className="w-full h-48 object-cover transition-opacity duration-1000"
                                            />
                                            <div className="p-6">
                                               
                                                <span 
                                                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs uppercase tracking-wide cursor-pointer"
                                                    onClick={() => setSelectedCategory(post.categoria)}
                                                >
                                                    {post.categoria}
                                                </span>

                                                <h2 className="text-2xl font-bold text-gray-900 mt-3">{post.titulo}</h2>

                                                <p className="text-base text-gray-800 mt-4 font-medium">
                                                    {expandedPost === post.id ? post.descripcion : `${post.descripcion.slice(0, 100)}...`}
                                                </p>

                                                <p className="text-sm text-gray-600 mt-3">
                                                    {expandedPost === post.id ? post.contenido : `${post.contenido.slice(0, 100)}...`}
                                                </p>

                                                <p className="text-xs text-gray-500 italic mt-2">
                                                    Slug: {post.slug}
                                                </p>

                                                <button
                                                    className="mt-4 text-blue-600 text-sm font-semibold hover:underline"
                                                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                                                >
                                                    {expandedPost === post.id ? "Leer menos ▲" : "Leer más ▼"}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Blog;
