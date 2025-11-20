import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';

import { useSelector } from 'react-redux';

import { styles } from './styles';
import CustomButton from '../../Button/button';
import { HttpStatus } from '../../../../data/constants/Http-status';
import { getAcronym } from '../../../../data/factory/index';
import { ROLEACCOUNT } from '../../../../data/constants/strings';
import { COLORS, icons, images } from '../../../../resources/constants';
import { UploadFileService } from '../../../../service/applicatif/UploadFile.sa';
import ScoreDetails from '../../ScoreDetails';
import globalStyle from '../../../globalStyle/globalStyle';


interface candidateType {
  idCv: string,
  idUser: string,
  name: string,
  data: string[],
  lastExperience: { jobType: string }[],
  disponibility: string,
  yearOfExp: string,
  score: number,
  displayCandidateDetail: (arg: string, arg1: string | number) => void,
  recommandation: boolean,
  isAvailable: boolean
}

export default ({
  idCv,
  idUser,
  name,
  data,
  lastExperience,
  disponibility,
  yearOfExp,
  score,
  displayCandidateDetail,
  recommandation,
  isAvailable
}: candidateType) => {
  const { accessToken, user } = useSelector(({ auth }: any) => auth);

  const [modalVisible, setModalVisible] = useState(false);

  const [avatar, setAvatar] = useState('');
  const { downloadImageById } = UploadFileService();

  const getAvatar = async (id: string, accessToken: string) => {
    try {
      const responseGetAvatar: any = await downloadImageById(id, accessToken);
      if (responseGetAvatar) {
        setAvatar(URL.createObjectURL(responseGetAvatar));
      }
    } catch (error) { }
  };

  useEffect(() => {
    getAvatar(idUser, accessToken);
  }, []);

  const displayDetailsScore = () => {
    setModalVisible(true);
  };

  const onPress = () => {
    displayCandidateDetail(
      idCv,
      score.toString().includes('.') ? score.toFixed(2) : score,
    );
  };

  const getCompatibilityColor = (data: number | string) => {
    const score = typeof data === 'string' ? parseInt(data) : data;
    if (score >= 70) {
      return COLORS.secondary;
    } else if (score > 40 && score < 70) {
      return COLORS.primary;
    } else {
      return COLORS.orange;
    }
  };

  const description = `${lastExperience[0]?.jobType ?? ''}${lastExperience[0]?.jobType && disponibility ? ' - ' : ''
    }${disponibility}`;

  const condition =
    user?.abonnementId === '63d0ef142e1204452fd2f2bf' ||
    user?.role === ROLEACCOUNT.candidate;

  return (
    <>
      <ScoreDetails
        onPressEntreprise={onPress}
        score={score}
        data={data}
        visible={modalVisible}
        validation={setModalVisible}
        btnTitle="ok"
      />
      <button onClick={onPress} style={styles.candidateContainer}>
        <div style={styles.candidateImgContainer}>
          <img
            style={styles.candidatImg}
            src={avatar ? { uri: avatar } : { uri: images.avatar_6 }}
          />
        </div>
        <div style={styles.candidateDetailsContainer}>
          <span style={styles.candidatName}>
            {condition ? getAcronym(name) : name}
          </span>
          <span style={styles.candidatPost}>{description} {user?.role === ROLEACCOUNT.candidate ? '' : <span style={{ fontWeight: 'bold', color: isAvailable ? '#008000' : COLORS.red_color }} >{isAvailable ? ' En recherche actif' : ' En recherche passif'} </span>} </span>
          <span style={styles.candidatExp}>
            {yearOfExp
              ? `EXP: ${yearOfExp} ${yearOfExp === '1' ? 'an - Travail' : 'années - Travail'
              }`
              : ''}
          </span>
          {recommandation && (
            <div style={styles.badgeContainer}>
              <img src={{ uri: icons.badge }} style={styles.recommmandationBadge} />
              <span style={{ color: '#BF9500', marginTop: 5 }}> Recommandé</span>
            </div>
          )}
        </div>
        <div style={styles.candidateBtnContainer}>
          <CustomButton
            color={getCompatibilityColor(score)}
            title={`Compatibilité: ${score.toString().includes('.') ? score.toFixed(2) : score
              }%`}

            onClick={displayDetailsScore}
            _style={[
              styles.smallButtonContainer,
            ]}
            styleBtnTxt={styles.smallBtnTxt}
            iconRight={true}
          />
        </div>
      </button>
    </>
  );
};
