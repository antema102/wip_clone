import React, { useEffect } from 'react';
;
import { styles } from './style';
import Avatar from '../DetailProfil/UploadFile/UploadAvatar';
import { COLORS, SIZES } from '../../../resources/constants';
import * as stringsEn from '../../../data/constants/strings_en';
import * as stringsFr from '../../../data/constants/strings';
import { useLang } from '../../../data/translation';

interface FrameProps {
  isHeader: boolean;
  infoUser: {
    name?: string;
    activity?: string;
    email?: string;
    phone?: string;
    stat?: string;
    nif?: string;
    headQuarter?: string;
    representing?: string;
  };
  avatar: string;
  handleRedirection: () => void;
}

export const Frame = (props: FrameProps) => {

  const { isHeader, infoUser, avatar, handleRedirection } = props;
  const { lang } = useLang()
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  useEffect(() => { }, [infoUser]);

  return (
    <div style={{...styles.stHeader, ...({ borderBottomWidth: isHeader ? 0 : 1 })}}>
      <div style={styles.containerLogoEntBottom}>
        <Avatar style={styles.imageStyle} value={avatar} />
      </div>

      <div style={styles.textContainer}>
        <div style={{ marginBottom: 10 }}>
          <span
            style={{...styles.titlePrimaire, ...({ color: isHeader ? COLORS.primary : COLORS.black })}}>
            {infoUser?.name && infoUser?.name !== 'invalide'
              ? infoUser?.name
              : ''}
          </span>
        </div>
        <div>
          {isHeader ? (
            <span style={styles.descriptionPrimary} numberOfLines={4}>
              {infoUser?.activity}
            </span>
          ) : (
            <span style={styles.descriptionPrimary} numberOfLines={4}>
              {[
                infoUser?.email,
                infoUser?.phone,
                infoUser?.stat,
                infoUser?.nif,
                infoUser?.headQuarter,
              ]
                .filter(Boolean)
                .join(' , ')}
            </span>
          )}
        </div>
        <div>
          <span style={styles.descriptionPrimary}
          >
            {infoUser?.activity}
          </span>
        </div>
        <div>
          {infoUser?.representing &&
            infoUser?.representing !== 'invalide' ? (
            <span
              style={styles.descriptionPrimary}
            >
              {infoUser?.representing}
            </span>
          ) : null}
        </div>
        <div>
          <button onClick={handleRedirection}>
            <span style={[styles.descriptionPrimary, { color: COLORS.secondary }]}>{activeString.ENTERPRISE_OFFER.MORE_PLUS} ....</span>
          </button>
        </div>
      </div>
    </div>
  );
};
