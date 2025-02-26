import { useState } from "react";

function User() {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [imagen, setImagen] = useState<File | null>(null);
  const [isOpenImg, setIsOpenImg] = useState(false);

  return {
    id,
    setId,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    isOpen,
    setIsOpen,
    imagen,
    setImagen,
    isOpenImg, 
    setIsOpenImg
  };
}

export default User;
