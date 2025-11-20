import {CV_BDL} from '../bdl/curriculumVitae.bdl';

export const CVService = () => {
  const {
    sendData,
    updateData,
    fetchData,
    getCVById,
    getAllCV,
    getCVByIdUser,
    getAvailability,
    changeAvailability,
    sendAvailability
  } = CV_BDL();

  return {
    getAvailability: async (token: string) => await getAvailability(token),
    changeAvailability: async (token: string) =>
      await changeAvailability(token),
    sendData: async (data: any, token: string) => await sendData(data, token),
    updateData: async (data: any, token: string, id: string) =>
      await updateData(data, token, id),
    fetchMyData: async (token: string) => await fetchData(token),
    getCVById: async (token: string, id: string) => await getCVById(token, id),
    getCVByIdUser: async (token: string, id: string) =>
      await getCVByIdUser(token, id),
    getAllCV: async (token: string, data: any) => await getAllCV(token, data),
    sendAvailability:async(token:string,params:string)=>
      await sendAvailability(token,params)
  };
};
