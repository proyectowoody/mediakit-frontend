import { useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        subject: "",
        message: "",
        termsAccepted: false,
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!formData.termsAccepted) {
            alert("Debe aceptar los términos y condiciones.");
            return;
        }
        alert("Mensaje enviado correctamente");
    };

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen flex flex-col items-center justify-center px-6">
                <div className="max-w-lg w-full bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6">
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
                        <div className="mb-4">
                            <label className="block text-[#2F4F4F] font-medium mb-1">Adjuntar archivos</label>
                            <input
                                type="file"
                                name="attachment"
                                className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md"
                            />
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
                                Acepto los <a href="/terms" className="text-[#6E9475] underline">términos y condiciones</a>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#6E9475] text-white py-2 rounded-lg font-medium hover:bg-[#5C8465] transition-all"
                        >
                            Enviar Mensaje
                        </button>
                    </form>
                </div>

                <div className="max-w-4xl w-full mt-12 bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6">
                    <h2 className="text-3xl font-semibold text-[#6E9475] text-center mb-6">Ven a visitarnos</h2>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
                            <p className="text-[#2F4F4F] mb-2">Plaza Sierra Castilla, 2</p>
                            <p className="text-[#2F4F4F] mb-2">03177, San Fulgencio</p>
                            <p className="text-[#2F4F4F] mb-2">Alicante, España</p>
                            <p className="text-[#2F4F4F]">info@respectfulshoes.com</p>
                        </div>
                        <div className="md:w-1/2">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.487126514857!2d-0.7205766846910334!3d38.08170917970505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63a11a6fbc5e9b%3A0x53e1cfc5d1a4f12b!2sPlaza%20Sierra%20Castilla%2C%202%2C%2003177%20San%20Fulgencio%2C%20Alicante%2C%20España!5e0!3m2!1ses!2sdo!4v1708501533957!5m2!1ses!2sdo"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación Respectful Shoes"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
