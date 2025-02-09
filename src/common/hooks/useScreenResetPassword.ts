import { useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext/AppContext";
import { ResetPasswordState } from "../context/states/initialResetPasswordState";
import axios from "axios";
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

  const resetForm = () => {
    dispatch({
      type: "RESET-RESET-PASSWORD-FORM",
    });
  };

  const handleSubmitResetPassword = async (event: FormEvent) => {
    event.preventDefault();

    const MensajeErr = document.getElementById("err");
    //   const MensajeAct = document.getElementById("success");

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

    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    const localToken = localStorage.getItem("ACCESS_TOKEN");

    const token = urlToken || localToken;

    if (!token) {
      throw new Error("No se encontró un token válido.");
      return null;
    }

    const payload = {
      password: state.screenResetPassword.password,
      verPassword: state.screenResetPassword.verPassword,
    };

    try {
      const result = await axios.patch(`${apiUrl}/users/password`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result?.data) {
        // Procesa la respuesta si es necesario
        console.log("Respuesta de la API:", result.data);
      } else if ([200, 201].includes(result.status)) {
        console.log("Operación completada sin datos adicionales.");
      } else {
        console.error("Error en la API sin datos.");
      }
    } catch (error: any) {
      console.error(
        "Error en la petición:",
        error.response?.data?.message || "Ocurrió un error inesperado."
      );
    }
  };

  return {
    updateResetPasswordField,
    handleSubmitResetPassword,
  };
}

export default useScreenResetPassword;
