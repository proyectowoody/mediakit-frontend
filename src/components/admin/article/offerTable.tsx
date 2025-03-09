import { useEffect, useState } from "react";
import { Articulo, handleGetOfertas } from "../../../validation/admin/article/handleGet";
import { Modal } from "../../toast";
import { handleDeleteOffer } from "../../../validation/admin/article/handleDelete";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaTrash } from "react-icons/fa";

function OfferTable({
  toggleModalOffer,
}: {
  toggleModalOffer: () => void;
}) {

  const [search, setSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const [articulos, setArticulos] = useState<
    {
      id: number;
      nombre: string;
      descripcion: string;
      categoria: { id: number; nombre: string; descripcion: string };
      supplier: { id: number; nombre: string; descripcion: string };
      fecha: string;
      estado: string;
      imagen: string;
      precio: number;
      discount: number;
      imagenes: { id: number; url: string }[];
    }[]
  >([]);

  const [ofertaSeleccionado, setOfertaSeleccionado] = useState<{
    id: number;
    nombre: string;
    precio: number;
    discount: number;
  } | null>(null);

  const showModal = (id: number, nombre: string, precio: number, discount: number) => {
    setOfertaSeleccionado({ id, nombre, precio, discount });
    setIsModalVisible(true);
  };

  const handleEliminarOferta = () => {
    if (ofertaSeleccionado !== null) {
      handleDeleteOffer(ofertaSeleccionado.id);
      setIsModalVisible(false);
    }
  };

  useEffect(() => {
    handleGetOfertas()
      .then((data: Articulo[]) => {
        setArticulos(data);
        setCategories([...new Set(data.map((art) => art.categoria.nombre))]);
      })
      .catch(console.error);
  }, []);

  const formatFecha = (fecha: string): string => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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
    toggleModalOffer();
  };

  const filteredArticles = articulos.filter((article) =>
    article.nombre.toLowerCase().includes(search.toLowerCase()) &&
    (category ? article.categoria.nombre === category : true) &&
    (price > 0 ? article.precio <= price : true)
  );

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
          <option value="">Todas las categorías</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
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
      {currentItems.length === 0 ? (
        <p className="text-center text-white">No hay ofertas para mostrar.</p>
      ) : (
        <div>
          <table className="w-full text-sm text-left text-[#4E6E5D]">
            <thead className="text-xs uppercase bg-[#6E9475] text-[#FAF3E0]">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Descripción</th>
                <th className="px-6 py-3">Categoría</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Precio anterior</th>
                <th className="px-6 py-3">Proveedor</th>
                <th className="px-6 py-3">Precio actual</th>
                <th scope="col" className="px-6 py-3">Nuevo descuento</th>
                <th scope="col" className="px-6 py-3">Imágenes</th>
                <th scope="col" className="px-6 py-3">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((art, index) => (
                <tr key={index} className="border-b bg-[#FAF3E0] border-[#D4C9B0]">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-[#2F4F4F]">
                    {art.nombre}
                  </th>
                  <td className="px-6 py-4">{art.descripcion.slice(0, 50)}...</td>
                  <td className="px-6 py-4">{art.categoria.nombre}</td>
                  <td className="px-6 py-4">{formatFecha(art.fecha)}</td>
                  <td className="px-6 py-4">{art.estado}</td>
                  <td className="px-6 py-4">{art.precio} EUR</td>
                  <td className="px-6 py-4">{art.supplier.nombre}</td>
                  <td className="px-6 py-4">{art.discount} EUR</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="ml-8 font-medium text-blue-500 hover:underline"
                      onClick={() =>
                        handleOffer(
                          art.id,
                          art.precio
                        )
                      }
                    >
                      Agregar
                    </a>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
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
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <FaTrash
                      size={24}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => showModal(art.id, art.nombre, art.precio, art.discount)}
                      title="Eliminar"
                    />
                  </td>
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
      <Modal
        onConfirm={handleEliminarOferta}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        message={`¿Estás seguro de eliminar la oferta del producto "${ofertaSeleccionado?.nombre}"?\n\n
        - Precio anterior: ${ofertaSeleccionado?.precio} EUR\n
        - Precio con descuento: ${ofertaSeleccionado?.discount} EUR`}
      />
    </div>
  );
}

export default OfferTable;
