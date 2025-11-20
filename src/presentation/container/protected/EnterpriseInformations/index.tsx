import {
    Alert,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    TextInput,
    Dimensions,
    Platform,
    Pressable
} from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

import styles from './styles';
import { useUser } from '../../../../service/redux/ducks/user';
import { UserSA } from '../../../../service/applicatif/User.sa';
import { UploadFileService } from '../../../../service/applicatif/UploadFile.sa';
import { ENTERPRISE_INFORMATIONS } from '../../../../data/constants/strings';
import { COLORS, icons, images } from '../../../../resources/constants';
import Loader from '../../../components/Loader';
import CustomModal from '../../../components/Modal';
import TitleRefont from '../../../components/TitleRefont';
import * as stringsEn from '../../../../data/constants/strings_en';
import * as stringsFr from '../../../../data/constants/strings';
import { useLang } from '../../../../data/translation';

export const EnterpriseInformations = (props: any) => {
    const { route } = props;
    const { updateUser } = useUser();
    const { getUserById } = UserSA();
    const [information, setInformation] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    let ScreenWidth = Dimensions.get('window').width;
    const [modalVisible, setModalVisible] = useState(false);
    const [mail, setMail] = useState('');
    const [web, setWeb] = useState('');
    const [about, setAbout] = useState('');
    const [activite, setActivite] = useState('');
    const [telephone, setTelephone] = useState('');
    const [adress, setAdress] = useState('');
    const [year, setYear] = useState('');
    const [stat, setStat] = useState('');
    const { user, accessToken } = useSelector(({ auth }) => auth);
    const companyId = route?.params?.companyId || user?.id;
    const changeForbiden = Boolean(route?.params?.changeForbiden)
    const { downloadImage } = UploadFileService();
    const [avatar, setAvatar] = useState<string>('');
    const [backButton, setBackButton] = useState(true);
    const { lang } = useLang();
    const activeString = lang === 'fr' ? stringsFr : stringsEn;

    const getAvatar = async () => {
        try {
            const avatarDownloaded: any = await downloadImage(accessToken);
            if (avatarDownloaded) {
                setAvatar(URL.createObjectURL(avatarDownloaded));
            }
        } catch (error) { }
    }

    const submitChange = async () => {
        setIsLoading(true);
        setBackButton(true)
        try {
            const response = await updateUser(user?.accessToken, companyId, {
                email: mail,
                headQuarter: adress,
                description: about,
                activity: activite,
                url: web,
                phone: telephone,
                yearOfCreation: year,
            });
            if (!response?.isError) {
                Alert.alert(
                    'Information : ',
                    activeString.ENTERPRISE_INFORMATIONS.MODIFICATION_SUCCEED,
                    [
                        { text: ENTERPRISE_INFORMATIONS.UNDO },
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
                setModalVisible(false)
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const getUser = async () => {
        setIsLoading(true)
        const res = await getUserById(companyId, `${accessToken}`);
        if (res.isError) {
            setIsLoading(false);
        } else {
            setInformation(res.data);
            setAdress(information?.headQuarter);
            setMail(information?.email);
            setAbout(information?.description);
            setActivite(information?.activity);
            setWeb(information?.url);
            setYear(information?.yearOfCreation);
            setTelephone(information?.phone);
            setStat(information?.stat);
            setIsLoading(false);
        }
    };

    const modalContent = (<View style={{ backgroundColor: 'white' }}>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
            <Text style={styles.textTitle}>{activeString.ENTERPRISE_INFORMATIONS.ABOUT_THE_COMPANY}</Text>
            <View>
                <Image
                    style={styles.iconActus}
                    source={icons.infos}
                />
                <TextInput
                    style={[styles.specialborderForm]}
                    multiline={true}
                    onChangeText={newAbout => setAbout(newAbout)}
                    defaultValue={about}
                />
            </View>
            <Text style={styles.textTitle}>{activeString.ENTERPRISE_INFORMATIONS.ACTIVITY}</Text>
            <View>
                <Image
                    style={styles.iconActus}
                    source={icons.infos}
                />
                <TextInput
                    style={[styles.specialborderForm]}
                    multiline={true}
                    onChangeText={newActivite => setActivite(newActivite)}
                    defaultValue={activite}
                />
            </View>
            <Text style={styles.textTitle}>{activeString.ENTERPRISE_INFORMATIONS.YEAR_OF_CREATION} </Text>
            <View style={styles.itemWrapper}>
                <Image
                    style={styles.iconActus}
                    source={icons.calendar}
                />
                <TextInput
                    style={[styles.specialborderForm]}
                    keyboardType="phone-pad"
                    onChangeText={newYear => setYear(newYear)}
                    defaultValue={year?.toString()}

                />
            </View>

            <Text style={styles.textTitle}>{activeString.ENTERPRISE_INFORMATIONS.HEADQUARTERS} </Text>
            <View style={styles.itemWrapper}>
                <Image
                    style={styles.iconActus}
                    source={icons.map}
                />
                <TextInput
                    style={[styles.specialborderForm]}
                    multiline={true}
                    onChangeText={newAdress => setAdress(newAdress)}
                    defaultValue={adress}
                />
            </View>

            <Text style={styles.textTitle}>
                {activeString.ENTERPRISE_INFORMATIONS.URL}
            </Text>

            <View style={styles.itemWrapper}>
                <Image
                    style={styles.iconActus}
                    source={icons.globe}
                />
                <TextInput
                    style={[styles.specialborderForm]}
                    multiline={true}
                    onChangeText={newWeb => setWeb(newWeb)}
                    defaultValue={web}
                />
            </View>

            <Text style={styles.textTitle}>
                {activeString.ENTERPRISE_INFORMATIONS.EMAIL}
            </Text>

            <View style={styles.itemWrapper}>
                <Image
                    style={styles.iconActus}
                    source={icons.mail}
                />
                <TextInput
                    style={[styles.specialborderForm]}
                    multiline={true}
                    onChangeText={value => {
                        setMail(value);
                    }}
                    defaultValue={mail}
                />
            </View>

            <Text style={styles.textTitle}>
                {activeString.ENTERPRISE_INFORMATIONS.PHONE_NUMBER}
            </Text>

            <View style={styles.itemWrapper}>
                <Image
                    style={styles.iconActus}
                    source={icons.phone}
                />
                <TextInput
                    style={[styles.specialborderForm]}
                    keyboardType="phone-pad"
                    onChangeText={newPhone => setTelephone(newPhone)}
                    defaultValue={telephone}
                />
            </View>
        </View>
    </View>);

    const modalFooter = (<View style={styles.screenContainer2}>
        <Pressable
            style={[styles.buttonAnnuler]}
            onPress={() => {
                setModalVisible(!modalVisible)
                setBackButton(true)
            }}
        >
            <Text style={styles.textBtnSecondary}>Annuler</Text>
        </Pressable>
        <Pressable
            style={[styles.buttonAnnuler2]}
            onPress={() => submitChange()}
        >
            <Text style={styles.textBtnSecondary2}>{activeString.ENTERPRISE_INFORMATIONS.VALIDATE}</Text>
        </Pressable>
    </View>)

    useEffect(() => {
        getUser();
        getAvatar();
    }, [stat]);

    return (
        <Fragment>
            {isLoading ? <Loader /> : null}
            <CustomModal title='Modifier mes informations' visible={modalVisible} setVisible={setModalVisible} content={modalContent} footerContent={modalFooter} width='50%' dismissableMask={false} />

            <View style={{ marginTop: 64, padding: 34, backgroundColor: 'white' }}>
                <TitleRefont title={changeForbiden ? activeString.ENTERPRISE_INFORMATIONS.MORE_INFORMATIONS : activeString.ENTERPRISE_INFORMATIONS.TITLE} />
                <View style={styles.screenContainer}>
                    {changeForbiden ? null : <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setAdress(information.headQuarter);
                            setMail(information.email);
                            setAbout(information.description);
                            setActivite(information.activity);
                            setYear(information.yearOfCreation);
                            setWeb(information.url);
                            setBackButton(false)
                            setModalVisible(!modalVisible);
                        }}
                        style={[
                            styles.ModifyButtonContainer
                        ]}>
                        <Text style={styles.ModifyButtonText}>{activeString.ENTERPRISE_INFORMATIONS.CHANGE}</Text>
                    </TouchableOpacity>}
                </View>

                <View style={styles.main_container}>
                    <View style={styles.stHeader}>
                        <Image
                            source={avatar ? { uri: avatar } : images.avatar_6}
                            style={styles.image}
                        />
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.titlePrimaire}>
                                    {information?.name && information?.name !== 'invalide'
                                        ? information?.name
                                        : ''}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.descriptionPrimary} numberOfLines={2}>
                                    {adress}
                                    {adress && mail ? ' , ' : ''}
                                    {mail}
                                    {mail && information?.phone ? ' , ' : ''}
                                    {information?.phone}
                                    {information?.phone && information?.stat ? ' , ' : ''}{' '}
                                    {information?.stat}
                                    {information?.stat && information?.nif ? ' , ' : ''}{' '}
                                    {information?.nif}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ borderWidth: 1, borderStyle: 'dashed', borderRadius: 20, borderColor: COLORS.black, paddingVertical: 20 }}>
                    <View style={styles.pageContainer}>
                        <View>
                            <View style={styles.itemWrapper}>
                                <Image
                                    style={styles.iconActus}
                                    source={icons.description}
                                />
                                <Text style={styles.valueActus} numberOfLines={2}>
                                    {about}
                                </Text>
                            </View>
                            <View style={styles.itemWrapper}>
                                <Image
                                    style={styles.iconActus}
                                    source={icons.secteurdActivite}
                                />
                                <Text style={styles.valueActus} numberOfLines={2}>
                                    {activite}
                                </Text>
                            </View>
                            <View style={styles.itemWrapper}>
                                <Image
                                    style={styles.iconActus}
                                    source={icons.calendar}
                                />
                                <Text style={styles.valueActus} numberOfLines={2}>
                                    Depuis {year}
                                </Text>
                            </View>
                            <View style={styles.itemWrapper}>
                                <Image
                                    style={styles.iconActus}
                                    source={icons.map}
                                />
                                <Text style={styles.valueActus} numberOfLines={2}>
                                    {adress}
                                </Text>
                            </View>
                            <View style={styles.itemWrapper}>
                                <Image
                                    style={styles.iconActus}
                                    source={icons.globe}
                                />
                                <Text style={styles.valueActus} numberOfLines={2}>
                                    {web}
                                </Text>
                            </View>
                            <View style={styles.itemWrapper}>
                                <Image
                                    style={styles.iconActus}
                                    source={icons.mail}
                                />
                                <Text style={styles.valueActus} numberOfLines={2}>
                                    {mail}
                                </Text>
                            </View>
                            <View style={styles.itemWrapper}>
                                <Image
                                    style={styles.iconActus}
                                    source={icons.phone}
                                />
                                <Text style={styles.valueActus} numberOfLines={2}>
                                    {telephone}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


        </Fragment>
    );
};
