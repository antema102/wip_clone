import { useDispatch } from 'react-redux';
//import { LocalStorageKeys } from '../../data/constants/LocalStorageKeys';
import { InscriptionService } from '../../applicatif/Inscription.sa';

export type InscriptionState = {
  userRegistered: any,
  accessTokenRegistered: string
  credentials: any
};

export const enum InscriptionActionType {
  setIsRegister = '[Inscription] Set register status',
  setIsRegisterInitiate = '[Inscription] Set register status initiate',
  updateCredentials = '[Inscription] Update credentials',
  error = '[Inscription] Error Register',
}

export const initialInscriptionState: InscriptionState = {
  userRegistered: {},
  accessTokenRegistered: '',
  credentials: {}
};

export const inscriptionReducer = (state = initialInscriptionState, action) => {

  const { type, payload } = action;

  switch (type) {
    case InscriptionActionType.setIsRegister:
      return {
        ...state,
        userRegistered: payload.data,
        accessTokenRegistered: payload?.data?.accessToken
      };
    case InscriptionActionType.updateCredentials:
      return {
        ...state,
        credentials: payload,
      };
    case InscriptionActionType.setIsRegisterInitiate:
      return {
        ...state,
        userRegistered: null,
        accessTokenRegistered: null
      };

    default:
      return state;
  }
};

export const useInscription = () => {
  const dispatch = useDispatch();
  const { inscription } = InscriptionService();

  return {
    setRegisterStatus: (payload) => dispatch({ payload, type: InscriptionActionType.setIsRegister }),
    setRegisterStatusInitiate: () => dispatch({ payload: initialInscriptionState.credentials, type: InscriptionActionType.setIsRegisterInitiate }),
    updateCredentials: (payload) => dispatch({ payload, type: InscriptionActionType.updateCredentials }),
    inscription: async (data) => {
      try {
        const payload = await inscription({ data });

        //localStorage.setItem(LocalStorageKeys.credentials, JSON.stringify(payload));

        dispatch({
          payload,
          type: InscriptionActionType.setIsRegister,
        });

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};


