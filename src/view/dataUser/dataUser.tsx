import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Message from "../../components/message";
import useAuthProtection from "../../components/ts/useAutProteccion";
import {HandleDatosPersonales} from "../../validation/dataUser/handle";

function DataUser() {
    useAuthProtection();

    const [id, setId] = useState(0);
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("DNI/NIF");
    const [numeroDocumento, setNumeroDocumento] = useState("");
    const [genero, setGenero] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ruta, setRuta] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedPerson = localStorage.getItem("selected_person");
        const backRoute = localStorage.getItem("direccion_back") || "/";
        setRuta(backRoute);
        if (storedPerson) {
            const parsed = JSON.parse(storedPerson);
            setId(parsed.id || 0);
            setFechaNacimiento(parsed.fecha_nacimiento || '');
            setTipoDocumento(parsed.tipo_documento || '');
            setNumeroDocumento(parsed.numero_documento || '');
            setGenero(parsed.genero || '');
            setTelefono(parsed.telefono || '');
            setIsEditing(true);
        }
    }, []);

    const { handleSubmit, isLoading } = HandleDatosPersonales(id, fechaNacimiento, tipoDocumento, numeroDocumento, genero, telefono, ruta);

    return (
        <div className="font-quicksand">
            <Header />
            <div className="mb-10 mt-32 max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-3xl font-bold text-[#6E9475] text-center mb-6">
                    Datos personales
                </h2>
                <Message />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-1">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6E9475] focus:outline-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Tipo de Documento</label>
                            <select
                                value={tipoDocumento}
                                onChange={(e) => setTipoDocumento(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6E9475] focus:outline-none"
                            >
                                <option value="DNI/NIF">DNI/NIF</option>
                                <option value="NIE">NIE</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Tarjeta de residente">Tarjeta de residente</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Número de Documento</label>
                            <input
                                type="text"
                                value={numeroDocumento}
                                onChange={(e) => setNumeroDocumento(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6E9475] focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Género</label>
                        <select
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6E9475] focus:outline-none"
                            required
                        >
                            <option value="">Seleccionar</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="No identificado">No identificado</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Teléfono</label>
                        <input
                            type="tel"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6E9475] focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#6E9475] text-white py-2 rounded-lg font-medium hover:bg-[#5C8465] transition-all"
                        disabled={isLoading}
                    >
                        {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Guardar"}
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default DataUser;
