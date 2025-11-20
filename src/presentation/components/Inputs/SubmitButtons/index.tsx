import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';
import globalStyle from '../../../globalStyle/globalStyle';
import { buttonsStyles } from '../../../globalStyle/boutonStyle';
import Button from '../Button';
import Label from '../Label';
import localStyles from './styles';
export const SubmitButtons = (props: any) => {
  const {
    cancelAction,
    submitAction,
    cancelTitle,
    submitTitle,
    underlineType,
    pswForget,
    whiteButton,
    supprimer,
  } = props;
  return (
    <View style={[buttonsStyles.displayCenter]}>
      <View style={localStyles.displayVertical}>
        {!underlineType && (
          <Button
            onPress={(e: any) => cancelAction()}
            styleBtnTxt={buttonsStyles.btnAnnuler}
            styleBtnOuter={[
              globalStyle.elevationBlue,
              buttonsStyles.btnValiderOuterWhite,
            ]}
            title={cancelTitle}
            type="annuler"
          />
        )}
        {!whiteButton && (
          <Button
            onPress={submitAction}
            styleBtnTxt={buttonsStyles.btnValider}
            styleBtnOuter={[
              globalStyle.elevationBlue,
              supprimer
                ? buttonsStyles.btnDelete
                : buttonsStyles.btnValiderOuter,
            ]}
            title={submitTitle}
            type="valider"
          />
        )}
        {whiteButton && (
          <Button
            onPress={submitAction}
            styleBtnTxt={buttonsStyles.btnValiderWhite}
            styleBtnOuter={[
              globalStyle.elevationBlue,
              buttonsStyles.btnValiderOuterWhite,
            ]}
            title={submitTitle}
            type="valider"
          />
        )}
        {underlineType && !supprimer && (
          <TouchableOpacity
            style={[localStyles.undoStyleIOS, {paddingTop: 20}]}
            onPress={(e: any) => cancelAction()}
          >
            <Label
              title={cancelTitle}
              type={pswForget ? 'password' : 'paragraph'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

SubmitButtons.propTypes = {
  cancelAction: PropTypes.func,
  submitAction: PropTypes.func,
  cancelTitle: PropTypes.string,
  submitTitle: PropTypes.string,
  underlineType: PropTypes.bool,
  pswForget: PropTypes.bool,
  whiteButton: PropTypes.bool,
};

SubmitButtons.defaultProps = {
  cancelTitle: 'Annuler',
  submitTitle: 'Valider',
};
