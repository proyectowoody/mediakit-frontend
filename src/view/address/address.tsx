import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Message from "../../components/message";
import HandleAddress from "../../validation/address/handle";
import useAuthProtection from "../../components/ts/useAutProteccion";

function Address() {
  useAuthProtection();

  const [id, setId] = useState(0);
  const [pais, setPais] = useState("España");
  const [provincia, setProvincia] = useState("Alicante");
  const [localidad, setLocalidad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [tipoVia, setTipoVia] = useState("");
  const [informacionAdicional, setInformacionAdicional] = useState("");
  const [indicacionEspecial, setIndicacionEspecial] = useState("");
  const [envio, setEnvio] = useState(false);
  const [facturacion, setFacturacion] = useState(false);

  const [ruta, setRuta] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedAddress = localStorage.getItem("selected_address");
    const backRoute = localStorage.getItem("direccion_back") || "/";
    setRuta(backRoute);
    if (storedAddress) {
      const parsed = JSON.parse(storedAddress);
      setId(parsed.id || 0);
      setPais(parsed.pais || "España");
      setProvincia(parsed.provincia || "");
      setLocalidad(parsed.localidad || "");
      setCodigoPostal(parsed.codigo_postal || "");
      setTipoVia(parsed.tipo_via || "");
      setInformacionAdicional(parsed.adicional || "");
      setIndicacionEspecial(parsed.indicacion || "");
      setEnvio(parsed.envio || false);
      setFacturacion(parsed.facturacion || false);
      setIsEditing(true);
    }
  }, []);

  const { handleSubmit, isLoading } = HandleAddress(
    id,
    pais,
    provincia,
    localidad,
    codigoPostal,
    tipoVia,
    envio,
    facturacion,
    informacionAdicional,
    indicacionEspecial,
    ruta
  );

  return (
    <div className="font-quicksand">
      <Header />
      <div className="mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative p-6">
        <div className="px-6 py-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-[#6E9475] text-center mb-4">
            {isEditing ? "Actualizar Dirección" : "Agregar Dirección"}
          </h2>
          <p className="text-[#2F4F4F] text-center mb-6">
            Completa los datos de tu dirección para futuras compras.
          </p>
          <Message />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="País"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Provincia"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Localidad"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Código Postal"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Tipo de vía, nombre de la vía, nº"
                value={tipoVia}
                onChange={(e) => setTipoVia(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <div className="my-4">
              <p className="font-semibold mb-1">Esta dirección es mi:</p>
              <label className="mr-4">
                <input
                  type="checkbox"
                  checked={envio}
                  onChange={() => setEnvio(!envio)}
                />
                <span className="ml-2">Dirección de envío</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={facturacion}
                  onChange={() => setFacturacion(!facturacion)}
                />
                <span className="ml-2">Dirección de facturación</span>
              </label>
            </div>

            <textarea
              placeholder="Información adicional"
              value={informacionAdicional}
              onChange={(e) => setInformacionAdicional(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <textarea
              placeholder="¿Alguna indicación especial?"
              value={indicacionEspecial}
              onChange={(e) => setIndicacionEspecial(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <button
              type="submit"
              className="w-full bg-[#6E9475] text-white py-2 rounded-lg font-medium hover:bg-[#5C8465] transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Guardar"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Address;