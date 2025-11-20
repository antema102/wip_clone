import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { images, icons, COLORS } from '../../../resources/constants';
import 'primeicons/primeicons.css';
import { Badge } from 'primereact/badge';
import { useUser } from '../../../service/redux/ducks/user';
import { useSelector } from 'react-redux';
import { useInscription } from '../../../service/redux/ducks/inscription';
import { useAuth } from '../../../service/redux/ducks/auth';
import { styles } from './styles';
import './styles.css';
import OnBoarding from '../../container/protected/OnBoarding';
import Modal from '../Modal';
import { socketST } from '../../../service/technique/Socket';
import { ROLEACCOUNT } from '../../../data/constants/strings';
import { deleteGoogleToken } from '../../../service/technique/firebaseWeb';
import { PDFViewerScreen } from '../../container/protected/PDFVIewerScreen';
import { Menu } from 'primereact/menu';
import { UserSA } from '../../../service/applicatif/User.sa';
import * as strings from '../../../data/constants/strings';
import * as strings_en from '../../../data/constants/strings_en';
import { useLang } from '../../../data/translation';
import { useMobile } from '../../../service/hooks/useMobile';

const TopNavigation = (): any => {
    const [active1, setActive1] = useState(true);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [active4, setActive4] = useState(false);
    const [active5, setActive5] = useState(false);
    const [active6, setActive6] = useState(false);
    const [active7, setActive7] = useState(false);
    const [activeAppelOffer, setActiveAppelOffers] = useState(false);
    const [countNotification, setCountNotification] = useState<number>(0);
    const [showContact, setShowContact] = useState(false);
    const [showPDF, setShowPDF] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { setRegisterStatusInitiate } = useInscription();
    const { displayGuideline, readMessageCount } = UserSA();
    const { accessToken, user } = useSelector(({ auth }) => auth);
    const { badge } = useSelector(({ user }) => user);
    const navigate = useNavigate();
    const location = useLocation();
    const { logOut } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [pdfFile, setPdfFile] = useState();
    const { notificationCounter } = useUser();
    const [visible, setVisible] = useState(false);
    const condition = ((user?.role === ROLEACCOUNT.company && user?.abonnementId) || user?.role === ROLEACCOUNT.candidate)
    const menuLeft = useRef(null);
    const menuAbout = useRef(null)
    const handleShowModal = () => setShowModal(!showModal);
    const { isMobile, loading: loadingMobile } = useMobile();

    useEffect(() => {
        if (!accessToken) {
            setIsLoading(false);
            navigate('/');
        }
    }, [accessToken]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuAbout.current && !menuAbout.current.contains(e.target as Node)) {
                setShowModal(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const setActiveState = (stateToUpdate: any): any => {
        setActive1(false);
        setActive2(false);
        setActive3(false);
        setActive4(false);
        setActive5(false);
        setActive7(false);
        setActiveAppelOffers(false);
        stateToUpdate(true);
        setShowContact(false);
    };

    const handleSetActive1 = (): any => {
        navigate('/home');
        setActiveState(setActive1);
    };

    const displayUserGuideline = async (pdfName: string) => {
        setIsLoading(true);
        const data = {
            name: pdfName,
        }
        const response = await displayGuideline(data, accessToken);
        setIsLoading(false);
        setPdfFile(response);
        setShowPDF(true);
    };

    const handleSetActive2 = (): any => {
        setActiveState(setActive2);
        notificationCounter(0);
        navigate('/Notification');
        window.scrollTo(0, 0);
    };

    const handleSetActive3 = (): any => {
        setActiveState(setActive3);

    };

    const handleSetActive4 = (): any => {
        if (user?.role === 'candidate') {
            navigate('/SearchEntScreen');
        } else {
            navigate('/matchingEnterprise');
        }
        setActiveState(setActive4);
    };

    const handleSetActiveAppel = (): any => {
        if (user?.role === 'candidate') {
            navigate('/CandidatAppelOffersLists');
        }
        setActiveState(setActiveAppelOffers);
    };


    const handleSetActive6 = (): any => {
        setActiveState(setActive6);
        handleLogOut();
    };

    const handleSetActive7 = (): any => {
        navigate('/profilCandidat');
        setActiveState(setActive7);
    };

    const { lang, setLang } = useLang();
    const handleSetActiveLg = (lg: string) => {
        lg == 'fr' ? setLang('fr') : setLang('en');
    };
    const activeString = lang === 'fr' ? strings : strings_en;

    const handleSetActive10 = (event) => menuLeft?.current?.toggle(event);

    const handleSetActive5 = (): any => {
        setActiveState(setActive5);
        setVisible(true)
    };

    function deleteAllLocalStorage() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach((key) => {
                localStorage.removeItem(key);
            });
        } catch (error) {
        }
    }

    const handleLogOut = async () => {
        await deleteGoogleToken();
        setIsLoading(true);
        notificationCounter(0);
        logOut();
        deleteAllLocalStorage();
        socketST.disConnectToServer()
        try {
            await Promise.all([
                setRegisterStatusInitiate()
            ]);
        } catch (error) {
            setIsLoading(false);
        }
    };

    let itemsCompany = [
        {
            label: activeString.ABOUT_COMPANY.JOB, icon: 'pi pi-fw pi-eye', command: async () => {
                await displayUserGuideline('company1');
            }
        },
        {
            label: activeString.ABOUT_COMPANY.TRAINING, icon: 'pi pi-fw pi-eye', command: async () => {
                await displayUserGuideline('company2');
            },
        }, {
            label: activeString.ABOUT_COMPANY.CALL_FOR_TENDER, icon: 'pi pi-fw pi-eye', command: async () => {
                await displayUserGuideline('company3');
            },
        },
        {
            label: activeString.ABOUT_COMPANY.TARGET, icon: 'pi pi-fw pi-eye', command: async () => {
                await displayUserGuideline('company4');
            },
        },
    ];

    let itemsCandidate = [
        {
            label: activeString.ABOUT_CANDIDAT.CV, icon: 'pi pi-fw pi-eye', command: async () => {
                await displayUserGuideline('candidate1');
            }
        },
        {
            label: activeString.ABOUT_CANDIDAT.PRESENTATION, icon: 'pi pi-fw pi-eye', command: async () => {
                await displayUserGuideline('candidate2');
            },
        },
        {
            label: activeString.ABOUT_CANDIDAT.ANNOUNCEMENT, icon: 'pi pi-fw pi-eye', command: async () => {
                await displayUserGuideline('candidate3');
            },
        },
    ];

    const handleChangeLanguage = (event) => {
        setLang(event.target.value);
    };

    const handleHome = () => {
        navigate('/')
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    const routesWithBackButton = [
        '/CreateCV',
        '/ResumeVideoScreen',
        '/CandidatProfilBackupScreen',
        '/NewsInformationScreen',
        '/NewsInformationScreenDescription',
        '/MyAccount',
        '/EnterpriseAdvertisingScreen',
        '/EnterpriseOfferDetailsScreen',
        '/EntResultScreen',
        '/EntrepriseOfferCreateScreen',
        '/ListScreen',
        '/SearchEntResultScreen',
        '/FindTalentListScreen',
        '/CandidatDetailScreen'
    ];
    const showBackButton = routesWithBackButton.includes(location.pathname);

    useEffect(() => {
        getReadMessageCount();
    }, []);

    const getReadMessageCount = async () => {
        try {
            const response = await readMessageCount(user?.id);

            if (typeof response.data === "number") {
                setCountNotification(response.data);
            } else {
                console.warn("La réponse n'est pas un nombre :", response.data);
            }

        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    useEffect(() => {
        if (countNotification !== 0) {
            notificationCounter(countNotification);
        }
    }, [countNotification]);



    return (
        <>
            {
                isMobile && (
                    <View
                        style={[navbarStyle.headerMobile, styles.boxShadowBottom]}
                    >
                        {showBackButton ? (
                            <TouchableOpacity onPress={handleGoBack} style={{ paddingHorizontal: 26 }}>
                                <Image
                                    source={icons.back}
                                    style={[navbarStyle.guideMobiles, navbarStyle.guideIcon]}
                                />
                            </TouchableOpacity>
                        ) :
                            <View></View>
                        }

                        <TouchableOpacity onPress={handleHome}>
                            <View>
                                <Image source={images.logo} style={styles.logoWip} />
                            </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16 }}>

                            <View
                                style={[
                                    navbarStyle.langueBtnMobile
                                ]}
                            >
                                <select value={lang} onChange={handleChangeLanguage} style={{ ...navbarStyle.select, fontSize: 12 }}>
                                    <option value="fr">Français</option>
                                    <option value="en">English</option>
                                </select>
                            </View>

                            <View>
                                <TouchableOpacity onPress={handleSetActive10}>
                                    <Image
                                        source={icons.guideline}
                                        style={[navbarStyle.guideMobiles, navbarStyle.guideIcon]}
                                    />
                                </TouchableOpacity>
                                <Menu model={user?.role === activeString.ROLEACCOUNT.company ? itemsCompany : itemsCandidate} popup ref={menuLeft} popupAlignment="right" id="popup_menu_right" />
                            </View>

                            <View style={{ position: "relative" }} ref={menuAbout}>
                                <TouchableOpacity onPress={handleShowModal}>
                                    <Image
                                        source={icons.vmore}
                                        style={[navbarStyle.guideMobiles, navbarStyle.guideIcon]}
                                    />
                                </TouchableOpacity>
                                {
                                    showModal && (
                                        <View style={[styles.boxShadow, { position: "absolute", zIndex: 25, padding: 14, flexDirection: "column", gap: 14, top: 35, right: 10, backgroundColor: "white", width: 200 }]}>
                                            <View>
                                                <TouchableOpacity onPress={handleSetActive5} style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
                                                    <Image
                                                        source={images.about}
                                                        style={[navbarStyle.aboutIcon, { width: 14, height: 14, objectFit: "cover" }]}
                                                    />
                                                    <Text style={{ fontSize: 12 }}>A propos de l'application</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={handleSetActive6} style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
                                                    <Image
                                                        source={images.logout}
                                                        style={[navbarStyle.aboutIcon, { width: 14, height: 14, objectFit: "cover" }]}
                                                    />
                                                    <Text style={{ fontSize: 12 }}>Se déconnecter</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>

                        </View>

                    </View>
                )
            }
            <View style={[isMobile ? navbarStyle.footerMobile : navbarStyle.header, { flex: 1, zIndex: 2 }]} forceInset={{ bottom: 'never' }}>

                {pdfFile && <PDFViewerScreen visible={showPDF} setVisible={setShowPDF} data={pdfFile} isDownloadAllowed={true} isBlob={true} />}
                {
                    isMobile ? null :
                        <>
                            <TouchableOpacity onPress={handleHome}>
                                <View style={styles.containerLogo}>
                                    <Image source={images.WipWork} style={styles.logoWip} />
                                </View>
                            </TouchableOpacity>
                        </>
                }
                <View style={isMobile ? styles.navigationContainerMobile : styles.navigationContainer}>
                    {condition ? <>
                        <TouchableOpacity
                            style={[
                                isMobile ? { marginTop: 20 } :
                                    styles.container,
                                active1 ? styles.underline : styles.nonActive,
                            ]}
                            onPress={handleSetActive1}
                        >
                            <Image
                                source={icons.home}
                                style={[isMobile ? styles.logoMobile : styles.logo, active1 ? styles.active : styles.nonActive]}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                isMobile ? { marginTop: 20 } :
                                    styles.container,
                                active2 ? styles.underline : styles.nonActive,
                            ]}
                            onPress={handleSetActive2}
                        >
                            <View style={styles.bellContainer}>
                                <Image source={icons.bellring} style={[isMobile ? styles.logoMobile : styles.logo, , active2 ? styles.active : styles.nonActive]} />
                                {badge !== 0 && <View style={styles.badge}><Badge value={`${badge}`} /></View>}
                            </View>
                        </TouchableOpacity>
                        {/* 
                        {user?.role !== "company" &&
                            <TouchableOpacity
                                style={[
                                    isMobile ? { marginTop: 20 } :
                                        styles.container,
                                    activeAppelOffer ? styles.underline : styles.nonActive,
                                ]}
                                onPress={handleSetActiveAppel}
                            >
                                <Image
                                    source={icons.appelOffersIcon}
                                    style={[isMobile ? styles.logoMobile : styles.logo, , activeAppelOffer ? styles.active : styles.nonActive]}
                                />
                            </TouchableOpacity>

                        } */}

                        <TouchableOpacity
                            style={[
                                isMobile ? { marginTop: 20 } :
                                    styles.container,
                                active4 ? styles.underline : styles.nonActive,
                            ]}
                            onPress={handleSetActive4}
                        >
                            <Image
                                source={icons.search}
                                style={[isMobile ? styles.logoMobile : styles.logo, , active4 ? styles.active : styles.nonActive]}
                            />
                        </TouchableOpacity>



                        {
                            isMobile && (
                                <TouchableOpacity
                                    style={[
                                        isMobile ? { marginTop: 20 } :
                                            styles.container,
                                        active7 ? styles.underline : styles.nonActive,
                                    ]}
                                    onPress={handleSetActive7}
                                >
                                    <Image
                                        source={icons.user}
                                        style={[isMobile ? styles.logoMobile : styles.logo, active7 ? styles.active : styles.nonActive]}
                                    />
                                </TouchableOpacity>
                            )}
                    </> :
                        <View
                            style={[
                                styles.container,
                                styles.nonActive,
                            ]}
                            onPress={null}
                        >
                            <Image
                                source={null}
                                style={[styles.logo]}
                            />
                        </View>}
                </View>

                {
                    !isMobile &&
                    <>
                        <View
                            style={[
                                navbarStyle.langueBtn
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => handleSetActiveLg("fr")}
                                style={[
                                    lang === 'fr' && navbarStyle.activeLangue
                                ]}
                            >
                                <Image
                                    source={images.flagsFrance}
                                    style={{ width: 30, height: 30, objectFit: 'cover' }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleSetActiveLg("en")}
                                style={[
                                    lang === 'en' && navbarStyle.activeLangue
                                ]}
                            >
                                <Image
                                    source={images.flagsRauyaumeUni}
                                    style={{ width: 30, height: 30, objectFit: 'cover' }}
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleSetActive10}
                            style={[
                                navbarStyle.guideBtn
                            ]}
                        >
                            <Image
                                source={icons.guideline}
                                style={[styles.logoGuideline, navbarStyle.guideIcon]}
                            />
                            <Text>
                                {activeString.HOME.HELP}
                            </Text>
                            <Menu model={user?.role === activeString.ROLEACCOUNT.company ? itemsCompany : itemsCandidate} popup ref={menuLeft} popupAlignment="right" id="popup_menu_right" />
                        </TouchableOpacity>

                        <View
                            style={[navbarStyle.aboutBtn]}
                        >
                            {/* <TouchableOpacity
                                onPress={handleSetActive5}
                            >
                                <Image
                                    source={images.about}
                                    style={[styles.logo, navbarStyle.aboutIcon]}
                                />
                            </TouchableOpacity> */}
                        </View>
                        <View
                            style={[
                                navbarStyle.logoutBtn
                            ]}
                        >
                            <TouchableOpacity
                                onPress={handleSetActive6}
                                style={{ backgroundColor: "#000099", padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}
                            >
                                <Image source={icons.logout} style={{ height: 14, width: 14 }} />
                                <Text style={{ fontSize: 14, color: 'white', fontWeight: 600 }}> {activeString.HOME.LOGOUT} </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </View >
            <Modal title={'À propos'} visible={visible} setVisible={setVisible} content={<OnBoarding />} />
        </>
    );
};

const navbarStyle = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        position: 'fixed',
        top: 0,
        width: '100%',
    },
    headerMobile: {
        position: 'fixed',
        top: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        zIndex: 100,
        width: '100%'
    },
    footerMobile: {
        backgroundColor: "white",
        position: 'fixed',
        bottom: 0,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,

    },
    activeLangue: {
        borderRadius: 50, borderWidth: 2, borderColor: COLORS.orange
    },
    guideBtn: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        top: 16,
        right: 200,
        gap: 10,
        // marginRight: 80,
        // marginTop: 10,
        cursor: 'pointer'
    },
    guideIcon: {
        tintColor: COLORS.blueInput,
    },
    guideMobiles: {
        height: 25,
        width: 25,
    },
    aboutBtn: {
        position: 'absolute',
        top: 0,
        right: 50,
        marginRight: 80,
        marginTop: 10,
        cursor: 'pointer'
    },
    aboutIcon: {
        tintColor: COLORS.blueInput,
    },
    langueBtn: {
        position: 'absolute',
        top: 15,
        right: 325,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center'
    },
    select: {
        fontSize: 16,
        padding: 5,
        borderRadius: 5,
        borderColor: COLORS.blueInput,
    },
    logoutBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 50,
        marginTop: 10,
        cursor: 'pointer'
    },
    logoutIcon: {
        tintColor: COLORS.blueInput,
    },
});


export default TopNavigation;
