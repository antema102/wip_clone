import api from '../technique/api';
import blobVideo from '../technique/displayVideoBlob';
import urls from '../../data/constants/urls';

export const UserBDL = () => ({
  getUserById: (id: string, token: string) =>
    api.get(urls.FETCH_USERBYID + id, token),

  postUser: (type: string, token: string) =>
    api.post(`${urls.FETCH_USERBYID}/${type}`, {}, token),

  postCreateUuid: (token: string) => api.post(urls.Uuid, {}, token),

  postAuthentication: (data: any) =>
    api.postLoginGoogle(`${urls.LOGIN_GOOGLE}`, data),

  getCostsUser: (token: string) =>
    api.get(urls.GET_COSTS, token, {
      size: '100'}),

  updateCv: (
    token: string,
    pointId: string,
    data: {
      country_ids?: string[];
      enterprise_ids?: string[];
      is_active?: boolean;
    }
  ) => api.patch(`${urls.UPDATE_CV}/${pointId}/metadata`, data, token),

  getCountryBySessionId: (token: string, sessionId: string) =>
    api.get(`${urls.GET_COUNTRY_BY_SESSION}/${sessionId}`, token),

  getExternalUSer: (token: string, enterpriseId: string) =>
    api.get(`${urls.GET_EXTERNAL_USER}`, token, { enterpriseId: enterpriseId }),

  getCostsUserByName: (token: string, name: string) =>
    api.get(`${urls.GET_COSTS}?name=${name}`, token),

  getSpotVideo: (token: string) =>
    api.get(urls.GET_SPOT_VIDEO, token, {
      size: '100'}),

  getSpotVideoById: (token: string, id: string) =>
    api.get(`${urls.GET_SPOT_VIDEO_BY_ID}/${id}`, token),

  getUserText: (token: string) =>
    api.get(urls.DYNAMIC_TEXT, token, {
      size: '100'}),

  getUserEchelle: (token: string) =>
    api.get(urls.DYNAMIC_ECHELLE, token, {
      size: '100'}),

  updateUser: (token: string, idUser: string, data: any) =>
    api.put(urls.UPDATE_USER, data.data, token, idUser),

  updatePassword: (token: string, password: string) =>
    api.put(
      urls.UPDATE_PASSWORD,
      {
        password: password},
      token
    ),
  buySubscription: (token: string, data: any, id: string) =>
    api.put(`${urls.BUY_SUBSCRIPTION}/${id}`, data, token),
  desactivateAccount: (token: string) =>
    api.put(urls.DESACTIVATE_ACCOUNT, {}, token),
  updateMesage: (data: any) => api.post(urls.UPDATE_MESSAGE, data.data),
  readMessageCount: (id: string) =>
    api.post(`${urls.READ_MESSAGE_COUNT}/${id}`, {}),
  getAccessToken: (token: string) => api.get(`${urls.FIREBASE_TOKEN}`, token),
  updateMessageCount: (id: string) =>
    api.put(`${urls.UPDATE_MESSAGE_COUNT}/${id}`),

  getMessage: (id: string, token: string) =>
    api.get(urls.GET_MESSAGE, token, {
      userId: id,
      direction: 'desc',
      size: '50'}),

  sendingNotificationsViaGoogle: (data: any, token: string) =>
    api.postGoogle(urls.GOOGLE_SEND, data, token),

  createSessionID: (
    token: string,
    title: string,
    type: string | null,
    flag?: string
  ) => api.postSessionId(urls.SESSIONS_ID, token, title, type, flag),

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
  ) =>
    await api.postIA(
      urls.IA,
      token,
      session_id,
      file,
      query,
      enterprise_ids,
      country_ids,
      onMessage
    ),

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

  displayVideoPresentation: (
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
    return blobVideo.displayVideoWithProgress(
      `${serverUrl}/${id}`,
      token,
      setDownloadProgressBar
    );
  },

  displayVideoExample: (token: string, setDownloadProgressBar: any) => {
    return blobVideo.displayVideoWithProgress(
      `${urls.DOWNLOAD_VIDEO_EXAMPLE}`,
      token,
      setDownloadProgressBar
    );
  },

  displayGuideline: async (data: any, token: string) =>
    await blobVideo.displayPDF(`${urls.GUIDELINE}`, data, token),

  getMyCVPresentationVideo: (token: string, setDownloadProgressBar: any) => {
    return blobVideo.displayVideoWithProgress(
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

  getAdverstisementsByOwnerId: (id: string, token: string, page: number) =>
    api.get(
      `${urls.GET_ADVERTISEMENT_BY_OWNER}/${id}?page=${page}&size=5`,
      token
    ),

  getPostsByOwnerId: (id: string, token: string, page: number) =>
    api.get(`${urls.GET_POST_BY_OWNER}/${id}?page=${page}&size=5`, token),

  getAllAdverstisements: (token: string) => api.get(urls.ADVERTISEMENT, token),

  getTransactionMvola: (token: string, transactionId: string) =>
    api.get(`${urls.GET_MVOLA}?transactionId=${transactionId}`, token),

  getAirtelTransaction: (token: string, transactionId: string) =>
    api.get(`${urls.GET_AIRTEL}/${transactionId}`, token),

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

  getAllTenders: (id: string, token: string, page: number) =>
    api.get(`${urls.GET_TENDER_BY_OWNER}/${id}?page=${page}&size=5`, token),

  getAllTendersCategory: async (data: any, token: string) =>
    await api.post(`${urls.GET_TENDER_CATEGORY}`, data, token),

  getAdvertisementForWeb: async (data: any, token: string) =>
    await api.post(`${urls.ADVERTISEMENT_FOR_WEB}`, data, token),

  getTendersByName: async (data: any, token: string) =>
    await api.post(`${urls.GET_TENDER_AVAILABLE_BY_NAME}`, data, token),

  getTenderPDF: async (id: string, token: string) =>
    await api.get(`${urls.GET_TENDER_PDF}/${id}`, token),

  deleteTenderById: async (id: string, token: string) =>
    await api.remove(`${urls.TENDER}/${id}`, token)});
