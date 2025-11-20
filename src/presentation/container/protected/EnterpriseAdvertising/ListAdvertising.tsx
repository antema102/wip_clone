import React from 'react';
;
import { Advertising } from '../../../components/EnterpriseAdvertising/Advertising';
import globalStyle from '../../../globalStyle/globalStyle';


export const ListAdvertising = (props: any) => {
  const { displayOfferSheet, data, displayOfferSheetApply }= props
  return (
    <div style={globalStyle.containersPageWidth}>
      <div style={{}}>
        {/** Listes des Publicités */}
        <div>
          <div
            data={data}
            renderItem={({ item }) => (
              <Advertising item={item}
                displayOfferSheet={displayOfferSheet}
                displayOfferSheetApply={displayOfferSheetApply} />
            )}
            keyExtractor={item => item.id}
          />
        </div>
      </div>
    </div>
  );
};

