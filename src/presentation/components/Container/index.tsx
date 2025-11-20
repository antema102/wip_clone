import React, { Fragment, useEffect, useState } from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useSelector } from 'react-redux';
import ProfilEntreprise from '../DetailProfilEntreprise';
import TopNavigation from '../TopNavigation';
import ProfilCandidat from '../DetailProfilCandidat';
import SideBarCandidat from '../SideBarCandidat';
import styles from './styles';
import './styles.css';
import SidebarEnterPrise from '../SidebarEnterPrise';

import { useLang } from '../../../data/translation';
import { useMobile } from '../../../service/hooks/useMobile';
import StickyContainer from '../StickyContainer';
import CarouselBannerAds from '../carouselBannerAds';
import SidebarEnterPriseChat from '../SideBarChat';
import Popup from '../CreateCV/Popup';
import { NEWS } from '../../../data/constants/strings';
import * as stringsEn from '../../../data/constants/strings_en';
import * as stringsFr from '../../../data/constants/strings';

import ImageGalleria from '../ImageGalleria';
import VideoAdvertisement from '../VideoAdvertisement';

import { ROLEACCOUNT } from '../../../data/constants/strings';
import { CVService } from '../../../service/applicatif/curriculumVitae.sa';
import { UserSA } from '../../../service/applicatif/User.sa';

import { calculateAge } from '../../../data/factory/dateFactory';

interface filtredPropos {
  category?: string,
  salary?: number,
  activityArea?: string,
  hobby?: string,
  child?: boolean | undefined,
  age?: number,
  transport?: string,
  pet?: string,
  withCV?: boolean,
  audience?: number,
  [key: string]: any
}

interface ImageDisplay {
  img: string;
  title: string;
  alt: string;
  link: string;
}

interface Images {
  image: string;
  name: string;
  description: string;
  link: string;
  id: string;
}

type dataImagePropos = Images[];

