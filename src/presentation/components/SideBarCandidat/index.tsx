import React, { useEffect, useState, useRef } from 'react';
import 'primeicons/primeicons.css';
import { DataView } from 'primereact/dataview';
import './styles.css';
import { UserSA } from '../../../service/applicatif/User.sa';
import { useSelector } from 'react-redux';
import { stylesCard } from './styles';
import MiniLoader from '../MiniLoader';
import VideoPlayer from '../VideoPlayer';
import DefaultSideBar from '../DefaultSideBar';
import { COLORS, images } from '../../../resources/constants';
import AppelOffers from '../AppelOffers';
import { OfferService } from '../../../service/applicatif/Offer.sa';
import { useTender } from '../../../service/redux/ducks/tender';
import { ROLEACCOUNT } from '../../../data/constants/strings';
import { useNavigate } from 'react-router-dom';
import AdsSideBar from '../AdsSidebar';
import { Carousel } from 'primereact/carousel';
const SideBarCandidat = (): any => {
  const [spotData, setSpotData] = useState<any>();
  const [fileVideo, setFileVideo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [idActive, setIdActive] = useState();
  const { accessToken, user } = useSelector(({ auth }) => auth);
  const { getAdvertisementsByCategory, getSpotVideoById } = UserSA();
  const { getAllPostsAvailable } = OfferService();
  const { getTenderCategory } = useTender();
  const [listDatas, setListDatas] = useState();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const { dataCategory } = useSelector(({ tender }: any) => tender);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigation = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    if (spotData.length > 1) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % spotData.length);
    } else {
      const videoElement = document.getElementById(
        'single-video'
      ) as HTMLVideoElement;
      if (videoElement) {
        videoElement.currentTime = 0;
        videoElement.play();
      }
    }
  };

  const itemTemplate = (data: any) => {
    const spotImage = `${data?.thumbnail}`;
    return (
      <button
        style={stylesCard.card}
        onClick={async () => {
          showingTheVideo(data?.id);
        }}
      >
        <div style={{ flex: 1 }}>
          {fileVideo !== '' && idActive === data?.id ? (
            <VideoPlayer
              width={'100%'}
              height={150}
              filePath={fileVideo}
              poster={spotImage}
              isStyled={false}
            />
          ) : (
            <>
              <img
                style={stylesCard.image}
                src={data?.thumbnail ? spotImage : images.thumbnail}
              />
            </>
          )}
          {idActive === data?.id && isLoading && <MiniLoader />}
        </div>
        <div style={stylesCard.cardBody}>
          <span style={stylesCard.price}>{data?.name}</span>
          <span numberOfLines={4} style={stylesCard.address}>
            {data?.description}
          </span>
        </div>
      </button>
    );
  };

  const getAllSpotVideo = async () => {
    const dataSpot = {
      category: 'spot',
      audience: user?.role === 'company' ? 1 : 0,
    };
    try {
      const responseSpot = await getAdvertisementsByCategory(
        dataSpot,
        accessToken
      );
      if (responseSpot?.data?.items?.length) {
        setSpotData(responseSpot?.data?.items);
      }
    } catch (error) {}
  };

  const showingTheVideo = (id: any) => {
    setIdActive(id);
    setIsLoading(true);
    getSpotVideoById(accessToken, id)
      .then((response) => {
        setFileVideo(response?.data?.image);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const reidirectionTender = (index: any, item: string) => {
    navigation('/ListScreen', {
      state: {
        title: "Liste des appels d'offres",
        companyName: item,
      },
    });
  };

  useEffect(() => {
    getAllSpotVideo();
  }, [spotData]);

  useEffect(() => {
    if (videoRef.current != null) {
      videoRef.current.volume = 0.05; // Définit le volume à 5% dès le lancement
    }
  }, []);

  return (
    <div
      style={
        user.role === 'candidate'
          ? [stylesCard.container, stylesCard.propertyListContainer]
          : {}
      }
    >
      {user.role === 'candidate' && <AdsSideBar />}
      {spotData?.length ? (
        <div
          style={
            user.role === 'candidate'
              ? { height: 250, marginTop: 50 }
              : { height: 250 }
          }
        >
          <video
            ref={videoRef}
            key={activeIndex}
            id={spotData.length === 1 ? 'single-video' : undefined}
            width="100%"
            height="100%"
            autoPlay
            muted
            controls
            style={{ borderRadius: 10, objectFit: 'cover' }}
            onEnded={handleVideoEnd}
          >
            <source src={spotData[activeIndex]?.image} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <DefaultSideBar />
      )}
    </div>
  );
};

export default React.memo(SideBarCandidat);
