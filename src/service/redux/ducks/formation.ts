import {useDispatch} from 'react-redux';
import { FormationSA } from '../../applicatif/Formation.sa';

export type FormationState = {};

export const enum formationActionType {
  allFormations = '[Formations] get all',
  createFormation = '[Formation] create',
  allFormationsByCompany = '[Formation] get all by id company',
  deleteFormation = '[Formation] delete'}

export const initialFormationState: FormationState = {};

export const formationReducer = (state = initialFormationState, action) => {
  const {type, payload} = action;
  switch (type) {
    case formationActionType.allFormations:
      return {
        ...state,
        allFormation: payload};
    case formationActionType.allFormationsByCompany:
      return {
        ...state,
        allFormation: payload};
    case formationActionType.createFormation:
      return {
        ...state,
        CreateFormation: payload};
    case formationActionType.deleteFormation:
      return {
        ...state,
        deleteFormation: payload};
    default:
      return state;
  }
};

export const useFormation = () => {
  const dispatch = useDispatch();
  const {createFormation, findAll, findAllByCompanyId, deleteFormation} =
    FormationSA();

  return {
    createFormation: async (body: any) => {
      try {
        const res = await createFormation(body);
        const payload = res?.data;
        dispatch({
          payload,
          type: formationActionType.createFormation});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    findAllFormation: async (token: string) => {
      try {
        const res = await findAll(token);
        const payload = res?.data;
        dispatch({
          payload,
          type: formationActionType.allFormations});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    findAllFormationByCompanyId: async (idCompany: string, token: string) => {
      try {
        const res = await findAllByCompanyId(idCompany, token);
        const payload = res?.data;
        dispatch({
          payload,
          type: formationActionType.allFormationsByCompany});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    deleteFormationByID: async (idFormation: string, token: string) => {
      try {
        const res = await deleteFormation(idFormation, token);
        const payload = res?.data;
        dispatch({
          payload,
          type: formationActionType.deleteFormation});

        return payload;
      } catch (error) {
        return Promise.reject(error);
      }
    }};
};
