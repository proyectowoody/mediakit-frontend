import { useEffect, useRef, useState } from "react";
import Message from "../../message";
import User from "../../../validation/admin/supplier/user";
import Handle from "../../../validation/admin/supplier/handle";

function SupplierForm() {

    const { id, setId, nombre, setNombre, descripcion, setDescripcion, imagen, setImagen } = User();

    const { handleSubmitForm, isLoading } = Handle(id, nombre, descripcion, imagen);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
     const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const supplierSeleccionado = localStorage.getItem("supplierseleccionado");
        if (supplierSeleccionado) {
            const supplier = JSON.parse(supplierSeleccionado);
            setId(supplier.id || "");
            setNombre(supplier.nombre || "");
            setDescripcion(supplier.descripcion || "");
            setImagen(supplier.imagen || '');

            if (typeof supplier.imagen === "string" && supplier.imagen.trim() !== "") {
                setImagen(supplier.imagen);
                setPreviewUrl(supplier.imagen); 
            }
            setIsEditing(true);
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setImagen(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPreviewUrl(null);
        setImagen(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative p-6">
            <div className="absolute top-6 right-6">
                <a className="text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5" href="/proveedores" data-translate>
                    Regresar
                </a>
            </div>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-[#2F4F4F]" data-translate>
                    {isEditing ? "Actualizar proveedor" : "Crear proveedor"}
                </h3>
                <Message />
                <form className="space-y-6" onSubmit={handleSubmitForm}>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>Nombre</label>
                            <input
                                type="text"
                                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5 placeholder-[#D4C9B0]"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <label className="block mt-4 mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>Descripción</label>
                            <textarea
                                placeholder="Descripción"
                                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5 placeholder-[#D4C9B0]"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full sm:w-auto">
                            <div className="w-full sm:w-48 h-48 border border-[#D4C9B0] rounded-lg relative flex items-center justify-center">
                                {previewUrl ? (
                                    <>
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded cursor-pointer"
                                            onClick={() => setIsModalOpen(true)}
                                        />
                                        <button
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                                        >
                                            ✖
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-[#D4C9B0]" data-translate>No hay imagen</span>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="mt-2 bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full sm:w-48 h-12 p-2.5 text-center"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        disabled={isLoading} data-translate
                    >
                        {isLoading ? "Agregando..." : "Agregar"}
                    </button>
                </form>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
                    <div className="relative max-w-full max-h-full">
                        <button
                            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✖
                        </button>
                        <img
                            src={previewUrl!}
                            alt="Imagen completa"
                            className="w-auto max-w-full h-auto max-h-[90vh] md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-lg"
                        />
                    </div>
                </div>
            )}

        </div>

    );
}

export default SupplierForm;
