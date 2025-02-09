import { LoginState, initialLoginState } from "../states/initialLoginState";
// import { setMultipleNestedValues } from "../../utils/reducerUtils";

export function loginReducer(state: LoginState, action: any): LoginState {
  switch (action.type) {
    case "UPDATE-SINGLE-FIELD-LOGIN":
      return { ...state, [action.payload.key]: action.payload.value };

    // case "UPDATE-MULTIPLE-FIELDS-LOGIN":
    //   return setMultipleNestedValues(
    //     state,
    //     action.payload.key,
    //     action.payload.values
    //   );

    case "RESET-LOGIN-FORM":
      return { ...initialLoginState };

    default:
      return state;
  }
}
