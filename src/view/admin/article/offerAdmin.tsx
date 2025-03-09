import authRedirectNoToken from "../../../validation/autRedirectNoToken";
import OfferHeader from "../../../components/admin/article/offerHeader";
import OfferTable from "../../../components/admin/article/offerTable";
import ArticleFormOffer from "../../../components/admin/article/articleFormOffer";
import User from "../../../validation/admin/article/user";

function OfferAdmin() {
  authRedirectNoToken("/login");

  const {
    setId,
    setPrecio,
    isOpenOffer, 
    setIsOpenOffer
  } = User();

  const toggleModalOffer = () => {
    setId(0);
    setPrecio(0);
    setIsOpenOffer(!isOpenOffer);
  };

  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <OfferHeader />
      <OfferTable toggleModalOffer={toggleModalOffer} />
      {isOpenOffer && <ArticleFormOffer toggleModalOffer={toggleModalOffer} />}
    </div>
  );
}

export default OfferAdmin;
