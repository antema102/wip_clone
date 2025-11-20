import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormInfo } from './Info/FormInfo';
import { FormJob } from './Job/FormJob';
import { FormOther } from './Other/FormOther';
import styles from './styles';
import { CurrentScreen } from './CurrentScreen';
import { defaultValues as defaultValuesInfo } from './Info/dtoInfo';
import { defaultValues as defaultValuesJob } from './Job/dtoJob';
import { defaultValues as defaultValuesOther } from './Other/dtoOther';
// formating the data
import { format } from './format';

// api
import { CVService } from '../../../../service/applicatif/curriculumVitae.sa';
import { useLocation, useNavigate } from 'react-router-dom';
import Popup from '../../../components/CreateCV/Popup';

import { COLORS, icons, images } from '../../../../resources/constants';
import { TitleLabels } from './titleLabels';
import { TitleLabels_en } from './titleLabels_en';
import { useLang } from '../../../../data/translation';
import TitleRefont from '../../../components/TitleRefont';
const CreateCVScreen = (props: any) => {
  const { lang } = useLang();
  const activeString = lang === 'fr' ? TitleLabels : TitleLabels_en;

  const { state } = useLocation();
  const navigation = useNavigate();
  const { user } = useSelector(({ auth }: any) => auth);

  const [dataStore, setDataStore] = useState(
    state?.dataStore
      ? state?.dataStore
      : {
          id: '',
          info: { ...defaultValuesInfo },
          job: { ...defaultValuesJob },
          other: { ...defaultValuesOther },
        }
  );

  let isFromSearch = state?.isFromSearch;

  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    message: '',
    btnTitle: '',
    navigateTo: '',
    navigationParams: {},
  });

  const [postSucces, setPostSuccess] = useState(false);

  const { sendData, updateData, fetchMyData } = CVService();

  const [currentScreen, setCurrentScreen] = useState(
    state?.currentScreen
      ? state.currentScreen
      : {
          type: 'create',
          current: 'info',
          info: false,
          job: false,
          other: false,
        }
  );

  const setValues = (name: string, value: any) => {
    setDataStore({ ...dataStore, [name]: value });
  };

  useEffect(() => {
    if (state && state.type === 'read') {
      setCurrentScreen({ ...currentScreen, type: 'read' });
      // get my CV
      setIsLoading(true);

      fetchMyData(user?.accessToken)
        .then((res) => {
          setDataStore(format(res.data, 'get'));
          setIsLoading(false);
        })
        .catch((error) => error);
    } else if (state && state.type === 'update') {
      setCurrentScreen({ ...currentScreen, type: 'update' });
      setIsLoading(false);
      // get my CV
    }
  }, []);

  const handlePopup = (message, btnTitle, navigateTo, navigationParams) => {
    setTimeout(() => {
      setModalVisible(true);
    }, 300);

    setModalData({
      message,
      btnTitle,
      navigateTo,
      navigationParams,
    });
  };

  const handleMessage = (res: any) => {
    switch (res?.status) {
      case 200:
        handlePopup(
          'Enregistrement réussi',
          'Continuer',
          isFromSearch ? '/EnterpriseOfferDetailsScreen' : '/home',
          {}
        );
        break;
      case 201:
        handlePopup(
          'Enregistrement réussi',
          'Continuer',
          isFromSearch ? '/EnterpriseOfferDetailsScreen' : '/home',
          {}
        );
        break;
      case 401:
        handlePopup(
          'Token expirer, veuillez vous reconnecter',
          'Fermer',
          '',
          {}
        );
        break;
      case 500:
        handlePopup('Erreur Serveur, veuillez réessayer', 'Fermer', '', {});
        break;
      default:
        handlePopup(
          "Une erreur s'est produite, veuillez réessayer",
          'Fermer',
          '',
          {}
        );
        break;
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    await updateData(
      {
        ...format({ ...dataStore }, 'send', user?.id),
        id: state?.dataStore ? state?.dataStore?.id : dataStore?.id,
      },
      user?.accessToken,
      state.dataStore ? state.dataStore.id : dataStore?.id
    ).then((res) => {
      setIsLoading(false);
      handleMessage(res);
    });
    setIsLoading(false);
    setCurrentScreen({ ...currentScreen, type: 'read' });
  };

  const handleSubmit = (dataForm: any) => {
    if (currentScreen.current === 'info') {
      setCurrentScreen({ ...currentScreen, current: 'job' });
      setDataStore({ ...dataStore, info: dataForm });
      isFromSearch = !!isFromSearch;
    }
    // if current Screen "job" go to third screen "other"
    else if (currentScreen.current === 'job') {
      setCurrentScreen({ ...currentScreen, current: 'other' });
      setDataStore({ ...dataStore, job: dataForm });
      isFromSearch = !!isFromSearch;
    }
    // if current Screen "other" navigate to other screen and pass datas
    else if (currentScreen.current === 'other') {
      // store datas from screen "other"
      setIsLoading(true);
      setDataStore({ ...dataStore, other: dataForm });

      // send the total datas to WS or something
      if (currentScreen.info && currentScreen.job && currentScreen.other) {
        // api

        // appel redux
        if (currentScreen.type === 'create') {
          sendData(
            format({ ...dataStore, other: dataForm }, 'send', user?.id),
            user?.accessToken
          ).then((res) => {
            setIsLoading(false);
            handleMessage(res);
          });
        } else {
          setIsLoading(true);
          updateData(
            {
              ...format({ ...dataStore, other: dataForm }, 'send', user?.id),
              id: state?.dataStore?.id ? state?.dataStore?.id : dataStore?.id,
            },
            user?.accessToken,
            state?.dataStore?.id ? state?.dataStore?.id : dataStore?.id
          ).then((res) => {
            setIsLoading(false);
            handleMessage(res);
          });
          setCurrentScreen({ ...currentScreen, type: 'read' });
        }
      } else {
        setIsLoading(false);
        handlePopup(
          'Veuillez remplir les Champs des autre pages',
          'Fermer',
          '',
          {}
        );
      }
    }
  };

  useEffect(() => {}, [currentScreen.type]);

  return (
    <div style={styles.container}>
      <div style={styles.webformContain}>
        <TitleRefont title={activeString.CreationCV.textLabel} />
        <div style={{ marginTop: 24 }}>
          {/** Current Screen */}
          {!postSucces && (
            <CurrentScreen
              screen={currentScreen}
              onChange={setCurrentScreen}
              dataStore={dataStore}
              navigation={navigation}
              setDataStore={setDataStore}
              isFromSearch={isFromSearch}
              handleSave={handleSave}
              data={
                <>
                  {currentScreen.type === 'create' ? (
                    <div></div>
                  ) : (
                    <button
                      onClick={() => {
                        if (currentScreen.type === 'read') {
                          setCurrentScreen({
                            ...currentScreen,
                            type: 'update',
                          });
                          setDataStore(dataStore);
                          isFromSearch = false;
                        } else {
                          handleSave();
                        }
                      }}
                      style={styles.buttonCv}
                    >
                      <img src={icons.editV1} style={styles.buttonIcons} />
                      <span style={styles.textButton}>
                        {currentScreen.type === 'read'
                          ? activeString.CreationCV.modify
                          : activeString.CreationCV.save}
                      </span>
                    </button>
                  )}
                </>
              }
            />
          )}
          {/** Form Info */}
          {!postSucces && currentScreen.current === 'info' && (
            <FormInfo
              type={currentScreen.type}
              data={dataStore}
              onChangeDataStore={setDataStore}
              changeComplete={setCurrentScreen}
              onSubmitForm={handleSubmit}
              setValues={setValues}
            />
          )}

          {/** Form Job */}
          {!postSucces && currentScreen.current === 'job' && (
            <FormJob
              type={currentScreen.type}
              data={dataStore}
              onChangeDataStore={setDataStore}
              changeComplete={setCurrentScreen}
              onSubmitForm={handleSubmit}
              setValues={setValues}
            />
          )}

          {/** Form Other */}
          {!postSucces && currentScreen.current === 'other' && (
            <FormOther
              type={currentScreen.type}
              data={dataStore}
              onChangeDataStore={setDataStore}
              changeComplete={setCurrentScreen}
              onSubmitForm={handleSubmit}
              setValues={setValues}
            />
          )}
        </div>

        <Popup
          message={modalData.message}
          visible={modalVisible}
          validation={setModalVisible}
          btnTitle={modalData.btnTitle}
          navigation={navigation}
          navigateTo={
            currentScreen.type !== 'create' ? '/CreateCV' : modalData.navigateTo
          }
          navigationParams={
            currentScreen.type === 'create'
              ? {
                  currentScreen: { ...currentScreen, type: 'read' },
                  dataStore,
                }
              : modalData.navigationParams
          }
        />
        {/* <Popup message={'Enregistré'} visible={modalVisible} validation={setModalVisible} btnTitle={'Fermer'} /> */}

        {/** Loader */}
      </div>
    </div>
  );
};

export default CreateCVScreen;
