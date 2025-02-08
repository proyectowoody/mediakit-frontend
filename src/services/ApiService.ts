import axios from "axios";

export const fetchData = async (apiAlias: string): Promise<any> => {
  try {
    const result = await axios.get(apiAlias);

    if (result?.data) {
      return result.data;
    }

    if ([200, 201].includes(result.status)) {
      return {};
    }

    return { apiError: { message: "Error en la API sin datos" } };
  } catch (error: any) {
    return {
      apiError: {
        message:
          error.response?.data?.message ||
          `Error en la petición: ${error.message}`,
      },
    };
  }
};

export const postData = async (
  apiAlias: string,
  payload: any
): Promise<any> => {
  try {
    const result = await axios.post(apiAlias, payload);

    if (result?.data) {
      return result.data;
    }

    if ([200, 201].includes(result.status)) {
      return {};
    }

    return { apiError: { message: "Error en la API sin datos" } };
  } catch (error: any) {
    return {
      apiError: {
        message:
          error.response?.data?.message ||
          `Error en la petición: ${error.message}`,
      },
    };
  }
};

export const updateDataInApi = async (
  apiAlias: string,
  payload: any
): Promise<any> => {
  try {
    const result = await axios.put(apiAlias, payload);
    if (result?.data) {
      return result.data;
    }
    if ([200, 201].includes(result.status)) {
      return {};
    }
    return { apiError: { message: "Error en la API sin datos" } };
  } catch (error: any) {
    return {
      apiError: {
        message:
          error.response?.data?.message ||
          `Error en la petición: ${error.message}`,
      },
    };
  }
};

export const deleteDataFromApi = async (apiAlias: string): Promise<any> => {
  try {
    const result = await axios.delete(apiAlias);
    if ([200, 201].includes(result.status)) {
      return {};
    }
    return { apiError: { message: "Error en la API sin datos" } };
  } catch (error: any) {
    return {
      apiError: {
        message:
          error.response?.data?.message ||
          `Error en la petición: ${error.message}`,
      },
    };
  }
};
