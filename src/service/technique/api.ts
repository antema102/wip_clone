import axios from 'axios';

import store from '../store';

import config from '../../data/constants/config';
import { setServerStatus, setTokenStatus } from '../redux/ducks/app';
import { HttpStatus } from '../../data/constants/Http-status';
import { encryptData, decryptData } from './encryption';

// const { notificationCounter, reduxJosia } = useUser();

enum serveError {
  INTERNAL_SERVER = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNVALAIBLE = 503,
}

export const headers = (token = '') => {
  const state: any = store.getState();

  if (token !== '') {
    token = `Bearer ${token}`;
  }

  return {
    'Content-Type': 'application/json',
    Authorization: state.auth?.accessToken
      ? `Bearer ${state.auth?.accessToken}`
      : token,
  };
};

export const headersUpload = (token = '') => {
  const state: any = store.getState();

  if (token !== '') {
    token = `Bearer ${token}`;
  }

  return {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    Authorization: state.auth?.accessToken
      ? `Bearer ${state.auth?.accessToken}`
      : token,
  };
};

export const catchError = (error: any) => {
  let data;
  let status = 500;

  if (error?.status) {
    status = error.status;
  } else {
    data = error?.response?.data;
    status = error?.response?.status;
  }
  serveurStatus(status);
  return { data, status };
};

const serveurStatus = (status: any) => {
  if (
    status === serveError.BAD_GATEWAY ||
    status === serveError.SERVICE_UNVALAIBLE
  ) {
    store.dispatch(setServerStatus(true));
  }
};

export const get = async (url: string, token: string, data?: any) => {
  try {
    let res;
    if (!data) {
      res = await axios.get(url, {
        headers: token ? headers(token) : headers(),
      });
    } else {
      res = await axios.get(url, {
        headers: token ? headers(token) : headers(),
        params: data,
      });
    }
    return res.data;
  } catch (error: any) {
    if (error.response.status === HttpStatus.Unauthorized) {
      store.dispatch(setTokenStatus(true));
    }
    return catchError(error);
  }
};

export const post = async (
  url: string,
  data: any,
  token = '',
  encryption = false
) => {
  try {
    if (encryption) {
      const response = encryptData(data);
      data = {
        data: response,
      };
    }
    const res = await axios.post(url, data, {
      headers: headers(token),
    });
    store.dispatch(setServerStatus(false));
    return res.data;
  } catch (error: any) {
    if (error?.response?.status === HttpStatus.Unauthorized) {
      store.dispatch(setTokenStatus(true));
    }
    return catchError(error);
  }
};

export const postAdvertisement = async (
  url: string,
  data: any,
  token = '',
  encryption = false
) => {
  try {
    const headersToSend = headers(token);
    if (data instanceof FormData) {
      headersToSend['Content-Type'] = 'multipart/form-data';
    }
    const res = await axios.post(url, data, {
      headers: headersToSend,
    });
    store.dispatch(setServerStatus(false));
    return res.data;
  } catch (error: any) {
    if (error?.response?.status === HttpStatus.Unauthorized) {
      store.dispatch(setTokenStatus(true));
    }
    return catchError(error);
  }
};

export const postGoogle = async (url: string, data: any, token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const postLoginGoogle = async (url: string, data: any) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const postSessionId = async (
  url: string,
  token: string,
  title: string,
  type: string | null,
  flag?: string
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      title,
      type,
      country: flag,
    };
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const postJobSlot = async (url: string, token: string, type: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      type,
    };
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
export const postIA = async (
  url: string,
  token: string,
  session_id: string,
  file?: File,
  query?: string,
  enterprise_ids?: string[],
  country_ids?: string,
  onMessage?: (message: string) => void
) => {
  try {
    const formData = new FormData();
    formData.append('session_id', session_id);

    if (file != null) formData.append('file', file);
    if (query) formData.append('query', query);
    if (country_ids) formData.append('country_ids', country_ids);

    if (enterprise_ids?.some((id) => id.trim() !== '')) {
      enterprise_ids
        .filter((id) => id.trim() !== '')
        .forEach((id) => {
          formData.append('enterprise_ids', id);
        });
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-API-Key': 'bf80J843-1e70-1435-a8c1-14e1be58ddbe',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder('utf-8');
    let accumulated = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      let cursor = 0;

      while (true) {
        const dataIndex = chunk.indexOf('data:', cursor);
        if (dataIndex === -1) break;

        const endOfLineIndex = chunk.indexOf('\n', dataIndex);
        const end = endOfLineIndex !== -1 ? endOfLineIndex : chunk.length;
        const line = chunk.slice(dataIndex, end);

        if (!line.startsWith('data: [COST]')) {
          const content = line.replace(/^data:\s?/, '');
          accumulated += content;
          if (onMessage != null) onMessage(accumulated);
        }
        cursor = end + 1;
      }
    }
  } catch (error) {
    console.error('Erreur dans postIA:', error);
    throw error;
  }
};

export const getIA = async (url: string, token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'X-API-Key': 'bf80J843-1e70-1435-a8c1-14e1be58ddbe',
    };
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const postPdf = async (
  url: string,
  token: string,
  file: string,
  id?: string | null,
  country_ids?: string | null,
  enterprise_ids?: string | null,
  active?: boolean
): Promise<any> => {
  try {
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (id) formData.append('user_id', id);
    if (country_ids) formData.append('country_ids', country_ids);
    if (enterprise_ids) formData.append('enterprise_ids', enterprise_ids);
    if (active !== undefined) formData.append('is_active', String(active));
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-API-Key': 'bf80J843-1e70-1435-a8c1-14e1be58ddbe',
      },
      body: formData,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Erreur lors du téléchargement du PDF :', error);
    throw error;
  }
};

