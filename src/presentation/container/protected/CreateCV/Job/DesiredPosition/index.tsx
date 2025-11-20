import React, {useState, useEffect} from 'react';
;

import {ListPosition} from './ListPosition';
import {AddLayer} from '../../AddLayer';
import {TitleLabels} from '../../titleLabels';
import { COLORS } from '../../../../../../resources/constants';
import { InputField } from '../../../../../components/Inputs/InputField';
import { formsStyles } from '../../../../../globalStyle/formStyles';
import styles from '../../styles';

interface Props {
  values: any;
  handleChange: any;
  errors: any;
  showErrors: any;
  formatSelectData: any;
  country: any;
  type: string;
}

export const DesiredPosition = {
  values,
  handleChange,
  errors,
  showErrors,
  formatSelectData,
  country,
  type}: Props) => {
  // ------------------------------
  // Desired Location handler
  const [listPosition, setListPosition] = useState<any[]>([]);

  useEffect(() => {
    values.listsPositions &&
      values.listsPositions.length > 0 &&
      setListPosition(values.listsPositions);
  }, []);

  // generation uuid
  function guidGenerator() {
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  // add listposisition
  const addDesiredLocation = () => {
    const id = guidGenerator();

    setListPosition([
      ...listPosition,
      {
        _id: id,
        country: '',
        province: '',
        zone: ''},
    ]);

    values['country_' + id] = '';
    values['province_' + id] = '';
    values['zone_' + id] = '';
  };

  useEffect(() => {
    values.listsPositions = listPosition;
  }, [listPosition]);

  const removeDesiredLocation = position => {
    // remove values
    delete values['country_' + position];
    delete values['province_' + position];
    delete values['zone_' + position];

    setListPosition(previousState =>
      previousState.filter((item, index) => item._id !== position),
    );
  };
  return (
    <>
      {listPosition.length === 0 && type == 'read' ? (
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white}), ...}}>
          <InputField
            label={TitleLabels.CreationCV.desiredLocalisation}
            isEditable={type !== 'read'}
          />
        </div>
      ) : (
        <div style={formsStyles.inputWrapBorderBlue}>
          {type !== 'read' && (
            <AddLayer
              title={'Localisation Souhaitée'}
              label={''}
              onChange={addDesiredLocation}
              color="#999"
              style={{}}
            />
          )}

          {listPosition.map((item, index) => {
            return (
              <ListPosition
                key={'listPosition-' + item._id}
                index={(index + 1).toString()}
                item={item._id}
                values={values}
                onChange={handleChange}
                onRemove={removeDesiredLocation}
                errors={errors}
                showErrors={showErrors}
                formatSelectData={formatSelectData}
                country={country}
                type={type}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
