import {useDispatch} from 'react-redux';

export type PaymentState = {};

export const enum paymentActionType {
  dispatchUser = '[payment] dispatch User',
}

export const initialPaymentState: PaymentState = {};

export const paymentReducer = (state = initialPaymentState, action) => {
  const {type, payload} = action;
  switch (type) {
    case paymentActionType.dispatchUser:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export const storeSoldeWip = async (solde: any) => {
  await localStorage.setItem('soldeWip', JSON.stringify(solde));
};

export const usePayment = () => {
  const dispatch = useDispatch();

  return {
    dispatchUser: async (currentUser: any) => {
      try {
        const payload = currentUser;
        dispatch({
          payload,
          type: paymentActionType.dispatchUser,
        });

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};
