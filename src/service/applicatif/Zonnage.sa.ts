import { Zonnage_BDL } from '../bdl/Zonnage.bdl';

export const ZonnageService = () => {
  const { getCountry, getProvince } = Zonnage_BDL();

  const customPage_All = {
    page: 1,
    size: 1000,
  };

  return {
    getCountry: async (token: string) => {
      return await new Promise(async (success, error) => {
        const res: any = await getCountry(token, customPage_All).catch(
          (exception) => {
            error(exception);
          }
        );

        res && success(res);
      });
    },

    getProvince: async (token: string, idCountry: string) => {
      return await new Promise(async (success, error) => {
        const res: any = await getProvince(token, {
          ...customPage_All,
          country: idCountry,
        }).catch((exception) => {
          error(exception);
        });

        res && success(res);
      });
    },
  };
};
