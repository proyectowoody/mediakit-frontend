import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./navBar";
import Sidebar from "./aside";
import Footer from "./footer";
import authRedirectNoToken from "../../validation/autRedirectNoToken";
import roleClient from "../ts/roleClient";
import { Modal } from "../toast";

function Admin() {

  authRedirectNoToken("/login");
  const navigate = useNavigate();

  useEffect(() => {
    roleClient(navigate);
  }, [navigate]);

  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsLogged(!!token);
  }, []);

  const showModal = () => setIsModalVisible(!isModalVisible);
  const toggleAside = () => setIsAsideOpen(!isAsideOpen);

  const logOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setIsLogged(false);
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    if (!isLogged) {
      navigate("/login");
    } else {
      if (path === "/perfil") {
        const userSession = localStorage.getItem("USER_SESSION");
        let userName = "Usuario";
        if (userSession) {
          try {
            const parsedSession = JSON.parse(userSession);
            userName = parsedSession.name || "Usuario";
          } catch (error) {
            console.error("Error al parsear USER_SESSION:", error);
          }
        }
        navigate(path, { state: { name: userName } });
      } else {
        navigate(path);
      }
      setIsAsideOpen(false);
    }
  };

  const navLinks = [
    { path: "/category-admin", label: "Categorías" },
    { path: "/article-admin", label: "Artículos" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-quicksand">

      <NavBar toggleAside={toggleAside} showModal={showModal} />

      <div className="flex flex-1">
        <Sidebar
          isAsideOpen={isAsideOpen}
          handleNavigation={handleNavigation}
          navLinks={navLinks}
          showModal={showModal}
          isLogged={isLogged}
        />

        <div className={`flex-1 transition-all ${isAsideOpen ? "lg:ml-64" : "ml-0"} flex flex-col`}>
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
