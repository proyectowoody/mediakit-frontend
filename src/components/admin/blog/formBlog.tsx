import { useEffect, useRef, useState } from "react";
import Message from "../../message";
import { Handle } from "../../../validation/admin/blogAdmin/handle";
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import { handleDeleteImageBlog } from "../../../validation/admin/blogAdmin/handleDelete";

function FormBlog() {

    const [isEditing, setIsEditing] = useState(false);
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [slug, setSlug] = useState("");
    const [categoria, setCategoria] = useState("");
    const [contenido, setContenido] = useState("");

    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [imagen, setImagen] = useState<(string | File)[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const blogSeleccionado = localStorage.getItem("blogSeleccionado");
        if (blogSeleccionado) {
            const blog = JSON.parse(blogSeleccionado);

            setId(blog.id || "");
            setTitulo(blog.titulo || "");
            setDescripcion(blog.descripcion || "");
            setSlug(blog.slug || '');
            setCategoria(blog.categoria || "");
            setContenido(blog.contenido || '');
            let imagenesLocales: (string | File)[] = [];

            if (Array.isArray(blog.imagenes)) {
                imagenesLocales = blog.imagenes;
            } else if (typeof blog.imagen === "string" && blog.imagen.trim() !== "") {
                imagenesLocales = [blog.imagen];
            }

            setImagen(prev => [...imagenesLocales, ...prev.filter(img => img instanceof File)]);
            setPreviewUrls(imagenesLocales.map(img => (typeof img === "string" ? img : URL.createObjectURL(img))));

            setIsEditing(true);
        }
    }, []);

    const removeImage = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.preventDefault();

        const imagenEliminada = previewUrls[index];

        handleDeleteImageBlog(imagenEliminada);

        const nuevasImagenes = imagen.filter((_, i) => i !== index);
        const nuevasPreviews = previewUrls.filter((_, i) => i !== index);

        if (typeof previewUrls[index] === "string" && previewUrls[index].startsWith("blob:")) {
            URL.revokeObjectURL(previewUrls[index]);
        }

        setImagen(nuevasImagenes);
        setPreviewUrls(nuevasPreviews);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        if (nuevasImagenes.some(img => img instanceof File)) {
            const dataTransfer = new DataTransfer();
            nuevasImagenes.forEach(img => {
                if (img instanceof File) {
                    dataTransfer.items.add(img);
                }
            });

            if (fileInputRef.current) {
                fileInputRef.current.files = dataTransfer.files;
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);

            if (filesArray.length === 0) return;

            setImagen(prev => [...prev, ...filesArray]);
            const newPreviews = filesArray.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [...prev, ...newPreviews]);
        }
    };

    const handleChange = (value: any) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = value;
        let text = tempDiv.textContent || tempDiv.innerText || "";
        text = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
        setContenido(text);
    };


    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image'],
            [{ 'header': [1, 2, false] }],
            [{ 'list': 'ordered' }],
            ['clean']
        ],
    };

    const formats = [
        'bold', 'italic', 'underline', 'strike',
        'link', 'image', 'header',
    ];

    const imagenesFile = [...new Set(imagen.filter(img => img instanceof File) as File[])];
    const { handleSubmitForm, isLoading } = Handle(id, titulo, descripcion, slug, categoria, contenido, imagenesFile);

    return (
        <div className="mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative p-6">
            <div className="absolute top-6 right-6">
                <a className="text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5" href="/blog-admin" data-translate>
                    Regresar
                </a>
            </div>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-[#2F4F4F]" data-translate>
                    {isEditing ? "Actualizar blog" : "Crear blog"}
                </h3>
                <Message />
                <form className="space-y-6" onSubmit={handleSubmitForm}>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                                Título
                            </label>
                            <input
                                type="text"
                                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5"
                                placeholder="Título"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                            Descripción corto
                        </label>
                        <textarea
                            placeholder="Descripción"
                            className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block mb-2 text-sm font-medium text-[#2F4F4F]">
                                Slug
                            </label>
                            <input
                                type="text"
                                className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5"
                                placeholder="Slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                            Imágenes seleccionadas
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative">
                                    <img src={url} alt={`Imagen ${index}`} className="w-full h-32 object-cover rounded-lg border border-[#D4C9B0]" />
                                    <button
                                        type="button"
                                        onClick={(event) => removeImage(event, index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="mt-4 bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full h-12 p-2.5"
                        onChange={handleImageChange}
                    />

                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                            Categoría
                        </label>
                        <select
                            className="bg-[#FFFFFF] border border-[#D4C9B0] text-[#2F4F4F] text-sm rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] block w-full p-2.5"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="" disabled data-translate>
                                Selecciona una categoría
                            </option>
                            <option value="tecnologia" data-translate>Tecnología</option>
                            <option value="negocios" data-translate>Negocios</option>
                            <option value="salud" data-translate>Salud</option>
                            <option value="viajes" data-translate>Viajes</option>
                            <option value="educacion" data-translate>Educación</option>
                            <option value="moda" data-translate>Moda</option>
                            <option value="gastronomia" data-translate>Gastronomía</option>
                            <option value="deportes" data-translate>Deportes</option>
                            <option value="finanzas" data-translate>Finanzas</option>
                            <option value="entretenimiento" data-translate>Entretenimiento</option>
                            <option value="desarrollo_personal" data-translate>Desarrollo Personal</option>
                            <option value="cultura" data-translate>Cultura</option>
                            <option value="noticias" data-translate>Noticias</option>
                            <option value="fotografia" data-translate>Fotografía</option>
                            <option value="opiniones" data-translate>Opiniones</option>
                            <option value="ciencia" data-translate>Ciencia</option>
                            <option value="medio_ambiente" data-translate>Medio Ambiente</option>
                            <option value="historia" data-translate>Historia</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-[#2F4F4F]" data-translate>
                            Contenido
                        </label>
                        <div>
                            <ReactQuill
                                theme="snow"
                                value={contenido}
                                onChange={handleChange}
                                modules={modules}
                                formats={formats}
                                placeholder="Escribe algo aquí..."
                                className="h-[200px]"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className=" mt-10 w-full text-white bg-[#6E9475] hover:bg-[#5C8465] focus:ring-4 focus:outline-none focus:ring-[#D4C9B0] font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={isLoading}
                        >
                            {isLoading ? "Agregando..." : "Agregar"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default FormBlog;