export const getPdf = async (url: string, token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'X-API-Key': 'bf80J843-1e70-1435-a8c1-14e1be58ddbe',
    };
    const response = await axios.get(url, {
      headers,
      responseType: 'blob',
    });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  } catch (error) {
    return catchError(error);
  }
};

export const getRevenueCat = async (url) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${'sk_VhIijXzkKuaxMdHvjCyPFtLAqpqTh'}`,
      },
    };
    const response = await axios.get(url, config);
    return response?.data;
  } catch (error) {
    return catchError(error);
  }
};

export const postWithStatus = async (url: string, data: any, token = '') => {
  try {
    const res = await axios.post(url, data, {
      headers: headers(token),
    });
    store.dispatch(setServerStatus(false));
    return res;
  } catch (error) {
    return catchError(error);
  }
};

export const postUpload = async (url: string, data: any, token = '') => {
  const body = new FormData();
  body.append('file', { uri: data.uri, name: data.fileName, type: data.type });

  try {
    store.dispatch(setServerStatus(false));
    return await fetch(url, {
      method: 'post',
      headers: headersUpload(''),
      body,
    });
  } catch (error) {
    return catchError(error);
  }
};

export const put = async (url: string, data = {}, token = '', params = {}) => {
  try {
    let res;

    if (Object.keys(params || {}).length === 0) {
      res = await axios.put(url, data, {
        headers: headers(token),
      });
    } else {
      res = await axios.put(`${url}/${params}`, data, {
        headers: headers(token),
      });
    }
    store.dispatch(setServerStatus(false));
    return res.data;
  } catch (error) {
    if (error?.response?.status === HttpStatus.Unauthorized) {
      store.dispatch(setTokenStatus(true));
    }
    return catchError(error);
  }
};

export const putReset = async (url: string) => {
  let res;
  try {
    res = await axios.put(url, {
      method: 'PUT',
    });
    store.dispatch(setServerStatus(false));
    return res;
  } catch (error) {
    return catchError(error);
  }
};

export const putWithStatus = async (
  url,
  data = {},
  token = '',
  params = {}
) => {
  try {
    let res;

    if (Object.keys(params || {}).length === 0) {
      res = await axios.put(url, data, {
        headers: headers(token),
      });
    } else {
      res = await axios.put(`${url}/${params}`, data, {
        headers: headers(token),
      });
    }
    store.dispatch(setServerStatus(false));
    return res;
  } catch (error) {
    return catchError(error);
  }
};

export const remove = async (url, token) => {
  try {
    const res = await axios.delete(url, {
      headers: token ? headers(token) : headers(),
    });
    store.dispatch(setServerStatus(false));
    return res.data;
  } catch (error) {
    return catchError(error);
  }
};

export const patch = async (
  url: string,
  data: {
    country_ids?: string[];
    enterprise_ids?: string[];
    is_active?: boolean;
  },
  token: string
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'X-API-Key': 'bf80J843-1e70-1435-a8c1-14e1be58ddbe',
    };
    const res = await axios.patch(url, data, { headers });
    return res.data;
  } catch (error) {
    return catchError(error);
  }
};

export default {
  get,
  getRevenueCat,
  patch,
  post,
  postWithStatus,
  postUpload,
  put,
  putWithStatus,
  remove,
  postGoogle,
  putReset,
  postSessionId,
  postIA,
  getIA,
  postJobSlot,
  getPdf,
  postPdf,
  postAdvertisement,
  postLoginGoogle,
};
