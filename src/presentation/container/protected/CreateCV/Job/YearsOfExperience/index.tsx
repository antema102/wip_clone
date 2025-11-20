import React, {useState, useEffect} from 'react';
;

import {AddLayer} from '../../AddLayer';
import {ListOfExperience} from './ListOfExperience';
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
  type: string;
}

export const YearsOfExperience = {
  values,
  handleChange,
  errors,
  showErrors,
  type}: Props) => {
  // ------------------------------
  // Desired Location handler
  const [yearOfExp, setYearOfExp] = useState<any[]>([]);

  useEffect(() => {
    values.yearsOfExperience &&
      values.yearsOfExperience.length > 0 &&
      setYearOfExp(values.yearsOfExperience);
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
  const addYearsOfExp = () => {
    const id = guidGenerator();

    setYearOfExp([
      ...yearOfExp,
      {
        _id: id,
        year: '',
        position: '',
        at: ''},
    ]);

    values['year_' + id] = '';
    values['position_' + id] = '';
    values['at_' + id] = '';

    // showErrors['year_' + id] = '';
    // showErrors['position_' + id] = '';
    // showErrors['at_' + id] = '';
  };

  useEffect(() => {
    values.yearsOfExperience = yearOfExp;
  }, [yearOfExp]);

  useEffect(() => {
  }, [values]);

  const removeDesiredLocation = position => {
    // remove values
    delete values['year_' + position];
    delete values['position_' + position];
    delete values['at_' + position];

    // delete showErrors['year_' + position];
    // delete showErrors['position_' + position];
    // delete showErrors['at_' + position];

    setYearOfExp(previousState =>
      previousState.filter(item => item._id !== position),
    );
  };

  return (
    <>
      {yearOfExp.length === 0 && type == 'read' ? (
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          <InputField
            label={TitleLabels.CreationCV.previousPositions}
            isEditable={type !== 'read'}
          />
        </div>
      ) : (
        <div style={formsStyles.inputWrapBorderBlue}>
          {type !== 'read' && (
            <AddLayer
              title={'Ancienne expérience'}
              label={''}
              onChange={addYearsOfExp}
              color="#999"
              style={styles.btnRemoveContainer}
            />
          )}

          {yearOfExp.map((item, index) => {

            return (
              <ListOfExperience
                key={'yearOfExp-' + item._id}
                item={item._id}
                index={(index + 1).toString()}
                values={values}
                onChange={handleChange}
                onRemove={removeDesiredLocation}
                errors={errors}
                showErrors={showErrors}
                type={type}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
