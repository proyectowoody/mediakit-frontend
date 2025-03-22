import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Message from "../../components/message";
import HandleAddress from "../../validation/address/handle";
import useAuthProtection from "../../components/ts/useAutProteccion";

function Address() {

    useAuthProtection();

    const [formData, setFormData] = useState({
        id: "",
        calle: "",
        numero: "",
        piso_puerta: "",
        codigo_postal: "",
        ciudad: "",
        provincia: "",
        comunidad_autonoma: "",
        pais: "España",
        termsAccepted: false,
    });

    useEffect(() => {
        const storedAddress = localStorage.getItem("selected_address");
        if (storedAddress) {
            const parsed = JSON.parse(storedAddress);
            setFormData({
                id: parsed.id || "",
                calle: parsed.calle || "",
                numero: parsed.numero || "",
                piso_puerta: parsed.piso_puerta || "",
                codigo_postal: parsed.codigo_postal || "",
                ciudad: parsed.ciudad || "",
                provincia: parsed.provincia || "",
                comunidad_autonoma: parsed.comunidad_autonoma || "",
                pais: parsed.pais || "España",
                termsAccepted: false,
            });
        }
    }, []);    

    const { handleSubmit, isLoading } = HandleAddress(
        formData.id,
        formData.calle,
        formData.numero,
        formData.piso_puerta,
        formData.codigo_postal,
        formData.ciudad,
        formData.provincia,
        formData.comunidad_autonoma
    );

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-quicksand">
            <Header />
            <div className="mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative p-6">
                <div className="px-6 py-6 lg:px-8">
                    <h2 className="text-3xl font-semibold text-[#6E9475] text-center mb-4" data-translate>
                        {formData.id ? "Actualizar Dirección" : "Agregar Dirección"}
                    </h2>
                    <p className="text-[#2F4F4F] text-center mb-6" data-translate>
                        Completa los datos de tu dirección para futuras compras.
                    </p>
                    <Message />
                    <form onSubmit={handleSubmit}>

                        <input type="hidden" name="id" value={formData.id} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-[#2F4F4F] font-medium mb-1" data-translate>Calle*</label>
                                <input
                                    type="text"
                                    name="calle"
                                    value={formData.calle}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#2F4F4F] font-medium mb-1" data-translate>Número*</label>
                                <input
                                    type="text"
                                    name="numero"
                                    value={formData.numero}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#2F4F4F] font-medium mb-1" data-translate>Piso / Puerta</label>
                            <input
                                type="text"
                                name="piso_puerta"
                                value={formData.piso_puerta}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-[#2F4F4F] font-medium mb-1" data-translate>Código Postal*</label>
                                <input
                                    type="text"
                                    name="codigo_postal"
                                    value={formData.codigo_postal}
                                    onChange={handleChange}
                                    maxLength={5}
                                    pattern="[0-9]{5}"
                                    className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#2F4F4F] font-medium mb-1" data-translate>Ciudad*</label>
                                <input
                                    type="text"
                                    name="ciudad"
                                    value={formData.ciudad}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#2F4F4F] font-medium mb-1" data-translate>Provincia*</label>
                            <input
                                type="text"
                                name="provincia"
                                value={formData.provincia}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#2F4F4F] font-medium mb-1" data-translate>Comunidad Autónoma*</label>
                            <input
                                type="text"
                                name="comunidad_autonoma"
                                value={formData.comunidad_autonoma}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-[#D4C9B0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E9475]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#6E9475] text-white py-2 rounded-lg font-medium hover:bg-[#5C8465] transition-all"
                            disabled={isLoading} data-translate
                        >
                            {isLoading ? "Guardando..." : formData.id ? "Actualizar Dirección" : "Guardar Dirección"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Address;
