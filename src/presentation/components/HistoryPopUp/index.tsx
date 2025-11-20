import React, { useEffect, useState } from 'react';
;
import { Dialog } from 'primereact/dialog';
import { useHomeCompany } from '../ActivityOffer/useHomeCompany';
import styles from './styles';
import './style.css';
import { useLang } from '../../../data/translation';
import * as stringsEn from '../../../data/constants/strings_en';
import * as stringsFr from '../../../data/constants/strings';

interface SearchHistoryPopup {
  visible: boolean;
  showQuit: any;
  historyId: string;
  setVisible: (visible: boolean) => void;
}

interface HistoryType {
  [key: string]: { value: string, score: number };
}

enum typeActivity {
  AGRI = 'agrifood',
  CHEM = 'chemistry',
  MACH = 'machinery',
  CLO = 'clothing',
  CONS = 'construction',
  TRA = 'trade',
  ELEC = 'electronics',
  IT = 'it',
  HOT = 'hotels',
  COM = 'communication'}

const HistoryPopup = (props: SearchHistoryPopup) => {
  const { visible, historyId, setVisible } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [histories, setHistories] = useState<HistoryType>();
  const { allHistory } = useHomeCompany();
  const { lang } = useLang()
  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  const handleCancel = async () => {
    setVisible(false);
  };

  useEffect(() => {
    if (Array.isArray(allHistory) && allHistory.length > 0) {
      const itemsFound = allHistory.find(x => x.id === historyId);
      if (itemsFound) {
        const filtered = Object.keys(itemsFound).reduce((obj: HistoryType, key) => {
          if (itemsFound[key].value && itemsFound[key].value !== 'string')
            obj[key] = itemsFound[key];
          return obj;
        }, {} as HistoryType);
        setHistories(filtered);
      } else {
        setHistories(undefined);
      }
    } else {
      setHistories(undefined);
    }
    setIsLoading(false);
  }, [historyId]);

  const getLevel = (level: number) => {
    if (level <= 3) return 'Faible';
    else if (level > 3 && level <= 5) return 'Moyen';
    else return 'Elevé';
  };

  const getActivitySector = (value: string) => {
    switch (value) {
      case typeActivity.AGRI:
        return 'Agroalimentaire';
      case typeActivity.CHEM:
        return 'Chimie / Parachimie';
      case typeActivity.MACH:
        return 'Machines et équipements / Automobile';
      case typeActivity.CLO:
        return 'Textile / Habillement / Chaussure';
      case typeActivity.CONS:
        return 'BTP / Matériaux de construction';
      case typeActivity.TRA:
        return 'Commerce / Négoce';
      case typeActivity.ELEC:
        return 'Électronique / Électricité';
      case typeActivity.IT:
        return 'Informatique / Télécoms';
      case typeActivity.HOT:
        return 'Tourisme / Hotelerie';
      case typeActivity.COM:
        return 'Édition / Communication / Multimédia';
      default:
        return value;
    }
  };

  return (
    <Dialog header={activeString.HISTORY.TITLE_HISTORY} visible={visible} style={{ width: '50vw', backgroundColor: 'white' }} onHide={() => setVisible(false)}>
      <p className="m-0">{activeString.HISTORY.SEARCH_HISTORY}</p>
      {histories ? (
        Object.keys(histories).map(item => (
          <div style={styles.item}>
            <div style={styles.itemDetails} key={item}>
              <span style={styles.textLabel}>{activeString.HISTORY.NAME}</span>
              <span style={styles.textValue}>
                {getActivitySector(histories[item].value)}
              </span>
            </div>
            <div style={styles.itemDetails}>
              <span style={styles.textLabel}>{activeString.HISTORY.LEVELS}</span>
              <span style={styles.textValue}>
                {' '}
                {getLevel(histories[item].score)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <span> Aucun resultats</span>
      )}
    </Dialog>

  );
};

export default HistoryPopup;
