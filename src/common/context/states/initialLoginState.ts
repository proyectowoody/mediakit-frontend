export interface LoginState {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export const initialLoginState: LoginState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
};
