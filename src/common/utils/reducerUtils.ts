export const setNestedValue = <T extends Record<string, any>>(
  state: T,
  path: string,
  value: any
): T => {
  const [firstKey, ...rest] = path.split(".");

  if (rest.length === 0) {
    return { ...state, [firstKey]: value };
  }

  return {
    ...state,
    [firstKey]: setNestedValue(state[firstKey] as Record<string, any>, rest.join("."), value),
  };
};

export const setMultipleNestedValues = <T extends Record<string, any>>(
  state: T,
  path: string,
  values: Record<string, any>
): T => {
  const [firstKey, ...rest] = path.split(".");

  if (rest.length === 0) {
    return {
      ...state,
      [firstKey]: {
        ...state[firstKey],
        ...values,
      },
    };
  }

  return {
    ...state,
    [firstKey]: setMultipleNestedValues(
      state[firstKey] as Record<string, any>,
      rest.join("."),
      values
    ),
  };
};
