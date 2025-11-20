import api from '../technique/api';
import urls from '../../data/constants/urls';

export const OfferBDL = () => ({
  createOfferJob: async (data: any) =>
    await api.post(urls.CREATE_OFFER, data.data),

  getAllCategoryAvailable: async (token: string) =>
    await api.get(urls.GET_AVAILABE_OFFERS, token),

  getAllPostsAvailable: async (token: string) =>
    await api.get(urls.GET_AVAILABE_POSTS, token),

  getOfferJobView: async (idOffre: string, token: string) =>
    await api.get(`${urls.JOB_VIEW}/${idOffre}`, token),

  incrementOfferJobView: async (idOffre: string, token: string) =>
    await api.post(`${urls.JOB_VIEW}/${idOffre}`, {}, token),


  getOfferByCategoryName: async (token: string, name: string) =>
    await api.get(`${urls.GET_ALL_OFFERS_BY_CATEGORY}/${name}`, token),

  updateOfferJob: async (token: string, idCompany: string, data: any) =>
    await api.put(urls.UPDATE_OFFER, data.data, token, idCompany),

  deleteOfferJob: async (token: string, idCompany: string) =>
    await api.remove(`${urls.DELETE_OFFER}/${idCompany}`, token),

  offerApply: async (token: string, idCompany: string) =>
    await api.put(`${urls.PUT_APPLY}/${idCompany}`, {}, token),

  offerDecline: async (token: string, idCompany: string) =>
    await api.put(`${urls.PUT_DECLINE}/${idCompany}`, {}, token),

  boostOffer: async (token: string, idOffer: string) =>
    await api.put(`${urls.BOOST_JOB}/${idOffer}`, {}, token),

  allOfferJob: async (token: string) =>
    await api.get(urls.ALL_JOB_COMPANY, token, {
      sort: 'createdAt',
      direction: 'desc'}),

  allOfferJobByEnt: async (token: string, idCompany: string) =>
    await api.get(urls.ALL_JOB_COMPANY, token, {
      proprietaire: idCompany,
      sort: 'createdAt',
      direction: 'desc',
      page: 1,
      size: '100'}),

  allOfferJobByEntWithoutVideo: async (token: string) =>
    await api.get(urls.ALL_JOB_COMPANY_WITHOUT_VIDEO, token),

  allOfferJobByType: async (token: string, jobType: string) =>
    await api.get(urls.ALL_JOB_BY_TYPE, token, {
      types: jobType,
      sort: 'createdAt',
      direction: 'desc'}),

  offerJobById: async (id: string, token: string) =>
    await api.get(`${urls.JOB_COMPANY_BY_ID}/${id}`, token),

  typeJob: async (token: string) => await api.get(urls.ALL_JOB_TYPE, token),

  getFavorite: async (token: string) =>
    await api.get(urls.GET_FAVORITES, token),

  history: async (token: string) =>
    await api.get(urls.HISTORY, token, {
      sort: 'createdAt',
      direction: 'desc',
      page: 1,
      size: '100'})});
