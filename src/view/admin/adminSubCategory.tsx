import SubCategoryForm from "../../components/admin/subcategory/subCategoryForm";
import SubCategoryHeader from "../../components/admin/subcategory/subCategoryHeader";
import SubCategoryTable from "../../components/admin/subcategory/subCategoryTable";
import User from "../../validation/admin/subcategory/user";
import authRedirectNoToken from "../../validation/autRedirectNoToken";

function SubCategoryAdmin() {

  authRedirectNoToken("/login");

  const { setId, setNombre, setCategoriaId, isOpen, setIsOpen, } = User();

  const toggleModal = () => {
    setId(0);
    setNombre("");
    setCategoriaId(0);
    setIsOpen(!isOpen);
    localStorage.removeItem("subcategoriaSeleccionado");
  };

  const toggleModalAct = () => {
    setId(0);
    setNombre("");
    setCategoriaId(0);
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <SubCategoryHeader toggleModal={toggleModal} />
      <SubCategoryTable toggleModalAct={toggleModalAct} />
      {isOpen && <SubCategoryForm toggleModal={toggleModal} />}
    </div>
  );
}

export default SubCategoryAdmin;
