import authRedirectNoToken from "../../../validation/autRedirectNoToken";
import OfferHeader from "../../../components/admin/article/offerHeader";
import OfferTable from "../../../components/admin/article/offerTable";

function OfferAdmin() {
  authRedirectNoToken("/login");

  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <OfferHeader/>
      <OfferTable/>
    </div>
  );
}

export default OfferAdmin;
