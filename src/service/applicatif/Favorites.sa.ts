import { FavoriteBDL } from '../bdl/Favorites.bdl';

export const FavoritesSA = () => {
  const { addFavorite, deleteFavoris, allFavorites } = FavoriteBDL();

  return {
    addFavorite: async (token: string, id: string) =>
      await addFavorite(id, token),

    deleteFavoris: async (token: string, id: string) =>
      await deleteFavoris(token, id),

    allFavorites: async (token: string) => await allFavorites(token),
  };
};
