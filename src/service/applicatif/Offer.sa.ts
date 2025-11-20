import {OfferBDL} from '../bdl/Offer.bdl';

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
    incrementOfferJobView
  } = OfferBDL();

  return {
    createOfferJob: data => createOfferJob(data),

    updateOfferJob: (token: string, idJob: string, data: any) =>
      updateOfferJob(token, idJob, data),

    deleteOfferJob: (token: string, idJob: string) =>
      deleteOfferJob(token, idJob),

    allOfferJob: (token: string) => allOfferJob(token),

    getAllCategoryAvailable: (token: string) => getAllCategoryAvailable(token),

    getOfferJobView: ( idCandidat: string, token: string) => getOfferJobView(idCandidat, token),

    incrementOfferJobView: (id: string, token: string) => incrementOfferJobView(id, token),

    getAllPostsAvailable: (token: string) => getAllPostsAvailable(token),

    getOfferByCategoryName: (token: string, name: string) =>
      getOfferByCategoryName(token, name),

    allOfferJobByEnt: (token: string, idCompany: string) =>
      allOfferJobByEnt(token, idCompany),

    allOfferJobByEntWithoutVideo: (token: string) =>
      allOfferJobByEntWithoutVideo(token),

    offerApply: (token: string, idCompany: string) =>
      offerApply(token, idCompany),

    offerDecline: (token: string, idCompany: string) =>
      offerDecline(token, idCompany),

    boostOffer: (token: string, idOffer: string) => boostOffer(token, idOffer),

    allOfferJobByType: (token: string, jobType: string) =>
      allOfferJobByType(token, jobType),

    offerJobById: (id: string, token: string) => offerJobById(id, token),

    typeJob: token => typeJob(token),

    getFavorite: token => getFavorite(token),

    history: token => history(token)};
};
