import { useEffect, useState } from "react";
import { handleGet } from "../../../validation/admin/article/handleGet";
import { Modal } from "../../toast";
import { handleDelete } from "../../../validation/admin/article/handleDelete";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ArticleTable({
  toggleModalAct,
  toggleModalImagen,
  toggleModalOffer,
}: {
  toggleModalAct: () => void;
  toggleModalImagen: () => void;
  toggleModalOffer: () => void;
}) {

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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState<number | null>(null);

  const showModal = (id?: number) => {
    if (id) {
      setArticuloSeleccionado(id);
    }
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    handleGet()
      .then((data) => {
        console.log(data);
        setArticulos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      supplier
    };
    localStorage.setItem("articuloSeleccionado", JSON.stringify(articulo));
    toggleModalAct();
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

  const handleImagen = (id: number, imagen: string) => {
    const articulo = { id, imagen };
    localStorage.setItem("imagenSeleccionado", JSON.stringify(articulo));
    toggleModalImagen();
  };

  const formatFecha = (fecha: string): string => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleEliminarArticulo = () => {
    if (articuloSeleccionado !== null) {
      handleDelete(articuloSeleccionado);
      setIsModalVisible(false);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {articulos.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-center text-white">
          <p className="text-lg">No hay artículos para mostrar.</p>
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
                Categoría
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                Proveedor
              </th>
              <th scope="col" className="px-6 py-3">
                Agregar a oferta
              </th>
              <th scope="col" className="px-6 py-3">
                Imágenes
              </th>
              <th scope="col" className="px-6 py-3">
                Actualizar
              </th>
            </tr>
          </thead>
          <tbody>
            {articulos.map((art, index) => (
              <tr key={index} className="border-b bg-[#FAF3E0] border-[#D4C9B0]">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-[#2F4F4F]"
                >
                  {art.nombre}
                </th>
                <td className="px-6 py-4">{art.descripcion.slice(0, 50)}...</td>
                <td className="px-6 py-4">{art.categoria.nombre}</td>
                <td className="px-6 py-4">{formatFecha(art.fecha)}</td>
                <td className="px-6 py-4">{art.estado}</td>
                <td className="px-6 py-4">{art.precio}</td>
                <td className="px-6 py-4">{art.supplier.nombre}</td>
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
                              onClick={() => handleImagen(art.id, imagen.url)}
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
                            onClick={() => handleImagen(art.id, imagen.url)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-[#6E9475] hover:underline"
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
                        art.supplier.id
                      )
                    }
                  >
                    Actualizar
                  </a>
                  <a
                    href="#"
                    onClick={() => showModal(art.id)}
                    className="ml-8 font-medium text-red-500 hover:underline"
                  >
                    Eliminar
                  </a>
                  <Modal
                    onConfirm={handleEliminarArticulo}
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    message="¿Estás seguro de eliminar el artículo?"
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

export default ArticleTable;
