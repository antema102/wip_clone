import React from 'react';
import { OfferApply } from '../../../../components/EnterpriseOffreSheetApply/OfferApply';
import { DataView } from 'primereact/dataview';
export const ListOfferApply = (props) => {
  const { displayOfferApply, dataUsers } = props;
  return (
    <div style={{}}>
      {/** Listes des candidtas */}
      <div style={{ overflowY: 'auto' }}>
        <div
          data={dataUsers}
          renderItem={({ item }) => (
            <OfferApply item={item} displayOfferApply={displayOfferApply} />
          )}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
};
