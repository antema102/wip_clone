import { UserBDL } from '../bdl/User.bdl';

export const UserSA = () => {
  const {
    getUserById,
    updateUser,
    updatePassword,
    desactivateAccount,
    updateMesage,
    getMessage,
    sendingNotificationsViaGoogle,
    displayVideoPresentation,
    resetPassword,
    uploadVideoFile,
    getAdverstisementsByOwnerId,
    createAdvertisement,
    getAllAdverstisements,
    filterAdvertisement,
    countClickAdvertisement,
    editAdvertisement,
    RemoveAdvertisement,
    payMvola,
    payOrange,
    getTransactionMvola,
    getAirtelTransaction,
    payAirtel,
    getUserText,
    getUserEchelle,
    getCostsUser,
    payContact,
    getSpotVideo,
    getSpotVideoById,
    getCostsUserByName,
    getPostsByOwnerId,
    createPost,
    buySubscription,
    payCb,
    getAdvertisementsByCategory,
    checkContact,
    deletionAccount,
    displayVideoExample,
    payInPurchase,
    paySubscriptionInPurchase,
    resileSubscriptionInPurchase,
    getRevenueCatUsersById,
    getAllTenders,
    createTender,
    getAllTendersCategory,
    getTenderPDF,
    getTendersByName,
    deleteTenderById,
    getMyCVPresentationVideo,
    RemovePost,
    getAdvertisementForWeb,
    displayGuideline,
    readMessageCount,
    updateMessageCount,
    getAccessToken,
    createSessionID,
    getSessionID,
    createIA,
    getIA,
    getJobSlot,
    getPdf,
    postPdf,
    postUser,
    postAuthentication,
    postCreateUuid,
    getCountryBySessionId,
    getExternalUSer,
    updateCv} = UserBDL();

  return {
    getUserById: (id: string, token: string) => getUserById(id, token),
    getExternalUSer: (token: string, enterpriseId: string) =>
      getExternalUSer(token, enterpriseId),
    postAuthentication: (data: any) => postAuthentication(data),
    postCreateUuid: (token: string) => postCreateUuid(token),
    postUser: (type: string, token: string) => postUser(type, token),
    getCostsUser: (token: string) => getCostsUser(token),
    getCountryBySessionId: (token: string, sessionId: string) =>
      getCountryBySessionId(token, sessionId),
    getCostsUserByName: (token: string, name: string) =>
      getCostsUserByName(token, name),
    getSpotVideo: (token: string) => getSpotVideo(token),
    getSpotVideoById: (token: string, id: string) =>
      getSpotVideoById(token, id),
    getUserText: (token: string) => getUserText(token),
    getUserEchelle: (token: string) => getUserEchelle(token),
    updateUser: (token: string, idUser: string, data: any) =>
      updateUser(token, idUser, data),
    updatePassword: (token: string, password: string) =>
      updatePassword(token, password),
    buySubscription: (token: string, data: any, id: string) =>
      buySubscription(token, data, id),
    desactivateAccount: (token: string) => desactivateAccount(token),
    updateUserMessage: (data: any) => updateMesage(data),
    readMessageCount: (id: string) => readMessageCount(id),
    updateMessageCount: (id: string) => updateMessageCount(id),
    getAccessToken: (token: string) => getAccessToken(token),
    getUserMessage: (id: string, token: string) => getMessage(id, token),
    sendingNotifications: (data: any, token: string) =>
      sendingNotificationsViaGoogle(data, token),
    sendSessionId: (
      token: string,
      title: string,
      type: string | null,
      flag?: string
    ) => createSessionID(token, title, type, flag),
    getsSessionId: (token: string, isCompany?: string | null) =>
      getSessionID(token, isCompany),
    createIA: (
      token: string,
      session_id: string,
      file?: File,
      query?: string,
      enterprise_ids?: string[],
      country_ids?: string,
      onMessage?: (message: string) => void
    ) =>
      createIA(
        token,
        session_id,
        file,
        query,
        enterprise_ids,
        country_ids,
        onMessage
      ),
    getJobSlot: (token: string, type: string) => getJobSlot(token, type),
    getIA: (token: string, session_id: string) => getIA(token, session_id),
    getPdf: (token: string, id: string) => getPdf(token, id),
    updateCv: (token: string, pointId: string, data: { country_ids?: string[]; enterprise_ids?: string[]; is_active?: boolean }) =>
      updateCv(token, pointId, data),
    postPdfs: (
      token: string,
      file: any,
      id?: string | null,
      country_ids?: string | null,
      enterprise_ids?: string,
      active?: boolean
    ) => postPdf(token, file, id, country_ids, enterprise_ids, active),
    displayUserVideoPresentation: (
      id: string,
      token: string,
      setDownloadProgressBar: any,
      type: string
    ) => displayVideoPresentation(id, token, setDownloadProgressBar, type),
    resetUserPassword: (email: string) => resetPassword(email),
    createAdvertisement: (data: any) => createAdvertisement(data),
    filterAdvertisement: (data: any, token: string) =>
      filterAdvertisement(data, token),
    countClickAdvertisement: (id: string, token: string) =>
      countClickAdvertisement(id, token),
    createPost: (data: any, token: string) => createPost(data, token),
    payContact: (data: any, token: string) => payContact(data, token),
    checkContact: (token: string) => checkContact(token),
    payMvola: (data: any, token: string) => payMvola(data, token),
    payOrange: (data: any, token: string) => payOrange(data, token),
    payAirtel: (data: any, token: string) => payAirtel(data, token),
    payCb: (data: any, token: string) => payCb(data, token),
    getAdvertisementsByCategory: (data: any, token: string) =>
      getAdvertisementsByCategory(data, token),
    getTransactionMvola: (token: string, transactionId: string) =>
      getTransactionMvola(token, transactionId),
    getAirtelTransaction: (token: string, transactionId: string) =>
      getAirtelTransaction(token, transactionId),
    editAdvertisement: (id: string, data: any, token: string) =>
      editAdvertisement(id, data, token),
    removeAdvertisement: (id: string, token: string) =>
      RemoveAdvertisement(id, token),
    removePost: (id: string, token: string) => RemovePost(id, token),
    getAllAdverstisements: (token: any) => getAllAdverstisements(token),
    getAdverstisementsByOwnerId: (id: string, token: string, page: number) =>
      getAdverstisementsByOwnerId(id, token, page),
    getPostsByOwnerId: (id: string, token: string, page: number) =>
      getPostsByOwnerId(id, token, page),
    uploadVideoToServer: (
      token: string,
      fileName: string,
      fileType: string,
      dataUri: string,
      setProgressBar: any,
      type: string
    ) =>
      uploadVideoFile(token, fileName, fileType, dataUri, setProgressBar, type),
    deletionAccount,
    displayVideoExample,
    payInPurchase,
    paySubscriptionInPurchase,
    resileSubscriptionInPurchase,
    getRevenueCatUsersById,
    getAllTenders,
    createTender,
    getAllTendersCategory,
    getTenderPDF,
    getTendersByName,
    deleteTenderById,
    getMyCVideo: (token: string, setDownloadProgressBar: any) =>
      getMyCVPresentationVideo(token, setDownloadProgressBar),
    getAdvertisementForWeb,
    displayGuideline};
};
