import api from "../technique/api";
import urls from "../../data/constants/urls";


export const CvBDL = () => ({
  findUserCv: async () => await api.get(urls.FETCH_MYCV, '', {}),

  findCvVideo: async () => await api.get(urls.FETCH_CV_VIDEO, '', {})});
