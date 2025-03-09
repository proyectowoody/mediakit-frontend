import { useEffect, useState } from "react";
import { Modal } from "../../toast";
import { handleGetSup } from "../../../validation/admin/supplier/handleGet";
import { handleDelete } from "../../../validation/admin/supplier/handleDelete";
import { FaEdit, FaTrash } from "react-icons/fa";

function SupplierTable({ toggleModalAct, toggleModalImagen }: { toggleModalAct: () => void; toggleModalImagen: () => void }) {
    const [suppliers, setSuppliers] = useState<
        {
            id: number;
            nombre: string;
            descripcion: string;
            imagen: string;
        }[]
    >([]);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        handleGetSup()
            .then((data) => {
                setSuppliers(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState<{ id: number; nombre: string } | null>(null);

    const showModal = (id: number, nombre: string) => {
        setProveedorSeleccionado({ id, nombre });
        setIsModalVisible(true);
    };

    const handleEliminarProveedor = () => {
        if (proveedorSeleccionado !== null) {
            handleDelete(proveedorSeleccionado.id);
            setIsModalVisible(false);
        }
    };

    const handleActualizar = (id: number, nombre: string, descripcion: string) => {
        const supplier = { id, nombre, descripcion };
        localStorage.setItem("supplierseleccionado", JSON.stringify(supplier));
        toggleModalAct();
    };

    const handleImagen = (id: number, imagen: string) => {
        const categoria = { id, imagen };
        localStorage.setItem("imagenSupplier", JSON.stringify(categoria));
        toggleModalImagen();
    };

    const filteredSuppliers = suppliers.filter((sup) =>
        sup.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSuppliers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar proveedor..."
                    className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-800"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                />
            </div>

            {currentItems.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-center text-white">
                    <p className="text-lg">No hay proveedores para mostrar.</p>
                </div>
            ) : (
                <div>
                    <table className="w-full text-sm text-left text-[#4E6E5D]">
                        <thead className="text-xs uppercase bg-[#6E9475] text-[#FAF3E0]">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nombre</th>
                                <th scope="col" className="px-6 py-3">Descripción</th>
                                <th scope="col" className="px-6 py-3">Imagen</th>
                                <th scope="col" className="px-6 py-3">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((sup, index) => (
                                <tr key={index} className="border-b bg-[#FAF3E0] border-[#D4C9B0]">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-[#2F4F4F]">
                                        {sup.nombre}
                                    </th>
                                    <td className="px-6 py-4 text-[#4E6E5D]">{sup.descripcion.slice(0, 50)}...</td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={sup.imagen}
                                            alt="Imagen"
                                            className="w-12 h-12 rounded-full cursor-pointer border border-[#D4C9B0]"
                                            onClick={() => handleImagen(sup.id, sup.imagen)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 flex justify-center gap-6">
                                        <FaEdit
                                            size={24}
                                            className="text-green-500 cursor-pointer hover:text-green-700"
                                            onClick={() => handleActualizar(sup.id, sup.nombre, sup.descripcion)}
                                            title="Editar"
                                        />
                                        <FaTrash
                                            size={24}
                                            className="text-red-500 cursor-pointer hover:text-red-700"
                                            onClick={() => showModal(sup.id, sup.nombre)}
                                            title="Eliminar"
                                        />
                                    </td>
                                    <Modal
                                        onConfirm={handleEliminarProveedor}
                                        isVisible={isModalVisible}
                                        onClose={() => setIsModalVisible(false)}
                                        message={`¿Estás seguro de eliminar "${proveedorSeleccionado?.nombre}"?`}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SupplierTable;
