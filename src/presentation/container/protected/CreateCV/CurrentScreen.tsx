import React, { useEffect } from 'react';
;
import { COLORS, icons } from '../../../../resources/constants';
import styles from './styles';
import { useLang } from '../../../../data/translation';
import { TitleLabels } from './titleLabels';
import { TitleLabels_en } from './titleLabels_en';
interface Props {
  screen: any;
  onChange: any;
  dataStore: any;
  navigation: any;
  setDataStore?: any;
  onPress?: any;
  data?: any
  // values?: any;
}

export const CurrentScreen = ({ screen, onChange, dataStore, setDataStore, data }: Props) => {

  const { lang } = useLang()
  const activeString = lang === 'fr' ? TitleLabels : TitleLabels_en;

  const handleChange = (screenName: string) => {
    onChange({ ...screen, current: screenName });
    setDataStore({ ...dataStore });
  };

  return (
    <div style={styles.CurrentScreenContainer}>
      {/** Affichage tout Screen */}
      <div style={{ flexDirection: 'row', alignItems: 'center' }}>
        <button
          style={{...styles.CurrentScreenStyle, ...(screen.current === 'info' || (screen.info && screen.type !== 'read' && screen.type !== 'update') ? styles.currentActive : '')}}
          onClick={() => handleChange('info')}>
          <span
            style={{...styles.textSousMenu, ...(screen.current === 'info' || (screen.info && screen.type !== 'read' && screen.type !== 'update')
                ? { color: COLORS.white }
                : { color: COLORS.black })}}>
            {activeString.CreationCV.personalInformation}
          </span>
        </button>
        

        <button
          style={{...styles.CurrentScreenStyle, ...(screen.current === 'job' || (screen.info && screen.type !== 'read' && screen.type !== 'update') ? styles.currentActive : '')}}
          onClick={() => handleChange('job')}>
          <span
            style={{...styles.textSousMenu, ...(screen.current === 'job' || (screen.job && screen.type !== 'read'  && screen.type !== 'update')
                ? { color: COLORS.white }
                : { color: COLORS.black })}}>
            {activeString.CreationCV.job}
          </span>
        </button>

        <button
          style={{...styles.CurrentScreenStyle, ...(screen.current === 'other' || (screen.info && screen.type !== 'read' && screen.type !== 'update') ? styles.currentActive : '')}}
          onClick={() => handleChange('other')}>
          <span
            style={{...styles.textSousMenu, ...(screen.current === 'other' || (screen.other && screen.type !== 'read' && screen.type !== 'update')
                ? { color: COLORS.white }
                : { color: COLORS.black })}}>
            {activeString.CreationCV.other}
          </span>
        </button>

      </div>

      <div>
        {data}
      </div>

    </div>
  );
};
