import { useEffect, useState } from "react";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    comment: string;
}

function Testimonios() {
    const [testimonialIndex, setTestimonialIndex] = useState<number>(0);
    const [visibleTestimonials, setVisibleTestimonials] = useState<number>(3);

    const testimonials: Testimonial[] = [
        { id: 1, name: "Elena Gutiérrez", role: "Empresaria", comment: "Gracias a Respectful Shoes encontré el calzado perfecto para mi familia. La calidad y el diseño superaron mis expectativas." },
        { id: 2, name: "Carlos Martínez", role: "Inversionista", comment: "Cada compra ha sido una experiencia premium. Los productos son sinónimo de calidad, confort y sostenibilidad." },
        { id: 3, name: "Sofía Díaz", role: "CEO de una Startup", comment: "La atención al detalle es impresionante. La selección de productos y la presentación hacen de esta tienda la mejor opción." },
        { id: 4, name: "Ricardo Fernández", role: "Cliente Frecuente", comment: "El servicio al cliente es excelente. Los zapatos son cómodos y realmente respetan la forma natural del pie." },
        { id: 5, name: "María López", role: "Diseñadora de Moda", comment: "Me encanta que la tienda combine estilo y sostenibilidad. Es difícil encontrar algo así en el mercado." }
    ];

    useEffect(() => {
        const updateVisibleTestimonials = () => {
            const width = window.innerWidth;
            if (width >= 1024) {
                setVisibleTestimonials(3); 
            } else if (width >= 768) {
                setVisibleTestimonials(2); 
            } else {
                setVisibleTestimonials(1); 
            }
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
            <h2 className="text-4xl font-bold text-[#2F4F4F] mb-10">Lo que dicen nuestros clientes</h2>
            <div className="flex justify-center space-x-6 max-w-6xl mx-auto overflow-hidden">
                {testimonials
                    .slice(testimonialIndex, testimonialIndex + visibleTestimonials)
                    .map((testimonial) => (
                        <div key={testimonial.id} className="bg-[#FAF3E0] p-6 rounded-lg shadow-md max-w-sm transition-all duration-500 ease-in-out">
                            <p className="text-lg italic text-[#2F4F4F]">"{testimonial.comment}"</p>
                            <p className="font-bold mt-4">{testimonial.name}</p>
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                    ))}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer ${index === testimonialIndex ? "bg-[#6E9475]" : "bg-gray-300"}`}
                        onClick={() => setTestimonialIndex(index)}
                    ></div>
                ))}
            </div>
        </section>
    );
}

export default Testimonios;
