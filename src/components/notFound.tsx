function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5DC] text-[#2F4F4F] px-4">
      <div className="text-center">
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-4 animate-bounce text-[#6E9475]">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-[#4E6E5D]">
          🚧 Oops! Página no encontrada.
        </h2>

        <p className="text-[#6E9475] mb-6 text-sm sm:text-base md:text-lg">
          Lo sentimos, la ruta que intentaste visitar no existe o fue movida.
        </p>

        <a
          href="/"
          className="px-6 py-3 sm:px-10 sm:py-4 text-white text-lg sm:text-xl md:text-2xl font-semibold rounded-full shadow-lg bg-[#6E9475] hover:bg-[#5C8465] transition transform hover:scale-105"
        >
          🔙 Volver al inicio
        </a>
      </div>

      <div className="mt-8 w-full max-w-md sm:max-w-lg md:max-w-xl">
        <img
          src="https://img.freepik.com/vector-premium/error-404-pagina-no-encontrada-icono-concepto-vectorial-sitio-web-internet-inactivo-diseno-plano-simple_570429-4168.jpg"
          alt="Not Found Illustration"
          className="rounded-lg shadow-xl w-full border-4 border-[#B2C9AB]"
        />
      </div>
    </div>
  );
}

export default NotFound;
