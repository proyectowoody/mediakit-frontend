import CategoryForm from "../../../components/admin/category/categoryForm";
import CategoryHeader from "../../../components/admin/category/categoryHeader";
import CategoryTable from "../../../components/admin/category/categoryTable";
import User from "../../../validation/admin/category/user";
import authRedirectNoToken from "../../../validation/autRedirectNoToken";

function CategoryAdmin() {
  authRedirectNoToken("/login");

  const { setId, setNombre, setDescripcion, isOpen, setIsOpen } = User();

  const toggleModal = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setIsOpen(!isOpen);
    localStorage.removeItem("categoriaSeleccionado");
  };

  const toggleModalAct = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <CategoryHeader toggleModal={toggleModal} />
      <CategoryTable toggleModalAct={toggleModalAct} />
      {isOpen && <CategoryForm toggleModal={toggleModal} />}
    </div>
  );
}

export default CategoryAdmin;
