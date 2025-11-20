import api from '../technique/api';
import urls from '../../data/constants/urls';
import blobVideo from '../technique/displayVideoBlob';

export const SpotVideoBDL = () => ({

getDefaultSpotVideo: async (category:string, token: string) =>
    await api.get(`${urls.DEFAULT_SPOT_VIDEO}/all/${category}`, token),
getDefaultSpotById: async (id: string, token: string, setDownloadProgressBar: any) => {
    return blobVideo.displayVideoWithProgress(
        `${urls.DEFAULT_SPOT_VIDEO}/${id}`,
        token,
        setDownloadProgressBar,
      );
}
});
