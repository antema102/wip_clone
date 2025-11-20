import {useDispatch} from 'react-redux';
import { CvService } from '../../applicatif/Cv.sa';

export type CVState = {
  CV: any;
  hasCV: boolean;
};

export const enum CVActionType {
  findCV = '[CV] Find User CV',
}

export const initialCVState: CVState = {
  CV: [],
  hasCV: false,
};

export const cvReducer = (state = initialCVState, action) => {
  const {type, payload} = action;
  switch (type) {
    case CVActionType.findCV:
      return {
        ...state,
        hasCV: payload && payload.data !== null,
        CV: payload && payload.data,
      };

    default:
      return state;
  }
};

export const useCV = () => {
  const dispatch = useDispatch();
  const {findUserCv} = CvService();

  return {
    findUserCv: async () => {
      try {
        const payload = await findUserCv();

        //localStorage.setItem(LocalStorageKeys.credentials, JSON.stringify(payload));

        dispatch({
          payload,
          type: CVActionType.findCV,
        });

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};
