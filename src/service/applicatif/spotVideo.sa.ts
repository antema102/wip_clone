import { SpotVideoBDL } from '../bdl/spotVideo.bdl';

export const DefaultSpotSA = () => {
  const { getDefaultSpotVideo, getDefaultSpotById } = SpotVideoBDL();

  return {
    allDefaultSpotVideos: async (category: string, token: string) =>
      await getDefaultSpotVideo(category, token),
    getSpotDefaultById: async (
      id: string,
      token: string,
      setDownloadProgressBar: any
    ) => await getDefaultSpotById(id, token, setDownloadProgressBar),
  };
};
