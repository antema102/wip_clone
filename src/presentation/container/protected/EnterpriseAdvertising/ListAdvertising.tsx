import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { Advertising } from '../../../components/EnterpriseAdvertising/Advertising';
import globalStyle from '../../../globalStyle/globalStyle';


export const ListAdvertising = (props: any) => {
  const { displayOfferSheet, data, displayOfferSheetApply }= props
  return (
    <View style={globalStyle.containersPageWidth}>
      <View style={{}}>
        {/** Listes des Publicités */}
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Advertising item={item}
                displayOfferSheet={displayOfferSheet}
                displayOfferSheetApply={displayOfferSheetApply} />
            )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

