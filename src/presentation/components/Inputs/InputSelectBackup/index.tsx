import PropTypes from 'prop-types';
import React, {useEffect, useState, useRef} from 'react';
;
import {Picker} from '@react-native-picker/picker';
import {formsStyles} from '../../../formStyles';
import styles from './styles';
import {TitleLabel} from './TitleLabel';
import {COLORS, icons} from '../../../resources/constants';

export const InputSelect = (props: any) => {
  const {
    label,
    required,
    value,
    onChange,
    name,
    error,
    showError,
    isEditable,
    data} = props;0

  const pickerRef = useRef(null);

  const open = () => {
    if (isEditable) {
      pickerRef.current.focus();
    }
  }

  const [selectedValue, setSelectedValue] = useState(
    value !== '' ? value : (data.length>0 ? data[0].value: ''),
  );

  const [errorToDisplay, setErrorToDisplay] = useState(error);

  const handleChange = (name: string, itemValue: string, itemIndex: number) => {
    let bSend = true;
    const _data = data[itemIndex];

    setSelectedValue(itemValue);

    bSend && onChange(name, _data.value, true, _data.label);
  };

  const dataOptions = data.map((element: any, index: number) => {
    if (!element) {
      return <Picker.Item key={`${name}-${index}`} value={''} label={''} />;
    }
    return (
      <Picker.Item
        key={`${name}-${index}`}
        value={element.value}
        label={element.label}
      />
    );
  });

  useEffect(() => {
    if (value === '') {
      setSelectedValue('');
    }
  }, [value]);

  useEffect(() => {
      setErrorToDisplay(error);
  }, [error]);

  return (
    <button onClick={open}>
      <TitleLabel label={label} required={required} />
        <div style={{
          
          justifyContent: 'space-between',
          flexDirection: 'row',
          height: 40}}>
          <Picker
            ref={pickerRef}
            style={{
              height: 10,
              width: '80%',
              padding: 0,
              position: 'relative',
              left: -15,
              top: -10,
              zIndex: -1}}
            selectedValue={selectedValue}
            enabled={isEditable}
            dropdownIconColor={(isEditable) ? COLORS.white : COLORS.lightGray}
            onValueChange={(itemValue, itemIndex) => {
              handleChange(name, itemValue, itemIndex);
            }}>
            {dataOptions}
          </Picker>

          <div
            style={{
             
              alignItems: 'center',
              paddingTop: 7,
              paddingRight: 10}}>
            <img style={[formsStyles.iconSelect]} src={icons.down} />
          </div>
        </div>
      {/* </div> */}
      {required && showError && errorToDisplay !== '' && (
        <span style={styles.textError}>{errorToDisplay}</span>
      )}
    </button>
  );
};

InputSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  showError: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  isEditable: PropTypes.bool,
  data: PropTypes.any};

InputSelect.defaultProps = {
  data: [],
  label: '',
  name: '',
  required: false,
  showError: false,
  value: '',
  error: '',
  maxLength: 500,
  type: '',
  isEditable: true};
