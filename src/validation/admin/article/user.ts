
import { useState } from 'react';

function User() {
    const [id, setId] = useState(0);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState<string | number>("");
    const [estado, setEstado] = useState("");
    const [imagen, setImagen] = useState<File | null>(null);
    const [precio, setPrecio] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenImg, setIsOpenImg] = useState(false);

    return { id, setId, nombre, setNombre, descripcion, setDescripcion, categoria, setCategoria, estado, setEstado, imagen, setImagen, isOpen, setIsOpen, isOpenImg, setIsOpenImg, precio, setPrecio};
}

export default User;
