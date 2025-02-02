import { registerReducer } from "../reducers/screenRegisterReducer";
import { loginReducer } from "../reducers/screenLoginReducer";

export function combinedReducers(state: any, action: any) {
  return {
    screenRegister: registerReducer(state.screenRegister, action),
    screenLogin: loginReducer(state.screenLogin, action),
  };
}
