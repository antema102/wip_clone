import React, { Fragment } from 'react';

import Candidate from '../../../../components/FindTalentList/Candidate';
import { Divider } from 'primereact/divider';
import { DataView } from 'primereact/dataview';
import { paginatorTemplateCustom } from '../../../../components/PaginatoTemplateCustom';
import { useMobile } from '../../../../../service/hooks/useMobile';
export const ListCandidat = ({ displayCandidateDetail, data }) => {
	const { isMobile, loading } = useMobile()
	const renderItemTemplate = (item: any) => item ? (
		<>
			<Candidate
				key={`MatchingJob-${item?.id}`}
				idCv={item?.id}
				idUser={item?.user?.id}
				name={`${item?.user?.firstName ?? ''} ${item?.user?.lastName || ''}`}
				lastExperience={item?.lastExperience}
				disponibility={item?.disponibility}
				yearOfExp={item?.yearOfExp}
				score={item?.score}
				data={item?.data}
				displayCandidateDetail={displayCandidateDetail}
				recommandation={item?.isRecommandation}
				isAvailable={item?.isAvailable}
			/>
			<Divider type={'dashed'} />
		</>
	) : null;

	return (
		<div
			style={{
				flex: 1,
				padding: 20
			}}>
			
			{/** Listes des candidtas */}
			
			{data?.length
				? <DataView
					value={data}
					layout="list"
					itemTemplate={renderItemTemplate}
					paginatorTemplate={paginatorTemplateCustom}
					paginator={isMobile ? false : true}
					rows={4}
				/>
				: null}

			{/** Modification Recherche */}
		</div>
	);
};
