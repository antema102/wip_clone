import { NewsBDL } from '../bdl/News.bdl';


export const NewsService = () => {

	const { allNews, getNewsById } = NewsBDL();

	return {
		allNews: (token: string, category: string) =>
			allNews(token, category)
		,
		getNewsById: (id: string) =>
			getNewsById(id)
		}
}
