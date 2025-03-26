

import { useState } from "react";

function User() {
    const [id, setId] = useState(0);
    const [codigo, setCodigo] = useState("");
    const [descuento, setDescuento] = useState(0);

    return {id, setId, codigo, setCodigo, descuento, setDescuento};
}

export default User;