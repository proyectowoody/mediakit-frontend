import axios from 'axios';

export const fetchData = async (apiAlias: string): Promise<any> => {
  try {
    const result = await axios.get(apiAlias);
    if (result?.data) {
      return result.data;
    }
    if ([200, 204].includes(result.status)) {
      return {};
    }
    return { apiError: 'Error on API with no data' };
  } catch (error) {
    return { apiError: `Error calling API: ${error}` };
  }
};

export const postData = async (apiAlias: string, payload: any): Promise<any> => {
  try {
    const result = await axios.post(apiAlias, payload);
    if (result?.data) {
      return result.data;
    }
    if ([200, 204].includes(result.status)) {
      return {};
    }
    return { apiError: 'Error on API with no data' };
  } catch (error) {
    return { apiError: `Error calling API: ${error}` };
  }
};

export const updateDataInApi = async (apiAlias: string, payload: any): Promise<any> => {
  try {
    const result = await axios.put(apiAlias, payload);
    if (result?.data) {
      return result.data;
    }
    if ([200, 204].includes(result.status)) {
      return {};
    }
    return { apiError: 'Error on API with no data' };
  } catch (error) {
    return { apiError: `Error calling API: ${error}` };
  }
};

export const deleteDataFromApi = async (apiAlias: string): Promise<any> => {
  try {
    const result = await axios.delete(apiAlias);
    if ([200, 204].includes(result.status)) {
      return {};
    }
    return { apiError: 'Error on API with no data' };
  } catch (error) {
    return { apiError: `Error calling API: ${error}` };
  }
};
