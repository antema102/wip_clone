import { useDispatch } from 'react-redux';
import { AuthService } from '../../applicatif/Auth.sa';
import { InscriptionActionType } from './inscription';

export type AuthState = {
  user: any;
  accessToken: string;
  credentials: any;
};

export const enum AuthActionType {
  setIsLogin = '[Auth] Set login status',
  setIsLoginWithGoogle = '[Auth] Set login status google',
  updateCredentials = '[Auth] Update credentials',
  error = '[Auth] Error Login',
  logOut = '[Auth] Logout',
}

export const initialAuthState: AuthState = {
  user: [],
  accessToken: '',
  credentials: {},
};

export const authReducer = (state = initialAuthState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionType.setIsLogin:
      return {
        ...state,
        user: payload?.data?.user,
        accessToken: payload?.data?.accessToken,
      };

    case AuthActionType.setIsLoginWithGoogle:
      return {
        ...state,
        user: payload?.data?.user,
        accessToken: payload?.data?.accessToken,
      };

    case InscriptionActionType.setIsRegister:
      return {
        ...state,
        user: payload?.data?.user,
        accessToken: payload?.data?.accessToken,
      };
    case AuthActionType.updateCredentials:
      return {
        ...state,
        user: payload,
      };
    case AuthActionType.logOut:
      return {
        ...state,
        user: null,
        accessToken: null,
      };
    default:
      return state;
  }
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const { loginWithEmail, logOut, loginWithGoogle } = AuthService();

  return {
    setLoginStatus: (payload) =>
      dispatch({ payload, type: AuthActionType.setIsLogin }),
    updateCredentials: (payload) =>
      dispatch({ payload, type: AuthActionType.updateCredentials }),
    loginWithEmail: async (data) => {
      try {
        const payload = await loginWithEmail({ data });
        dispatch({
          payload,
          type: AuthActionType.setIsLogin,
        });

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    loginWithGoogle: async (data: any) => {
      try {
        const payload = await loginWithGoogle(data);
        dispatch({
          payload,
          type: AuthActionType.setIsLoginWithGoogle,
        });
        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    logOut: () => {
      dispatch({
        type: AuthActionType.logOut,
        payload: initialAuthState.credentials,
      });
    },
  };
};

export const useResetCredentials = () => {
  const dispatch = useDispatch();

  return {
    signout: () => {
      dispatch({
        type: AuthActionType.updateCredentials,
        payload: initialAuthState.credentials,
      });
    },
  };
};
