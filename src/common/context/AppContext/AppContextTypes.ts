import { RegisterState } from "../states/initialRegisterState";
import { LoginState } from "../states/initialLoginState";
import { RecoveryPasswordState } from "../states/initialRecoveryPasswordState";
import { ResetPasswordState } from "../states/initialResetPasswordState";

export interface AppContextType {
  state: {
    screenRegister: RegisterState;
    screenLogin: LoginState;
    screenRecoveryPassword: RecoveryPasswordState;
    screenResetPassword: ResetPasswordState;
  };
  dispatch: React.Dispatch<any>;
  apiUrl: string;
}
