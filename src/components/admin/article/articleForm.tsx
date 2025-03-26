import { useEffect, useRef, useState } from "react";
import { handleGet } from "../../../validation/admin/category/handleGet";
import User from "../../../validation/admin/article/user";
import Message from "../../message";
import { handleGetSup } from "../../../validation/admin/supplier/handleGet";
import { Handle } from "../../../validation/admin/article/handle";
import { handleDeleteImage } from "../../../validation/admin/article/handleSubmit";

function ArticleForm() {

  const [imagen, setImagen] = useState<(string | File)[]>([]);

  const { id, setId, nombre, setNombre, descripcion, setDescripcion, categoria,
    setCategoria, estado, setEstado, precio, setPrecio,
    supplier, setSupplier } = User();

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const articuloSeleccionado = localStorage.getItem("articuloSeleccionado");
    if (articuloSeleccionado) {
      const articulo = JSON.parse(articuloSeleccionado);

      setId(articulo.id || "");
      setNombre(articulo.nombre || "");
      setCategoria(articulo.categoria || "");
      setEstado(articulo.estado || "");
      setDescripcion(articulo.descripcion || "");
      setPrecio(articulo.precio || 0);
      setSupplier(articulo.supplier || "");

      let imagenesLocales: (string | File)[] = [];

      if (Array.isArray(articulo.imagenes)) {
        imagenesLocales = articulo.imagenes;
      } else if (typeof articulo.imagen === "string" && articulo.imagen.trim() !== "") {
        imagenesLocales = [articulo.imagen];
      }

      setImagen(prev => [...imagenesLocales, ...prev.filter(img => img instanceof File)]);
      setPreviewUrls(imagenesLocales.map(img => (typeof img === "string" ? img : URL.createObjectURL(img))));

      setIsEditing(true);
    }
  }, []);

  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);
  const [suppliers, setSuppliers] = useState<{ id: number; nombre: string }[]>([]);

  useEffect(() => {
    handleGet().then(setCategorias).catch(console.error);
    handleGetSup().then(setSuppliers).catch(console.error);
  }, []);

  const removeImage = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();

    const imagenEliminada = previewUrls[index];

    handleDeleteImage(imagenEliminada);

    const nuevasImagenes = imagen.filter((_, i) => i !== index);
    const nuevasPreviews = previewUrls.filter((_, i) => i !== index);

    if (typeof previewUrls[index] === "string" && previewUrls[index].startsWith("blob:")) {
      URL.revokeObjectURL(previewUrls[index]);
    }

    setImagen(nuevasImagenes);
    setPreviewUrls(nuevasPreviews);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (nuevasImagenes.some(img => img instanceof File)) {
      const dataTransfer = new DataTransfer();
      nuevasImagenes.forEach(img => {
        if (img instanceof File) {
          dataTransfer.items.add(img);
        }
      });

      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (filesArray.length === 0) return;

      setImagen(prev => [...prev, ...filesArray]);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  const imagenesFile = [...new Set(imagen.filter(img => img instanceof File) as File[])];

  const { handleSubmitForm, isLoading } = Handle(id, nombre, categoria, estado, descripcion,
    precio, supplier, imagenesFile);

  return (
    <div className="mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative p-6">
      <div className="absolute top-6 right-6">
        <a className="text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5" href="/articulos" data-translate>
          Regresar
        </a>
      </div>
      <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-[#2F4F4F]" data-translate>
          {isEditing ? "Actualizar artículo" : "Crear artículo"}
        </h3>
        <Message />
        <form className="space-y-6" onSubmit={handleSubmitForm}>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                Nombre
              </label>
              <input
                type="text"
                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5 placeholder-[#D4C9B0]"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                Categoría
              </label>
              <select
                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5"
                value={categoria}
                onChange={(e) =>
                  setCategoria(
                    e.target.value ? parseInt(e.target.value, 10) : ""
                  )
                }
              >
                <option value="" disabled data-translate>
                  Selecciona una categoría
                </option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                Estado
              </label>
              <select
                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="" disabled data-translate>
                  Selecciona el estado
                </option>
                <option value="Nuevo" data-translate>Nuevo</option>
                <option value="Semi-nuevo" data-translate>Semi-nuevo</option>
                <option value="Usado" data-translate>Usado</option>
                <option value="Reacondicionado" data-translate>Reacondicionado</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                Precio eur
              </label>
              <input
                type="text"
                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5 placeholder-[#D4C9B0]"
                value={precio}
                onChange={(e) => setPrecio(Number(e.target.value))}
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                Proveedor
              </label>
              <select
                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5"
                value={supplier}
                onChange={(e) =>
                  setSupplier(
                    e.target.value ? parseInt(e.target.value, 10) : ""
                  )
                }
              >
                <option value="" disabled data-translate>
                  Selecciona un proveedor
                </option>
                {suppliers.map((sup) => (
                  <option key={sup.id} value={sup.id} data-translate>
                    {sup.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
              Descripción
            </label>
            <textarea
              placeholder="Descripción"
              className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5 placeholder-[#D4C9B0]"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>

          <div className="mt-8">
            <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
              Imágenes seleccionadas
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img src={url} alt={`Imagen ${index}`} className="w-full h-32 object-cover rounded-lg border border-[#D4C9B0]" />
                  <button
                    type="button"
                    onClick={(event) => removeImage(event, index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="mt-4 bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full h-12 p-2.5 text-center"
            onChange={handleImageChange}
          />
          <div>
            <button
              type="submit"
              className="mb-10 mt-5 w-full text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isLoading} data-translate
            >
              {isLoading ? "Agregando..." : "Agregar"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ArticleForm;





