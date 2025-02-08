import { registerReducer } from "../reducers/screenRegisterReducer";
import { loginReducer } from "../reducers/screenLoginReducer";
import { recoveryPasswordReducer } from "../reducers/screenRecoveryPasswordReducer";

export function combinedReducers(state: any, action: any) {
  return {
    screenRegister: registerReducer(state.screenRegister, action),
    screenLogin: loginReducer(state.screenLogin, action),
    screenRecoveryPassword: recoveryPasswordReducer(
      state.screenRecoveryPassword,
      action
    ),
  };
}
