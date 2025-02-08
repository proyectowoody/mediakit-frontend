export interface RecoveryPasswordState {
  email: string;
  isLoading: boolean;
}

export const initialRecoveryPasswordState: RecoveryPasswordState = {
  email: "",
  isLoading: false,
};
