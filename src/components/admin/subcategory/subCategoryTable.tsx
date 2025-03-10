import { useEffect, useState } from "react";
import { handleGet } from "../../../validation/admin/subcategory/handleGet";
import { Modal } from "../../toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { handleDelete } from "../../../validation/admin/subcategory/handleDelete";

function SubCategoryTable({ toggleModalAct }: { toggleModalAct: () => void;}) {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [subcategorias, setSubCategorias] = useState<
    {
      id: number;
      nombre: string;
      categoria:{
        id:number;
        nombre:string;
      }
    }[]
  >([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleGet()
      .then((data) => {
        setSubCategorias(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoriaSeleccionado, setCategoriaSeleccionado] = useState<{ id: number; nombre: string } | null>(null);

  const showModal = (id: number, nombre: string) => {
    setCategoriaSeleccionado({ id, nombre });
    setIsModalVisible(true);
  };

  const handleEliminarCategoria = () => {
    if (categoriaSeleccionado !== null) {
      handleDelete(categoriaSeleccionado.id);
      setIsModalVisible(false);
    }
  };

  const handleActualizar = (id: number, nombre: string, categoriaId: number) => {
    const categoria = { id, nombre, categoriaId };
    localStorage.setItem("subcategoriaSeleccionado", JSON.stringify(categoria));
    toggleModalAct();
  };

  const filteredCategories = subcategorias.filter((cat) =>
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar categoría..."
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>
      {currentItems.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-center text-white">
          <p className="text-lg">No hay sub-categorías para mostrar.</p>
        </div>
      ) : (
        <>
          <table className="w-full text-sm text-left text-[#4E6E5D]">
            <thead className="text-xs uppercase bg-[#6E9475] text-[#FAF3E0]">
              <tr>
                <th scope="col" className="px-6 py-3">Nombre</th>
                <th scope="col" className="px-6 py-3">Categoría</th>
                <th scope="col" className="px-6 py-3">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((cat, index) => (
                <tr key={index} className="border-b bg-[#FAF3E0] border-[#D4C9B0]">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-[#2F4F4F]">
                    {cat.nombre}
                  </th>
                  <td className="px-6 py-4 text-[#4E6E5D]">{cat.categoria.nombre}</td>
                  <td className="px-6 py-4 flex justify-center gap-6">
                    <FaEdit
                      size={24}
                      className="text-green-500 cursor-pointer hover:text-green-700"
                      onClick={() => handleActualizar(cat.id, cat.nombre, cat.categoria.id)}
                      title="Editar"
                    />
                    <FaTrash
                      size={24}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => showModal(cat.id, cat.nombre)}
                      title="Eliminar"
                    />
                  </td>
                  <Modal
                    onConfirm={handleEliminarCategoria}
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    message={`¿Estás seguro de eliminar "${categoriaSeleccionado?.nombre}"?`}
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
        </>
      )}
    </div>
  );
}

export default SubCategoryTable;
