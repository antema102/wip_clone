import api from '../technique/api';
import urls from '../../data/constants/urls';

export const AuthBDL = () => ({
  loginWithEmail: async (data: any) => {
    return await new Promise(async (success, error) => {
      const url = urls.LOGIN;
      const result = await api
        .post(url, data.data, '', true)
        .catch((exception) => {
          error(exception);
        });
      result && success(result);
    });
  },
  loginWithGoogle: async (token: string) => {
    return await new Promise(async (success, error) => {
      const url = urls.LOGIN_GOOGLE;
      const result = await api
        .postLoginGoogle(url, token)
        .catch((exception) => {
          error(exception);
        });
      result && success(result);
    });
  },
  logOut: async (token: any) => {
    return await new Promise(async (success, error) => {
      const url = urls.LOGOUT;
      const result = await api.get(url, token).catch((exception) => {
        error(exception);
      });
    });
  },
});
