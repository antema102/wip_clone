import { useState, useEffect, Fragment } from 'react';
import { Dialog } from 'primereact/dialog';
import { useSelector } from 'react-redux';

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
  const ScreenWidth = window.innerWidth;
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
  const changeForbiden = Boolean(route?.params?.changeForbiden);
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
    } catch (error) {}
  };

  const submitChange = async () => {
    setIsLoading(true);
    setBackButton(true);
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
        window.alert(
          'Information : ',
          activeString.ENTERPRISE_INFORMATIONS.MODIFICATION_SUCCEED,
          [{ text: ENTERPRISE_INFORMATIONS.UNDO }, { text: 'OK' }],
          { cancelable: false }
        );
        setModalVisible(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    setIsLoading(true);
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

  const modalContent = (
    <div style={{ backgroundColor: 'white' }}>
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <span style={styles.textTitle}>
          {activeString.ENTERPRISE_INFORMATIONS.ABOUT_THE_COMPANY}
        </span>
        <div>
          <img style={styles.iconActus} src={icons.infos} />
          <input
            style={[styles.specialborderForm]}
            multiline={true}
            onChangeText={(newAbout) => {
              setAbout(newAbout);
            }}
            defaultValue={about}
          />
        </div>
        <span style={styles.textTitle}>
          {activeString.ENTERPRISE_INFORMATIONS.ACTIVITY}
        </span>
        <div>
          <img style={styles.iconActus} src={icons.infos} />
          <input
            style={[styles.specialborderForm]}
            multiline={true}
            onChangeText={(newActivite) => {
              setActivite(newActivite);
            }}
            defaultValue={activite}
          />
        </div>
        <span style={styles.textTitle}>
          {activeString.ENTERPRISE_INFORMATIONS.YEAR_OF_CREATION}{' '}
        </span>
        <div style={styles.itemWrapper}>
          <img style={styles.iconActus} src={icons.calendar} />
          <input
            style={[styles.specialborderForm]}
            keyboardType="phone-pad"
            onChangeText={(newYear) => {
              setYear(newYear);
            }}
            defaultValue={year?.toString()}
          />
        </div>

        <span style={styles.textTitle}>
          {activeString.ENTERPRISE_INFORMATIONS.HEADQUARTERS}{' '}
        </span>
        <div style={styles.itemWrapper}>
          <img style={styles.iconActus} src={icons.map} />
          <input
            style={[styles.specialborderForm]}
            multiline={true}
            onChangeText={(newAdress) => {
              setAdress(newAdress);
            }}
            defaultValue={adress}
          />
        </div>

        <span style={styles.textTitle}>
          {activeString.ENTERPRISE_INFORMATIONS.URL}
        </span>

        <div style={styles.itemWrapper}>
          <img style={styles.iconActus} src={icons.globe} />
          <input
            style={[styles.specialborderForm]}
            multiline={true}
            onChangeText={(newWeb) => {
              setWeb(newWeb);
            }}
            defaultValue={web}
          />
        </div>

        <span style={styles.textTitle}>
          {activeString.ENTERPRISE_INFORMATIONS.EMAIL}
        </span>

        <div style={styles.itemWrapper}>
          <img style={styles.iconActus} src={icons.mail} />
          <input
            style={[styles.specialborderForm]}
            multiline={true}
            onChangeText={(value) => {
              setMail(value);
            }}
            defaultValue={mail}
          />
        </div>

        <span style={styles.textTitle}>
          {activeString.ENTERPRISE_INFORMATIONS.PHONE_NUMBER}
        </span>

        <div style={styles.itemWrapper}>
          <img style={styles.iconActus} src={icons.phone} />
          <input
            style={[styles.specialborderForm]}
            keyboardType="phone-pad"
            onChangeText={(newPhone) => {
              setTelephone(newPhone);
            }}
            defaultValue={telephone}
          />
        </div>
      </div>
    </div>
  );

  const modalFooter = (
    <div style={styles.screenContainer2}>
      <button
        style={[styles.buttonAnnuler]}
        onClick={() => {
          setModalVisible(!modalVisible);
          setBackButton(true);
        }}
      >
        <span style={styles.textBtnSecondary}>Annuler</span>
      </button>
      <button
        style={[styles.buttonAnnuler2]}
        onClick={async () => {
          await submitChange();
        }}
      >
        <span style={styles.textBtnSecondary2}>
          {activeString.ENTERPRISE_INFORMATIONS.VALIDATE}
        </span>
      </button>
    </div>
  );

  useEffect(() => {
    getUser();
    getAvatar();
  }, [stat]);

  return (
    <Fragment>
      {isLoading ? <Loader /> : null}
      <CustomModal
        title="Modifier mes informations"
        visible={modalVisible}
        setVisible={setModalVisible}
        content={modalContent}
        footerContent={modalFooter}
        width="50%"
        dismissableMask={false}
      />

      <div style={{ marginTop: 64, padding: 34, backgroundColor: 'white' }}>
        <TitleRefont
          title={
            changeForbiden
              ? activeString.ENTERPRISE_INFORMATIONS.MORE_INFORMATIONS
              : activeString.ENTERPRISE_INFORMATIONS.TITLE
          }
        />
        <div style={styles.screenContainer}>
          {changeForbiden ? null : (
            <button
              activeOpacity={0.8}
              onClick={() => {
                setAdress(information.headQuarter);
                setMail(information.email);
                setAbout(information.description);
                setActivite(information.activity);
                setYear(information.yearOfCreation);
                setWeb(information.url);
                setBackButton(false);
                setModalVisible(!modalVisible);
              }}
              style={[styles.ModifyButtonContainer]}
            >
              <span style={styles.ModifyButtonText}>
                {activeString.ENTERPRISE_INFORMATIONS.CHANGE}
              </span>
            </button>
          )}
        </div>

        <div style={styles.main_container}>
          <div style={styles.stHeader}>
            <img src={avatar || images.avatar_6} style={styles.image} />
            <div style={styles.textContainer}>
              <div>
                <span style={styles.titlePrimaire}>
                  {information?.name && information?.name !== 'invalide'
                    ? information?.name
                    : ''}
                </span>
              </div>
              <div>
                <span style={styles.descriptionPrimary} numberOfLines={2}>
                  {adress}
                  {adress && mail ? ' , ' : ''}
                  {mail}
                  {mail && information?.phone ? ' , ' : ''}
                  {information?.phone}
                  {information?.phone && information?.stat ? ' , ' : ''}{' '}
                  {information?.stat}
                  {information?.stat && information?.nif ? ' , ' : ''}{' '}
                  {information?.nif}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderRadius: 20,
            borderColor: COLORS.black,
            paddingVertical: 20,
          }}
        >
          <div style={styles.pageContainer}>
            <div>
              <div style={styles.itemWrapper}>
                <img style={styles.iconActus} src={icons.description} />
                <span style={styles.valueActus} numberOfLines={2}>
                  {about}
                </span>
              </div>
              <div style={styles.itemWrapper}>
                <img style={styles.iconActus} src={icons.secteurdActivite} />
                <span style={styles.valueActus} numberOfLines={2}>
                  {activite}
                </span>
              </div>
              <div style={styles.itemWrapper}>
                <img style={styles.iconActus} src={icons.calendar} />
                <span style={styles.valueActus} numberOfLines={2}>
                  Depuis {year}
                </span>
              </div>
              <div style={styles.itemWrapper}>
                <img style={styles.iconActus} src={icons.map} />
                <span style={styles.valueActus} numberOfLines={2}>
                  {adress}
                </span>
              </div>
              <div style={styles.itemWrapper}>
                <img style={styles.iconActus} src={icons.globe} />
                <span style={styles.valueActus} numberOfLines={2}>
                  {web}
                </span>
              </div>
              <div style={styles.itemWrapper}>
                <img style={styles.iconActus} src={icons.mail} />
                <span style={styles.valueActus} numberOfLines={2}>
                  {mail}
                </span>
              </div>
              <div style={styles.itemWrapper}>
                <img style={styles.iconActus} src={icons.phone} />
                <span style={styles.valueActus} numberOfLines={2}>
                  {telephone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
