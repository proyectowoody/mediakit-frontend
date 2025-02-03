export const setMultipleNestedValues = <T extends Record<string, any>>(
  state: T, 
  path: string, 
  values: { [key: string]: any }
): T => {
  const keys = path.split('.'); // Convertimos el path a un array de claves

  if (keys.length === 0) {
    return { ...state, ...values };
  }

  const [head, ...rest] = keys;

  // Si estamos en el último nivel de la ruta, actualizamos el objeto con los valores proporcionados
  if (rest.length === 0) {
    return {
      ...state,
      [head]: { ...state[head], ...values },
    };
  }

  // Si estamos en un nivel intermedio, seguimos descendiendo
  return {
    ...state,
    [head]: setMultipleNestedValues(state[head], rest.join('.'), values),
  };
};

