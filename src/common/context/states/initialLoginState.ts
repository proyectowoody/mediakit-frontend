export interface LoginState {
  email: string;
  password: string;
}

export const initialLoginState: LoginState = {
  email: "",
  password: "",
};
