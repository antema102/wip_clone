import React, { Fragment, useRef, useState } from 'react';
;

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
		isVisible: false});
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
				isVisible: true});
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
			<div style={styles.header}>
				<div style={styles.avatarContainer}>
					<img
						style={styles.avatar}
					 src={userAvatar ? { uri: userAvatar } : images.avatar_6 as import('react-native').ImageSourcePropType}
					/>
					{isChangeable && (
						<Fragment>
							<button
								style={styles.editIcon}
							 onClick={handleEditClick}
							>
								{/* You can replace this with your edit icon */}
								<img src={icons.camera as import('react-native').ImageSourcePropType} style={styles.iconEdit} />
							</button>
							<input
								type="file"
								accept="image/*"
								ref={fileInputRef}
								style={{ display: 'none' }}
								onChange={chooseFile}
							/>
						</Fragment>
					)}
				</div>
				<div style={styles.info}>
					<span style={styles.name}>{userName}</span>
					<span style={styles.username}>{userPost}</span>
				</div>
			</div>

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
