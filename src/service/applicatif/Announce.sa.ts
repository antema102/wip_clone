import { AnnounceBDL } from "../bdl/Announce.bdl";

export const AnnounceService = () => {
  const {allAnnounce, getAnnouncesByCategoryName} = AnnounceBDL();

  return {
    allAnnounce: (token: string) => allAnnounce(token),
    getAnnouncesByCategoryName: (token: string, name: string) =>
      getAnnouncesByCategoryName(token, name),
  };
};
