import React, { useEffect, useState } from 'react';
import Protected from './protectedRoute';
import { Login } from '../container/auth/Login';
import { Inscription } from '../container/auth/Inscription';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import { Confirmation } from '../container/auth/Confirmation';
import { ForgetPassword } from '../container/auth/ForgetPassword';
import Home from '../container/protected/Home';
import { ValidateCompany } from '../container/auth/ValidateCompany';
import MatchingEnterprise from '../container/protected/MatchingEntreprise';
import MatchingEnterpriseList from '../container/protected/MatchingEnterpriseList';
import CandidatDetailScreen from '../container/protected/CandidatDetailScreen';
import EnterpriseOfferSheetScreen from '../container/protected/EnterpriseOfferSheetScreen';
import EnterpriseOfferSheetApplyScreen from '../container/protected/EnterpriseOfferSheetApplyScreen';
import EntrepriseOfferCreateScreen from '../container/protected/EnterpriseOfferCreateScreen';
import EntrepriseFormationCreateScreen from '../container/protected/EnterpriseFormationCreateScreen';
import SearchEntScreen from '../container/protected/SearchEntScreen';
import SearchEntResultScreen from '../container/protected/SearchEntResultScreen';
import EnterpriseOfferDetailsScreen from '../container/protected/EnterpriseOfferDetailsScreen';
import EntResultScreen from '../container/protected/EntResultScreen';
import ResumeVideo from '../container/protected/ResumeVideo';
import PresentationVideoScreen from '../container/protected/PresentationVideo';
import DisplayVideo from '../container/protected/DisplayVideo';
import CreateCVScreen from '../container/protected/CreateCV';
import Chat from '../container/protected/Chat';
import NewsInformationScreen from '../container/protected/NewsInformation';
import NewsInformationScreenDescription from '../container/protected/NewsInformationScreenDescription';
import ItemByCategoryScreen from '../container/protected/ItemByCategory';
import CBScreen from '../container/protected/CBScreen';
import MyAccountScreen from '../container/protected/MyAccountScreen';
import DeletionScreen from '../container/protected/DeletionScreen';
import { ThankyouScreen } from '../container/protected/ThankyouScreen';
import { CancelScreen } from '../container/protected/CancelScreen';
import { PDFViewerScreen } from '../container/protected/PDFVIewerScreen';
import CandidatProfilBackupScreen from '../container/protected/CandidatProfilBackup';
import CandidatAppelOffersLists from '../container/protected/CandidatAppelOffersLists';
import EnterpriseAdvertisingScreen from '../container/protected/EnterpriseAdvertising';
import EnterpriseProfilBackupScreen from '../container/protected/EnterpriseProfilBackup';
import { EnterpriseInformations } from '../container/protected/EnterpriseInformations';
import SubscriptionScreen from '../container/protected/SubscriptionScreen';
import NotificationScreen from '../container/protected/NotificationScreen';
import Popup from '../components/CreateCV/Popup';

import Terms from '../container/public/TermsAndServices';
import { useUser } from '../../service/redux/ducks/user';

import { EnterpriseTenderScreen } from '../container/protected/EnterpriseTenderScreen';
import ListScreen from '../container/protected/ListScreen';
import { ContactScreen } from '../container/protected/ContactScreen';
import MaintenanceScreen from '../container/protected/MaintenanceScreen';
import Landing from '../container/protected/Landing';
import { useMobile } from '../../service/hooks/useMobile';
import ProfilCandidat from '../components/DetailProfilCandidat';
import ChatSearch from '../components/ChatSearch/';

interface payloadProps {
  notification: {
    body: string;
  };
}

