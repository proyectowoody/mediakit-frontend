import {
  RecoveryPasswordState,
  initialRecoveryPasswordState,
} from "../states/initialRecoveryPasswordState";
import { setMultipleNestedValues } from "../../utils/reducerUtils";

export function recoveryPasswordReducer(
  state: RecoveryPasswordState,
  action: any
): RecoveryPasswordState {
  switch (action.type) {
    case "UPDATE-SINGLE-FIELD-RECOVERY-PASSWORD":
      return { ...state, [action.payload.key]: action.payload.value };

    case "UPDATE-MULTIPLE-FIELDS-RECOVERY-PASSWORD":
      return setMultipleNestedValues(
        state,
        action.payload.key,
        action.payload.values
      );

    case "RESET-RECOVERY-PASSWORD-FORM":
      return { ...initialRecoveryPasswordState };

    default:
      return state;
  }
}
