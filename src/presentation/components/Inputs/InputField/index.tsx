import React, { useEffect, useState } from 'react';
;
import PropTypes from 'prop-types';

import { formsStyles } from '../../../globalStyle/formStyles';
import  styles  from '../style';
import localStyle from './styles';
import { TitleLabel } from './TitleLabel';
import { icons, COLORS } from '../../../../resources/constants';

export const InputField = (props: any) => {
  const {
    label,
    required,
    value,
    onChange,
    name,
    error,
    showError,
    onBlur,
    onFocus,
    maxLength,
    typekeyboard,
    type,
    isEditable,
    editIcon,
    showEdit,
    changeEmail,
    changePassword,
    edit} = props;
  const handleChange = (name: string, value: string, label: string) => {
    let bSend = true;
    let data = value;
    
    const labeldata = label;

    if (type === 'numeric') {
      data = value.replace(/[^0-9]/g, '').toString();
    }
    if (type === 'alphanumeric') {
      data = value.replace(/[^A-Za-z0-9\s]/g, '').toString();
    }

    if (type === 'anneeScolaire') {
      data = value.replace(/[^0-9-]/g, '').toString();
    }

    if (type === 'telephone') {
      data = value.replace(/[^0-9]/g, '').toString();
      if (data.length > 10) {
        bSend = false;
      }
    }

    bSend && onChange(name, data, true, label);
  };

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errorToDisplay, setErrorToDisplay] = useState(error);

  const keyboardType = type === 'anneeScolaire' ? 'phone-pad' : typekeyboard;

  useEffect(() => {
  }, [error]);

  useEffect(() => {
  }, [showError]);

  useEffect(() => {
    setErrorToDisplay(error);
  }, [error]);

  const handlePassWord = () => {
    if (editIcon) {
      changePassword();
    } else {
      setIsPasswordShown(!isPasswordShown);
    }
  };

  return (
    <div style={styles.container}>
      <TitleLabel label={label} required={required} />
      <div
        style={{...(type === 'textArea'
            ? formsStyles.itemInputStyleTextArea
            : formsStyles.itemInputStyle), ...required && showError && error !== '' && formsStyles.inputError, ...({
            backgroundColor: isEditable ? COLORS.white : COLORS.disableGray})}}
      >
        <input
          style={{...localStyle.textIput, ...{
              textAlignVertical: 'top', ...width: '90%', ...(height: type === 'textArea' ? 120 : 38), ...borderColor: 'transparent', ...outline: 'none'}, ...}}
          value={value}
          multiline={type === 'textArea'}
          numberOfLines={9}
          onChangeText={(value: any) => {
            handleChange(name, value, label);
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          maxLength={maxLength}
          editable={isEditable}
          autoCapitalize="none"
          secureTextEntry={type === 'password' && !isPasswordShown}
          keyboardType={
            type === 'numeric' || type === 'telephone' || type === 'price'
              ? 'numeric'
              : keyboardType
          }
        />

        {type === 'password' && (
          <button onClick={handlePassWord}>
            <div
              style={{
                width: 60,
                height: 30}}
            >
              {editIcon && (
                <img
                  style={{...formsStyles.iconEdit, ...({ opacity: edit ? 1 : 0.1 })}}
                  src={icons.editOr}
                />
              )}

              {isPasswordShown && (
                <img
                  style={[formsStyles.iconEye]}
                  src={icons.novisibility}
                />
              )}
              {!editIcon && !isPasswordShown && (
                <img
                  style={[formsStyles.iconEye]}
                  src={icons.visibility}
                />
              )}
            </div>
          </button>
        )}
        {showEdit && (
          <button onClick={changeEmail}>
            <div
              style={{
                width: 60,
                height: 30}}
            >
              <img
                style={{...formsStyles.iconEdit, ...({ opacity: edit ? 1 : 0.1 })}}
                src={icons.editOr}
              />
            </div>
          </button>
        )}
      </div>
      {required && showError && errorToDisplay !== '' && (
        <span style={styles.textError}>{errorToDisplay}</span>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  typekeyboard: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  showError: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  isEditable: PropTypes.bool,
  editIcon: PropTypes.bool,
  showEdit: PropTypes.bool,
  changePassword: PropTypes.func,
  changeEmail: PropTypes.func,
  edit: PropTypes.bool};

InputField.defaultProps = {
  label: '',
  name: '',
  required: false,
  showError: false,
  value: '',
  error: '',
  maxLength: 500,
  type: '',
  isEditable: true,
  editIcon: false,
  showEdit: false,
  edit: false};
