import React, {useState, useEffect} from 'react';
;

import {AddLayer} from '../../AddLayer';
import {ListOfLanguage} from './ListOfLanguage';
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

export const Language = {
  values,
  handleChange,
  errors,
  showErrors,
  type}: Props) => {
  // ------------------------------
  // Desired Location handler
  const [ListLanguage, setListLanguage] = useState<any[]>([]);

  useEffect(() => {
    values.listLanguages &&
      values.listLanguages.length > 0 &&
      setListLanguage(values.listLanguages);
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
  const addLanguages = () => {
    const id = guidGenerator();

    setListLanguage([
      ...ListLanguage,
      {
        _id: id},
    ]);

    values['language_' + id] = '';
    values['languageLevel_' + id] = '';
  };

  useEffect(() => {
    values.listLanguages = ListLanguage;
  }, [ListLanguage]);

  const removeDesiredLocation = position => {
    // remove values
    delete values['language_' + position];
    delete values['languageLevel_' + position];

    setListLanguage(previousState =>
      previousState.filter(item => item._id !== position),
    );
  };

  return (
    <>
      {ListLanguage.length === 0 && type == 'read' ? (
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white}), ...}}>
          <InputField label={'Langue'} isEditable={type !== 'read'} />
        </div>
      ) : (
        <div style={formsStyles.inputWrapBorderBlue}>
          {type !== 'read' && (
            <AddLayer
              title={'Langue'}
              label={''}
              onChange={addLanguages}
              color="#999"
              style={styles.btnRemoveContainer}
            />
          )}

          {ListLanguage.map((item, index) => {
            return (
              <ListOfLanguage
                index={index}
                key={'language-' + item._id}
                item={item._id}
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
