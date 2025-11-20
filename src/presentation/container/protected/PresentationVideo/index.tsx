import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    Modal,
    StyleSheet,
    Dimensions,
    Pressable,
    Alert,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { UserSA } from '../../../../service/applicatif/User.sa';
import { ENTERPRISE_INFORMATIONS, ERROR, RESUME_VIDEO, ROLEACCOUNT } from '../../../../data/constants/strings';
import * as stringsFr from '../../../../data/constants/strings';
import * as stringsEn from '../../../../data/constants/strings_en';

import globalStyle from '../../../globalStyle/globalStyle';
import { COLORS, icons } from '../../../../resources/constants';
import VideoProgressBar from '../../../components/VideoProgressBar';
import { useLocation, useNavigate } from 'react-router-dom';
import MainPageHeader from '../../../components/MainPageHeader';
import DisplayVideo from '../DisplayVideo';
import CustomModal from '../../../components/Modal';
import FileUploader from '../../../components/FileUploader';
import urls from '../../../../data/constants/urls';
import CustomButtons from '../../../components/Button/button';
import { styles } from './styles';
import { CvService } from '../../../../service/applicatif/Cv.sa';
import Popup from '../../../components/CreateCV/Popup';
import Compressor from 'compressorjs';

import TitleRefont from '../../../components/TitleRefont';
import { useLang } from '../../../../data/translation';
const adviceTexts: Array<string> = [
    "Rédiger un script et s'entraîner",
    'Opter pour un format vidéo court (2 minutes max)',
    'Choisir un plan statique, un fond sobre, et mode portrait.',
    'Soigner la tenue vestimentaire',
];

const PresentationVideoScreen = (props: any) => {
    const [serverResponse, setServerResponse] = useState('');
    const [isThereprogressStatus, setIsThereProgressStatus] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const [messageWaiting, setMessageWaiting] = useState(RESUME_VIDEO.WAITING);
    const [progressBar, setProgressBar] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { getUserById, displayUserVideoPresentation, displayVideoExample } = UserSA();
    const { findCvVideo } = CvService();
    const [visible, setVisible] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [messageVisible, setMessageVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isSpecial, setIsSpecial] = useState(false);
    const { accessToken, user } = useSelector(({ auth }: any) => auth);
    const { state } = useLocation();
    const navigate = useNavigate();
    const { lang } = useLang()
    const activeString = lang === 'fr' ? stringsFr : stringsEn;

    const checkCV = async () => {
        if (user?.role === ROLEACCOUNT.company) {
            const response = await getUserById(user?.id, accessToken);
            if (response?.data?.presentation) {
                setIsVideo(true);
            }
        } else {
            const responseCV = await findCvVideo();
            setIsVideo(responseCV?.data === true);
        }
        setIsLoading(false);
    };

    React.useEffect(() => {
        checkCV();
    }, []);

    const selectVideo = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoElement = document.createElement('video');
            videoElement.preload = 'metadata'; // Load only metadata, not the whole video
            videoElement.onloadedmetadata = function () {
                const duration = Math.round(videoElement.duration); // Video duration in seconds
                if (duration > 30) {
                    setMessage(RESUME_VIDEO.MAX_DURATION_REACHED_ENTERPRISE)
                    setMessageVisible(true)
                }
                else if (file.size > 10000000) {
                    setMessage(ERROR.FILE_TOO_HEAVY)
                    setMessageVisible(true)
                } else {
                    setMessageWaiting(RESUME_VIDEO.WAITING)
                    setModalVisible(true)
                    setIsThereProgressStatus(true);
                    const formData = new FormData();
                    formData.append('file', file);
                    axios({
                        method: 'POST',
                        url: urls.POST_UPLOAD_ENTERPRISE,
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        data: formData,
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            setProgressBar(percentCompleted);
                        },
                    })
                        .then((resp) => {
                            setProgressBar(100);
                            const isThereAnError = resp.data.isError;
                            if (isThereAnError) {
                                setServerResponse(RESUME_VIDEO.NO_CV_MESSAGE);
                            } else {
                                setServerResponse(RESUME_VIDEO.CONGRATULATION);
                            }
                            setIsLoading(false);
                            setIsThereProgressStatus(false);
                            setProgressBar(0);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            // Handle the error as needed
                        });
                }
                // Clean up the temporary video element
                URL.revokeObjectURL(videoElement.src);
                videoElement.remove();
            };

            // Set the video source to the file object URL
            videoElement.src = URL.createObjectURL(file);
        }
    };

    const displayVideoEntreprise = async () => {
        setVisible(true);
    };

    const hideTheProgressBar = async () => {
        setModalVisible(false);
    };
    return (
        <View style={styles.container}>
            <Popup
                message={message}
                visible={messageVisible}
                validation={setMessageVisible}
                btnTitle="OK"
            />
            <View style={{ backgroundColor: COLORS.white, borderRadius: 10, minHeight: 450, marginTop: 52 }}>
                {/* <Header {...props} /> */}
                <TitleRefont title={activeString.RESUME_VIDEO.WELCOMING} />
                <View style={[styles.containers]}>
                    <Modal
                        animationType="slide"
                        transparent
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        {isThereprogressStatus ? (
                            <View style={styles.centeredView}>
                                <VideoProgressBar
                                    progressBar={progressBar}
                                    waitingText={messageWaiting}
                                    goBack={hideTheProgressBar}
                                />
                            </View>
                        ) : (
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>{serverResponse}</Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => navigate('/home')}>
                                        <Text style={styles.textStyle}>
                                            Retour à la page d'acceuil
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    </Modal>
                    <View style={globalStyle.pageContainerPresentation}>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ paddingVertical: 20 }}>
                                <FileUploader handleFileChange={selectVideo} accept="video/*" fileName={activeString.RESUME_VIDEO.NEW_IMPORT} icon={icons.download} />
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            {isVideo && (
                                <View style={globalStyle.btnContainer}>
                                    <CustomButtons
                                        onPress={() => displayVideoEntreprise()}
                                        title={activeString.RESUME_VIDEO.DISPLAY}
                                        _style={[
                                            globalStyle.elevationOrange,
                                            globalStyle.buttonHomeDisplay,
                                        ]}
                                        color="red"
                                        icon={icons.display}
                                        styleBtnTxt={globalStyle.bigBtnTxt}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
            {visible ? <CustomModal title={isSpecial ? `${activeString.RESUME_VIDEO.INSPIRE}` : `${activeString.RESUME_VIDEO.DISPLAY}`} visible={visible} setVisible={setVisible} content={<DisplayVideo />} /> : null}
        </View>
    );
};

export default PresentationVideoScreen;
