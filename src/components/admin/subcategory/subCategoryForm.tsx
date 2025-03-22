import { useEffect, useState } from "react";
import Message from "../../message";
import User from "../../../validation/admin/subcategory/user";
import { handleGet } from "../../../validation/admin/category/handleGet";
import Handle from "../../../validation/admin/subcategory/handle";

function SubCategoryForm() {

  const { id, setId, nombre, setNombre, categoriaId, setCategoriaId } = User();

  const [categorias, setCategorias] = useState<
    { id: number; nombre: string; }[]
  >([]);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    handleGet()
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const categoriaSeleccionada = localStorage.getItem("subcategoriaSeleccionado");
    if (categoriaSeleccionada) {
      const categoria = JSON.parse(categoriaSeleccionada);
      setId(categoria.id || "");
      setNombre(categoria.nombre || "");
      setCategoriaId(categoria.categoriaId || "");
      setIsEditing(true);
    }
  }, []);

  const { handleSubmitForm, isLoading } = Handle(id, nombre, categoriaId);

  return (
    <div className="mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative">
      <div className="absolute top-6 right-6">
        <a className="text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5" href="/subcategorias" data-translate>
          Regresar
        </a>
      </div>
      <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-[#2F4F4F]" data-translate>
          {isEditing ? "Actualizar subcategoría" : "Crear subcategoría"}
        </h3>
        <Message />
        <form className="space-y-6" onSubmit={handleSubmitForm}>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>Nombre</label>
              <input
                type="text"
                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5 placeholder-[#D4C9B0]"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>Categoría</label>
            <select
              className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5 placeholder-[#D4C9B0]"
              value={categoriaId}
              onChange={(e) => setCategoriaId(Number(e.target.value))}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="mb-10 mt-5 w-full text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isLoading} data-translate
            >
              {isLoading ? (isEditing ? "Actualizando..." : "Agregando...") : (isEditing ? "Actualizar" : "Agregar")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubCategoryForm;
