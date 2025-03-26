interface Props {
    setVista: (tipo: "articulo" | "compra") => void;
    vista: "articulo" | "compra";
}

function CommentHeader({ setVista, vista }: Props) {
    return (
        <div className="text-[#2F4F4F] text-lg sm:text-xl mb-4 p-4 rounded-lg shadow-lg bg-[#FAF3E0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <p className="text-center text-base sm:text-lg" data-translate>
                {vista === "articulo" ? "Comentarios de artículos" : "Comentarios de compras"}
            </p>
            <div className="flex gap-2">
                <button
                    className="text-white bg-[#6E9475] hover:bg-[#5C8465] rounded text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
                    onClick={() => setVista("compra")}
                >
                    Compras
                </button>
                <button
                    className="text-white bg-[#6E9475] hover:bg-[#5C8465] rounded text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
                    onClick={() => setVista("articulo")}
                >
                    Artículos
                </button>
            </div>
        </div>
    );
}

export default CommentHeader;
