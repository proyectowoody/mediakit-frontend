import { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import { handleGetCountArticulos, handleGetCountClientes, handleGetCountProveedor } from "../validation/presumir/presumir";

function Presumir() {

  const [totalArt, setTotalArt] = useState<number>(0);
  const [totalPro, setTotalPro] = useState<number>(0);
  const [totalCli, setTotalCli] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const totalArt = await handleGetCountArticulos();
      const totalPro = await handleGetCountProveedor();
      const totalCli = await handleGetCountClientes();
      setTotalArt(totalArt);
      setTotalCli(totalCli);
      setTotalPro(totalPro);
    }
    fetchData();
  }, []);

  return (
    <section className="py-16 bg-[#FAF3E0] flex flex-col md:flex-row items-center justify-center px-8">
      <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
        <img src={logo} alt="Logo" className="w-1/2 rounded-lg shadow-lg" />
      </div>

      <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left">
        <h2 className="text-3xl font-bold text-[#2F4F4F] mb-4" data-translate>
          Comodidad natural, sostenibilidad sin compromisos
        </h2>
        <p className="text-lg text-[#2F4F4F] leading-relaxed mb-6" data-translate>
          En Respectful Shoes, cuidamos de cada paso que das. Nuestro calzado combina ergonomía,
          materiales sostenibles y un diseño pensado para el bienestar de toda la familia.
        </p>

        <div className="flex justify-center md:justify-start space-x-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#6E9475]">+{totalPro}</p>
            <p className="text-[#2F4F4F]" data-translate>Marcas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#6E9475]">+{totalArt}</p>
            <p className="text-[#2F4F4F]" data-translate>Productos</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#6E9475]">+{totalCli}</p>
            <p className="text-[#2F4F4F]" data-translate>Clientes</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Presumir;
