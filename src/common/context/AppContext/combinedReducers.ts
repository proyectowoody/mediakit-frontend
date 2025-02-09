import { registerReducer } from "../reducers/screenRegisterReducer";
import { loginReducer } from "../reducers/screenLoginReducer";
import { recoveryPasswordReducer } from "../reducers/screenRecoveryPasswordReducer";
import { resetPasswordReducer } from "../reducers/screenResetPasswordReducer";
import { AppContextStateTypeOf } from "./initialState";

type Action = { type: string; payload: any };

export function combinedReducers(
  state: AppContextStateTypeOf,
  action: Action
): AppContextStateTypeOf {
  return {
    screenRegister: registerReducer(state.screenRegister, action),
    screenLogin: loginReducer(state.screenLogin, action),
    screenRecoveryPassword: recoveryPasswordReducer(
      state.screenRecoveryPassword,
      action
    ),
    screenResetPassword: resetPasswordReducer(
      state.screenResetPassword,
      action
    ),
  };
}
