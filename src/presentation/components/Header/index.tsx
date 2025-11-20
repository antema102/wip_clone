import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Badge} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {HEADER} from '../../../data/constants/strings';
import {icons, images, FONTS, COLORS} from '../../resources/constants';
import {styles} from './style';
import {useAuth} from '../../../services/redux/ducks/auth';
import {useInscription} from '../../../services/redux/ducks/inscription';
import {useUser} from '../../../services/redux/ducks/user';
import {Notifications} from '../../../services/applicatif/UsersNotifications.sa';
import {Loader} from '../Loader';
import {setTokenStatus} from '../../../services/redux/ducks/app';
import store from '../../../services/store';
import {socketST} from '../../../services/technique/Socket';
import {ROLEACCOUNT} from '../../../data/constants/strings';

const LOCAL_DATA = 'localEvents';
export const Header = (props: any) => {
  const {navigation, route, typeApp, noback = false, special, payment} = props;
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {notificationsDeleteToken} = Notifications();
  const {notificationCounter} = useUser();
  const handleShowModal = () => setShowModal(!showModal);
  const insets = useSafeAreaInsets();
  const {accessToken, user} = useSelector(({auth}) => auth);
  const {badge} = useSelector(({user}) => user);

  useEffect(() => {
    if (!accessToken) {
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    }
  }, [accessToken]);

  const storeUser = async value => {
    try {
      await AsyncStorage.setItem('userType', JSON.stringify(value));
    } catch (error) {}
  };

  const handleBack = () => {
    if (special) {
      navigation.navigate(
        user?.role === ROLEACCOUNT.company
          ? 'DetailProfilEntrepriseScreen'
          : 'DetailProfilScreen',
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
    } catch (error) {
    }
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

  const {logOut} = useAuth();
  const {setRegisterStatusInitiate} = useInscription();

  return (
    <>
      <View style={[{elevation: 2}, styles.containerHeader]}>
        <View style={styles.backWrap}>
          {!noback ? (
            <TouchableOpacity onPress={() => handleBack()}>
              <Image source={icons.back} style={styles.back} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.logoWrap}>
          <Image source={images.logo} style={styles.logo} />
        </View>
        {typeApp === 'Enterprise ?' && (
          <View style={styles.bellingWrap}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home2Screen')}>
              {badge === 0 ? null : (
                <Badge
                  value={badge}
                  status="error"
                  containerStyle={styles.badgeStyle}
                />
              )}
              <Image source={icons.bellring} style={styles.bellRing} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.vmoreWrap}>
          <TouchableOpacity onPress={handleShowModal}>
            <Image source={icons.vmore} style={styles.vmore} />
          </TouchableOpacity>
        </View>
        {isLoading ? <Loader /> : <View />}
        {showModal && (
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => {
              setShowModal(false);
            }}>
            <View style={styles.modal}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OnBoardingScreen'), setShowModal(false);
                }}
                style={{}}>
                <View style={styles.ValignFlex}>
                  <Image source={icons.infosWhite} style={styles.iconsMenuH} />
                  <Text style={{alignSelf: 'center', ...FONTS.inputText}}>
                    {HEADER.INFO_APP}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogOut} style={{}}>
                <View style={styles.ValignFlex}>
                  <Image source={icons.deconnect} style={styles.iconsMenu} />
                  <Text style={{alignSelf: 'center', ...FONTS.inputText}}>
                    {HEADER.LOGOUT}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
