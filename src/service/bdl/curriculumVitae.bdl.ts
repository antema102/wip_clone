import api from '../technique/api';
import urls from '../../data/constants/urls';

export const CV_BDL = () => ({
  sendData: async (data: any, token: string) =>
    await api.postWithStatus(urls.CREATE_CV, data, token),
  updateData: async (data: any, token: string, id: string) =>
    await api.putWithStatus(`${urls.CREATE_CV}/${id}`, data, token),
  fetchData: async (token: string) => await api.get(urls.FETCH_MYCV, token),
  getCVById: async (token: string, id: string) =>
    await api.get(`${urls.CREATE_CV}/${id}`, token),
  getAvailability: async (token: string) =>
    await api.get(`${urls.GET_AVAILABILITY_CV}`, token),
  changeAvailability: async (token: string) =>
    await api.put(`${urls.CHANGE_AVAILABILITY_CV}`, {}, token),
  getCVByIdUser: async (token: string, id: string) =>
    await api.get(`${urls.CV_BY_ID_USER}/${id}`, token),
  getAllCV: async (token: string, data: any) =>
    await api.get(`${urls.CREATE_CV}`, token, data),
  sendAvailability: async (token: string, params: string) =>
    await api.put(urls.AVAILABILITY_CV, {}, token, params),
});
