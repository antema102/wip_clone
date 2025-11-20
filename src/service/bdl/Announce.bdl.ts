import api from "../technique/api";
import urls from "../../data/constants/urls";

export const AnnounceBDL = () => ({
  allAnnounce: async (token: string) =>
    await api.get(urls.GET_ANNOUNCES, token),
  getAnnouncesByCategoryName: async (token: string, name: string) =>
    await api.get(`${urls.GET_ALL_ANNOUNCES_BY_CATEGORY}/${name}`, token),
});
