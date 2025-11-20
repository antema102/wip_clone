import api from "../technique/api";
import urls from "../../data/constants/urls";

export const Zonnage_BDL = () => ( {

    getCountry : (token: string, data) => {

        return new Promise (async(success, error)=> {
            const url = urls.ZONNAGE_COUNTRY;
            const result: any = await api.get(url, token, data)
            if (result.isError) error(result)
            else success(result);
        })
    },
    getProvince : (token: string, data: any) => {

      return new Promise (async(success, error)=> {
          const url = urls.ZONNAGE_PROVINCE;
          const result = await api.get(url, token, data)
        if (result.isError) error(result)
        else success(result);
      })
  }})
