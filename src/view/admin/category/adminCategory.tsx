import CategoryHeader from "../../../components/admin/category/categoryHeader";
import CategoryTable from "../../../components/admin/category/categoryTable";
import FormImage from "../../../components/formImage";
import User from "../../../validation/admin/category/user";

function CategoryAdmin() {
  
  const { isOpenImg, setIsOpenImg } = User();

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <CategoryHeader/>
      <CategoryTable toggleModalImagen={toggleModalImagen} />
      {isOpenImg && (
        <FormImage toggleModalImagen={toggleModalImagen} />
      )}
    </div>
  );
}

export default CategoryAdmin;
