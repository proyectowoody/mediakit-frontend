import SupplierForm from "../../../components/admin/supplier/supplierForm";
import SupplierFormImage from "../../../components/admin/supplier/supplierFormImage";
import SupplierHeader from "../../../components/admin/supplier/supplierHeader";
import SupplierTable from "../../../components/admin/supplier/supplierTable";
import User from "../../../validation/admin/supplier/user";
import authRedirectNoToken from "../../../validation/autRedirectNoToken";


function SupplierAdmin() {
  authRedirectNoToken("/login");

  const { setId, setNombre, setDescripcion, isOpen, setIsOpen, isOpenImg, setIsOpenImg } = User();

  const toggleModal = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setIsOpen(!isOpen);
    localStorage.removeItem("supplierSeleccionado");
  };

  const toggleModalAct = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setIsOpen(!isOpen);
  };

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <SupplierHeader toggleModal={toggleModal} />
      <SupplierTable toggleModalAct={toggleModalAct} toggleModalImagen={toggleModalImagen} />
      {isOpen && <SupplierForm toggleModal={toggleModal} />}
      {isOpenImg && (
        <SupplierFormImage toggleModalImagen={toggleModalImagen} />
      )}
    </div>
  );
}

export default SupplierAdmin;
