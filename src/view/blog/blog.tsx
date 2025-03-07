import { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";
import roleAdmin from "../../components/ts/roleAdmin";

function Blog() {
    const navigate = useNavigate();

    useEffect(() => {
        roleAdmin(navigate);
    }, [navigate]);

    const [expandedPost, setExpandedPost] = useState<number | null>(null);

    const posts = [
        {
            id: 1,
            title: "Cómo elegir el mejor calzado respetuoso",
            excerpt:
                "Descubre qué características debe tener un calzado para cuidar la salud de tus pies.",
            content: "El calzado respetuoso debe tener suela flexible, ser ligero y permitir el movimiento natural del pie. Además, es clave que esté fabricado con materiales sostenibles y sin componentes tóxicos.",
        },
        {
            id: 2,
            title: "Beneficios del calzado sostenible",
            excerpt:
                "Conoce por qué elegir zapatos ecológicos es una decisión inteligente para el planeta y para ti.",
            content: "El calzado sostenible reduce la huella de carbono, evita la contaminación de suelos y mares y está fabricado con materiales reciclados o biodegradables. Además, es beneficioso para la salud del pie al evitar químicos dañinos.",
        },
        {
            id: 3,
            title: "Tendencias en calzado respetuoso para 2025",
            excerpt:
                "Explora las nuevas tendencias en zapatos cómodos, sostenibles y con diseño innovador.",
            content: "En 2025, las tendencias en calzado respetuoso incluyen el uso de materiales veganos, diseños ultraligeros y tecnologías que mejoran la transpirabilidad y durabilidad de los zapatos sin comprometer el medio ambiente.",
        },
        {
            id: 4,
            title: "Cómo cuidar tus zapatos respetuosos",
            excerpt:
                "Aprende los mejores consejos para mantener tu calzado en perfecto estado por más tiempo.",
            content: "Para cuidar tus zapatos respetuosos, límpialos regularmente con productos naturales, evita la humedad extrema y guárdalos en un lugar fresco. También es recomendable alternar su uso para prolongar su vida útil.",
        },
    ];

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen py-10 px-6 md:px-16">
                <div className="max-w-screen-lg mx-auto">
                    <h1 className="text-4xl font-bold text-[#2F4F4F] text-center mb-6">
                        Blog - Media Kit Respectful Shoes
                    </h1>
                    <p className="text-center text-[#2F4F4F] mb-8">
                        Explora artículos sobre calzado respetuoso, tendencias en moda sostenible y consejos para elegir el mejor zapato.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {posts.map((post) => (
                            <div key={post.id} className="bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-semibold text-[#6E9475] mb-2">{post.title}</h2>
                                <p className="text-[#2F4F4F] mb-4">
                                    {expandedPost === post.id ? post.content : post.excerpt}
                                </p>
                                <button
                                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                                    className="px-5 py-2 bg-[#6E9475] text-white rounded-lg text-sm font-medium hover:bg-[#5C8465] hover:scale-105 transition-transform duration-300"
                                >
                                    {expandedPost === post.id ? "Leer menos" : "Leer más"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Blog;
