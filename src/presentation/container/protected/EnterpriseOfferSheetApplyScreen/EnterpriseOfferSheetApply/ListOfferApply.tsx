import React from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import { OfferApply } from '../../../../components/EnterpriseOffreSheetApply/OfferApply';
import { DataView } from 'primereact/dataview';
export const ListOfferApply = (props) => {
  const {displayOfferApply, dataUsers}= props
  return (
    <View style={{}}>
      {/** Listes des candidtas */}
      <ScrollView>
        <FlatList
          data={dataUsers}
          renderItem={({item}) => (
            <OfferApply item={item} displayOfferApply={displayOfferApply} />
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
};