const Container = ({ MainContent }: { MainContent: React.ReactNode }): JSX.Element => {

  const { isMobile } = useMobile();

  const { user, accessToken } = useSelector(({ auth }: any) => auth);
  const { isServerDown, isTokenExpired } = useSelector(({ app }) => app);
  const [isExpiredToken, setIsExpiredToken] = useState<boolean>(false);

  const [popupImage, setPopupImage] = useState<ImageDisplay[]>([]);
  const [visibleVideo, setVisibleVideo] = useState(false);
  const [visible, setVisible] = useState(false);
  const [firstItem, setFirstItem] = useState(0);
  const [showQuit, setShowQuit] = useState(false);
  const [linkVideo, setLinkVideo] = useState();
  const [filePathVideo, setFilePathVideo] = useState('');
  const [showQuitVideo, setShowQuitVideo] = useState(false);

  const navigate = useNavigate();
  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  const { getAdvertisementForWeb, getAdvertisementsByCategory, countClickAdvertisement } = UserSA();
  const { getCVByIdUser } = CVService();

  const excludedRoutes = [
    '/EnterpriseOfferDetailsScreen',
    '/EntResultScreen',
    '/CandidatDetailScreen',
    '/EnterpriseOfferSheetApplyScreen',
    '/EnterpriseOfferSheetScreen',
    '/NewsInformationScreen',
    '/NewsInformationScreenDescription',
    '/profilCandidat',
    '/chat'
  ];

  const shouldDisplayCarousel = !(
    excludedRoutes.includes(location.pathname) ||
    location.pathname.startsWith('/chat/')
  );

  const excludedRoutesChat = [
    '/chat'
  ];

  const shouldDisplayChatIA = !(
    excludedRoutesChat.includes(location.pathname) ||
    location.pathname.startsWith('/chat/')
  );

  useEffect(() => {
    if (isServerDown) {
      navigate('/Maintenance');
    }
  }, [isServerDown]);

  useEffect(() => {
    if (isTokenExpired) {
      setIsExpiredToken(isTokenExpired);
    }
  }, [isTokenExpired]);

  const condition = user?.role === activeString.ROLEACCOUNT.company && !user?.abonnementId

  const storeElementNumber = async (solde: any) => {
    await localStorage.setItem('elementNumber', JSON.stringify(solde));
  };

  const getRandomNumber = async (max: number) => {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * (max + 1));
    return randomNumber;
  }

  const getAdvertisement = async (type: string) => {
    const initialElement = localStorage.getItem('elementNumber') || '1';
    const elementNumber = parseInt(initialElement);
    let filtered: filtredPropos;
    if (user?.role === ROLEACCOUNT.candidate) {
      let salary;
      let activityArea;
      let hobby;
      let child;
      let age;
      let transport;
      let pet;
      const res = await getCVByIdUser(accessToken, user?.id);
      if (res.data.user && !res?.isError) {
        salary = res?.data?.jobWish?.salaryExpectation;
        activityArea = res?.data?.jobWish?.sector;
        hobby = res?.data?.sport[0];
        child = res?.data?.user?.childrenNumber !== 0;
        age = calculateAge(res?.data?.user?.birthDate);
        transport = res?.data?.transport;
        pet = res?.data?.pet;
      }
      if (salary && activityArea && hobby && age && pet && transport) {
        filtered = {
          category: type,
          salary: salary,
          activityArea: activityArea,
          hobby: hobby,
          child: child,
          age: age,
          transport: transport,
          pet: pet,
          withCV: true,
          audience: user?.role === ROLEACCOUNT.candidate ? 0 : 1};
        if (type === 'video') {
          filtered.elementNumber = elementNumber;
        }
      } else {
        filtered = {
          category: type,
          withCV: false,
          audience: user?.role === ROLEACCOUNT.candidate ? 0 : 1};

        if (type === 'video') {
          filtered.elementNumber = elementNumber;
        }
      }

      const data = type === 'video' ? await getAdvertisementForWeb(filtered, accessToken) : await getAdvertisementsByCategory(filtered, accessToken);

      if (type == 'video') {
        const responseVideo = data?.data?.items;
        if (responseVideo && responseVideo.length !== 0) {
          const videoBase64 = responseVideo[0].image;
          countClickAdvertisement(responseVideo[0].id, accessToken);
          setLinkVideo(responseVideo[0].link)
          setFilePathVideo(videoBase64);
          storeElementNumber(elementNumber + 1);
        } else {
          storeElementNumber(1);
        }
      } else {
        const responseImage: dataImagePropos = data?.data?.items;
        if (responseImage) {
          const dataImage: ImageDisplay[] = responseImage.map(item => {
            return {
              img: item.image,
              title: item.name,
              alt: item.description,
              link: item.link};
          });
          const itemToPutFirst = await getRandomNumber(dataImage?.length - 1);
          countClickAdvertisement(responseImage[itemToPutFirst].id, accessToken);
          setFirstItem(itemToPutFirst)
          setPopupImage(dataImage);
        }
      }

    } else {
      filtered = {
        category: type,
        withCV: false,
        audience: user?.role === ROLEACCOUNT.candidate ? 0 : 1};
      if (type === 'video') {
        filtered.elementNumber = elementNumber;
      }
      const data = type === 'video' ? await getAdvertisementForWeb(filtered, accessToken) : await getAdvertisementsByCategory(filtered, accessToken);
      if (type == 'video') {
        const responseVideo = data?.data?.items;
        if (responseVideo && responseVideo.length !== 0) {
          const videoBase64 = responseVideo[0].image;
          countClickAdvertisement(responseVideo[0].id, accessToken);
          setLinkVideo(responseVideo[0].link)
          setFilePathVideo(videoBase64);
          storeElementNumber(elementNumber + 1);
        } else {
          storeElementNumber(1);
        }
      } else {
        const responseImage: dataImagePropos = data?.data?.items;
        if (responseImage) {
          const dataImage: ImageDisplay[] = responseImage.map(item => {
            return {
              img: item.image,
              title: item.name,
              alt: item.description,
              link: item.link};
          });
          const itemToPutFirst = await getRandomNumber(dataImage?.length - 1)
          countClickAdvertisement(responseImage[itemToPutFirst].id, accessToken);
          setFirstItem(itemToPutFirst)
          setPopupImage(dataImage);
        }
      }
    }
  }

  const FgTask = () => {
    const interveral = setInterval(async () => {
      if (accessToken) {
        await getAdvertisement('image');
        setVisible(true);
        setTimeout(() => {
          setShowQuit(true);
        }, 5000);
        setTimeout(() => {
          setShowQuit(false);
          setVisible(false);
        }, 15000);
      }
    }, 120000);
    return interveral;
  };

  useEffect(() => {
    const interveral = FgTask();
    return () => clearInterval(interveral);
  }, []);

  return (<Fragment>
    {accessToken && popupImage && <ImageGalleria visible={visibleVideo ? false : visible} firstItem={firstItem} setVisible={setVisible} data={popupImage} showQuit={showQuit} />}
    {accessToken && filePathVideo ? <VideoAdvertisement setShowQuitVideo={setShowQuitVideo} link={linkVideo} filePath={filePathVideo} visible={visibleVideo} setVisible={setVisibleVideo} showQuit={showQuitVideo} /> : null}
    <TopNavigation />
    {isMobile ? (
      <>
        <Splitter style={styles.splitterContainerMobile}>
          <SplitterPanel>
            {shouldDisplayCarousel && <CarouselBannerAds />}
            {MainContent}
          </SplitterPanel>
        </Splitter>
      </>
    )
      :
      (
        <>
          <Splitter
            style={
              isMobile ?
                styles.splitterContainerMobile :
                styles.splitterContainer
            }
            className='main__content'
          >
            <SplitterPanel
              style={{
                paddingTop: 16,
                zIndex: 1
              }}
              size={25}
            >
              {condition ? null : user?.role === 'candidate' ?
                <StickyContainer top={95}>
                  <SideBarCandidat />
                </StickyContainer>
                :
                <StickyContainer top={95}>
                  {!shouldDisplayChatIA ?
                    <SidebarEnterPriseChat /> :
                    <SidebarEnterPrise />}
                </StickyContainer>
              }
            </SplitterPanel>
            <SplitterPanel
              style={{ paddingTop: 16, zIndex: 1 }}
              size={50}
            >
              {shouldDisplayCarousel && <CarouselBannerAds />}
              {MainContent}
            </SplitterPanel>
            <SplitterPanel
              size={25}
              style={{ paddingTop: 16, zIndex: 1 }}
            >
              {condition ? null : user?.role === 'candidate' ?
                <StickyContainer top={75}>
                  <ProfilCandidat />
                </StickyContainer>
                :
                <StickyContainer top={75}>
                  <ProfilEntreprise />
                </StickyContainer>
              }
            </SplitterPanel>
          </Splitter>
        </>
      )}
    <Popup
      message={NEWS.EXPIRED}
      visible={isExpiredToken}
      validation={setIsExpiredToken}
      btnTitle="ok"
      expired
    />
  </Fragment>
  );
};

export default Container;
