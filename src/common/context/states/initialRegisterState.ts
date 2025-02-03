export interface RegisterState {
  showPassword: boolean;
  isTermsAccepted: boolean;
  name: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isLoading: boolean;
  modal: {
    open: boolean;
    item: any;
  };
}

export const initialRegisterState: RegisterState = {
  showPassword: false,
  isTermsAccepted: false,
  name: "",
  lastName: "",
  email: "",
  password: "",
  isVerified: false,
  isLoading: false,
  modal: {
    open: false,
    item: {},
  },
};
