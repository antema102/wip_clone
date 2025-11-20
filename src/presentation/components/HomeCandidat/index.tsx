import './styles.css';

import React, { useEffect, useState } from 'react';
;
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
        <div style={!isMobile ? styles.container : {}}>
            <div style={{overflowY: "auto"}} >
                <div style={isMobile ? styles.containersMobiles : styles.containers}>
                    {isCV && !isVideo && (
                        <div style={styles.containerWarning}>
                            <div style={styles.containerTextWarning}>
                                <span style={styles.textWarning}>{HOME.WARNING}</span>
                            </div>
                        </div>
                    )}

                    {(!isCV || !isVideo) && (<div style={{ height: 60 }}>
                        <span style={[globalStyle.titleHome, { top: 10 }]}>
                            {activeString.HOME.BEGIN}
                        </span>
                    </div>)}

                    <div style={isMobile ? "" : homeStyles.persoButtons}>

                        {!isCV && (
                            <div style={globalStyle.btnContainer}>
                                <CustomButton
                                    onClick={() => navigate('/CreateCV', { state: { isCreate: true } })}
                                    title={activeString.HOME.PARCOURS}
                                    _style={[
                                        globalStyle.elevationBlue,
                                        styles.buttonHomeActionsaisir,
                                    ]}
                                    icon={icons.filetext}
                                    styleBtnTxt={styles.bigBtnTxt}
                                />
                            </div>
                        )}

                        {!isVideo && (<div style={[globalStyle.btnContainer]}>
                            <CustomButton
                                onClick={handleVideo}
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
                        </div>)}
                    </div>

                    <div>
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
                    </div>

                </div>

            </div>
        </div>
    );
};
const homeStyles = {
    persoButtons: {
        paddingLeft: 150,
        paddingRight: 150
    }
})

export default HomeCandidat;
