import authRedirectNoToken from "../../../validation/autRedirectNoToken";
import User from "../../../validation/admin/article/user";
import ArticleHeader from "../../../components/admin/article/articleHeader";
import ArticleTable from "../../../components/admin/article/articuleTable";
import ArticleForm from "../../../components/admin/article/articleForm";
import ArticleFormImage from "../../../components/admin/article/articleFormImage";
import ArticleFormOffer from "../../../components/admin/article/articleFormOffer";

function ArticleAdmin() {
  authRedirectNoToken("/login");

  const {
    setId,
    setNombre,
    setDescripcion,
    setCategoria,
    setEstado,
    setPrecio,
    setImagen,
    isOpen,
    setIsOpen,
    isOpenImg,
    setIsOpenImg,
    isOpenOffer, 
    setIsOpenOffer
  } = User();

  const toggleModal = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setEstado("");
    setPrecio(0);
    setImagen([]);
    setIsOpen(!isOpen);
    localStorage.removeItem("articuloSeleccionado");
  };

  const toggleModalAct = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setEstado("");
    setPrecio(0);
    setImagen([]);
    setIsOpen(!isOpen);
  };

  const toggleModalOffer = () => {
    setId(0);
    setPrecio(0);
    setIsOpenOffer(!isOpenOffer);
  };

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  return (
    <div className="bg-[#6E9475] p-4 rounded-lg mt-14 shadow-md mt-20">
      <ArticleHeader toggleModal={toggleModal} />
      <ArticleTable
        toggleModalAct={toggleModalAct}
        toggleModalImagen={toggleModalImagen}
        toggleModalOffer={toggleModalOffer}
      />
      {isOpen && <ArticleForm toggleModal={toggleModal} />}
      {isOpenOffer && <ArticleFormOffer toggleModalOffer={toggleModalOffer} />}
      {isOpenImg && (
        <ArticleFormImage toggleModalImagen={toggleModalImagen} />
      )}
    </div>
  );
}

export default ArticleAdmin;
