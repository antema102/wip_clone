import { useDispatch } from 'react-redux';
import { OfferService } from '../../applicatif/Offer.sa';

export type OfferState = {
  create: {
    ref: string;
    name: string;
    description: string;
    taches: string;
    disponibility: string;
    lieu: string;
    contrat: string;
    profil: string;
    experience: string;
    salaire: string;
    views: number;
  };
  jobById: {
    id: '';
  };
  allJobByCompany?: any;
  history?: any;
  allJobCompany?: any;
  offerJobById?: any;
  allJobByType?: any;
};

export const enum OfferctionType {
  createJob = '[Offer] create job',
  updateJob = '[Offer] update job',
  deleteJob = '[Offer] delete job',
  allJobCompany = '[Offer] get all job company',
  allJobByCompany = '[Offer] get all job By company',
  allJobByType = '[Offer] get all job By Type',
  typeJob = '[Offer] get type job',
  offerJobById = '[Offer] get job company by id',
  offerApply = '[Offer] offre apply',
  offerDecline = '[Offer] offrer decline',
  history = '[Offer] get history',
  getOfferJobView = '[Offer] get views',
  incrementOfferJobView = "incrementOfferJobView"}

export const initiaOfferState: OfferState = {
  history: 12,

  create: {
    ref: '',
    name: '',
    description: '',
    taches: '',
    disponibility: '',
    lieu: '',
    contrat: '',
    profil: '',
    experience: '',
    salaire: ''},
  jobById: {
    id: ''},
  allJobByCompany: {},
  allJobCompany: {},
  offerJobById: {},
  allJobByType: {}};

export const offerReducer = (state = initiaOfferState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OfferctionType.createJob:
      return {
        ...state,
        createJob: payload};
    case OfferctionType.deleteJob:
      return {
        ...state,
        deleteJob: payload};

    case OfferctionType.updateJob:
      return {
        ...state,
        updateJob: payload};
    case OfferctionType.allJobCompany:
      return {
        ...state,
        allJobCompany: payload};
    case OfferctionType.getOfferJobView:
      return {
        ...state,
        getOfferJobView: payload};
    case OfferctionType.allJobByCompany:
      return {
        ...state,
        allJobByCompany: payload};
    case OfferctionType.allJobByType:
      return {
        ...state,
        allJobByType: payload};
    case OfferctionType.typeJob:
      return {
        ...state,
        typeJob: payload};
    case OfferctionType.offerJobById:
      return {
        ...state,
        offerJobById: payload};
    case OfferctionType.offerApply:
      return {
        ...state,
        offerApply: payload};
    case OfferctionType.offerDecline:
      return {
        ...state,
        offerDecline: payload};
    case OfferctionType.history:
      return {
        ...state,
        history: payload};

    default:
      return state;
  }
};

export const useOfferr = () => {
  const dispatch = useDispatch();
  const {
    createOfferJob,
    allOfferJob,
    allOfferJobByEnt,
    allOfferJobByType,
    typeJob,
    offerJobById,
    history,
    updateOfferJob,
    deleteOfferJob,
    offerApply,
    offerDecline,
    getOfferJobView,
    incrementOfferJobView
  } = OfferService();

  return {
    createOfferJob: async (data) => {
      try {
        const payload = await createOfferJob({ data });

        dispatch({
          payload,
          type: OfferctionType.createJob});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    updateOfferJob: async (token: string, idJob: string, data: any) => {
      try {
        const payload = await updateOfferJob(token, idJob, { data });
        dispatch({
          payload,
          type: OfferctionType.updateJob});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    deleteOfferJob: async (token: string, idJob: string) => {
      try {
        const payload = await deleteOfferJob(token, idJob);
        dispatch({
          payload,
          type: OfferctionType.deleteJob});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    allOfferJob: async (token: string) => {
      try {
        const payload = await allOfferJob(token);
        dispatch({
          payload,
          type: OfferctionType.allJobCompany});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    allOfferJobByEnt: async (token: string, idCompany: string) => {
      try {
        const payload = await allOfferJobByEnt(token, idCompany);
        dispatch({
          payload,
          type: OfferctionType.allJobByCompany});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    allOfferJobByType: async (token: string, jobType: string) => {
      try {
        const payload = await allOfferJobByType(token, jobType);
        dispatch({
          payload,
          type: OfferctionType.allJobByType});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    offerJobById: async (id: string, token: string) => {
      try {
        const payload = await offerJobById(id, token);
        dispatch({
          payload,
          type: OfferctionType.offerJobById});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    typeJob: async (token) => {
      try {
        const payload = await typeJob(token);
        dispatch({
          payload,
          type: OfferctionType.typeJob});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    offerApply: async (token, idJob) => {
      try {
        const payload = await offerApply(token, idJob);
        dispatch({
          payload,
          type: OfferctionType.offerApply});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    offerDecline: async (token, idJob) => {
      try {
        const payload = await offerDecline(token, idJob);
        dispatch({
          payload,
          type: OfferctionType.offerDecline});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getOfferJobView: async (id: string, token: string) => {
      try {
        const payload = await getOfferJobView(id, token); 
        dispatch({
          payload,
          type: OfferctionType.getOfferJobView});

        return payload;
      } catch (error) {
        console.error("Erreur dans getOfferJobView:", error);
        return Promise.reject(error);
      }
    },
    incrementOfferJobView: async (id: string, token: string) => {
      try {
          const payload = await incrementOfferJobView(id, token); 
          dispatch({
              payload,
              type: OfferctionType.incrementOfferJobView});
  
          return payload;
      } catch (error) {
          console.error("Erreur dans incrementOfferJobView:", error);
          return Promise.reject(error);
      }
  },

    history: async (token) => {
      try {
        const payload = await history(token);
        dispatch({
          payload,
          type: OfferctionType.history});
        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    }};
};
