import React from 'react';
;
import ViewDetailsCandidat from '../ViewDetailsCandidat';
import { COLORS } from '../../../resources/constants';
import { viewStyles } from './style';

interface Props {
	data: any
}

const ViewFrameCompments = ({ data }: Props) => {
	const tab = ["lieu", "contrat", "experience", "disponibility", "profil"]
	return (
		<div style={viewStyles.container}>
			{Object.entries(data).map(([key, val], index) => {
				return tab.includes(key) && val ?
					(
						<div key={index}>
							<ViewDetailsCandidat label={key} value={val} />
						</div>
					) : null;
			})}
		</div>

	);
};

export default ViewFrameCompments;