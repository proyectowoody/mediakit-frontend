import { useEffect, useState } from "react";
import { Modal } from "../../toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { handleDelete } from "../../../validation/admin/blogAdmin/handleDelete";
import { handleGet } from "../../../validation/admin/blogAdmin/handleGet";

function BlogTable({
  toggleModalImagen,
}: {
  toggleModalImagen: () => void;
}) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blogSeleccionado, setBlogSeleccionado] = useState<{ id: number; nombre: string } | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const navigate = useNavigate();

  const [blog, setBlog] = useState<
    {
      id: number;
      titulo: string;
      descripcion: string;
      categoria: string;
      slug: string;
      contenido: string;
      imagenes: { id: number; url: string }[];
    }[]
  >([]);

  const showModal = (id: number, nombre: string) => {
    setBlogSeleccionado({ id, nombre });
    setIsModalVisible(true);
  };

  const handleEliminarBlog = () => {
    if (blogSeleccionado !== null) {
      handleDelete(blogSeleccionado.id);
      setIsModalVisible(false);
    }
  };

  useEffect(() => {
    handleGet()
      .then((data) => {
        setBlog(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleActualizar = (
    id: number,
    titulo: string,
    descripcion: string,
    slug: string,
    categoria: string,
    contenido: string,
    imagenes: { id: number; url: string }[]
  ) => {
    const articulo = {
      id,
      titulo,
      descripcion,
      slug,
      categoria,
      contenido,
      imagenes: imagenes.map(img => img.url)
    };

    localStorage.setItem("blogSeleccionado", JSON.stringify(articulo));
    navigate('/form-blog');
  };


  const handleImagen = (imagen: string) => {
    const articulo = { imagen };
    localStorage.setItem("imagenSeleccionado", JSON.stringify(articulo));
    toggleModalImagen();
  };

  const filteredCategories = blog.filter((blog) =>
    blog.titulo.toLowerCase().includes(searchTerm.toLowerCase())
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
          placeholder="Buscar blog..."
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>

      {currentItems.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-center text-white">
          <p className="text-lg" data-translate>No hay blog para mostrar.</p>
        </div>
      ) : (
        <>
          <table className="w-full text-sm text-left text-[#4E6E5D]">
            <thead className="text-xs uppercase bg-[#6E9475] text-[#FAF3E0]">
              <tr>
                <th scope="col" className="px-6 py-3" data-translate>Titulo</th>
                <th scope="col" className="px-6 py-3" data-translate>Descripción</th>
                <th scope="col" className="px-6 py-3" data-translate>Slug</th>
                <th scope="col" className="px-6 py-3" data-translate>Categoría</th>
                <th scope="col" className="px-6 py-3" data-translate>Contenido</th>
                <th scope="col" className="px-6 py-3" data-translate>Imágenes</th>
                <th scope="col" className="px-6 py-3" data-translate>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((blog) => (
                <tr key={blog.id} className="border-b bg-[#FAF3E0] border-[#D4C9B0]">
                  <th className="px-6 py-4 font-medium whitespace-nowrap text-[#2F4F4F]" data-translate>{blog.titulo}</th>
                  <td className="px-6 py-4" data-translate>{blog.descripcion.slice(0, 50)}...</td>
                  <td className="px-6 py-4" data-translate>{blog.slug}</td>
                  <td className="px-6 py-4" data-translate>{blog.categoria}</td>
                  <td className="px-6 py-4" data-translate>{blog.contenido.slice(0, 50)}...</td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                      {blog.imagenes.length > 2 ? (
                        <Slider
                          dots={false}
                          infinite={true}
                          speed={500}
                          slidesToShow={Math.min(blog.imagenes.length, 3)}
                          slidesToScroll={1}
                          arrows={true}
                        >
                          {blog.imagenes.map((imagen) => (
                            <div key={imagen.id}>
                              <img
                                src={imagen.url}
                                alt={`Imagen ${imagen.id}`}
                                className="w-12 h-12 rounded cursor-pointer border border-[#D4C9B0]"
                                onClick={() => handleImagen(imagen.url)}
                              />
                            </div>
                          ))}
                        </Slider>
                      ) : (
                        <div className="flex gap-2">
                          {blog.imagenes.map((imagen) => (
                            <img
                              key={imagen.id}
                              src={imagen.url}
                              alt={`Imagen ${imagen.id}`}
                              className="w-12 h-12 rounded cursor-pointer border border-[#D4C9B0]"
                              onClick={() => handleImagen(imagen.url)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-6">
                    <FaEdit
                      size={24}
                      className="text-green-500 cursor-pointer hover:text-green-700"
                      onClick={() =>
                        handleActualizar(
                          blog.id,
                          blog.titulo,
                          blog.descripcion,
                          blog.slug,
                          blog.categoria,
                          blog.contenido,
                          blog.imagenes
                        )
                      }
                      title="Editar"
                    />
                    <FaTrash
                      size={24}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => showModal(blog.id, blog.titulo)}
                      title="Eliminar"
                    />
                  </td>

                  <Modal
                    onConfirm={handleEliminarBlog}
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    message={`¿Estás seguro de eliminar "${blogSeleccionado?.nombre}"?`}
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
            <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
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

export default BlogTable;


