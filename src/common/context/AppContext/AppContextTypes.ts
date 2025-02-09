import { AppContextStateTypeOf } from "./initialState";

export interface AppContextType {
  state: AppContextStateTypeOf;
  dispatch: React.Dispatch<any>;
  apiUrl: string;
}
