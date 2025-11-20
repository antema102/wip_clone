import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Platform,
    ImageBackground,
} from 'react-native';
import { useSelector } from 'react-redux';
import { UploadFileService } from '../../../../../service/applicatif/UploadFile.sa';
import { useFavoris } from './useFavoris';
import { styles } from './style';
import { COLORS, icons, images } from '../../../../../resources/constants';
import { resultDate } from '../../../../../data/factory/dateFactory';
import { useOfferList } from './useOfferList';
import { useFormation } from '../../../../../service/redux/ducks/formation';
import { OfferService } from '../../../../../service/applicatif/Offer.sa';
import globalStyle from '../../../../globalStyle/globalStyle';
import { OFFERS } from '../../../../../data/constants/strings';
import Loader from '../../../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { DataView } from 'primereact/dataview';
import { useMobile } from '../../../../../service/hooks/useMobile';
import { paginatorTemplateCustom } from '../../../../components/PaginatoTemplateCustom';
import { FormationSA } from '../../../../../service/applicatif/Formation.sa';
import MiniLoader from '../../../../components/MiniLoader';
import { he } from 'date-fns/locale';
import { useLang } from '../../../../../data/translation';
import * as stringsEn from '../../../../../data/constants/strings_en';
import * as stringsFr from '../../../../../data/constants/strings';

