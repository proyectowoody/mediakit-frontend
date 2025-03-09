import logo from "../assets/img/logo.png";

function Presumir() {
  return (
    <section className="py-16 bg-[#FAF3E0] flex flex-col md:flex-row items-center justify-center px-8">
      <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
        <img src={logo} alt="Logo" className="w-1/2 rounded-lg shadow-lg" />
      </div>

      <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left">
        <h2 className="text-3xl font-bold text-[#2F4F4F] mb-4">
          Comodidad natural, <span className="text-[#6E9475]">sostenibilidad sin compromisos</span>
        </h2>
        <p className="text-lg text-[#2F4F4F] leading-relaxed mb-6">
          En <strong>Respectful Shoes</strong>, cuidamos de cada paso que das. Nuestro calzado combina ergonomía,
          materiales sostenibles y un diseño pensado para el bienestar de toda la familia.
        </p>

        <div className="flex justify-center md:justify-start space-x-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#6E9475]">+60</p>
            <p className="text-[#2F4F4F]">Marcas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#6E9475]">+100</p>
            <p className="text-[#2F4F4F]">Productos</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#6E9475]">+200</p>
            <p className="text-[#2F4F4F]">Clientes</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Presumir;
