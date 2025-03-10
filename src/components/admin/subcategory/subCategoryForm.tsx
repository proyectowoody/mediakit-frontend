import { useEffect, useState } from "react";
import Message from "../../message";
import User from "../../../validation/admin/subcategory/user";
import { handleGet } from "../../../validation/admin/category/handleGet";
import Handle from "../../../validation/admin/subcategory/handle";

function SubCategoryForm({ toggleModal }: any) {

  const { id, setId, nombre, setNombre, categoriaId, setCategoriaId, isOpen,} = User();

  const [categorias, setCategorias] = useState<
    { id: number; nombre: string; }[]
  >([]);

  useEffect(() => {
    handleGet()
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { handleSubmitForm, isLoading } = Handle(id, nombre, categoriaId);

  useEffect(() => {
    if (toggleModal) {
      const categoriaSeleccionada = localStorage.getItem("subcategoriaSeleccionado");
      if (categoriaSeleccionada) {
        const categoria = JSON.parse(categoriaSeleccionada);
        setId(categoria.id || "");
        setNombre(categoria.nombre || "");
        setCategoriaId(categoria.categoriaId || "");
      }
    }
  }, [toggleModal]);

  const handleClose = () => {
    localStorage.removeItem("subcategoriaSeleccionada");
    toggleModal();
  };

  return (
    <div
      id="authentication-modal"
      className="bg-[#FAF3E0] bg-opacity-50 formPer fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
      aria-hidden={!isOpen}
    >
      <div className="relative w-full max-w-md max-h-full" aria-hidden={!isOpen}>
        <div className="relative bg-[#FAF3E0] rounded-lg shadow-lg">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-[#2F4F4F] bg-transparent hover:bg-[#D4C9B0] hover:text-[#2F4F4F] rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            data-modal-hide="authentication-modal"
            onClick={handleClose}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Cerrar</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-[#2F4F4F]">Subcategorías</h3>
            <Message />
            <form className="space-y-6" onSubmit={handleSubmitForm}>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium text-[#2F4F4F]">Nombre</label>
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
                <label className="block mb-2 text-sm font-medium text-[#2F4F4F]">Categoría</label>
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
                  disabled={isLoading}
                >
                  {isLoading ? "Agregando..." : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubCategoryForm;
