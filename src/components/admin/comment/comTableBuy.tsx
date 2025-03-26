import { useEffect, useState } from "react";
import { Modal } from "../../toast";
import { FaTrash } from "react-icons/fa";
import { handleGetCommentBuy } from "../../../validation/comment/handleGet";
import { handleDeleteCommentBuy } from "../../../validation/comment/handleDelete";

function ComTableBuy() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const [comentarios, setComentarios] = useState<
        {
            id: number;
            descripcion: string;
            fecha: string
        }[]
    >([]);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchComentarios = () => {
            handleGetCommentBuy()
                .then((data) => setComentarios(data))
                .catch((error) => console.error(error));
        };

        fetchComentarios(); 

        const interval = setInterval(fetchComentarios, 1000); 

        return () => clearInterval(interval); 
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [comentarioSeleccionado, setComentarioSeleccionado] = useState<{ id: number; descripcion: string } | null>(null);

    const showModal = (id: number, descripcion: string) => {
        setComentarioSeleccionado({ id, descripcion });
        setIsModalVisible(true);
    };

    const handleEliminarComentario = () => {
        if (comentarioSeleccionado !== null) {
            handleDeleteCommentBuy(comentarioSeleccionado.id);
            setIsModalVisible(false);
        }
    };

    const filtered = comentarios.filter((com) =>
        com.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar comentario..."
                    className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-800"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                />
            </div>
            {currentItems.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-center text-white">
                    <p className="text-lg" data-translate>No hay comentarios para mostrar.</p>
                </div>
            ) : (
                <>
                    <table className="w-full text-sm text-left text-[#4E6E5D]">
                        <thead className="text-xs uppercase bg-[#6E9475] text-[#FAF3E0]">
                            <tr>
                                <th scope="col" className="px-6 py-3" data-translate>Comentario</th>
                                <th scope="col" className="px-6 py-3" data-translate>Fecha</th>
                                <th scope="col" className="px-6 py-3" data-translate>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((com) => (
                                <tr key={com.id} className="border-b bg-[#FAF3E0] border-[#D4C9B0]">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-[#2F4F4F]" data-translate>
                                        {com.descripcion.slice(0, 100)}...
                                    </th>
                                    <td className="px-6 py-4 text-[#4E6E5D]">
                                        {new Date(com.fecha).toLocaleDateString("es-ES")}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center gap-6">
                                        <FaTrash
                                            size={24}
                                            className="text-red-500 cursor-pointer hover:text-red-700"
                                            onClick={() => showModal(com.id, com.descripcion)}
                                            title="Eliminar"
                                        />
                                    </td>
                                    <Modal
                                        onConfirm={handleEliminarComentario}
                                        isVisible={isModalVisible}
                                        onClose={() => setIsModalVisible(false)}
                                        message={`¿Estás seguro de eliminar "${comentarioSeleccionado?.descripcion}"?`}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-center mt-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50" data-translate
                        >
                            Anterior
                        </button>
                        <span className="px-4 py-2"> <span data-translate>Página</span> {currentPage} de {totalPages}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50" data-translate
                        >
                            Siguiente
                        </button>
                    </div>

                </>
            )}
        </div>
    );
}

export default ComTableBuy;
