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
    updateCv,
  } = UserBDL();

  return {
    getUserById: async (id: string, token: string) =>
      await getUserById(id, token),
    getExternalUSer: async (token: string, enterpriseId: string) =>
      await getExternalUSer(token, enterpriseId),
    postAuthentication: async (data: any) => await postAuthentication(data),
    postCreateUuid: async (token: string) => await postCreateUuid(token),
    postUser: async (type: string, token: string) =>
      await postUser(type, token),
    getCostsUser: async (token: string) => await getCostsUser(token),
    getCountryBySessionId: async (token: string, sessionId: string) =>
      await getCountryBySessionId(token, sessionId),
    getCostsUserByName: async (token: string, name: string) =>
      await getCostsUserByName(token, name),
    getSpotVideo: async (token: string) => await getSpotVideo(token),
    getSpotVideoById: async (token: string, id: string) =>
      await getSpotVideoById(token, id),
    getUserText: async (token: string) => await getUserText(token),
    getUserEchelle: async (token: string) => await getUserEchelle(token),
    updateUser: async (token: string, idUser: string, data: any) =>
      await updateUser(token, idUser, data),
    updatePassword: async (token: string, password: string) =>
      await updatePassword(token, password),
    buySubscription: async (token: string, data: any, id: string) =>
      await buySubscription(token, data, id),
    desactivateAccount: async (token: string) =>
      await desactivateAccount(token),
    updateUserMessage: async (data: any) => await updateMesage(data),
    readMessageCount: async (id: string) => await readMessageCount(id),
    updateMessageCount: async (id: string) => await updateMessageCount(id),
    getAccessToken: async (token: string) => await getAccessToken(token),
    getUserMessage: async (id: string, token: string) =>
      await getMessage(id, token),
    sendingNotifications: async (data: any, token: string) =>
      await sendingNotificationsViaGoogle(data, token),
    sendSessionId: async (
      token: string,
      title: string,
      type: string | null,
      flag?: string
    ) => await createSessionID(token, title, type, flag),
    getsSessionId: async (token: string, isCompany?: string | null) =>
      await getSessionID(token, isCompany),
    createIA: async (
      token: string,
      session_id: string,
      file?: File,
      query?: string,
      enterprise_ids?: string[],
      country_ids?: string,
      onMessage?: (message: string) => void
    ) => {
      await createIA(
        token,
        session_id,
        file,
        query,
        enterprise_ids,
        country_ids,
        onMessage
      );
    },
    getJobSlot: async (token: string, type: string) =>
      await getJobSlot(token, type),
    getIA: async (token: string, session_id: string) =>
      await getIA(token, session_id),
    getPdf: async (token: string, id: string) => await getPdf(token, id),
    updateCv: async (
      token: string,
      pointId: string,
      data: {
        country_ids?: string[];
        enterprise_ids?: string[];
        is_active?: boolean;
      }
    ) => await updateCv(token, pointId, data),
    postPdfs: async (
      token: string,
      file: any,
      id?: string | null,
      country_ids?: string | null,
      enterprise_ids?: string,
      active?: boolean
    ) => await postPdf(token, file, id, country_ids, enterprise_ids, active),
    displayUserVideoPresentation: async (
      id: string,
      token: string,
      setDownloadProgressBar: any,
      type: string
    ) =>
      await displayVideoPresentation(id, token, setDownloadProgressBar, type),
    resetUserPassword: async (email: string) => await resetPassword(email),
    createAdvertisement: async (data: any) => await createAdvertisement(data),
    filterAdvertisement: async (data: any, token: string) =>
      await filterAdvertisement(data, token),
    countClickAdvertisement: async (id: string, token: string) =>
      await countClickAdvertisement(id, token),
    createPost: async (data: any, token: string) =>
      await createPost(data, token),
    payContact: async (data: any, token: string) =>
      await payContact(data, token),
    checkContact: async (token: string) => await checkContact(token),
    payMvola: async (data: any, token: string) => await payMvola(data, token),
    payOrange: async (data: any, token: string) => await payOrange(data, token),
    payAirtel: async (data: any, token: string) => await payAirtel(data, token),
    payCb: async (data: any, token: string) => await payCb(data, token),
    getAdvertisementsByCategory: async (data: any, token: string) =>
      await getAdvertisementsByCategory(data, token),
    getTransactionMvola: async (token: string, transactionId: string) =>
      await getTransactionMvola(token, transactionId),
    getAirtelTransaction: async (token: string, transactionId: string) =>
      await getAirtelTransaction(token, transactionId),
    editAdvertisement: async (id: string, data: any, token: string) =>
      await editAdvertisement(id, data, token),
    removeAdvertisement: async (id: string, token: string) =>
      await RemoveAdvertisement(id, token),
    removePost: async (id: string, token: string) =>
      await RemovePost(id, token),
    getAllAdverstisements: async (token: any) =>
      await getAllAdverstisements(token),
    getAdverstisementsByOwnerId: async (
      id: string,
      token: string,
      page: number
    ) => await getAdverstisementsByOwnerId(id, token, page),
    getPostsByOwnerId: async (id: string, token: string, page: number) =>
      await getPostsByOwnerId(id, token, page),
    uploadVideoToServer: async (
      token: string,
      fileName: string,
      fileType: string,
      dataUri: string,
      setProgressBar: any,
      type: string
    ) =>
      await uploadVideoFile(
        token,
        fileName,
        fileType,
        dataUri,
        setProgressBar,
        type
      ),
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
    getMyCVideo: async (token: string, setDownloadProgressBar: any) =>
      await getMyCVPresentationVideo(token, setDownloadProgressBar),
    getAdvertisementForWeb,
    displayGuideline,
  };
};
