import React, { Fragment, useRef, useState } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';

import { images, icons } from '../../../resources/constants';
import { UploadFileService } from '../../../service/applicatif/UploadFile.sa';
import Loader from '../Loader';
import Popup from '../CreateCV/Popup';
import { DETAIL_PROFIL } from '../../../data/constants/strings';
import styles from './styles';
import { useSelector } from 'react-redux';

type UserInfoProps = {
	userAvatar: string;
	userName?: string;
	userPost?: string;
	setUserAvatar?: any;
	style?: Record<string, any>;
	isChangeable?: boolean;
};
const UserInfo = ({ userAvatar, setUserAvatar, style, isChangeable, userName, userPost }: UserInfoProps) => {
	const { uploadImage } = UploadFileService();
	const { accessToken } = useSelector(({ auth }) => auth);
	const [isLoading, setIsLoading] = useState(false);
	const [popupData, setPopupData] = useState({
		message: '',
		isVisible: false,
	});
	const fileInputRef = useRef(null);

	const setPopupVisible = (value: boolean) => {
		setTimeout(() => {
			setPopupData({ ...popupData, isVisible: value });
		}, 300);
	};

	const handleChangeAvatar = async dataToSend => {
		if (dataToSend instanceof File) {
			await uploadImage(dataToSend, accessToken);
			setIsLoading(false);
			setPopupData({
				message: DETAIL_PROFIL.SUCCESS_UPLOAD,
				isVisible: true,
			});
		} else {
			setPopupData({ message: 'Fichier non valide', isVisible: true });

		}
	};

	const chooseFile = async (event) => {
		try {
			const file = event.target.files[0];
			const fileReader = new FileReader();
			fileReader.onload = async (e) => {
				const imageData = e?.target?.result?.split(',')[1];
				setIsLoading(true);
				setUserAvatar(`data:image/png;base64,${imageData}`);
				handleChangeAvatar(file);
			};
			fileReader.readAsDataURL(file);
		} catch (exception) { }
	};

	const handleEditClick = () => {
		fileInputRef?.current?.click();
	};
	return (
		<>
			<View style={styles.header}>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						source={userAvatar ? { uri: userAvatar } : images.avatar_6 as import('react-native').ImageSourcePropType}
					/>
					{isChangeable && (
						<Fragment>
							<TouchableOpacity
								style={styles.editIcon}
								onPress={handleEditClick}
							>
								{/* You can replace this with your edit icon */}
								<Image source={icons.camera as import('react-native').ImageSourcePropType} style={styles.iconEdit} />
							</TouchableOpacity>
							<input
								type="file"
								accept="image/*"
								ref={fileInputRef}
								style={{ display: 'none' }}
								onChange={chooseFile}
							/>
						</Fragment>
					)}
				</View>
				<View style={styles.info}>
					<Text style={styles.name}>{userName}</Text>
					<Text style={styles.username}>{userPost}</Text>
				</View>
			</View>

			<Popup
				message={popupData.message}
				visible={popupData.isVisible}
				validation={setPopupVisible}
				btnTitle="Ok"
			/>
			{isLoading ? <Loader /> : null}
		</>
	);
};

export default UserInfo;
