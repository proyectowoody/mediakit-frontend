function SupplierHeader() {

    const handleClick = () => {
        localStorage.removeItem("supplierseleccionado");
    };

    return (
        <div className="text-[#2F4F4F] text-2xl mb-4 p-4 rounded-lg shadow-lg bg-[#FAF3E0] flex items-center justify-between" onClick={handleClick}>
            <p className="text-center" data-translate>Proveedores</p>
            <a
                className="text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5"
                href="/form-proveedores"
                data-translate
            >
                Agregar
            </a>
        </div>
    );
}

export default SupplierHeader;





