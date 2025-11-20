import { SpotVideoBDL } from '../bdl/spotVideo.bdl';


export const DefaultSpotSA = () => {

	const { getDefaultSpotVideo, getDefaultSpotById } = SpotVideoBDL();

	return {
		allDefaultSpotVideos: (category:string, token: string) => getDefaultSpotVideo(category,token),
		getSpotDefaultById: (id: string, token: string, setDownloadProgressBar: any) => getDefaultSpotById(id, token, setDownloadProgressBar)
	}
}
