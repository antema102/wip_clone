import api from '../technique/api';
import urls from '../../data/constants/urls';

export const Zonnage_BDL = () => ({
  getCountry: async (token: string, data) => {
    return await new Promise(async (success, error) => {
      const url = urls.ZONNAGE_COUNTRY;
      const result: any = await api.get(url, token, data);
      if (result.isError) error(result);
      else success(result);
    });
  },
  getProvince: async (token: string, data: any) => {
    return await new Promise(async (success, error) => {
      const url = urls.ZONNAGE_PROVINCE;
      const result = await api.get(url, token, data);
      if (result.isError) error(result);
      else success(result);
    });
  },
});
