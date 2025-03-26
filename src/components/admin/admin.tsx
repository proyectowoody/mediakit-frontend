import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./navBar";
import Sidebar from "./aside";
import Footer from "./footer";
import { Modal } from "../toast";
import CierreSesion from "../cierreSesion";
import api from "../../validation/axios.config";
import useAuthProtection from "../ts/useAutProteccion";

function Admin() {

  const [isLogged, setIsLogged] = useState(false);

  const user = useAuthProtection();

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    }
  }, [user]);

  const navigate = useNavigate();
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(!isModalVisible);
  const toggleAside = () => setIsAsideOpen(!isAsideOpen);

  const logOut = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
      setIsLogged(false);
      localStorage.clear();
      navigate("/iniciar-sesion");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  const handleNavigation = (path: string) => {
    if (!isLogged) {
      navigate("/iniciar-sesion");
    } else {
      navigate(path);
      setIsAsideOpen(false);
    }
  };

  const navLinks = [
    { path: "/categorias", label: "Categorías" },
    { path: "/subcategorias", label: "Sub-Categorías" },
    { path: "/proveedores", label: "Proveedores" },
    { path: "/articulos", label: "Artículos" },
    { path: "/ofertas", label: "Ofertas" },
    { path: "/blog-admin", label: "Blog" },
    { path: "/codigo-descuento", label: "Código descuento" },
    { path: "/comentario-admin", label: "Comentarios" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-quicksand">
      <CierreSesion />

      <NavBar toggleAside={toggleAside} showModal={showModal} />

      <div className="flex flex-1">
        <Sidebar
          isAsideOpen={isAsideOpen}
          handleNavigation={handleNavigation}
          navLinks={navLinks}
          showModal={showModal}
          isLogged={isLogged}
        />

        <div className={`overflow-x-auto flex-1 transition-all ${isAsideOpen ? "lg:ml-64" : "ml-0"} flex flex-col`}>
          <div className="flex-1 p-4">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
      <Modal
        onConfirm={() => {
          logOut();
          showModal();
        }}
        isVisible={isModalVisible}
        onClose={showModal}
        message="¿Estás seguro de cerrar sesión?"
      />
    </div>
  );
}

export default Admin;
