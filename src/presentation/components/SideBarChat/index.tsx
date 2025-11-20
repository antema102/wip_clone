import React, { useEffect, useState } from 'react';
import { DataView } from 'primereact/dataview';
import { useNavigate, useLocation } from 'react-router';
import globalStyle from '../../globalStyle/globalStyle';
import styles from './styles';
import { useLang } from '../../../data/translation';
import * as stringsEn from '../../../data/constants/strings_en';
import * as stringsFr from '../../../data/constants/strings';
import { UserSA } from '../../../service/applicatif/User.sa';
import { useSelector } from 'react-redux';
import { dateToString } from '../../../data/factory/dateFactory';
import SkeletonCards from '../SkeletonCards';
import { icons, COLORS } from '../../../resources/constants';

import { getCountryNameFromISO3 } from '../../../service/technique/utils';

import './styles.css';
interface itemType {
  createdAt: Date;
  sessionId: string;
  title: string;
  [key: string]: any;
}

type ActiveCompanyType = 'default' | 'mixte' | 'company' | 'flag';

const HistorySearchChat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { company } = location.state || {};
  const url: string = location.pathname;

  const { lang } = useLang();
  const [sessionId, setSessionId] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompany, setIsCompany] = useState<ActiveCompanyType>('default');

  const [activeCompany, setActiveCompany] =
    useState<ActiveCompanyType>('default');

  const { getsSessionId, getUserById } = UserSA();
  const [abonnementID, setAbonnementID] = useState<string | null>(null);

  const { accessToken, user } = useSelector(({ auth }) => auth);
  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  const handleGetSessionId = async () => {
    try {
      setIsLoading(true);
      const response = await getsSessionId(accessToken, isCompany);

      const userResponse = await getUserById(user.id, accessToken);
      setAbonnementID(userResponse?.data?.abonnementId);

      setSessionId(response.data);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateSessionId = async (item: string) => {
    try {
      navigate(`/chat/${isCompany === 'default' ? 'c' : isCompany}/${item}`, {
        state: { abonnementID },
      });
      setActiveCompany('default');
    } catch (error) {
      console.warn(error);
    }
  };

  const handleNavigateNewChat = () => {
    setIsCompany('default');
    setActiveCompany('default');
    navigate(`/chat`, { state: { company: '' } });
  };

  const handleNavigateCompanyDefault = () => {
    setIsCompany('mixte');
    setActiveCompany('mixte');
    navigate(`/chat`, { state: { company: 'CompanyDefault' } });
  };

  const handleNavigateCompany = () => {
    setIsCompany('company');
    setActiveCompany('company');
    navigate(`/chat`, { state: { company: 'company' } });
  };

  const handleNavigateFlag = () => {
    setIsCompany('flag');
    setActiveCompany('flag');
    navigate(`/chat`, { state: { company: 'flag' } });
  };

  const itemTemplateChat = (item: itemType) => {
    const date = dateToString(item.createdAt);
    return (
      <div style={[styles.card, { backgroundColor: 'white', marginBottom: 8 }]}>
        <button
          onClick={async () => {
            await handleNavigateSessionId(item.sessionId);
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontWeight: '700', fontSize: 16 }}>{date}</span>
          </div>
          <span>
            {item.title.length > 50
              ? item.title.slice(0, 50) + '…'
              : item.title}
            <span style={{ color: COLORS.primary }}>
              {item.country ? ` - ${getCountryNameFromISO3(item.country)}` : ''}
            </span>
          </span>
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (company === 'CompanyDefault' || url.startsWith('/chat/mixte')) {
      setActiveCompany('mixte');
      setIsCompany('mixte');
    } else if (company === 'company' || url.startsWith('/chat/company')) {
      setActiveCompany('company');
      setIsCompany('company');
    } else if (company === 'flag' || url.startsWith('/chat/flag')) {
      setActiveCompany('flag');
      setIsCompany('flag');
    } else {
      setActiveCompany('default');
    }
  }, [company, url]);

  useEffect(() => {
    handleGetSessionId();
  }, [isCompany, url]);

  return (
    <div style={styles.containers}>
      <span
        style={[globalStyle.title3, { fontWeight: 'bold', marginBottom: 16 }]}
      >
        {activeString.HOME_COMPANY.HISTORY_CHAT}
      </span>
      {isLoading ? (
        <div>
          <SkeletonCards />
        </div>
      ) : sessionId?.length ? (
        <DataView
          value={sessionId}
          itemTemplate={itemTemplateChat}
          paginator
          paginatorTemplate="PrevPageLink PageLinks NextPageLink"
          rows={3}
        />
      ) : null}
      <div style={{ marginTop: 24 }}>
        <span
          style={[globalStyle.title3, { fontWeight: 'bold', marginBottom: 16 }]}
        >
          Recherche avancée
        </span>
        <button
          className={`company-btn ${
            activeCompany === 'default' ? 'active' : ''
          }`}
          onClick={handleNavigateNewChat}
        >
          <img src={icons.wip} alt="logo wip" className="icon" />
          <span
            style={{
              color: activeCompany === 'default' ? COLORS.white : COLORS.black,
            }}
          >
            {activeString.HOME_COMPANY.WIPWORK_ONLY}
          </span>
        </button>
        <button
          className={`company-btn ${
            activeCompany === 'company' ? 'active' : ''
          }`}
          onClick={handleNavigateCompany}
        >
          <img
            src={icons.base_de_donnees}
            alt="base de donnée"
            className="icon"
          />
          <span
            style={{
              color: activeCompany === 'company' ? COLORS.white : COLORS.black,
            }}
          >
            {activeString.HOME_COMPANY.CV_LIBRARY}{' '}
          </span>
        </button>
        <button
          className={`company-btn ${activeCompany === 'mixte' ? 'active' : ''}`}
          onClick={handleNavigateCompanyDefault}
        >
          <img src={icons.serveur} alt="serveur" className="icon" />
          <span
            style={{
              color: activeCompany === 'mixte' ? COLORS.white : COLORS.black,
            }}
          >
            {activeString.HOME_COMPANY.COMBINED_SEARCH}
          </span>
        </button>
        <button
          className={`company-btn ${activeCompany === 'flag' ? 'active' : ''}`}
          onClick={handleNavigateFlag}
        >
          <img src={icons.flag} alt="flag" className="icon" />
          <span
            style={{
              color: activeCompany === 'flag' ? COLORS.white : COLORS.black,
            }}
          >
            Recherche par pays
          </span>
        </button>
      </div>
    </div>
  );
};

const SidebarEnterPriseChat = React.memo(HistorySearchChat);

export default SidebarEnterPriseChat;
