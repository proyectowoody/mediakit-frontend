import { RegisterState } from "../states/initialRegisterState";
import { LoginState } from "../states/initialLoginState";

export interface AppContextType {
  state: {
    screenRegister: RegisterState;
    screenLogin: LoginState;
  };
  dispatch: React.Dispatch<any>;
  apiUrl: string;
}
