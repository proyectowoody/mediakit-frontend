import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
import roleAdmin from "../../components/ts/roleAdmin";
import { linkBackend } from "../../validation/url";

function Contact() {
    const navigate = useNavigate();

    useEffect(() => {
        roleAdmin(navigate);
    }, [navigate]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        subject: "",
        message: "",
        termsAccepted: false,
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.termsAccepted) {
            alert("Debe aceptar los términos y condiciones.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${linkBackend}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Mensaje enviado con éxito.");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    city: "",
                    subject: "",
                    message: "",
                    termsAccepted: false,
                });
            } else {
                alert("Error al enviar el mensaje.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al enviar el formulario.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen flex flex-col items-center justify-center px-6">
                <div className="mt-20 max-w-lg w-full bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6">
                    <h2 className="text-3xl font-semibold text-[#6E9475] text-center mb-4">Contacto</h2>
                    <p className="text-[#2F4F4F] text-center mb-6">Si tienes alguna pregunta, envíanos un mensaje.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-[#2F4F4F] font-medium mb-1">Nombre completo*</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#2F4F4F] font-medium mb-1">Correo Electrónico*</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#2F4F4F] font-medium mb-1">Teléfono*</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#2F4F4F] font-medium mb-1">Provincia / Ciudad</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#2F4F4F] font-medium mb-1">Asunto*</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#2F4F4F] font-medium mb-1">Mensaje o consulta*</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475] h-32"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                                className="mr-2"
                                required
                            />
                            <label className="text-[#2F4F4F]">
                                Acepto los <a href="/terms" target="_blank" className="text-[#6E9475] underline">términos y condiciones</a>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#6E9475] text-white py-2 rounded-lg font-medium hover:bg-[#5C8465] transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? "Enviando..." : "Enviar Mensaje"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
