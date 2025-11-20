
import { useSelector } from 'react-redux';
import * as React from 'react';
import { useState } from 'react';
import styles from './styles';
import { NewsTab } from './NewsTab';
import { OfferTab } from './OfferTab';
import { UserSA } from '../../../../../service/applicatif/User.sa';
import { UploadFileService } from '../../../../../service/applicatif/UploadFile.sa';
import { HttpStatus } from '../../../../../data/constants/Http-status';
import Avatar from '../../../../components/DetailProfil/UploadFile/UploadAvatar';
import Tabs from '../../../../components/Tab';
import Loader from '../../../../components/Loader';
import { useOfferr } from '../../../../../service/redux/ducks/offer';
import TitleRefont from '../../../../components/TitleRefont';
import { DataView } from 'primereact/dataview';
import { paginatorTemplateCustom } from '../../../../components/PaginatoTemplateCustom';
import FlatOffer from './FlatOffer';
import { Divider } from 'primereact/divider';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../../../../service/hooks/useMobile';
import VideoPlayer from '../../../../components/VideoPlayer';
import Popup from './Popup';
import ItemResult from './itemResult';
import { COLORS, icons, images } from '../../../../../resources/constants';
import MiniLoader from '../../../../components/MiniLoader';
import { useLang } from '../../../../../data/translation';
import * as stringsEn from '../../../../../data/constants/strings_en';
import * as stringsFr from '../../../../../data/constants/strings';
export const EntResult = (props: any) => {
    const [progressBar, setProgressBar] = useState(0);
    const [filePath, setFilePath] = useState('');
    const navigate = useNavigate();
    const { isMobile } = useMobile()
    const { stateValue } = props;
    const { lang } = useLang()
    const activeString = lang === 'fr' ? stringsFr : stringsEn;

    const [isLoading, setIsLoading] = React.useState(true);
    const { accessToken } = useSelector(({ auth }: any) => auth);

    const [profil, setProfil] = React.useState({ name: '', activity: '', yearOfCreation: '', headQuarter: '', url: '', email: '' });
    const [avatar, setAvatar] = React.useState<string>('');

    const { getUserById, displayUserVideoPresentation } = UserSA();
    const { downloadImageById } = UploadFileService();
    const { allOfferJobByEnt } = useOfferr();
    const [offerList, setOfferList] = useState([]);

    const getAvatar = async (id: string) => {
        try {
            const avatarDownloaded: any = await downloadImageById(id, accessToken);
            if (avatarDownloaded) {
                setAvatar(URL.createObjectURL(avatarDownloaded));
            }
        } catch (error) { }
    };

    const getDataUser = async () => {
        try {
            setIsLoading(true)

            const { data }: any = await getUserById(stateValue?.companyId, accessToken);
            if (data) {
                setProfil({ name: `${data?.name}`, activity: `${data?.activity}`, yearOfCreation: `${data?.yearOfCreation}`, headQuarter: `${data?.headQuarter}`, url: `${data?.url}`, email: `${data?.email}` });
            }
        } finally {
           
            getAvatar(stateValue?.companyId);
            setIsLoading(false);
        }
    };


    const getOfferJobById = async () => {
        setIsLoading(true)
        try {
            const response = await allOfferJobByEnt(accessToken, stateValue?.companyId);
            setOfferList(response?.data?.items);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const displayDetail = ItemDetail => {
        navigate('/EnterpriseOfferDetailsScreen', {
            state: {
                id: ItemDetail.id,
                candidat: true,
                typeId: ItemDetail?.type?.id}
        });
    };

    const renderItemTemplate = (item: any) => (
        <div style={{ marginVertical: 16, paddingVertical: 24, backgroundColor: 'rgba(51, 153, 255, 0.1)', borderRadius: 10 }}>
            <FlatOffer
                avatar={avatar}
                key={item.id}
                variable={item}
                displayDetail={displayDetail}
                imageStyle={{ width: 75, height: 75, objectFit: 'cover' }}
            />
        </div>
    );


    const displayVideo = async () => {
        setIsLoading(true);

        const response = await displayUserVideoPresentation(
            stateValue?.companyId,
            accessToken,
            setProgressBar,
            'presentationEntreprise'
        );
        if (response) {
            setFilePath(response);
        }
        setIsLoading(false);
    };

    React.useEffect(() => {
        getDataUser();
        getOfferJobById()
        displayVideo()
    }, []);

    return (

        <div>
            {isLoading ? <Loader /> :
                <>
                    <div style={[styles.containers, styles.contents]}>
                        <div style={styles.containerAvatar}>
                            <img src={avatar ? avatar : images.avatar_6} style={styles.images} />
                            <div style={{ gap: 14 }}>
                                <div>
                                    <span style={styles.textAvatar}>
                                        {profil.name}
                                    </span>
                                </div>
                                <div>
                                    <span style={{ fontSize: 18 }}>
                                        {profil.activity}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={styles.textContent}>
                            <ItemResult label={activeString.ENTERPRISE_OFFER.CREATION} text={profil.yearOfCreation} />
                            <ItemResult label={activeString.ENTERPRISE_OFFER.LIEU} text={profil.headQuarter} />
                            <ItemResult label={activeString.ENTERPRISE_OFFER.EMAIL} text={profil.email} />
                            {profil.url &&
                                <ItemResult label='Site web' text={profil.url} />
                            }
                        </div>
                    </div>

                    <div style={{...styles.containers, backgroundColor: COLORS.white, marginTop: 60, borderRadius: 10, ...(isMobile ? {} : { paddingVertical: 24, paddingHorizontal: 70 })}}>
                        <TitleRefont title={activeString.TAB.OFFERS} />
                        <div style={{ padding: 10 }}>
                            {
                            isLoading ? <MiniLoader /> :
                                <DataView
                                    value={offerList}
                                    layout="list"
                                    itemTemplate={renderItemTemplate}
                                    {...
                                    (!isMobile
                                        ? {
                                            paginator: true,
                                            paginatorTemplate: paginatorTemplateCustom,
                                            rows: 4}
                                        :
                                        {})}
                                />
                            }
                        </div>
                        {
                            filePath !== '' ? (
                                <div style={styles.candidateExpContainer}>
                                    <span style={styles.title1}>Video marque employeurs</span>
                                    <VideoPlayer filePath={filePath} autoplay={false} poster={'https://i.picsum.photos/id/866/1600/900.jpg'} />
                                </div>
                            )
                                : null
                        }
                        <Popup
                            email={profil?.email}
                            web={profil?.url}
                        />
                    </div>
                </>
            }
            {/* {isLoading ? <Loader /> : null} */}
        </div>
    );
};
