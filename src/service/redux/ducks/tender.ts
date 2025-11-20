import {useDispatch} from 'react-redux';
import { UserSA } from '../../applicatif/User.sa';

export type TenderState = {
  dataCategory: any;
};

export const enum TenderActionType {
  setTenderCategory = '[Tender] Set register status'}

export const initialTenderState: TenderState = {
  dataCategory: []};

export const tenderReducer = (state = initialTenderState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TenderActionType.setTenderCategory:
      return {
        ...state,
        dataCategory: payload.data};
    default:
      return state;
  }
};

export const useTender = () => {
  const dispatch = useDispatch();
  const {getAllTendersCategory} = UserSA();
  return {
    getTenderCategory: async (data, token) => {
      try {
        const payload = await getAllTendersCategory(data, token);
        dispatch({
          payload,
          type: TenderActionType.setTenderCategory});
        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    }};
};
