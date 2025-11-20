import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import 'primeicons/primeicons.css';
import { DataView } from 'primereact/dataview';
import { useSelector } from 'react-redux';
import { stylesCard } from './styles';
import MiniLoader from '../MiniLoader';
import VideoPlayer from '../VideoPlayer';
import { DefaultSpotSA } from '../../../service/applicatif/spotVideo.sa';

interface fileVideoType {
  data: any;
  status: number;
}

const DefaultSideBar = (): any => {
  const [spotData, setSpotData] = useState<string[]>();
  const [fileVideo, setFileVideo] = useState<string | fileVideoType>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idActive, setIdActive] = useState<string>();
  const { accessToken, user } = useSelector(({ auth }) => auth);
  const { allDefaultSpotVideos, getSpotDefaultById } = DefaultSpotSA();
  const [progressBar, setProgressBar] = useState(0);

  const itemTemplate = (data: any) => {
    const spotImage = `${data?.thumbnail}`;
    return (
      <TouchableOpacity style={stylesCard.card} onPress={async () => showingTheVideo(data?._id)}>
        <View style={{ flex: 1 }}>
          {
            (fileVideo !== '' && idActive === data?._id) ? (
              <VideoPlayer width={'100%'} height={200} filePath={typeof fileVideo === 'string' ? fileVideo : fileVideo?.data} poster={spotImage} isStyled={false} />
            ) : (<>
              <img style={stylesCard.image} src={spotImage} />
            </>)
          }
          {((idActive === data?._id) && isLoading) && <MiniLoader />}
        </View>
        <View style={stylesCard.cardBody}>
          <Text style={stylesCard.price}>{data?.name}</Text>
          <Text numberOfLines={4} style={stylesCard.address}>{data?.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getAllSpotVideo = async () => {
    const category = user?.role === 'company' ? 'company' : 'candidate';
    try {
      const responseSpot = await allDefaultSpotVideos(category, accessToken);
      if (responseSpot?.data?.length) {
        setSpotData(responseSpot?.data);
      }
    } catch (error) {
    }
  };

  const showingTheVideo = async (id: string) => {
    setIdActive(id);
    setIsLoading(true);
    const response = await getSpotDefaultById(id, accessToken, setProgressBar);
    setFileVideo(response);
    setIsLoading(false);
  };

  return (
    <>
      {spotData?.length ?
        <DataView
          value={spotData}
          itemTemplate={itemTemplate}
          paginator
          rows={2}
          paginatorTemplate="PrevPageLink PageLinks NextPageLink"
          paginatorClassName='left'
        /> : null}
    </>
  );
};

export default DefaultSideBar;
