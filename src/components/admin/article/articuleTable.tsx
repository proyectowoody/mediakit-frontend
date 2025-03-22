import { useEffect, useState } from "react";
import { handleGet } from "../../../validation/admin/article/handleGet";
import { Modal } from "../../toast";
import { handleDelete } from "../../../validation/admin/article/handleDelete";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ArticleTable({
  toggleModalImagen,
}: {
  toggleModalImagen: () => void;
}) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState<{ id: number; nombre: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const [articulos, setArticulos] = useState<
    {
      id: number;
      nombre: string;
      descripcion: string;
      categoria: {
        id: number;
        nombre: string;
        descripcion: string;
      };
      supplier: {
        id: number;
        nombre: string;
        descripcion: string;
      };
      fecha: string;
      estado: string;
      imagen: string;
      precio: number;
      imagenes: { id: number; url: string }[];
    }[]
  >([]);

  const showModal = (id: number, nombre: string) => {
    setArticuloSeleccionado({ id, nombre });
    setIsModalVisible(true);
  };

  const handleEliminarArticulo = () => {
    if (articuloSeleccionado !== null) {
      handleDelete(articuloSeleccionado.id);
      setIsModalVisible(false);
    }
  };

  useEffect(() => {
    handleGet()
      .then((data) => {
        setArticulos(data);
        setCategories([...new Set(data.map((art) => art.categoria.nombre))]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);


  const lowerCaseSearch = search.toLowerCase();
  const filteredArticles = articulos.filter(article =>
    article.nombre.toLowerCase().includes(lowerCaseSearch) &&
    (category ? article.categoria.nombre === category : true) &&
    (price > 0 ? article.precio <= price : true)
  );

  const handleActualizar = (
    id: number,
    nombre: string,
    categoria: string | number,
    estado: string,
    fecha: string,
    imagen: string,
    descripcion: string,
    precio: number,
    supplier: string | number,
    imagenes: { id: number; url: string }[]
  ) => {
    const articulo = {
      id,
      nombre,
      categoria,
      estado,
      fecha,
      imagen,
      descripcion,
      precio,
      supplier,
      imagenes: imagenes.map(img => img.url)
    };

    localStorage.setItem("articuloSeleccionado", JSON.stringify(articulo));
    navigate('/form-articulos');
  };


  const handleOffer = (
    id: number,
    precio: number,
  ) => {
    const offer = {
      id,
      precio,
    };
    localStorage.setItem("articuloOfferSeleccionado", JSON.stringify(offer));
    navigate('/form-articulo-descuento');
  };

  const handleImagen = (imagen: string) => {
    const articulo = { imagen };
    localStorage.setItem("imagenSeleccionado", JSON.stringify(articulo));
    toggleModalImagen();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Buscar artículo..."
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" data-translate>Todas las categorías</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Máximo precio"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-800"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      {isLoading ? (
        <p className="text-center" data-translate>Cargando artículos...</p>
      ) : (
        <>
          <table className="w-full text-sm text-left text-[#4E6E5D]">
            <thead className="text-xs uppercase bg-[#6E9475] text-[#FAF3E0]">
              <tr>
                <th scope="col" className="px-6 py-3" data-translate>Nombre</th>
                <th scope="col" className="px-6 py-3" data-translate>Descripción</th>
                <th scope="col" className="px-6 py-3" data-translate>Categoría </th>
                <th scope="col" className="px-6 py-3" data-translate>Fecha</th>
                <th scope="col" className="px-6 py-3" data-translate>Estado</th>
                <th scope="col" className="px-6 py-3" data-translate>Precio</th>
                <th scope="col" className="px-6 py-3" data-translate>Proveedor</th>
                <th scope="col" className="px-6 py-3" data-translate>Agregar a oferta</th>
                <th scope="col" className="px-6 py-3" data-translate>Imágenes</th>
                <th scope="col" className="px-6 py-3" data-translate>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((art) => (
                <tr key={art.id} className="border-b bg-[#FAF3E0] border-[#D4C9B0]">
                  <th className="px-6 py-4 font-medium whitespace-nowrap text-[#2F4F4F]" data-translate>{art.nombre}</th>
                  <td className="px-6 py-4" data-translate>{art.descripcion.slice(0, 50)}...</td>
                  <td className="px-6 py-4" data-translate>{art.categoria.nombre}</td>
                  <td className="px-6 py-4" data-translate>{new Date(art.fecha).toLocaleDateString("es-ES")}</td>
                  <td className="px-6 py-4" data-translate>{art.estado}</td>
                  <td className="px-6 py-4">{art.precio} eur</td>
                  <td className="px-6 py-4" data-translate>{art.supplier.nombre}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="ml-8 font-medium text-blue-500 hover:underline"
                      onClick={() =>
                        handleOffer(
                          art.id,
                          art.precio
                        )
                      } data-translate
                    >
                      Agregar
                    </a>
                  </td>

                  <td className="px-6 py-4">
                    <div className="w-32">
                      {art.imagenes.length > 2 ? (
                        <Slider
                          dots={false}
                          infinite={true}
                          speed={500}
                          slidesToShow={Math.min(art.imagenes.length, 3)}
                          slidesToScroll={1}
                          arrows={true}
                        >
                          {art.imagenes.map((imagen) => (
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
                          {art.imagenes.map((imagen) => (
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
                          art.id,
                          art.nombre,
                          art.categoria.id,
                          art.estado,
                          art.fecha,
                          art.imagen,
                          art.descripcion,
                          art.precio,
                          art.supplier.id,
                          art.imagenes
                        )
                      }
                      title="Editar"
                    />
                    <FaTrash
                      size={24}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => showModal(art.id, art.nombre)}
                      title="Eliminar"
                    />
                  </td>

                  <Modal
                    onConfirm={handleEliminarArticulo}
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    message={`¿Estás seguro de eliminar "${articuloSeleccionado?.nombre}"?`}
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

export default ArticleTable;


