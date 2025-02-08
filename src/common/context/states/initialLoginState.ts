export interface LoginState {
  email: string;
  password: string;
  isLoading: boolean;
}

export const initialLoginState: LoginState = {
  email: "",
  password: "",
  isLoading: false,
};
