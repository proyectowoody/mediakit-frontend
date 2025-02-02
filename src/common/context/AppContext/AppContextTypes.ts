import { initialRegisterState } from "../states/initialRegisterState";
import { initialLoginState } from "../states/initialLoginState";

export interface AppContextType {
  state: {
    screenRegister: typeof initialRegisterState;
    screenLogin: typeof initialLoginState;
  };
  dispatch: React.Dispatch<any>;
  apiUrl: string;
}
