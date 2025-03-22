import OfferHeader from "../../../components/admin/article/offerHeader";
import OfferTable from "../../../components/admin/article/offerTable";
import FormImage from "../../../components/formImage";
import User from "../../../validation/admin/article/user";

function OfferAdmin() {

  const {
    isOpenImg, setIsOpenImg
  } = User();

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <OfferHeader />
      <OfferTable toggleModalImagen={toggleModalImagen} />
      {isOpenImg && (
        <FormImage toggleModalImagen={toggleModalImagen} />
      )}
    </div>
  );
}

export default OfferAdmin;
