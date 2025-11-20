import React from 'react';
import { View } from 'react-native';
import ViewDetailsCandidat from '../ViewDetailsCandidat';
import { COLORS } from '../../../resources/constants';
import { viewStyles } from './style';

interface Props {
	data: any
}

const ViewFrameCompments = ({ data }: Props) => {
	const tab = ["lieu", "contrat", "experience", "disponibility", "profil"]
	return (
		<View style={viewStyles.container}>
			{Object.entries(data).map(([key, val], index) => {
				return tab.includes(key) && val ?
					(
						<View key={index}>
							<ViewDetailsCandidat label={key} value={val} />
						</View>
					) : null;
			})}
		</View>

	);
};

export default ViewFrameCompments;