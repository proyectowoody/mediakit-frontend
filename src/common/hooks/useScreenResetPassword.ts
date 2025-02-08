import { useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext/AppContext";
import { ResetPasswordState } from "../context/states/initialResetPasswordState";
import { postData } from "../../services/ApiService";
import { mostrarMensaje } from "../../components/toast";

function useScreenResetPassword() {
  const { state, dispatch, apiUrl } = useContext(AppContext);

  const navigate = useNavigate();

  const updateResetPasswordField = (key: string, value: any): void => {
    dispatch({
      type: "UPDATE-SINGLE-FIELD-RESET-PASSWORD",
      payload: {
        key,
        value,
      },
    });
  };

  const updateResetPasswordFields = ({
    path,
    ...values
  }: {
    path: string;
    [key: string]: any;
  }): void => {
    dispatch({
      type: "UPDATE-MULTIPLE-FIELDS-RESET-PASSWORD",
      payload: { path, values },
    });
  };

  // const resetForm = () => {
  //   dispatch({
  //     type: "RESET-RESET-PASSWORD-FORM",
  //   });
  // };

  const handleSubmitResetPassword = async (event: FormEvent) => {
    event.preventDefault();

    const MensajeErr = document.getElementById("err");
    const MensajeAct = document.getElementById("success");

    const validationFields = [
      { key: "password", message: "Ingrese su nueva contraseña" },
      {
        key: "verPassword",
        message: "Ingrese la verificación de su nueva contraseña",
      },
    ];

    const validateForm = (): boolean => {
      for (const field of validationFields) {
        if (
          state.screenResetPassword[field.key as keyof ResetPasswordState] ===
          ""
        ) {
          mostrarMensaje(field.message, MensajeErr);
          return false;
        }
      }
      return true;
    };

    if (!validateForm()) return;

    if (
      state.screenResetPassword.password !==
      state.screenResetPassword.verPassword
    ) {
      mostrarMensaje("Las contraseñas no coinciden", MensajeErr);
      return null;
    }

    updateResetPasswordField("isLoading", true);

    alert("por acabar");

    // try {
    //   const urlParams = new URLSearchParams(window.location.search);
    //   const urlToken = urlParams.get("token");

    //   const localToken = localStorage.getItem("ACCESS_TOKEN");

    //   const token = urlToken || localToken;

    //   if (!token) {
    //     throw new Error("No se encontró un token válido.");
    //   }

    //   const responseSesion = await axios.patch(
    //     `${linkBackend}/users/password`,
    //     { password, verPassword },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   mostrarMensaje(responseSesion.data.message, MensajeAct);
    //   const tokens = responseSesion.data.token;
    //   return { tokens };
    // } catch (error: any) {
    //   const message =
    //     error.response?.data.message || "Ocurrió un error inesperado.";
    //   mostrarMensaje(message, MensajeErr);
    //   return null;
    // }

    // const payload = {
    //   email: state.screenRecoveryPassword.email,
    // };

    // const responseOperation = await postData(`${apiUrl}/users/email`, payload);

    // if (responseOperation?.apiError) {
    //   mostrarMensaje(responseOperation.apiError.message, MensajeErr);
    //   resetForm();
    //   return false;
    // }

    // setTimeout(() => {
    //   resetForm();
    //   navigate("/verification");
    // }, 1000);
  };

  return {
    updateResetPasswordField,
    updateResetPasswordFields,
    handleSubmitResetPassword,
  };
}

export default useScreenResetPassword;
