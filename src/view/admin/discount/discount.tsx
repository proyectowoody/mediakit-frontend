import DiscountHeader from "../../../components/admin/discount/discount";
import DiscountTable from "../../../components/admin/discount/discountTable";

function Discount() {
    return (
        <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
            <DiscountHeader />
            <DiscountTable />
        </div>
    );
}

export default Discount;