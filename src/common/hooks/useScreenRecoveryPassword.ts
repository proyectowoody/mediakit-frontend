import { useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext/AppContext";
import { RecoveryPasswordState } from "../context/states/initialRecoveryPasswordState";
import { postData } from "../../services/ApiService";
import { mostrarMensaje } from "../../components/toast";

function useScreenRecoveryPassword() {
  const { state, dispatch, apiUrl } = useContext(AppContext);

  const navigate = useNavigate();

  const updateRecoveryPasswordField = (key: string, value: any): void => {
    dispatch({
      type: "UPDATE-SINGLE-FIELD-RECOVERY-PASSWORD",
      payload: {
        key,
        value,
      },
    });
  };

  const resetForm = () => {
    dispatch({
      type: "RESET-RECOVERY-PASSWORD-FORM",
    });
  };

  const handleSubmitRecoveryPassword = async (event: FormEvent) => {
    event.preventDefault();

    const MensajeErr = document.getElementById("err");

    const validationFields = [
      { key: "email", message: "Ingrese su correo electrónico" },
    ];

    const validateForm = (): boolean => {
      for (const field of validationFields) {
        if (
          state.screenRecoveryPassword[
            field.key as keyof RecoveryPasswordState
          ] === ""
        ) {
          mostrarMensaje(field.message, MensajeErr);
          return false;
        }
      }
      return true;
    };

    if (!validateForm()) return;

    updateRecoveryPasswordField("isLoading", true);

    const payload = {
      email: state.screenRecoveryPassword.email,
    };

    const responseOperation = await postData(`${apiUrl}/users/email`, payload);

    if (responseOperation?.apiError) {
      mostrarMensaje(responseOperation.apiError.message, MensajeErr);
      resetForm();
      return false;
    }

    setTimeout(() => {
      resetForm();
      navigate("/verification");
    }, 1000);
  };

  return {
    updateRecoveryPasswordField,
    handleSubmitRecoveryPassword,
  };
}

export default useScreenRecoveryPassword;
