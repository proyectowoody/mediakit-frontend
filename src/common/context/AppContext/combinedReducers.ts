import { registerReducer } from "../reducers/screenRegisterReducer";
import { loginReducer } from "../reducers/screenLoginReducer";
import { recoveryPasswordReducer } from "../reducers/screenRecoveryPasswordReducer";
import { resetPasswordReducer } from "../reducers/screenResetPasswordReducer";

export function combinedReducers(state: any, action: any) {
  return {
    screenRegister: registerReducer(state.screenRegister, action),
    screenLogin: loginReducer(state.screenLogin, action),
    screenRecoveryPassword: recoveryPasswordReducer(
      state.screenRecoveryPassword,
      action
    ),
    screenResetPassword: resetPasswordReducer(
      state.screenRecoveryPassword,
      action
    ),
  };
}
