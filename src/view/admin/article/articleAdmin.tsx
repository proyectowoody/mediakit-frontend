import User from "../../../validation/admin/article/user";
import ArticleHeader from "../../../components/admin/article/articleHeader";
import ArticleTable from "../../../components/admin/article/articuleTable";
import FormImage from "../../../components/formImage";

function ArticleAdmin() {

  const {
    isOpenImg,
    setIsOpenImg,
  } = User();

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <ArticleHeader/>
      <ArticleTable
        toggleModalImagen={toggleModalImagen}
      />
      {isOpenImg && (
        <FormImage toggleModalImagen={toggleModalImagen} />
      )}
    </div>
  );
}

export default ArticleAdmin;

