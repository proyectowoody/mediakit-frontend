import { useEffect, useState } from "react";
import { Modal } from "../../toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { handleGet } from "../../../validation/admin/discount/handleGet";
import { handleDelete } from "../../../validation/admin/discount/handleDelete";

function DiscountTable() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  const [descuentos, setDescuentos] = useState<
    {
      id: number;
      codigo: string;
      descuento:number;
    }[]
  >([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleGet()
      .then((data) => {
        setDescuentos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [descuentoSeleccionado, setDescuentoSeleccionado] = useState<{ id: number; nombre: string } | null>(null);

  const showModal = (id: number, nombre: string) => {
    setDescuentoSeleccionado({ id, nombre });
    setIsModalVisible(true);
  };

  const handleEliminarDescuento = () => {
    if (descuentoSeleccionado !== null) {
      handleDelete(descuentoSeleccionado.id);
      setIsModalVisible(false);
    }
  };

  const handleActualizar = (id: number, codigo: string, descuento: number) => {
    const descuentos = { id, codigo, descuento };
    localStorage.setItem("descuentoSeleccionado", JSON.stringify(descuentos));
    navigate('/form-descuento');
  };

  const filteredDescuento = descuentos.filter((cat) =>
    cat.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDescuento.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredDescuento.length / itemsPerPage);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar descuento..."
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>
      {currentItems.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-center text-white">
          <p className="text-lg" data-translate>No hay descuentos para mostrar.</p>
        </div>
      ) : (
        <>
          <table className="w-full text-sm text-left text-[#4E6E5D]">
            <thead className="text-xs uppercase bg-[#6E9475] text-[#FAF3E0]">
              <tr>
                <th scope="col" className="px-6 py-3" data-translate>Código</th>
                <th scope="col" className="px-6 py-3" data-translate>Descuentos</th>
                <th scope="col" className="px-6 py-3" data-translate>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((des) => (
                <tr key={des.id} className="border-b bg-[#FAF3E0] border-[#D4C9B0]">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-[#2F4F4F]" data-translate>
                    {des.codigo}
                  </th>
                  <td className="px-6 py-4 text-[#4E6E5D]" data-translate>{des.descuento} %</td>
                  <td className="px-6 py-4 flex justify-center gap-6">
                    <FaEdit
                      size={24}
                      className="text-green-500 cursor-pointer hover:text-green-700"
                      onClick={() => handleActualizar(des.id, des.codigo, des.descuento)}
                      title="Editar"
                    />
                    <FaTrash
                      size={24}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => showModal(des.id, des.codigo)}
                      title="Eliminar"
                    />
                  </td>
                  <Modal
                    onConfirm={handleEliminarDescuento}
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    message={`¿Estás seguro de eliminar "${descuentoSeleccionado?.nombre}"?`}
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

export default DiscountTable;
