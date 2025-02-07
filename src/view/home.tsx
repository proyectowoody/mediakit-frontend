import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/toast";

function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(!isModalVisible);
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setIsLogged(false);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsLogged(!!token);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F5F5DC]">
      <Modal
        onConfirm={() => {
          logOut();
          showModal();
        }}
        isVisible={isModalVisible}
        onClose={showModal}
        message="¿Estás seguro de cerrar sesión?"
      />
      {isLogged && (
        <section className="font-quicksand text-center z-10">
          <div className="px-4 py-8 sm:py-12 max-w-2xl mx-auto bg-[#FAF3E0] rounded-lg shadow-lg">
            <h1 className="mb-6 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-[#2F4F4F]">
              Cierrar sesión
            </h1>
            <p className="mb-8 text-lg sm:text-xl text-[#4E6E5D]">
              Puede cerrar sesión en el boton
            </p>
            <button
              onClick={showModal}
              className="px-6 py-3 rounded-lg bg-[#6E9475] text-white text-lg font-semibold shadow-lg hover:bg-[#5C8465] hover:scale-105 transition-transform duration-300"
            >
              Cerrar
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
