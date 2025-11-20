import api from '../technique/api';
import urls from '../../data/constants/urls';

export const InscriptionBDL = () => ({
  inscription: async (data: any) => {
    return await new Promise(async (success, error) => {
      let url = '';
      data?.data?.role === 'company'
        ? (url = urls.INSCRIPTION_COMPANY)
        : (url = urls.REGISTER_EMAIL);

      const result = await api
        .post(url, data.data, '', true)
        .catch((exception) => {
          error(exception);
        });
      result && success(result);
    });
  },
  postSendEmail: async (data: any) =>
    await api.post(`${urls.VERIFY_EMAIL}`, data, ''),
  resendEmail: async (data: any) =>
    await api.post(`${urls.RESEND_EMAIL}`, data, ''),
});
