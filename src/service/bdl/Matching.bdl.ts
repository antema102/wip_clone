import urls from "../../data/constants/urls";
import api from "../technique/api";

export const MatchingBDL = () => ({
  filterMatching: async ( type = "", data): Promise<any> => {
    const endpoint = type ? `${urls.FILTER_WITH_MATCHING}/${type}` : urls.FILTER_WITH_MATCHING;
    return await api.post(endpoint, data);
  },

  filterMatchingJob: async (data: any): Promise<any> => {
    return await api.post(urls.FILTER_WITH_MATCHING_JOB, data);
  },
});
