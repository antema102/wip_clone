import urls from '../../data/constants/urls';
import api from '../technique/api';

export const FavoriteBDL = () => ({
  addFavorite: async (id: string, token: string) =>
    await api.post(`${urls.ADD_FAVORITE}/${id}`, {}, token),

  deleteFavoris: async (token: string, id: string) =>
    await api.remove(`${urls.REMOVE_FAVORITE}/${id}`, token),

  allFavorites: async (token: string) =>
    await api.get(`${urls.ALL_FAVORITE}/`, token),
});
