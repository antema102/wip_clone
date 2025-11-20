import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HEADER, ROLEACCOUNT } from '../../../data/constants/strings';
import { icons, images, FONTS, COLORS } from '../../resources/constants';
import { styles } from './style';
import { useAuth } from '../../../services/redux/ducks/auth';
import { useInscription } from '../../../services/redux/ducks/inscription';
import { useUser } from '../../../services/redux/ducks/user';
import { Notifications } from '../../../services/applicatif/UsersNotifications.sa';
import { Loader } from '../Loader';
import { setTokenStatus } from '../../../services/redux/ducks/app';
import store from '../../../services/store';
import { socketST } from '../../../services/technique/Socket';

const LOCAL_DATA = 'localEvents';
export const Header = (props: any) => {
  const {
    navigation,
    route,
    typeApp,
    noback = false,
    special,
    payment,
  } = props;
  const [showsetShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { notificationsDeleteToken } = Notifications();
  const { notificationCounter } = useUser();
  const handleShowModal = () => setShowModal(!showModal);
  const insets = useSafeAreaInsets();
  const { accessToken, user } = useSelector(({ auth }) => auth);
  const { badge } = useSelector(({ user }) => user);

  useEffect(() => {
    if (!accessToken) {
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }
  }, [accessToken]);

  const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem('userType', JSON.stringify(value));
    } catch (error) {}
  };

  const handleBack = () => {
    if (special) {
      navigation.navigate(
        user?.role === ROLEACCOUNT.company
          ? 'DetailProfilEntrepriseScreen'
          : 'DetailProfilScreen'
      );
    } else if (payment) {
      navigation.navigate('PaymentScreen');
    } else {
      navigation.goBack();
    }
  };

  async function deleteAllAsyncStorage() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {}
  }

  const handleLogOut = async () => {
    setIsLoading(true);
    storeUser('');
    notificationCounter(0);
    notificationsDeleteToken();
    store.dispatch(setTokenStatus(false));
    logOut();
    try {
      await Promise.all([
        setRegisterStatusInitiate(),
        deleteAllAsyncStorage(),
        socketST.disConnectToServer(),
      ]);
    } catch (error) {
      setIsLoading(false);
    }
    setShowModal(false);
  };

  const { logOut } = useAuth();
  const { setRegisterStatusInitiate } = useInscription();

  return (
    <>
      <div style={[{ elevation: 2 }, styles.containerHeader]}>
        <div style={styles.backWrap}>
          {!noback ? (
            <button
              onClick={() => {
                handleBack();
              }}
            >
              <img src={icons.back} style={styles.back} />
            </button>
          ) : (
            <div />
          )}
        </div>
        <div style={styles.logoWrap}>
          <img src={images.logo} style={styles.logo} />
        </div>
        {typeApp === 'Enterprise ?' && (
          <div style={styles.bellingWrap}>
            <button onClick={() => navigation.navigate('Home2Screen')}>
              {badge === 0 ? null : (
                <Badge
                  value={badge}
                  status="error"
                  containerStyle={styles.badgeStyle}
                />
              )}
              <img src={icons.bellring} style={styles.bellRing} />
            </button>
          </div>
        )}
        <div style={styles.vmoreWrap}>
          <button onClick={handleShowModal}>
            <img src={icons.vmore} style={styles.vmore} />
          </button>
        </div>
        {isLoading ? <Loader /> : <div />}
        {showModal && (
          <button
            style={styles.modalContainer}
            onClick={() => {
              setShowModal(false);
            }}
          >
            <div style={styles.modal}>
              <button
                onClick={() => {
                  navigation.navigate('OnBoardingScreen'), setShowModal(false);
                }}
                style={{}}
              >
                <div style={styles.ValignFlex}>
                  <img src={icons.infosWhite} style={styles.iconsMenuH} />
                  <span style={{ alignSelf: 'center', ...FONTS.inputText }}>
                    {HEADER.INFO_APP}
                  </span>
                </div>
              </button>
              <button onClick={handleLogOut} style={{}}>
                <div style={styles.ValignFlex}>
                  <img src={icons.deconnect} style={styles.iconsMenu} />
                  <span style={{ alignSelf: 'center', ...FONTS.inputText }}>
                    {HEADER.LOGOUT}
                  </span>
                </div>
              </button>
            </div>
          </button>
        )}
      </div>
    </>
  );
};