const Item = props => {
    const { offer, showDetails, index, isFormation } = props;
    const { accessToken } = useSelector(({ auth }: any) => auth);

    const [avatar, setAvatar] = useState('');
    const { downloadImageById } = UploadFileService();

    const getAvatar = async (id: string, accessToken) => {
        try {
            const responseGetAvatar: any = await downloadImageById(id, accessToken);
            if (responseGetAvatar) {
                setAvatar(URL.createObjectURL(responseGetAvatar));
            }
        } catch (error) { }
    };

    useEffect(() => {
        getAvatar(offer?.proprietaire?.id, accessToken);
    }, [offer?.proprietaire?.id]);

    const [selectedItems, setSelectedItems] = React.useState([]);
    const { allFavoris, removeFavoris, addFavoris } = useFavoris();

    useEffect(() => {
        const val =
            allFavoris && allFavoris.find(element => element.ref === offer.ref);

        if (val) {
            handleSelection(offer);
        }
    }, [allFavoris]);

    const handleSelection = item => {
        if (selectedItems.includes(item.ref)) {
            setSelectedItems(selectedItems.filter(ln => ln != item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const addOrRemove = item => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(ln => ln != item));
            removeFavoris(item.id);
        } else {
            setSelectedItems([...selectedItems, item]);
            addFavoris(item.id);
        }
    };

    return (
        <TouchableOpacity
            key={index}
            style={styles.card_templateItem}
            onPress={() => showDetails(offer.id)}>

            <Image
                source={avatar ? avatar : images.avatar_6}
                style={styles.image}
            />

            <View style={styles.wrapperTextItem}>
                <Text style={styles.title}>
                    {isFormation ? offer.title : offer.name}
                </Text>
                <Text style={styles.jobPlaceItem}>
                    {isFormation ? offer.place : offer.lieu}
                </Text>
                <Text style={styles.candidatExp}>{resultDate(offer.createdAt)}</Text>
            </View>

            <TouchableOpacity
                style={styles.footerFrame}
                onPress={() => addOrRemove(offer)}>
                {!isFormation ? (
                    <View style={styles.favorisView}>
                        <Image
                            style={styles.favorisImage}
                            source={
                                selectedItems.includes(offer) ? icons.favoris : icons.deFavoris
                            }
                        />
                    </View>
                ) : null}
            </TouchableOpacity>

        </TouchableOpacity>
    );
};

const List = props => {
    const { offerList, showDetails, loading, isMobile } = props;

    const renderItemTemplate = (offer, index) => (
        <>
            <Item offer={offer} index={index} showDetails={showDetails} />
        </>
    );

    return (
        loading ?
            <View style={{ minHeight: 40 }}>
                <MiniLoader />
            </View>
            :
            isMobile ?
                <View style={{ marginTop: 16 }}>
                    <DataView value={offerList} layout="list" itemTemplate={renderItemTemplate} />
                </View>
                : offerList.length > 0 ?
                    <View style={{ marginTop: 16 }}>
                        <DataView
                            value={offerList}
                            layout="list"
                            itemTemplate={renderItemTemplate}
                            paginatorTemplate={paginatorTemplateCustom}
                            paginator
                            rows={3}
                        />
                    </View>
                    :
                    <View style={{ marginTop: 16 }}>
                        <Text>
                            Aucun offre disponible
                        </Text>
                    </View>
    );
};

const ListFormation = props => {
    const navigate = useNavigate();
    const { formations, loading, isMobile } = props;

    const showDetailFormation = formation => {
        navigate('/EnterpriseOfferDetailsScreen', {
            state: {
                formation,
                candidat: true,
                isFormation: true,
            }
        });
    };

    const renderItemFormations = (formation: any, index) => (
        <>
            <Item offer={formation} index={index} showDetails={() => showDetailFormation(formation)} isFormation={true} />
        </>
    );

    return (
        <View style={{ marginTop: 16 }}>

            {loading ?
                <View style={{ minHeight: 40 }}>
                    <MiniLoader />
                </View>
                :
                !isMobile ?
                    <DataView
                        value={formations}
                        layout="list"
                        itemTemplate={renderItemFormations}
                        paginatorTemplate={paginatorTemplateCustom}
                        paginator rows={3}
                    /> :
                    <DataView
                        value={formations}
                        layout="list"
                        itemTemplate={renderItemFormations}
                    />
            }
        </View>
    );
};

const LastOfferItem = ({ item, showDetails, resultDate }) => {
    const { isMobile } = useMobile()
    const { accessToken } = useSelector(({ auth }: any) => auth);

    const [avatar, setAvatar] = useState('');
    const { downloadImageById } = UploadFileService();

    const getAvatar = async (id: string, accessToken) => {
        try {
            const responseGetAvatar: any = await downloadImageById(id, accessToken);
            if (responseGetAvatar) {
                setAvatar(URL.createObjectURL(responseGetAvatar));
            }
        } catch (error) { }
    };
    useEffect(() => {
        getAvatar(item?.proprietaire?.id, accessToken);
    }, []);

    return (

        <TouchableOpacity
            style={isMobile ? styles.headerMobile : styles.header}
            onPress={() => showDetails(item.id)}
        >
            <View style={ isMobile ? "" : styles.avatarContainer}>
                <Image style={styles.avatar} source={avatar ? avatar : images.avatar_6} />
            </View>

            <View style={[styles.informationContainer, isMobile ? { position: 'absolute', left: 100, top: 20 } : {}]}>
                <Text style={isMobile ? styles.nameMobile : styles.name}>{isMobile
                    ? (item?.name?.length > 30 ? item.name.substring(0, 30) + '...' : item.name)
                    : item?.name}</Text>
                <Text style={styles.label}>{item?.lieu}</Text>
                {
                    !isMobile && (
                        <Text style={styles.label}>{resultDate(item?.createdAt)}</Text>
                    )
                }
            </View>
            {
                isMobile && (
                    <Text style={styles.label}>{resultDate(item?.createdAt)}</Text>
                )
            }
        </TouchableOpacity>
    );
};

const OfferList = props => {

    const { idJob, isClicked, allJobParams, isFormationClicked, initial, showDetails } = props;

    const navigate = useNavigate();

    const [id, setId] = useState(idJob || 'final');
    const { allJob, lastJobs, isLoading } = useOfferList(id);

    const [allJobResult, setAllJobResult] = useState([]);
    const [lastJobsResult, setLastJobsResult] = useState([]);
    const [jobListResult, setJobLIstResult] = useState(allJobParams);
    const [formationResult, setFormationResult] = useState(allJobParams);
    const [listFormations, setListFormations] = useState();
    const [click, setClick] = useState(isClicked);

    const [isFormation, setIsFormation] = useState(isFormationClicked || false);
    const [isJobs, setIsJobs] = useState(isFormationClicked || false);

    const { findAllFormation } = useFormation();
    const { accessToken } = useSelector(({ auth }: any) => auth);
    const { getOfferByCategoryName, allOfferJob, getAllCategoryAvailable } = OfferService();

    const { getAllFormationsAvailable, getFormationsByCategoryName } = FormationSA();

    const [isAll, setIsAll] = useState(false);
    const [isAllFormation, setIsAllFormation] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);

    const { lang } = useLang()

    const activeString = lang === 'fr' ? stringsFr : stringsEn;

    const { isMobile } = useMobile()

    const getAllOffers = async () => {
        setIsFormation(false);
        setIsAll(true);
        setLoading(true)
        const res = await allOfferJob(accessToken);
        if (res?.data?.items) {
            setAllJobResult(res?.data?.items);
        }
        setLoading(false)

    };

    const getFormations = async () => {
        setIsAllFormation(true)
        setLoading(true)
        const res = await findAllFormation(accessToken);
        setFormationResult(res);
        setLoading(false)
    };

    const getOffers = async (name: string) => {
        setIsFormation(false);
        setIsJobs(true)
        setLoading(true)

        const res = await getOfferByCategoryName(accessToken, name);
        if (res?.data?.items) {
            setAllJobResult(res?.data?.items);
        }
        setLoading(false)

    };

    const getItemFormation = async (name: string) => {
        setIsFormation(true);
        setIsJobs(false)
        setLoading(true)

        const res = await getFormationsByCategoryName(accessToken, name);
        if (res?.data?.items) {
            setFormationResult(res?.data?.items);
        }
        setLoading(false)

    };

    const getAllOffersAvailable = async () => {
        if (!allJobParams) {
            const response = await getAllCategoryAvailable(accessToken);
            setJobLIstResult(response?.data?.listItem);
        }
    };

    const getAllFormationsCategoryAvailable = async () => {
        const response = await getAllFormationsAvailable(accessToken);
        setListFormations(response?.data?.listItem);
    };

    useEffect(() => {
        setLastJobsResult(lastJobs);
    }, [allJob]);

    useEffect(() => {
        getOffers(initial);
        getAllOffersAvailable();
        getAllFormationsCategoryAvailable();
    }, []);


    return (
        <>
            <View style={{ backgroundColor: COLORS.white }}>
                <View style={styles.wapperTitle}>
                    <Text style={[globalStyle.titleOffer]}>{activeString.OFFERS.LAST}</Text>
                </View>
                {isLoading ? (
                    <Loader />
                ) : (
                    <ScrollView
                        horizontal
                        contentContainerStyle={styles.carouselContainer}
                        showsHorizontalScrollIndicator={false}
                    >
                        {lastJobsResult.map((item: any, index: number) => (
                            <LastOfferItem
                                key={index}
                                showDetails={showDetails}
                                resultDate={resultDate}
                                item={item}
                            />
                        ))}

                    </ScrollView>
                )}
                <View style={styles.wapperTitle}>
                    <Text style={globalStyle.titleOffer}>{activeString.OFFERS.ALL}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <>
                        {jobListResult
                            ? jobListResult.map((item, index) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsAll(false);
                                        setIsAllFormation(false)
                                        getOffers(item);
                                        setClick(index);
                                    }}
                                    key={index}
                                    style={
                                        click === index && !isFormation && isJobs && !isAll && !isAllFormation
                                            ? styles.activeBtn
                                            : styles.simpleBtn
                                    }>
                                    <Text
                                        style={
                                            click === index && !isFormation && isJobs && !isAll && !isAllFormation
                                                ? styles.textMenuActive
                                                : styles.textMenu
                                        }>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))
                            : null}
                        <TouchableOpacity
                            onPress={getAllOffers}
                            style={isAll ? styles.activeBtn : styles.simpleBtn}>
                            <Text style={isAll ? styles.textMenuActive : styles.textMenu}>
                                {'Toutes'}
                            </Text>
                        </TouchableOpacity>
                    </>
                </View>

                <View style={styles.wapperTitle}>
                    <Text style={globalStyle.titleOffer}>{activeString.OFFERS.OFFERT_LAST}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <>
                        {listFormations
                            ? listFormations.map((item, index) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsAll(false);
                                        setIsAllFormation(false);
                                        getItemFormation(item);
                                        setClick(index);
                                    }}
                                    key={index}
                                    style={
                                        click === index && !isJobs && isFormation && !isAll && !isAllFormation
                                            ? styles.activeBtn
                                            : styles.simpleBtn
                                    }>
                                    <Text
                                        style={
                                            click === index && !isJobs && isFormation && !isAll && !isAllFormation
                                                ? styles.textMenuActive
                                                : styles.textMenu
                                        }>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))
                            : null}

                        <TouchableOpacity
                            onPress={getFormations}
                            style={isAllFormation ? styles.activeBtn : styles.simpleBtn}>
                            <Text style={isAllFormation ? styles.textMenuActive : styles.textMenu}>
                                {'Toutes'}
                            </Text>
                        </TouchableOpacity>
                    </>
                </View>

                {isLoading ? (
                    <Loader />
                ) : !isFormation ? (
                    <List offerList={allJobResult} showDetails={showDetails} loading={loading} isMobile={isMobile} />
                ) : (
                    <ListFormation formations={formationResult} navigation={navigate} loading={loading} isMobile={isMobile} />
                )}
            </View>
        </>
    );
};

export default OfferList;
