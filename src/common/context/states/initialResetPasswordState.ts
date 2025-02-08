export interface ResetPasswordState {
  password: string;
  verPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoading: boolean;
}

export const initialResetPasswordState: ResetPasswordState = {
  password: "",
  verPassword: "",
  showPassword: false,
  showConfirmPassword: false,
  isLoading: false,
};
