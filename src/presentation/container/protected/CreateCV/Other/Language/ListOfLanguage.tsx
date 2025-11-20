import React, {useState, useEffect} from 'react';
;

import Buttons from '../../../../../components/Button/button';
import {TitleLabels} from '../../titleLabels';
import { formsStyles } from '../../../../../globalStyle/formStyles';
import globalStyle from '../../../../../globalStyle/globalStyle';
import { COLORS, icons } from '../../../../../../resources/constants';
import { InputSelect } from '../../../../../components/Inputs/InputSelect';
import { getDynamicListByKey } from '../../../../../../service/technique/dynamicService';
import { level } from '../../data';
import styles from '../../styles';
import { TitleLabels_en } from '../../titleLabels_en';
import { useLang } from '../../../../../../data/translation';

interface Props {
  index: number;
  item: string;
  values: any;
  onChange: any;
  onRemove: any;
  errors: any;
  showErrors: any;
  type: string;
}

export const ListOfLanguage = {
  index,
  item,
  values,
  onChange,
  onRemove,
  errors,
  showErrors,
  type}: Props) => {
  
  const [language, setLanguage] = useState<any>();

  const handleRemove = () => {
    onRemove(item);
  };

  const getDataList = async () => {
    
    const data = await localStorage.getItem('dynamic');
    const dataJSON = JSON.parse(data);
    const langages = getDynamicListByKey('languages', dataJSON);
    setLanguage(langages);
  }

  useEffect(() => {
    getDataList();
  }, []);

  const {lang} = useLang();
  const activeString = lang === 'fr' ? TitleLabels : TitleLabels_en;

  return (
    <div style={[formsStyles.inputWrapBlueCreate, {paddingTop: 20}]}>
      <div style={styles.btnRemoveContainer}>
        <span style={styles.btnRemoveTitle}>{`Langue ${index + 1}`}</span>
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

      <div key={`listOfLanguage-${item}`}>
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          <InputSelect
            label={activeString.CreationCV.language + (index + 1)}
            required
            name={`language_${item}`}
            value={values[`language_${item}`]}
            onChange={onChange}
            error={errors[`language_${item}`]}
            showError={true}
            isEditable={type === 'read' ? false : true}
            data={language}
          />
        </div>

        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          <InputSelect
            label={activeString.CreationCV.level + (index + 1)}
            required
            name={`languageLevel_${item}`}
            value={values[`languageLevel_${item}`]}
            onChange={onChange}
            error={errors[`languageLevel_${item}`]}
            showError={true}
            isEditable={type === 'read' ? false : true}
            data={level}
          />
        </div>
      </div>
    </div>
  );
};
