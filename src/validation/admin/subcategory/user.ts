
import { useState } from "react";

function User() {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [categoriaId, setCategoriaId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return {
    id,
    setId,
    nombre,
    setNombre,
    categoriaId, 
    setCategoriaId,
    isOpen,
    setIsOpen
  };
}

export default User;
