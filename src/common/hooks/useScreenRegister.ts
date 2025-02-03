import { useContext, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext/AppContext";
import { RegisterState } from "../context/states/initialRegisterState";
import { postData } from '../../services/ApiService'; 
import { mostrarMensaje } from "../../components/toast";

function useScreenRegister() {
  const {state, dispatch, apiUrl } = useContext(AppContext) ?? {};

  const navigate = useNavigate();

  if (!dispatch) {
    throw new Error("Dispatch is not available, AppContext is undefined.");
  }

  const updateRegisterField = (key: string, value: any): void => {
    dispatch({
      type: "UPDATE-SINGLE-FIELD-REGISTER",
      payload: {
        key,
        value,
      },
    });
  };

  const updateRegisterFields = ({ path, ...rest }: { path: string; [key: string]: any }): void => {
    dispatch({
      type: "UPDATE-MULTIPLE-FIELDS-REGISTER",
      payload: {
        path,
        values: rest,
      },
    });
  };
  
  
  const resetForm = () => {
    dispatch({
      type: "RESET-REGISTER-FORM",
    });
  };
  
  const handleSubmitRegister = async (event: FormEvent) => {
    event.preventDefault();
  
    updateRegisterField('isLoading', true);
  
    const MensajeErrUsuario = document.getElementById("err");
    const MensajeActUsuario = document.getElementById("success");
  
    const validationFields = [
      { key: 'name', message: 'Ingrese su nombre' },
      { key: 'lastName', message: 'Ingrese su apellido' },
      { key: 'email', message: 'Ingrese su correo' },
      { key: 'password', message: 'Ingrese su password' },
      { key: 'isTermsAccepted', message: 'Debe aceptar los términos' }
    ];
  
    const validateForm = (): boolean => {
      for (const field of validationFields) {
        if (field.key === 'isTermsAccepted') {
          if (!state?.screenRegister[field.key as keyof RegisterState]) {
            mostrarMensaje(field.message, MensajeErrUsuario);
            return false;
          }
        } else {
          if (state?.screenRegister[field.key as keyof RegisterState] === "") {
            mostrarMensaje(field.message, MensajeErrUsuario);
            return false;
          }
        }
      }
      return true;
    };
  
    if (!validateForm()) return;
  
    const payload = {
      name: state?.screenRegister.name,
      lastName: state?.screenRegister.lastName,
      email: state?.screenRegister.email,
      password: state?.screenRegister.password,
      isVerified: state?.screenRegister.isVerified,
      role: "client"
    };
  
    const responseRegister = await postData(`${apiUrl}users/register`, payload);
  
    if (responseRegister?.apiError) {
      // const message = error.response?.data.message;
      // mostrarMensaje(message, MensajeErrUsuario);
      // resetForm();
      // return false;
      mostrarMensaje(responseRegister.apiError, MensajeErrUsuario);
      resetForm();
      return false;
    } else {
      const mensaje = responseRegister.message;
      mostrarMensaje(mensaje, MensajeActUsuario);
      resetForm();

      setTimeout(() => {
        navigate("/verification");
      }, 1000);
    }
  };
  
  return {
    updateRegisterField,
    updateRegisterFields,
    handleSubmitRegister,
  };
}

export default useScreenRegister;
