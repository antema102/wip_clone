import { FavoriteBDL } from "../bdl/Favorites.bdl";

export const FavoritesSA = () => {

    const { addFavorite, deleteFavoris, allFavorites } = FavoriteBDL();


    return {
        addFavorite: (token: string, id: string) =>
            addFavorite(id, token),

        deleteFavoris: (token: string, id: string) =>
            deleteFavoris(token, id),

        allFavorites: (token: string) =>
            allFavorites(token),
    }

}
