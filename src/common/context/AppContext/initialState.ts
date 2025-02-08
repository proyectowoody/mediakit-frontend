import { initialRegisterState } from "../states/initialRegisterState";
import { initialLoginState } from "../states/initialLoginState";
import { initialRecoveryPasswordState } from "../states/initialRecoveryPasswordState";
import { initialResetPasswordState } from "../states/initialResetPasswordState";

export const initialState = {
  screenRegister: initialRegisterState,
  screenLogin: initialLoginState,
  screenRecoveryPassword: initialRecoveryPasswordState,
  screenResetPassword: initialResetPasswordState,
};
