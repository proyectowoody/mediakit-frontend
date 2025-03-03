import { useEffect, useState } from "react";
import { handleGetOfertas } from "../../../validation/admin/article/handleGet";
import { Modal } from "../../toast";
import { handleDeleteOffer } from "../../../validation/admin/article/handleDelete";

function OfferTable() {

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
      discount:number;
      imagenes: { id: number; url: string }[];
    }[]
  >([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ofertaSeleccionado, setOfertaSeleccionado] = useState<number | null>(null);

  const showModal = (id?: number) => {
    if (id) {
      setOfertaSeleccionado(id);
    }
    setIsModalVisible(!isModalVisible);
  };

  const handleEliminarOferta = () => {
      if (ofertaSeleccionado !== null) {
        handleDeleteOffer(ofertaSeleccionado);
        setIsModalVisible(false);
      }
    };

  useEffect(() => {
    handleGetOfertas()
      .then((data) => {
        setArticulos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formatFecha = (fecha: string): string => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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
                Descuento
              </th>
              <th scope="col" className="px-6 py-3">
                Imágenes
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
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
                <td className="px-6 py-4">{art.discount}</td>
                <td className="px-6 py-4 flex gap-2">
                  {art.imagenes.map((imagen) => (
                    <img
                      key={imagen.id}
                      src={imagen.url}
                      alt={`Imagen ${imagen.id}`}
                      className="w-12 h-12 rounded cursor-pointer border border-[#D4C9B0]"
                    />
                  ))}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    onClick={() => showModal(art.id)}
                    className="ml-8 font-medium text-red-500 hover:underline"
                  >
                    Eliminar
                  </a>
                  <Modal
                    onConfirm={handleEliminarOferta}
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    message="¿Estás seguro de eliminar el artículo de oferta?"
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

export default OfferTable;
