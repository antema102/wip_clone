import { AnnounceBDL } from '../bdl/Announce.bdl';

export const AnnounceService = () => {
  const { allAnnounce, getAnnouncesByCategoryName } = AnnounceBDL();

  return {
    allAnnounce: async (token: string) => await allAnnounce(token),
    getAnnouncesByCategoryName: async (token: string, name: string) =>
      await getAnnouncesByCategoryName(token, name),
  };
};
