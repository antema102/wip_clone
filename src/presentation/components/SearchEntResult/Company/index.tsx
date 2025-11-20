import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
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
            <ScoreDetails onPress={onPress} data={item.data} score={score} visible={modalVisible} validation={setModalVisible} btnTitle="ok" />
            <TouchableOpacity style={[styles.candidateContainer, isMobile ? { flexDirection: 'row' } : { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginHorizontal: 16, }]} onPress={onPress}>

                <View style={styles.candidateImgContainer}>
                    <Image style={styles.candidatImg} source={avatar ? { uri: avatar } : images.avatar_6} />
                </View>

                {isMobile ?
                    <View style={{ flex: 1 }}>
                        <View>
                            {/** A propos du candidat */}
                            <Text style={styles.candidatName}>{name}</Text>
                            <Text style={styles.candidatPost}>{isMobile ? truncateDescription(description) : description}</Text>
                        </View>

                        <View style={{ marginTop: 16 }}>
                            <TouchableOpacity onPress={displayDetailsScore}>
                                <CustomButton
                                    color={getCompatibilityColor(score)}
                                    title={`Compatibilité: ${score.toString().includes('.') ? score.toFixed(2) : score}%`}
                                    onPress={displayDetailsScore}
                                    _style={styles.smallButtonContainer}
                                    styleBtnTxt={styles.smallBtnTxt}
                                    iconRight={true}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <>
                        <View style={styles.detailsContainer}>
                            <View style={styles.candidateDetailsContainer}>
                                {/** A propos du candidat */}
                                <Text style={styles.candidatName}>{name}</Text>
                                <Text style={styles.candidatPost}>{isMobile ? truncateDescription(description) : description}</Text>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity onPress={displayDetailsScore}>
                                <CustomButton
                                    color={getCompatibilityColor(score)}
                                    title={`Compatibilité: ${score.toString().includes('.') ? score.toFixed(2) : score}%`}
                                    onPress={displayDetailsScore}
                                    _style={styles.smallButtonContainer}
                                    styleBtnTxt={styles.smallBtnTxt}
                                    iconRight={true}
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                }

            </TouchableOpacity>
        </>
    );
};
