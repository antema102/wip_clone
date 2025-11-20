import {useDispatch} from 'react-redux';
import { MatchingService } from '../../applicatif/Matching.sa';

export type MatchingState = {
  matching: {
    language: {
      value: string;
      score: number;
    };
    filiere: {
      value: string;
      score: number;
    };
    level: {
      value: string;
      score: number;
    };
    province: {
      value: string;
      score: number;
    };
    adress: {
      value: string;
      score: number;
    };
    country: {
      value: string;
      score: number;
    };
    region: {
      value: string;
      score: number;
    };
    ville: {
      value: string;
      score: number;
    };
    arrondissement: {
      value: string;
      score: number;
    };
    disponibility: {
      value: string;
      score: number;
    };
    yearOfExp: {
      value: string;
      score: number;
    };
    jobType: {
      value: string;
      score: number;
    };
    jobPlace: {
      value: string;
      score: number;
    };
  };
};

export const enum MatchingType {
  matching = '[Auth] filter with matching cv'}

export const initiaMatchingState: MatchingState = {
  matching: {
    language: {
      value: '',
      score: 0},
    filiere: {
      value: '',
      score: 0},
    level: {
      value: '',
      score: 0},
    province: {
      value: '',
      score: 0},
    adress: {
      value: '',
      score: 0},
    country: {
      value: '',
      score: 0},
    region: {
      value: '',
      score: 0},
    ville: {
      value: '',
      score: 0},
    arrondissement: {
      value: '',
      score: 0},
    disponibility: {
      value: '',
      score: 0},
    yearOfExp: {
      value: '',
      score: 0},
    jobType: {
      value: '',
      score: 0},
    jobPlace: {
      value: '',
      score: 0}}};

export const MatchingReducer = (state = initiaMatchingState, action) => {
  const {type, payload} = action;
  switch (type) {
    case MatchingType.matching:
      return {
        ...state,
        matching: payload};

    default:
      return state;
  }
};

export const useMatching = () => {
  const dispatch = useDispatch();
  const {filterMatching} = MatchingService();
  return {
    filterMatching: async ( type , data ) => {
      try {
        const payload = await filterMatching(type,data);
        dispatch({
          payload,
          type: MatchingType.matching});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    }};
};
