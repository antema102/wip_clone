import { useDispatch } from 'react-redux';
//import { LocalStorageKeys } from '../../data/constants/LocalStorageKeys';
import { UserSA } from '../../applicatif/User.sa';

export type UserState = {
  notifications: any;
  badge: any;
  hasMyCV: boolean;
  hasMyVideo: boolean;
};

export const enum userActionType {
  updateUser = '[User] update user',
  updatePassword = '[User] update password',
  desactivateAccount = '[User] deasctivate password',
  getUser = '[User] get User ',
  setNotifications = '[User] set Notifications ',
  setBadge = '[User] set Badge ',
  setHasMyCV = '[User] set hasMyCV',
  setHasMyVideo = '[User] set hasMyVideo '}

export const initialUserState: UserState = {
  notifications: {},
  badge: 0,
  hasMyCV: false,
  hasMyVideo: false};

export const userReducer = (state = initialUserState, action) => {
  const { type, payload } = action;
  switch (type) {
    case userActionType.updateUser:
      return {
        ...state,
        updateUser: payload};
    case userActionType.setNotifications:
      return {
        ...state,
        notifications: payload};
    case userActionType.setBadge:
      return {
        ...state,
        badge: payload};
    case userActionType.updatePassword:
      return {
        ...state,
        updatePassword: payload};
    case userActionType.desactivateAccount:
      return {
        ...state,
        desactivateAccount: payload};
    case userActionType.setHasMyCV:
      return {
        ...state,
        hasMyCV: payload};
    case userActionType.setHasMyVideo:
      return {
        ...state,
        hasMyVideo: payload};
    default:
      return state;
  }
};

export const useUser = () => {
  const dispatch = useDispatch();
  const {
    updateUser,
    updatePassword,
    desactivateAccount,
    getUserById,
    updateUserMessage} = UserSA();
  const setCounter = async (count: number) => {
    return count;
  };

  const setBooleanValue = async (value: boolean) => {
    return value;
  };

  return {
    getUserById: async (idUser: string, token: string) => {
      try {
        const payload = await getUserById(idUser, token);
        dispatch({
          payload,
          type: userActionType.getUser});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    updateUser: async (token: string, idUser: string, data: any) => {
      try {
        const payload = await updateUser(token, idUser, { data });
        dispatch({
          payload,
          type: userActionType.updateUser});
        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    updatePassword: async (token: string, password: string) => {
      try {
        const payload = await updatePassword(token, password);
        dispatch({
          payload,
          type: userActionType.updatePassword});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    desactivateAccount: async (token: string) => {
      try {
        const payload = await desactivateAccount(token);
        dispatch({
          payload,
          type: userActionType.desactivateAccount});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    updateUserMessage: async (data: any) => {
      try {
        const payload = await updateUserMessage({ data });

        dispatch({
          payload,
          type: userActionType.setNotifications});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    notificationCounter: async (counter: number) => {
      try {
        const payload = await setCounter(counter);

        dispatch({
          payload,
          type: userActionType.setBadge});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    updateHasMyCV: async (value: boolean) => {
      try {
        const payload = await setBooleanValue(value);
        dispatch({
          payload,
          type: userActionType.setHasMyCV});
        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    updateHasMyVideo: async (value: boolean) => {
      try {
        const payload = await setBooleanValue(value);
        dispatch({
          payload,
          type: userActionType.setHasMyVideo});
        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    }};
};
