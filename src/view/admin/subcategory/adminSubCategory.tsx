import SubCategoryHeader from "../../../components/admin/subcategory/subCategoryHeader";
import SubCategoryTable from "../../../components/admin/subcategory/subCategoryTable";

function SubCategoryAdmin() {
  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <SubCategoryHeader />
      <SubCategoryTable/>
    </div>
  );
}

export default SubCategoryAdmin;
