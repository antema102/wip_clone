import React, {useEffect} from 'react';
;

import styles from '../../styles';
import { formsStyles } from '../../../../../globalStyle/formStyles';
import Buttons from '../../../../../components/Button/button';
import globalStyle from '../../../../../globalStyle/globalStyle';
import { COLORS, icons } from '../../../../../../resources/constants';
import { InputField } from '../../../../../components/Inputs/InputField';

interface Props {
  item: string;
  index: string;
  values: any;
  onChange: any;
  onRemove: any;
  errors: any;
  showErrors: any;
  type: string;
}

export const ListOfExperience = {
  item,
  index,
  values,
  onChange,
  onRemove,
  errors,
  showErrors,
  type}: Props) => {
  const handleRemove = () => {
    onRemove(item);
  };

  return (
    <div style={[formsStyles.inputWrapBlueCreate, {paddingTop: 20}]}>
      <div style={styles.btnRemoveContainer}>
        <span
          style={styles.btnRemoveTitle}>{`Ancienne expérience ${index}`}</span>

        {type !== 'read' && (
          <Buttons
            _style={[styles.btnRemove, globalStyle.elevationBlue]}
            onClick={handleRemove}
            title=""
            color=""
            styleBtnTxt={{color: COLORS.white}}
            icon={icons.moins}
            iconStyles={{margin: 5}}
          />
        )}
      </div>

      <div key={`listOfExp-${item}`}>
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          <InputField
            label={'Année'}
            required
            type="numeric"
            value={values[`year_${item}`]}
            name={`year_${item}`}
            onChange={onChange}
            error={errors[`year_${item}`]}
            showError={true}
            isEditable={type !== 'read'}
            maxLength={50}
          />
        </div>
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          <InputField
            label={'Poste'}
            required
            value={values[`position_${item}`]}
            name={`position_${item}`}
            onChange={onChange}
            error={errors[`position_${item}`]}
            showError={true}
            isEditable={type !== 'read'}
            maxLength={50}
          />
        </div>
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          <InputField
            label={'Chez'}
            required
            value={values[`at_${item}`]}
            name={`at_${item}`}
            onChange={onChange}
            error={errors[`at_${item}`]}
            showError={true}
            isEditable={type !== 'read'}
            maxLength={50}
          />
        </div>
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          <InputField
            label={'Description'}
            required
            value={values[`descri_${item}`]}
            name={`descri_${item}`}
            onChange={onChange}
            error={errors[`descri_${item}`]}
            type="textArea"
            showError={true}
            isEditable={type !== 'read'}
            maxLength={200}
          />
        </div>
      </div>
    </div>
  );
};
