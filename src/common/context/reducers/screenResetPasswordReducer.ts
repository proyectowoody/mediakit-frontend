import {
  ResetPasswordState,
  initialResetPasswordState,
} from "../states/initialResetPasswordState";
import { setMultipleNestedValues } from "../../utils/reducerUtils";

export function resetPasswordReducer(
  state: ResetPasswordState,
  action: any
): ResetPasswordState {
  switch (action.type) {
    case "UPDATE-SINGLE-FIELD-RESET-PASSWORD":
      return { ...state, [action.payload.key]: action.payload.value };

    case "UPDATE-MULTIPLE-FIELDS-RESET-PASSWORD":
      return setMultipleNestedValues(
        state,
        action.payload.key,
        action.payload.values
      );

    case "RESET-RESET-PASSWORD-FORM":
      return { ...initialResetPasswordState };

    default:
      return state;
  }
}
