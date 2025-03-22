import BlogHeader from "../../../components/admin/blog/blogHeader";
import BlogTable from "../../../components/admin/blog/blogTable";
import FormImage from "../../../components/formImage";
import User from "../../../validation/admin/article/user";

function BlogAdmin() {

  const {
    isOpenImg,
    setIsOpenImg,
  } = User();

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <BlogHeader />
      <BlogTable toggleModalImagen={toggleModalImagen} />
      {isOpenImg && (
        <FormImage toggleModalImagen={toggleModalImagen} />
      )}
    </div>
  );
}

export default BlogAdmin;