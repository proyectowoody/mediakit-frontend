import React, { useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Mensaje enviado correctamente");
    };

    return (
        <div>
            <Header />
            <div className="bg-[#FAF3E0] min-h-screen flex items-center justify-center px-6">
                <div className="max-w-lg w-full bg-white border border-[#D4C9B0] rounded-lg shadow-md p-6">
                    <h2 className="text-3xl font-semibold text-[#6E9475] text-center mb-4">Contacto</h2>
                    <p className="text-[#2F4F4F] text-center mb-6">Si tienes alguna pregunta, envíanos un mensaje.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-[#2F4F4F] font-medium mb-1">Nombre</label>
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
                            <label className="block text-[#2F4F4F] font-medium mb-1">Correo Electrónico</label>
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
                            <label className="block text-[#2F4F4F] font-medium mb-1">Mensaje</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475] h-32"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#6E9475] text-white py-2 rounded-lg font-medium hover:bg-[#5C8465] transition-all"
                        >
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
