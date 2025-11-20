import React, { useEffect, useState } from 'react';
;
import { useSelector } from 'react-redux';

import { styles } from './styles';

import { HttpStatus } from '../../../../data/constants/Http-status';
import ScoreDetails from '../../ScoreDetails'
import CustomButton from '../../Button/button'
import { UploadFileService } from '../../../../service/applicatif/UploadFile.sa';
import { COLORS, images } from '../../../../resources/constants';
import { useMobile } from '../../../../service/hooks/useMobile';
import TitleRefont from '../../TitleRefont';

export const Company = ({ item, displayCandidateDetail }) => {

    const { name, description, score, image } = item;
    const compatibility = Math.round((parseFloat(score) + Number.EPSILON) * 100) / 100;
    const [avatar, setAvatar] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { isMobile } = useMobile()
    const { accessToken } = useSelector(({ auth }: any) => auth);
    const { downloadImageById } = UploadFileService();

    const getAvatar = async (id: string) => {
        try {
            const responseGetAvatar: any = await downloadImageById(id, accessToken);
            if (responseGetAvatar) {
                setAvatar(URL.createObjectURL(responseGetAvatar));
            }
        } catch (error) { }
    };


    const displayDetailsScore = () => {
        setModalVisible(true)
    };

    useEffect(() => {
        getAvatar(item?.proprietaire.id)
    }, [])
    const onPress = () => {
        displayCandidateDetail(item?.type?.id, item?.id, compatibility);
    };

    const getCompatibilityColor = (compatibility) => {
        if (compatibility >= 70) return COLORS.secondary
        else if (compatibility >= 40 && compatibility < 70) return COLORS.primary
        else return COLORS.orange
    }

    const truncateDescription = (description: string, charLimit = 50) => {
        return description.length > charLimit
            ? description.substring(0, charLimit) + '...'
            : description;
    };
    const compatibilityColor = getCompatibilityColor(compatibility)

    return (
        <>
            <ScoreDetails onClick={onPress} data={item.data} score={score} visible={modalVisible} validation={setModalVisible} btnTitle="ok" />
            <button style={{...styles.candidateContainer, ...(isMobile ? { flexDirection: 'row' } : { flexDirection: 'row'), ...alignItems: 'center', ...paddingHorizontal: 10, ...marginHorizontal: 16}}} onClick={onPress}>

                <div style={styles.candidateImgContainer}>
                    <img style={styles.candidatImg} src={avatar  ? avatar  : images.avatar_6} />
                </div>

                {isMobile ?
                    <div style={{ flex: 1 }}>
                        <div>
                            {/** A propos du candidat */}
                            <span style={styles.candidatName}>{name}</span>
                            <span style={styles.candidatPost}>{isMobile ? truncateDescription(description) : description}</span>
                        </div>

                        <div style={{ marginTop: 16 }}>
                            <button onClick={displayDetailsScore}>
                                <CustomButton
                                    color={getCompatibilityColor(score)}
                                    title={`Compatibilité: ${score.toString().includes('.') ? score.toFixed(2) : score}%`}
                                    onClick={displayDetailsScore}
                                    _style={styles.smallButtonContainer}
                                    styleBtnTxt={styles.smallBtnTxt}
                                    iconRight={true}
                                />
                            </button>
                        </div>
                    </div>
                    :
                    <>
                        <div style={styles.detailsContainer}>
                            <div style={styles.candidateDetailsContainer}>
                                {/** A propos du candidat */}
                                <span style={styles.candidatName}>{name}</span>
                                <span style={styles.candidatPost}>{isMobile ? truncateDescription(description) : description}</span>
                            </div>
                        </div>

                        <div>
                            <button onClick={displayDetailsScore}>
                                <CustomButton
                                    color={getCompatibilityColor(score)}
                                    title={`Compatibilité: ${score.toString().includes('.') ? score.toFixed(2) : score}%`}
                                    onClick={displayDetailsScore}
                                    _style={styles.smallButtonContainer}
                                    styleBtnTxt={styles.smallBtnTxt}
                                    iconRight={true}
                                />
                            </button>
                        </div>
                    </>
                }

            </button>
        </>
    );
};
