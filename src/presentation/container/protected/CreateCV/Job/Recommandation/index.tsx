import React, {useState, useEffect} from 'react';
;

import {AddLayer} from '../../AddLayer';
import {TitleLabels} from '../../titleLabels';
import { COLORS } from '../../../../../../resources/constants';
import { InputField } from '../../../../../components/Inputs/InputField';
import { formsStyles } from '../../../../../globalStyle/formStyles';
import {ListOfRecommandation} from './Recommandation';
import styles from '../../styles';

interface Props {
  values: any;
  handleChange: any;
  errors: any;
  showErrors: any;
  type: string;
}

export const Recommandation = {
  values,
  handleChange,
  errors,
  showErrors,
  type}: Props) => {
  // ------------------------------
  // Desired Location handler
  const [recommandation, setRecommandation] = useState<any[]>([]);

  useEffect(() => {
    values.recommandation &&
      values?.recommandation?.length > 0 &&
      setRecommandation(values?.recommandation);
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

    setRecommandation([
      ...recommandation,
      {
        _id: id,
        name: '',
        reference: '',
        file: ''},
    ]);

    values['name_' + id] = '';
    values['reference_' + id] = '';
    values['file_' + id] = '';
  };

  useEffect(() => {
    values.recommandation = recommandation;
  }, [recommandation]);

  useEffect(() => {}, [values]);

  const removeDesiredLocation = position => {
    // remove values
    delete values['name_' + position];
    delete values['reference_' + position];
    delete values['file_' + position];
    setRecommandation(previousState =>
      previousState.filter(item => item._id !== position),
    );
  };

  return (
    <>
      {recommandation.length === 0 && type == 'read' ? (
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white}), ...}}>
          <InputField
            label={TitleLabels.CreationCV.recommandation}
            isEditable={type !== 'read'}
          />
        </div>
      ) : (
        <div style={formsStyles.inputWrapBorderBlue}>
          {type !== 'read' && (
            <AddLayer
              title={'Recommandation'}
              label={''}
              onChange={addYearsOfExp}
              color="#999"
              style={styles.btnRemoveContainer}
            />
          )}

          {recommandation.map((item, index) => {
            return (
              <ListOfRecommandation
                key={'recommandation-' + item._id}
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
