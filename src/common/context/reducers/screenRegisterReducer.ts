import { RegisterState, initialRegisterState } from "../states/initialRegisterState";
import { setMultipleNestedValues, setNestedValue } from "../../utils/reducerUtils";

export function registerReducer(state: RegisterState, action: any): RegisterState {
  switch (action.type) {

    case 'UPDATE-SINGLE-FIELD-REGISTER':
      return setNestedValue(state, action.payload.key, action.payload.value);

    case 'UPDATE-MULTIPLE-FIELDS-REGISTER':
      return setMultipleNestedValues(
        state,
        action.payload.key,
        action.payload.values
      );

      case 'RESET-REGISTER-FORM':
        return { ...initialRegisterState };

    default:
      return state;
  }
}
