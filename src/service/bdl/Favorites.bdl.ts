import urls from "../../data/constants/urls";
import api from "../technique/api";


export const FavoriteBDL = () => ({

    addFavorite: (id: string, token: string) =>
        api.post(`${urls.ADD_FAVORITE}/${id}`, {}, token),

    deleteFavoris: (token: string, id: string) =>
        api.remove(`${urls.REMOVE_FAVORITE}/${id}`, token),

    allFavorites: async (token: string) =>
        api.get(`${urls.ALL_FAVORITE}/`, token)

})