const Navigation = (): any => {
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageFromFirebase, setMessageFromFirebase] = useState('');
  const { badge } = useSelector(({ user }) => user);
  const { accessToken } = useSelector(({ auth }) => auth);
  const { notificationCounter } = useUser();

  const { isMobile } = useMobile();

  const firebaseConfig = {
    apiKey: 'AIzaSyAucuhzqLGuEteT8WkspZi1siE8BUVrs5U',
    authDomain: 'wip-work.firebaseapp.com',
    projectId: 'wip-work',
    storageBucket: 'wip-work.firebasestorage.app',
    messagingSenderId: '119803414077',
    appId: '1:119803414077:web:4d3bf6c8424f6ff4cecc54',
    measurementId: 'G-D6LHSJ75S5',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  const onMessageListener = async () =>
    await new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js');
  }

  onMessageListener().then((payload) => {
    const typedPayload = payload as payloadProps;
    notificationCounter(badge + 1);
    setMessageFromFirebase(typedPayload?.notification?.body);
    setMessageVisible(true);
  });

  return (
    <>
      <Popup
        message={messageFromFirebase}
        visible={messageVisible}
        validation={setMessageVisible}
        btnTitle="OK"
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing isSignedIn={!!accessToken} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" Component={Terms} />
          <Route path="/thankyou" Component={ThankyouScreen} />
          <Route path="/cancel" Component={CancelScreen} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/inscription/confirmation" Component={Confirmation} />
          <Route path="/inscription/validation" Component={ValidateCompany} />
          <Route path="/Contact" element={<ContactScreen />} />
          <Route path="/Maintenance" Component={MaintenanceScreen} />
          <Route
            path="/home"
            element={
              <Protected isSignedIn={!!accessToken}>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/profilCandidat"
            element={
              !isMobile ? (
                <Navigate to="/home" replace />
              ) : (
                <Protected isSignedIn={!!accessToken}>
                  <ProfilCandidat />
                </Protected>
              )
            }
          />
          <Route
            path="/matchingEnterprise"
            element={
              <Protected isSignedIn={!!accessToken}>
                <MatchingEnterprise />
              </Protected>
            }
          />
          <Route
            path="/FindTalentListScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <MatchingEnterpriseList />
              </Protected>
            }
          />
          <Route
            path="/CandidatDetailScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <CandidatDetailScreen />
              </Protected>
            }
          />
          <Route
            path="/EnterpriseOfferSheetScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <EnterpriseOfferSheetScreen />
              </Protected>
            }
          />
          <Route
            path="/EnterpriseOfferSheetApplyScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <EnterpriseOfferSheetApplyScreen />
              </Protected>
            }
          />
          <Route
            path="/EntrepriseOfferCreateScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <EntrepriseOfferCreateScreen />
              </Protected>
            }
          />
          <Route
            path="/EntrepriseFormationCreateScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <EntrepriseFormationCreateScreen />
              </Protected>
            }
          />
          <Route
            path="/SearchEntScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <SearchEntScreen />
              </Protected>
            }
          />
          <Route
            path="/SearchEntResultScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <SearchEntResultScreen />
              </Protected>
            }
          />
          <Route
            path="/EnterpriseOfferDetailsScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <EnterpriseOfferDetailsScreen />
              </Protected>
            }
          />
          <Route
            path="/EntResultScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <EntResultScreen />
              </Protected>
            }
          />
          <Route
            path="/ResumeVideoScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <ResumeVideo />
              </Protected>
            }
          />
          <Route
            path="/PresentationVideoScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <PresentationVideoScreen />
              </Protected>
            }
          />
          <Route
            path="/DisplayVideo"
            element={
              <Protected isSignedIn={!!accessToken}>
                <DisplayVideo />
              </Protected>
            }
          />
          <Route
            path="/CreateCV"
            element={
              <Protected isSignedIn={!!accessToken}>
                <CreateCVScreen />
              </Protected>
            }
          />
          <Route
            path="/NewsInformationScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <NewsInformationScreen />
              </Protected>
            }
          />
          <Route
            path="/NewsInformationScreenDescription"
            element={
              <Protected isSignedIn={!!accessToken}>
                <NewsInformationScreenDescription />
              </Protected>
            }
          />
          <Route
            path="/CBScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <CBScreen />
              </Protected>
            }
          />
          <Route
            path="/ItemByCategoryScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <ItemByCategoryScreen />
              </Protected>
            }
          />
          <Route
            path="/PDFViewerScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <PDFViewerScreen />
              </Protected>
            }
          />
          <Route
            path="/CandidatProfilBackupScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <CandidatProfilBackupScreen />
              </Protected>
            }
          />
          <Route
            path="/CandidatAppelOffersLists"
            element={
              <Protected isSignedIn={!!accessToken}>
                <CandidatAppelOffersLists />
              </Protected>
            }
          />
          <Route
            path="/Subscription"
            element={
              <Protected isSignedIn={!!accessToken}>
                <SubscriptionScreen />
              </Protected>
            }
          />
          <Route
            path="/MyAccount"
            element={
              <Protected isSignedIn={!!accessToken}>
                <MyAccountScreen />
              </Protected>
            }
          />
          <Route
            path="/EnterpriseAdvertisingScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <EnterpriseAdvertisingScreen />
              </Protected>
            }
          />
          <Route
            path="/EnterpriseProfilBackupScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <EnterpriseProfilBackupScreen />
              </Protected>
            }
          />
          <Route
            path="/EnterpriseInformations"
            element={
              <Protected isSignedIn={!!accessToken}>
                <EnterpriseInformations />
              </Protected>
            }
          />
          <Route
            path="/MyAccount"
            element={
              <Protected isSignedIn={!!accessToken}>
                <MyAccountScreen />
              </Protected>
            }
          />
          <Route
            path="/EnterpriseAdvertisingScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <EnterpriseAdvertisingScreen />
              </Protected>
            }
          />
          <Route
            path="/Deletion"
            element={
              <Protected isSignedIn={!!accessToken}>
                <DeletionScreen />
              </Protected>
            }
          />
          <Route
            path="/Notification"
            element={
              <Protected isSignedIn={!!accessToken}>
                <NotificationScreen />
              </Protected>
            }
          />
          <Route
            path="/EnterpriseTenderScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <EnterpriseTenderScreen />
              </Protected>
            }
          />
          <Route
            path="/ListScreen"
            element={
              <Protected isSignedIn={!!accessToken}>
                <ListScreen />
              </Protected>
            }
          />
          <Route
            path="/Chat"
            element={
              <Protected isSignedIn={!!accessToken}>
                <Chat />
              </Protected>
            }
          />
          <Route
            path="/Chat/:c/:sessionId"
            element={
              <Protected isSignedIn={!!accessToken}>
                <ChatSearch />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Navigation;
