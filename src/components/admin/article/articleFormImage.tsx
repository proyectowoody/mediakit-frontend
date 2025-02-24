import { useEffect, useState } from "react";
import axios from "axios";
import { mostrarMensaje } from "../../toast";
import { linkBackend } from "../../../validation/url";
import Message from "../../message";

function ArticleFormImage({ toggleModalImagen }: any) {

    const [id, setId] = useState<number>(0);
    const [imageUrl, setImagenUrl] = useState<string>("");
    const [newImage, setNewImage] = useState<File | null>(null);
    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    useEffect(() => {
        const imagenSeleccionado = localStorage.getItem("imagenSeleccionado");
        if (imagenSeleccionado) {
            const imagen = JSON.parse(imagenSeleccionado);
            setId(imagen.id || 0);
            setImagenUrl(imagen.imagen || "");
        }
    }, []);

    const handleClose = () => {
        localStorage.removeItem("imagenSeleccionado");
        toggleModalImagen();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            const maxSize = 2 * 1024 * 1024;

            if (!validTypes.includes(file.type)) {
                mostrarMensaje("Solo se permiten imágenes en formato JPEG, PNG o GIF.", MensajeErr);
                setNewImage(null);
                return;
            }

            if (file.size > maxSize) {
                mostrarMensaje("El tamaño de la imagen no puede superar los 2 MB.", MensajeErr);
                setNewImage(null);
                return;
            }

            mostrarMensaje("", MensajeErr);
            setNewImage(file);
        }
    };

    const handleUpdateImage = async () => {
        if (!newImage) {
            alert("Por favor selecciona una imagen válida");
            return;
        }

        const formData = new FormData();
        formData.append("id", String(id));
        formData.append("imagen", newImage);

        try {
            const response = await axios.patch(`${linkBackend}/articulos/${id}/imagen`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                },
            });
            mostrarMensaje(response.data.message, MensajeAct);
            window.location.reload();
        } catch (error: any) {
            mostrarMensaje(error.response?.data?.message || "Error al actualizar la imagen.", null);
        }
    };

    return (
        <div
            id="authentication-modal"
            className="bg-[#FAF3E0] bg-opacity-50 formPer fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
        >
            <div className="relative w-full max-w-2xl bg-[#FAF3E0] rounded-lg shadow-lg p-6">
                <button
                    type="button"
                    className="absolute top-3 right-2.5 text-[#2F4F4F] bg-transparent hover:bg-[#D4C9B0] hover:text-[#2F4F4F] rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                    onClick={handleClose}
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Cerrar modal</span>
                </button>
                <h3 className="text-2xl font-medium text-[#2F4F4F] mb-4">Imagen</h3>
                <div className="text-center">
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Vista previa"
                            className="rounded-lg mx-auto max-w-full h-60 object-contain mb-4 border border-[#D4C9B0]"
                        />
                    )}
                    {id !== 0 && (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] rounded-lg p-2 w-full mb-4 focus:ring-[#6E9475] focus:border-[#6E9475]"
                                onChange={handleImageChange}
                            />
                            <Message />
                            <button
                                className="w-full bg-[#6E9475] hover:bg-[#5C8465] text-white py-2 px-4 rounded-lg focus:ring-4 focus:outline-none focus:ring-[#D4C9B0]"
                                onClick={handleUpdateImage}
                            >
                                Actualizar Imagen
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ArticleFormImage;
