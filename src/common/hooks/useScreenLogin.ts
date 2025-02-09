import { useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext/AppContext";
import { LoginState } from "../context/states/initialLoginState";
import { postData } from "../../services/ApiService";
import { mostrarMensaje } from "../../components/toast";

function useScreenLogin() {
  const { state, dispatch, apiUrl } = useContext(AppContext);

  const navigate = useNavigate();

  const updateLoginField = (key: string, value: any): void => {
    dispatch({
      type: "UPDATE-SINGLE-FIELD-LOGIN",
      payload: {
        key,
        value,
      },
    });
  };

  const resetForm = () => {
    dispatch({
      type: "RESET-LOGIN-FORM",
    });
  };

  const handleSubmitLogin = async (event: FormEvent) => {
    event.preventDefault();

    const MensajeErrUsuario = document.getElementById("err");

    const validationFields = [
      { key: "email", message: "Ingrese su correo" },
      { key: "password", message: "Ingrese su contraseña" },
    ];

    const validateForm = (): boolean => {
      for (const field of validationFields) {
        if (state.screenLogin[field.key as keyof LoginState] === "") {
          mostrarMensaje(field.message, MensajeErrUsuario);
          return false;
        }
      }
      return true;
    };

    if (!validateForm()) return;

    updateLoginField("isLoading", true);

    const payload = {
      email: state.screenLogin.email,
      password: state.screenLogin.password,
    };

    const responseSesionLogin = await postData(
      `${apiUrl}/users/login`,
      payload
    );

    if (responseSesionLogin?.apiError) {
      mostrarMensaje(responseSesionLogin.apiError.message, MensajeErrUsuario);
      resetForm();
      return false;
    }

    const token = responseSesionLogin.token;

    localStorage.setItem("ACCESS_TOKEN", token);

    setTimeout(() => {
      resetForm();
      navigate("/authguard");
    }, 3000);
  };

  return {
    updateLoginField,
    handleSubmitLogin,
  };
}

export default useScreenLogin;
