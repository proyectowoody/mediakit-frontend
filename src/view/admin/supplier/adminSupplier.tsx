import SupplierHeader from "../../../components/admin/supplier/supplierHeader";
import SupplierTable from "../../../components/admin/supplier/supplierTable";
import FormImage from "../../../components/formImage";
import User from "../../../validation/admin/supplier/user";


function SupplierAdmin() {

  const {  isOpenImg, setIsOpenImg } = User();

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <SupplierHeader/>
      <SupplierTable toggleModalImagen={toggleModalImagen} />
      {isOpenImg && (
        <FormImage toggleModalImagen={toggleModalImagen} />
      )}
    </div>
  );
}

export default SupplierAdmin;
