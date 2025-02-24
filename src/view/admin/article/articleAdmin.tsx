import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authRedirectNoToken from "../../../validation/autRedirectNoToken";
import roleClient from "../../../components/ts/roleClient";
import User from "../../../validation/admin/article/user";
import ArticleHeader from "../../../components/admin/article/articleHeader";
import ArticleTable from "../../../components/admin/article/articuleTable";
import ArticleForm from "../../../components/admin/article/articleForm";
import ArticleFormImage from "../../../components/admin/article/articleFormImage";

function ArticleAdmin() {
  authRedirectNoToken("/login");

  const navigate = useNavigate();

  useEffect(() => {
    roleClient(navigate);
  }, [navigate]);


  const {
    setId,
    setNombre,
    setDescripcion,
    setCategoria,
    setEstado,
    setImagen,
    isOpen,
    setIsOpen,
    isOpenImg,
    setIsOpenImg,
  } = User();

  const toggleModal = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setEstado("");
    setImagen(null);
    setIsOpen(!isOpen);
    localStorage.removeItem("articuloSeleccionado");
  };

  const toggleModalAct = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setEstado("");
    setImagen(null);
    setIsOpen(!isOpen);
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
      />
      {isOpen && <ArticleForm toggleModal={toggleModal} />}
      {isOpenImg && (
        <ArticleFormImage toggleModalImagen={toggleModalImagen} />
      )}
    </div>
  );
}

export default ArticleAdmin;
