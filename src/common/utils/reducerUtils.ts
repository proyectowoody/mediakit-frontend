export const setMultipleNestedValues = <T extends Record<string, any>>(
  state: T, 
  path: string, 
  values: { [key: string]: any }
): T => {
  const keys = path.split('.');

  if (keys.length === 0) {
    return { ...state, ...values };
  }

  const [head, ...rest] = keys;

  return {
    ...state,
    [head]: rest.length === 0
      ? { ...(state[head] || {}), ...values }
      : setMultipleNestedValues(state[head] || {}, rest.join('.'), values),
  };
};
