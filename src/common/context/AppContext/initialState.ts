import { initialRegisterState } from "../states/initialRegisterState";
import { initialLoginState } from "../states/initialLoginState";
import { initialRecoveryPasswordState } from "../states/initialRecoveryPasswordState";

export const initialState = {
  screenRegister: initialRegisterState,
  screenLogin: initialLoginState,
  screenRecoveryPassword: initialRecoveryPasswordState,
};
