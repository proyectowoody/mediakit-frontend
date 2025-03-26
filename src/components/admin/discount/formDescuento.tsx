import { useEffect, useState } from "react";
import Message from "../../message";
import User from "../../../validation/admin/discount/user";
import { Handle } from "../../../validation/admin/discount/handle";

function FormDescuento() {

    const { id, setId, codigo, setCodigo, descuento, setDescuento } = User();

    const [isEditing, setIsEditing] = useState(false);

    const generarCodigo = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo = '';
        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            codigo += chars[randomIndex];
        }
        setCodigo(codigo);
    };

    useEffect(() => {
        const descuentoSeleccionada = localStorage.getItem("descuentoSeleccionado");
        if (descuentoSeleccionada) {
            const des = JSON.parse(descuentoSeleccionada);
            setId(des.id || "");
            setCodigo(des.codigo || "");
            setDescuento(des.descuento || "");
            setIsEditing(true);
        }
    }, []);

    const { handleSubmitForm, isLoading } = Handle(id, codigo, descuento);

    return (
        <div className="mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative p-6">
            <div className="absolute top-6 right-6">
                <a className="text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5" href="/codigo-descuento" data-translate>
                    Regresar
                </a>
            </div>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-[#2F4F4F]" data-translate>
                    {isEditing ? "Actualizar código" : "Crear código"}
                </h3>
                <Message />
                <form className="space-y-6" onSubmit={handleSubmitForm}>

                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                            Código
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5"
                                placeholder="Código"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={generarCodigo}
                                className="px-3 py-2 text-sm bg-[#D4C9B0] text-[#2F4F4F] rounded-lg hover:bg-[#c4b79d] whitespace-nowrap"
                            >
                                Generar
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                            Descuento
                        </label>
                        <input
                            type="number"
                            className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5"
                            value={descuento}
                            onChange={(e) => setDescuento(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className=" mt-10 w-full text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={isLoading}
                        >
                            {isLoading ? "Agregando..." : "Agregar"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default FormDescuento;
