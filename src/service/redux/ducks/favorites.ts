import { useDispatch } from 'react-redux';
import { FavoritesSA } from '../../applicatif/Favorites.sa';
// import { LocalStorageKeys } from '../../data/constants/LocalStorageKeys';

export interface FavoritesState {}

export const enum favoritesActionType {
  allFavoris = '[Favoris] get all',
  deleteFavoris = '[Favoris] delete favoris',
  addFavoris = '[Favoris] add favoris',
}

export const initialFavoritesState: FavoritesState = {};

export const favoritesReducer = (state = initialFavoritesState, action) => {
  const { type, payload } = action;
  switch (type) {
    case favoritesActionType.allFavoris:
      return {
        ...state,
        allFavorites: payload,
      };
    case favoritesActionType.addFavoris:
      return {
        ...state,
        addFavoris: payload,
      };
    case favoritesActionType.deleteFavoris:
      return {
        ...state,
        deleteFavoris: payload,
      };
    default:
      return state;
  }
};

export const useFavorites = () => {
  const dispatch = useDispatch();
  const { addFavorite, deleteFavoris, allFavorites } = FavoritesSA();

  return {
    addFavorite: async (token: string, id: string) => {
      try {
        const payload = await addFavorite(token, id);
        dispatch({
          payload,
          type: favoritesActionType.addFavoris,
        });

        return payload;
      } catch (error) {
        return await Promise.reject(error);
      }
    },
    deleteFavoris: async (token: string, id: string) => {
      try {
        const payload = await deleteFavoris(token, id);
        dispatch({
          payload,
          type: favoritesActionType.deleteFavoris,
        });

        return payload;
      } catch (error) {
        return await Promise.reject(error);
      }
    },
    allFavorites: async (token: string) => {
      try {
        const payload = await allFavorites(token);
        dispatch({
          payload,
          type: favoritesActionType.allFavoris,
        });

        return payload;
      } catch (error) {
        return await Promise.reject(error);
      }
    },
  };
};
