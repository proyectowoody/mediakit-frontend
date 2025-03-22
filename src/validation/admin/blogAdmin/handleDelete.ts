import { mostrarMensaje } from "../../../components/toast";
import api from "../../axios.config";
import { linkBackend } from "../../url";

export function handleDelete(art: any) {

    const MensajeNegToast = document.getElementById("toast-negative");

    api
        .delete(`${linkBackend}/blog/${art}`, {
        })
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            if (error.response) {
                mostrarMensaje(error.response.data.error, MensajeNegToast);
            }
        });
}

export function handleDeleteImageBlog(imageUrl: string) {

    const encodedImageUrl = encodeURIComponent(imageUrl);
  
    api
      .delete(`${linkBackend}/blog?imageUrl=${encodedImageUrl}`)
      .then(() => {
      })
      .catch((error) => {
        console.error("Error eliminando la imagen:", error);
      });
  
    const blogSeleccionado = localStorage.getItem("blogSeleccionado");
  
    if (blogSeleccionado) {
      let blog = JSON.parse(blogSeleccionado);
      if (Array.isArray(blog.imagenes)) {
        blog.imagenes = blog.imagenes.filter((img: string) => img !== imageUrl);
      }
      localStorage.setItem("blogSeleccionado", JSON.stringify(blog));
    }
  }