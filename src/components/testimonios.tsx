import { useEffect, useState } from "react";
import { translateText } from "../translate/translate";
import { useTranslation } from "react-i18next";
import { handleGetComment } from "../validation/comment/handleGet";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    comment: string;
}

function Testimonios() {
    
    const { i18n } = useTranslation(); 
    const [testimonialIndex, setTestimonialIndex] = useState<number>(0);
    const [visibleTestimonials, setVisibleTestimonials] = useState<number>(3);
    const [translatedTitle, setTranslatedTitle] = useState<string>("Lo que dicen nuestros clientes");
    const [translatedTestimonials, setTranslatedTestimonials] = useState<Testimonial[]>([]);

    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    useEffect(() => {
        const fetchTestimonials = async () => {
            const data = await handleGetComment();
            const formatted = data.map((item: any, index: number) => ({
                id: item.id || index,
                name: item.name || "Usuario",
                role: item.role || "Cliente",
                comment: item.descripcion || "",
            }));
            setTestimonials(formatted);
        };
    
        fetchTestimonials();
    }, []);
    

    useEffect(() => {
        async function translateContent() {
            const translatedTitleText = await translateText("Lo que dicen nuestros clientes", i18n.language);
            setTranslatedTitle(translatedTitleText);
    
            const translated = await Promise.all(
                testimonials.map(async (testimonial) => ({
                    ...testimonial,
                    name: await translateText(testimonial.name, i18n.language),
                    role: await translateText(testimonial.role, i18n.language),
                    comment: await translateText(testimonial.comment, i18n.language),
                }))
            );
            setTranslatedTestimonials(translated);
        }
    
        if (testimonials.length > 0) {
            translateContent();
        }
    }, [i18n.language, testimonials]);     

    useEffect(() => {
        const updateVisibleTestimonials = () => {
            const width = window.innerWidth;
            setVisibleTestimonials(width >= 1024 ? 3 : width >= 768 ? 2 : 1);
        };

        updateVisibleTestimonials();
        window.addEventListener("resize", updateVisibleTestimonials);

        return () => window.removeEventListener("resize", updateVisibleTestimonials);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <section className="py-16 bg-white text-center">
            <h2 className="text-4xl font-bold text-[#2F4F4F] mb-10">
                {translatedTitle}
            </h2>
            <div className="flex justify-center space-x-6 max-w-6xl mx-auto overflow-hidden">
                {translatedTestimonials.length > 0 &&
                    translatedTestimonials
                        .slice(testimonialIndex, testimonialIndex + visibleTestimonials)
                        .map((testimonial) => (
                            <div key={testimonial.id} className="bg-[#FAF3E0] p-6 rounded-lg shadow-md max-w-sm transition-all duration-500 ease-in-out">
                                <p className="text-lg italic text-[#2F4F4F]">{testimonial.comment}</p>
                                <p className="font-bold mt-4">{testimonial.name}</p>
                                <p className="text-sm text-gray-600">{testimonial.role}</p>
                            </div>
                        ))}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                            index === testimonialIndex ? "bg-[#6E9475]" : "bg-gray-300"
                        }`}
                        onClick={() => setTestimonialIndex(index)}
                    ></div>
                ))}
            </div>
        </section>
    );
}

export default Testimonios;
