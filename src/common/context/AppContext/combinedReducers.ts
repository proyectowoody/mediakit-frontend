import { registerReducer } from "../reducers/screenRegisterReducer";
import { loginReducer } from "../reducers/screenLoginReducer";
import { recoveryPasswordReducer } from "../reducers/screenRecoveryPasswordReducer";
import { resetPasswordReducer } from "../reducers/screenResetPasswordReducer";

type Action = {
  type: string;
  payload: any;
};

type ReducersMapObject = {
  [key: string]: (state: any, action: Action) => any;
};

const combineReducers =
  (reducers: ReducersMapObject) =>
  (state: any, action: Action): any => {
    const nextState: any = {};
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action);
    }
    return nextState;
  };

export const combinedReducers = combineReducers({
  screenRegister: registerReducer,
  screenLogin: loginReducer,
  screenRecoveryPassword: recoveryPasswordReducer,
  screenResetPassword: resetPasswordReducer,
});
