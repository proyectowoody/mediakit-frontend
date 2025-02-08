import { RegisterState } from "../states/initialRegisterState";
import { LoginState } from "../states/initialLoginState";
import { RecoveryPasswordState } from "../states/initialRecoveryPasswordState";

export interface AppContextType {
  state: {
    screenRegister: RegisterState;
    screenLogin: LoginState;
    screenRecoveryPassword: RecoveryPasswordState;
  };
  dispatch: React.Dispatch<any>;
  apiUrl: string;
}
