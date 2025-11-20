import { useDispatch } from "react-redux";

//const dispatch = useDispatch();
export type AppState = {
  isServerDown: boolean,
  isTokenExpired: boolean
};

export const enum AppActionType {
  setIsServerDown = '[App] Set server dowwn',
  setIsTokenExpired = '[App] Set expired token'}

export const initialAppState: AppState = {
  isServerDown: false,
  isTokenExpired: false
};

export const appReducer = (state = initialAppState, action) => {

  const { type, payload } = action;
  switch (type) {
    case AppActionType.setIsServerDown:
      return {
        ...state,
        isServerDown: payload};
    case AppActionType.setIsTokenExpired:
        return {
          ...state,
          isTokenExpired: payload};
    default:
      return {
        ...state

      };
  }
};


export function setServerStatus(payload) {
  return {
    type: AppActionType.setIsServerDown,
    payload
  }
}

export function setTokenStatus(payload) {
  return {
    type: AppActionType.setIsTokenExpired,
    payload
  }
}




