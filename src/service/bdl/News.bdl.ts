import api from "../technique/api";
import urls from "../../data/constants/urls";

export const NewsBDL = () => ({
	allNews: async (token: string, category: string) =>
		await api.get(urls.ALL_NEWS, token, {category}),
	getNewsById: async (id: string) => 
		await api.get(`${urls.ALL_NEWS}${id}`, '')})
