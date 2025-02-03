import { RegisterState, initialRegisterState } from "../states/initialRegisterState";
import { setMultipleNestedValues } from "../../utils/reducerUtils";

export function registerReducer(state: RegisterState = initialRegisterState, action: any): RegisterState {
  switch (action.type) {
    case "UPDATE-SINGLE-FIELD-REGISTER":
      return { ...state, [action.payload.key]: action.payload.value };

    case "UPDATE-MULTIPLE-FIELDS-REGISTER":
      return setMultipleNestedValues(
        state,
        action.payload.path,
        action.payload.values
      );

    case "RESET-REGISTER-FORM":
      return { ...initialRegisterState };

    default:
      return state;
  }
}
