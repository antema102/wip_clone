import React from 'react';
import {/*Platform,*/ TouchableOpacity, View} from 'react-native';
import {buttonsStyles} from '../../boutonStyle';
import Label from '../../components/Inputs/Label';
import {formsStyles} from '../../formStyles';

export const Footer = (props: any) => {
  const {creerCompte} = props;
  return (
    <View>
      <View>
        <View style={[buttonsStyles.displaySpacedBtween]}>
          <Label title="Pas encore inscrit ? " type="paragraph" />
          <View style={formsStyles.line} />
        </View>

        <View style={[buttonsStyles.displayHorizontal]}>
          <TouchableOpacity onPress={creerCompte}>
            <Label title="Job ->" type="linkblue" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
