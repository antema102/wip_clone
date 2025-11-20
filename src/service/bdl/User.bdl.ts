import api from '../technique/api';
import blobVideo from '../technique/displayVideoBlob';
import urls from '../../data/constants/urls';

export const UserBDL = () => ({
  getUserById: async (id: string, token: string) =>
    await api.get(urls.FETCH_USERBYID + id, token),

  postUser: async (type: string, token: string) =>
    await api.post(`${urls.FETCH_USERBYID}/${type}`, {}, token),

  postCreateUuid: async (token: string) => await api.post(urls.Uuid, {}, token),

  postAuthentication: async (data: any) =>
    await api.postLoginGoogle(`${urls.LOGIN_GOOGLE}`, data),

  getCostsUser: async (token: string) =>
    await api.get(urls.GET_COSTS, token, {
      size: '100',
    }),

  updateCv: async (
    token: string,
    pointId: string,
    data: {
      country_ids?: string[];
      enterprise_ids?: string[];
      is_active?: boolean;
    }
  ) => await api.patch(`${urls.UPDATE_CV}/${pointId}/metadata`, data, token),

  getCountryBySessionId: async (token: string, sessionId: string) =>
    await api.get(`${urls.GET_COUNTRY_BY_SESSION}/${sessionId}`, token),

  getExternalUSer: async (token: string, enterpriseId: string) =>
    await api.get(`${urls.GET_EXTERNAL_USER}`, token, { enterpriseId }),

  getCostsUserByName: async (token: string, name: string) =>
    await api.get(`${urls.GET_COSTS}?name=${name}`, token),

  getSpotVideo: async (token: string) =>
    await api.get(urls.GET_SPOT_VIDEO, token, {
      size: '100',
    }),

  getSpotVideoById: async (token: string, id: string) =>
    await api.get(`${urls.GET_SPOT_VIDEO_BY_ID}/${id}`, token),

  getUserText: async (token: string) =>
    await api.get(urls.DYNAMIC_TEXT, token, {
      size: '100',
    }),

  getUserEchelle: async (token: string) =>
    await api.get(urls.DYNAMIC_ECHELLE, token, {
      size: '100',
    }),

  updateUser: async (token: string, idUser: string, data: any) =>
    await api.put(urls.UPDATE_USER, data.data, token, idUser),

  updatePassword: async (token: string, password: string) =>
    await api.put(
      urls.UPDATE_PASSWORD,
      {
        password,
      },
      token
    ),
  buySubscription: async (token: string, data: any, id: string) =>
    await api.put(`${urls.BUY_SUBSCRIPTION}/${id}`, data, token),
  desactivateAccount: async (token: string) =>
    await api.put(urls.DESACTIVATE_ACCOUNT, {}, token),
  updateMesage: async (data: any) =>
    await api.post(urls.UPDATE_MESSAGE, data.data),
  readMessageCount: async (id: string) =>
    await api.post(`${urls.READ_MESSAGE_COUNT}/${id}`, {}),
  getAccessToken: async (token: string) =>
    await api.get(`${urls.FIREBASE_TOKEN}`, token),
  updateMessageCount: async (id: string) =>
    await api.put(`${urls.UPDATE_MESSAGE_COUNT}/${id}`),

  getMessage: async (id: string, token: string) =>
    await api.get(urls.GET_MESSAGE, token, {
      userId: id,
      direction: 'desc',
      size: '50',
    }),

  sendingNotificationsViaGoogle: async (data: any, token: string) =>
    await api.postGoogle(urls.GOOGLE_SEND, data, token),

  createSessionID: async (
    token: string,
    title: string,
    type: string | null,
    flag?: string
  ) => await api.postSessionId(urls.SESSIONS_ID, token, title, type, flag),

  getSessionID: async (token: string, isCompany?: string | null) =>
    await api.get(urls.SESSIONS_ID, token, { type: isCompany }),

  createIA: async (
    token: string,
    session_id: string,
    file?: File,
    query?: string,
    enterprise_ids?: string[],
    country_ids?: string,
    onMessage?: (message: string) => void
  ) => {
    await api.postIA(
      urls.IA,
      token,
      session_id,
      file,
      query,
      enterprise_ids,
      country_ids,
      onMessage
    );
  },

  getIA: async (token: string, session_id: string) =>
    await api.getIA(`${urls.GET_IA}/${session_id}`, token),

  getPdf: async (token: string, id: string) =>
    await api.getPdf(`${urls.GET_PDF}${id}`, token),

  postPdf: async (
    token: string,
    file: any,
    id?: string | null,
    country_ids?: string | null,
    enterprise_ids?: string | null,
    active?: boolean
  ) =>
    await api.postPdf(
      `${urls.POST_PDF}`,
      token,
      file,
      id,
      country_ids,
      enterprise_ids,
      active
    ),

  getJobSlot: async (token: string, type: string) =>
    await api.postJobSlot(urls.JOB_SLOT, token, type),

  displayVideoPresentation: async (
    id: string,
    token: string,
    setDownloadProgressBar: any,
    type: string
  ) => {
    let serverUrl;
    switch (type) {
      case 'presentationCandidat':
        serverUrl = urls.DOWNLOAD_VIDEO;
        break;
      case 'presentationEntreprise':
        serverUrl = urls.DOWNLOAD_VIDEO_ENTERPRISE;
        break;
      default:
        break;
    }
    return await blobVideo.displayVideoWithProgress(
      `${serverUrl}/${id}`,
      token,
      setDownloadProgressBar
    );
  },

  displayVideoExample: async (token: string, setDownloadProgressBar: any) => {
    return await blobVideo.displayVideoWithProgress(
      `${urls.DOWNLOAD_VIDEO_EXAMPLE}`,
      token,
      setDownloadProgressBar
    );
  },

  displayGuideline: async (data: any, token: string) =>
    await blobVideo.displayPDF(`${urls.GUIDELINE}`, data, token),

  getMyCVPresentationVideo: async (
    token: string,
    setDownloadProgressBar: any
  ) => {
    return await blobVideo.displayVideoWithProgress(
      `${urls.DOWNLOAD_VIDEO}`,
      token,
      setDownloadProgressBar
    );
  },

  resetPassword: async (email: string) =>
    await api.putReset(`${urls.RESET_PASSWORD}/${email}`),

  uploadVideoFile: async (
    token: string,
    fileName: string,
    fileType: string,
    dataUri: string,
    progressBar: any,
    type: string
  ) => {
    let serverUrl;
    switch (type) {
      case 'presentationCandidat':
        serverUrl = urls.POST_UPLOAD;
        break;
      case 'presentationEntreprise':
        serverUrl = urls.POST_UPLOAD_ENTERPRISE;
        break;
      default:
        break;
    }
    return await blobVideo.uploadAnyFileToServer(
      serverUrl,
      token,
      fileName,
      fileType,
      dataUri,
      progressBar
    );
  },

  getAdverstisementsByOwnerId: async (
    id: string,
    token: string,
    page: number
  ) =>
    await api.get(
      `${urls.GET_ADVERTISEMENT_BY_OWNER}/${id}?page=${page}&size=5`,
      token
    ),

  getPostsByOwnerId: async (id: string, token: string, page: number) =>
    await api.get(`${urls.GET_POST_BY_OWNER}/${id}?page=${page}&size=5`, token),

  getAllAdverstisements: async (token: string) =>
    await api.get(urls.ADVERTISEMENT, token),

  getTransactionMvola: async (token: string, transactionId: string) =>
    await api.get(`${urls.GET_MVOLA}?transactionId=${transactionId}`, token),

  getAirtelTransaction: async (token: string, transactionId: string) =>
    await api.get(`${urls.GET_AIRTEL}/${transactionId}`, token),

  createAdvertisement: async (data: any) =>
    await api.postAdvertisement(urls.ADVERTISEMENT, data),

  createPost: async (data: any, token: any) =>
    await api.post(urls.POST, data, token),

  createTender: async (data: any, token: any) =>
    await api.post(urls.TENDER, data, token),

  payContact: async (data: any, token: string) =>
    await api.post(`${urls.POST_PAY_CONTACT}`, data, token),

  checkContact: async (token: string) =>
    await api.post(`${urls.CHECK_CONTACT}`, {}, token),

  getAdvertisementsByCategory: async (data: any, token: string) =>
    await api.post(`${urls.GET_ADVERTISEMENT_BY_CATEGORY}`, data, token),

  payMvola: async (data: any, token: string) =>
    await api.post(`${urls.POST_MVOLA}`, data, token),

  payOrange: async (data: any, token: string) =>
    await api.post(`${urls.POST_ORANGE}`, data, token),

  payCb: async (data: any, token: string) =>
    await api.post(`${urls.POST_CB}`, data, token),

  payInPurchase: async (data: any, token: string) =>
    await api.post(`${urls.CREDIT_IN_PURCHASE}`, data, token),

  getRevenueCatUsersById: async (user) =>
    await api.getRevenueCat(`${urls.REVENUECAT}/${user}`),

  paySubscriptionInPurchase: async (id: string, token: string) =>
    await api.put(`${urls.SUBSCRIPTION_IN_PURCHASE}/${id}`, {}, token),

  resileSubscriptionInPurchase: async (token: string) =>
    await api.put(`${urls.RESILE_IN_PURCHASE}`, {}, token),

  payAirtel: async (data: any, token: string) =>
    await api.post(`${urls.POST_AIRTEL}`, data, token),

  deletionAccount: async (data: any, token: string) =>
    await api.post(`${urls.DELETION_ACCOUNT}`, data, token, true),

  filterAdvertisement: async (data: any, token: string) =>
    await api.post(
      `${urls.FILTERING_ADVERTISEMENT}?page=1&size=20`,
      data,
      token
    ),

  countClickAdvertisement: async (id: string, token: string) => {
    return await api.post(`${urls.COUNT_ADVERTISEMENT}/${id}`, {}, token);
  },

  editAdvertisement: async (id: string, data: any, token: string) =>
    await api.put(`${urls.ADVERTISEMENT}/${id}`, data, token),

  RemoveAdvertisement: async (id: string, token: string) =>
    await api.remove(`${urls.ADVERTISEMENT}/${id}`, token),

  RemovePost: async (id: string, token: string) =>
    await api.remove(`${urls.POST}/${id}`, token),

  getAllTenders: async (id: string, token: string, page: number) =>
    await api.get(
      `${urls.GET_TENDER_BY_OWNER}/${id}?page=${page}&size=5`,
      token
    ),

  getAllTendersCategory: async (data: any, token: string) =>
    await api.post(`${urls.GET_TENDER_CATEGORY}`, data, token),

  getAdvertisementForWeb: async (data: any, token: string) =>
    await api.post(`${urls.ADVERTISEMENT_FOR_WEB}`, data, token),

  getTendersByName: async (data: any, token: string) =>
    await api.post(`${urls.GET_TENDER_AVAILABLE_BY_NAME}`, data, token),

  getTenderPDF: async (id: string, token: string) =>
    await api.get(`${urls.GET_TENDER_PDF}/${id}`, token),

  deleteTenderById: async (id: string, token: string) =>
    await api.remove(`${urls.TENDER}/${id}`, token),
});
