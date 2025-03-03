import { useEffect, useState } from "react";
import { Modal } from "../../toast";
import { handleGetSup } from "../../../validation/admin/supplier/handleGet";
import { handleDelete } from "../../../validation/admin/supplier/handleDelete";

function SupplierTable({ toggleModalAct, toggleModalImagen, }: { toggleModalAct: () => void, toggleModalImagen: () => void; }) {

    const [suppliers, setsuppliers] = useState<
        {
            id: number;
            nombre: string;
            descripcion: string;
            imagen: string;
        }[]
    >([]);

    useEffect(() => {
        handleGetSup()
            .then((data) => {
                setsuppliers(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState<number | null>(null);

    const showModal = (id?: number) => {
        if (id) {
            setProveedorSeleccionado(id);
        }
        setIsModalVisible(!isModalVisible);
    };

    const handleEliminarProveedor = () => {
        if (proveedorSeleccionado !== null) {
          handleDelete(proveedorSeleccionado);
          setIsModalVisible(false);
        }
      };

    const handleActualizar = (
        id: number,
        nombre: string,
        descripcion: string
    ) => {
        const supplier = { id, nombre, descripcion };
        localStorage.setItem("supplierseleccionado", JSON.stringify(supplier));
        toggleModalAct();
    };

    const handleImagen = (id: number, imagen: string) => {
        const categoria = { id, imagen };
        localStorage.setItem("imagenSupplier", JSON.stringify(categoria));
        toggleModalImagen();
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {suppliers.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-center text-white ">
                    <p className="text-lg">No hay proveedores para mostrar.</p>
                </div>
            ) : (
                <table className="w-full text-sm text-left text-[#4E6E5D]">
                    <thead className="text-xs uppercase bg-[#6E9475] text-[#FAF3E0]">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descripción
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Imagen
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((sup, index) => (
                            <tr key={index} className="border-b bg-[#FAF3E0] border-[#D4C9B0]">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap text-[#2F4F4F]"
                                >
                                    {sup.nombre}
                                </th>
                                <td className="px-6 py-4 text-[#4E6E5D]">
                                    {sup.descripcion.slice(0, 50)}...
                                </td>
                                <td className="px-6 py-4">
                                    <img
                                        src={sup.imagen}
                                        alt="Imagen"
                                        className="w-12 h-12 rounded-full cursor-pointer border border-[#D4C9B0]"
                                        onClick={() => handleImagen(sup.id, sup.imagen)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-[#6E9475] hover:underline"
                                        onClick={() =>
                                            handleActualizar(sup.id, sup.nombre, sup.descripcion)
                                        }
                                    >
                                        Actualizar
                                    </a>
                                    <a
                                        href="#"
                                        onClick={() => showModal(sup.id)}
                                        className="ml-8 font-medium text-red-500 hover:underline"
                                    >
                                        Eliminar
                                    </a>
                                    <Modal
                                        onConfirm={handleEliminarProveedor}
                                        isVisible={isModalVisible}
                                        onClose={() => setIsModalVisible(false)}
                                        message="¿Estás seguro de eliminar el proveedor?"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SupplierTable;
