import './styles.css';

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS, icons } from '../../../resources/constants';
import { HOME } from '../../../data/constants/strings';
import { globalStyle } from '../../globalStyle/globalStyle';
import CustomButton from '../Button/button';
import 'primeicons/primeicons.css';
import { styles } from './styles';
import WipTabs from '../WipTab';
import { UserSA } from '../../../service/applicatif/User.sa';
import { useSelector } from 'react-redux';
import Offers from '../../container/protected/Offers';
import News from '../../container/protected/News';;
import AnnounceBox from '../../container/protected/AnnounceBox';
import { useNavigate } from 'react-router-dom';
import { CvService } from '../../../service/applicatif/Cv.sa';
import { useUser } from '../../../service/redux/ducks/user';
import * as stringsFr from '../../../data/constants/strings';
import * as stringsEn from '../../../data/constants/strings_en';
import { useLang } from '../../../data/translation';
import { useMobile } from '../../../service/hooks/useMobile';

const HomeCandidat = (props: any): any => {

    const { isMobile } = useMobile();
    const [isCV, setIsCV] = useState(true);
    const [isVideo, setIsVideo] = useState(true);
    const { findCvVideo } = CvService();
    const { updateHasMyCV, updateHasMyVideo } = useUser();
    const navigate = useNavigate();
 
    const handleVideo = () => {
        navigate('/ResumeVideoScreen', { state: { isShow: false } });
    };

    const checkCV = () => {
        findCvVideo().then((responseCV: any) => {
            setIsVideo(responseCV?.data === true);
            setIsCV(!!(responseCV?.status !== 500));
            updateHasMyCV(responseCV?.status !== 500);
            updateHasMyVideo(responseCV?.data === true);
        });
    };

    useEffect(() => {
        checkCV();
    }, []);

    const { lang } = useLang();
    const activeString = lang === 'fr' ? stringsFr : stringsEn;

    return (
        <View style={!isMobile ? styles.container : {}}>
            <ScrollView >
                <View style={isMobile ? styles.containersMobiles : styles.containers}>
                    {isCV && !isVideo && (
                        <View style={styles.containerWarning}>
                            <View style={styles.containerTextWarning}>
                                <Text style={styles.textWarning}>{HOME.WARNING}</Text>
                            </View>
                        </View>
                    )}

                    {(!isCV || !isVideo) && (<View style={{ height: 60 }}>
                        <Text style={[globalStyle.titleHome, { top: 10 }]}>
                            {activeString.HOME.BEGIN}
                        </Text>
                    </View>)}

                    <View style={isMobile ? "" : homeStyles.persoButtons}>

                        {!isCV && (
                            <View style={globalStyle.btnContainer}>
                                <CustomButton
                                    onPress={() => navigate('/CreateCV', { state: { isCreate: true } })}
                                    title={activeString.HOME.PARCOURS}
                                    _style={[
                                        globalStyle.elevationBlue,
                                        styles.buttonHomeActionsaisir,
                                    ]}
                                    icon={icons.filetext}
                                    styleBtnTxt={styles.bigBtnTxt}
                                />
                            </View>
                        )}

                        {!isVideo && (<View style={[globalStyle.btnContainer]}>
                            <CustomButton
                                onPress={handleVideo}
                                title={activeString.HOME.PRESENTATION}
                                _style={[
                                    globalStyle.elevationOrange,
                                    styles.buttonHomeExport,
                                ]}
                                color={COLORS.orange}
                                icon={icons.camera}
                                styleBtnTxt={styles.bigBtnTxt}
                                isDisable={!isCV}
                            />
                        </View>)}
                    </View>

                    <View>
                        <WipTabs
                            News={
                                () => (
                                    <News
                                        {...props}
                                    />
                                )}
                            Offers={() => <Offers {...props} />}
                            Announces={() => <AnnounceBox {...props} category={'post'} />}
                        />
                    </View>

                </View>

            </ScrollView>
        </View>
    );
};
const homeStyles = StyleSheet.create({
    persoButtons: {
        paddingLeft: 150,
        paddingRight: 150
    }
})

export default HomeCandidat;
