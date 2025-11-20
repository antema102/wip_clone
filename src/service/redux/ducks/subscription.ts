import {useDispatch} from 'react-redux';
import { SubscriptionSA } from '../../applicatif/Subscription.sa';

export type SubscriptionState = {};

export const enum subscriptionActionType {
  allSubscriptions = '[Subscriptions] get all'}

export const initialSubscriptionState: SubscriptionState = {};

export const subscriptionReducer = (
  state = initialSubscriptionState,
  action,
) => {
  const {type, payload} = action;
  switch (type) {
    case subscriptionActionType.allSubscriptions:
      return {
        ...state,
        allSubscription: payload};
    default:
      return state;
  }
};

export const useSubscription = () => {
  const dispatch = useDispatch();
  const {getAllSubscriptionByRole} = SubscriptionSA();

  return {
    getAllSubscriptionByRole: async (token: string) => {
      try {
        const res = await getAllSubscriptionByRole(token);
        const payload = res?.data?.items;
        dispatch({
          payload,
          type: subscriptionActionType.allSubscriptions});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    }};
};
