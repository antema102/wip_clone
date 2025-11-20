import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import {buttonsStyles} from '../../boutonStyle';
import Label from '../../components/Inputs/Label';
import {formsStyles} from '../../formStyles';
import {SIZES, icons} from '../../resources/constants';

export const Footer = (props: any) => {
  const {navigation} = props;
  return (
    <View style={{marginTop: -55, marginBottom: -10}}>
      <View style={{justifyContent: 'center'}}>
        <View style={[buttonsStyles.displaySpacedBtween]}>
          <View style={formsStyles.line} />
          <Label title="OU" type="paragraph" />
          <View style={formsStyles.line} />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity>
            <View style={buttonsStyles.bkg_socio}>
              <Image
                source={icons.facebook}
                style={{width: 16, height: 28, resizeMode: 'cover'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={buttonsStyles.bkg_socio}>
              <Image
                source={icons.google}
                style={{width: 27, height: 27, resizeMode: 'cover'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={buttonsStyles.bkg_socio}>
              <Image
                source={icons.linkedin}
                style={{width: 29, height: 28, resizeMode: 'cover'}}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={[{marginTop: 30}, buttonsStyles.displayHorizontal]}>
          <Text
            style={{
              fontFamily: 'Oxygen-Regular',
              fontSize: SIZES.body4,
              marginRight: 10,
            }}>
            Vous avez déjà un compte ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Label title="Se connecter" type="link" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
