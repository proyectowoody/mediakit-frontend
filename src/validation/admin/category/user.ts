import { useState } from "react";

function User() {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return {
    id,
    setId,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    isOpen,
    setIsOpen,
  };
}

export default User;
