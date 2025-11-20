import { OfferBDL } from '../bdl/Offer.bdl';

export const OfferService = () => {
  const {
    createOfferJob,
    allOfferJob,
    allOfferJobByEnt,
    allOfferJobByType,
    offerJobById,
    typeJob,
    getFavorite,
    history,
    updateOfferJob,
    deleteOfferJob,
    offerApply,
    offerDecline,
    allOfferJobByEntWithoutVideo,
    getAllCategoryAvailable,
    getOfferByCategoryName,
    getAllPostsAvailable,
    boostOffer,
    getOfferJobView,
    incrementOfferJobView,
  } = OfferBDL();

  return {
    createOfferJob: async (data) => await createOfferJob(data),

    updateOfferJob: async (token: string, idJob: string, data: any) =>
      await updateOfferJob(token, idJob, data),

    deleteOfferJob: async (token: string, idJob: string) =>
      await deleteOfferJob(token, idJob),

    allOfferJob: async (token: string) => await allOfferJob(token),

    getAllCategoryAvailable: async (token: string) =>
      await getAllCategoryAvailable(token),

    getOfferJobView: async (idCandidat: string, token: string) =>
      await getOfferJobView(idCandidat, token),

    incrementOfferJobView: async (id: string, token: string) =>
      await incrementOfferJobView(id, token),

    getAllPostsAvailable: async (token: string) =>
      await getAllPostsAvailable(token),

    getOfferByCategoryName: async (token: string, name: string) =>
      await getOfferByCategoryName(token, name),

    allOfferJobByEnt: async (token: string, idCompany: string) =>
      await allOfferJobByEnt(token, idCompany),

    allOfferJobByEntWithoutVideo: async (token: string) =>
      await allOfferJobByEntWithoutVideo(token),

    offerApply: async (token: string, idCompany: string) =>
      await offerApply(token, idCompany),

    offerDecline: async (token: string, idCompany: string) =>
      await offerDecline(token, idCompany),

    boostOffer: async (token: string, idOffer: string) =>
      await boostOffer(token, idOffer),

    allOfferJobByType: async (token: string, jobType: string) =>
      await allOfferJobByType(token, jobType),

    offerJobById: async (id: string, token: string) =>
      await offerJobById(id, token),

    typeJob: async (token) => await typeJob(token),

    getFavorite: async (token) => await getFavorite(token),

    history: async (token) => await history(token),
  };
};
