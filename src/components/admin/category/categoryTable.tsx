import { useEffect, useState } from "react";
import { handleGet } from "../../../validation/admin/category/handleGet";
import { Modal } from "../../toast";
import { handleDelete } from "../../../validation/admin/category/handleDelete";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CategoryTable({ toggleModalImagen }: { toggleModalImagen: () => void }) {

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 3;
  const [categorias, setCategorias] = useState<
    {
      id: number;
      nombre: string;
      descripcion: string;
      imagen: string;
    }[]
  >([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleGet()
      .then((data) => {
        setCategorias(data);
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

  const handleActualizar = (id: number, nombre: string, descripcion: string, imagen: string) => {
    const categoria = { id, nombre, descripcion, imagen };
    localStorage.setItem("categoriaSeleccionado", JSON.stringify(categoria));
    navigate('/form-categorias')
  };

  const handleImagen = (imagen: string) => {
    const categoria = { imagen };
    localStorage.setItem("imagenSeleccionado", JSON.stringify(categoria));
    toggleModalImagen();
  };

  const filteredCategories = categorias.filter((cat) =>
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
          <p className="text-lg" data-translate>No hay categorías para mostrar.</p>
        </div>
      ) : (
        <>
          <table className="w-full text-sm text-left text-[#4E6E5D]">
            <thead className="text-xs uppercase bg-[#6E9475] text-[#FAF3E0]">
              <tr>
                <th scope="col" className="px-6 py-3" data-translate>Nombre</th>
                <th scope="col" className="px-6 py-3" data-translate>Descripción</th>
                <th scope="col" className="px-6 py-3" data-translate>Imagen</th>
                <th scope="col" className="px-6 py-3" data-translate>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((cat) => (
                <tr key={cat.id} className="border-b bg-[#FAF3E0] border-[#D4C9B0]">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-[#2F4F4F]" data-translate>
                    {cat.nombre}
                  </th>
                  <td className="px-6 py-4 text-[#4E6E5D]" data-translate>{cat.descripcion.slice(0, 50)}...</td>
                  <td className="px-6 py-4">
                    <img
                      src={cat.imagen}
                      alt="Imagen"
                      className="w-12 h-12 rounded-full cursor-pointer border border-[#D4C9B0]"
                      onClick={() => handleImagen(cat.imagen)}
                    />
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-6">
                    <FaEdit
                      size={24}
                      className="text-green-500 cursor-pointer hover:text-green-700"
                      onClick={() => handleActualizar(cat.id, cat.nombre, cat.descripcion, cat.imagen)}
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

export default CategoryTable;
