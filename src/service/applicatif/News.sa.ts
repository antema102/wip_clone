import { NewsBDL } from '../bdl/News.bdl';

export const NewsService = () => {
  const { allNews, getNewsById } = NewsBDL();

  return {
    allNews: async (token: string, category: string) =>
      await allNews(token, category),
    getNewsById: async (id: string) => await getNewsById(id),
  };
};
