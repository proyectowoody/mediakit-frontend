
import { useState } from "react";
import { FaSave, FaEye, FaEyeSlash } from "react-icons/fa";
import Message from "../../../components/message";
import Handle from "../../../validation/password/handle";

function Account() {

    const [password, setPassword] = useState("");
    const [verPassword, setVerPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { handleSubmit, isLoading } = Handle(
        password,
        verPassword
    );

    return (
        <div className=" mb-10 mt-32 max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <Message />
            <form onSubmit={handleSubmit} className="mt-6">
                <div className="p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6" data-translate>Contraseña</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="relative">
                            <label className="block text-gray-700" data-translate>Nueva contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-gray-700" data-translate>Confirmar contraseña</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={verPassword}
                                    onChange={(e) => setVerPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#6E9475] focus:border-[#6E9475] pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button className="mt-6 w-full bg-[#6E9475] text-white py-2 px-4 rounded-lg hover:bg-[#5C8465] flex items-center justify-center" data-translate>
                        <FaSave className="mr-2" />{isLoading ? "Procesando..." : "Restablecer Contraseña"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Account;


