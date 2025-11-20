import urls from "../../data/constants/urls";
import api from "../technique/api";


export const FormationBDL = () => ({
  createFormation: async (data: any) =>
    await api.post(urls.POST_FORMATION, data),

  findAll: async (token: string) =>
    await api.get(urls.FORMATION_FIND_ALL, token),

  findAllByCompanyId: async (token: string, idCompany: string) =>
    await api.get(`${urls.FORMATION_FIND_BY_COMPANY}/${idCompany}`, token),

  deleteFormation: async (idFormation: String, token: string) =>
    await api.remove(`${urls.FORMATION_DELETE}/${idFormation}`, token),

  getFormationsByCategoryName: async (token: string, name: string) =>
    await api.get(`${urls.FORMATION_BY_CATEGORY}/${name}`, token),

  getAllFormationsAvailable: async (token: string) =>
    await api.get(urls.FORMATION_AVAILABLE, token)});
