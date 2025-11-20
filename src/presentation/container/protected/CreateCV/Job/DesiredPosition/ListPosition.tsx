import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

import styles from '../../styles';
import {TitleLabels} from '../../titleLabels';
import { ZonnageService } from '../../../../../../service/applicatif/Zonnage.sa';
import { formsStyles } from '../../../../../globalStyle/formStyles';
import Buttons from '../../../../../components/Button/button';
import globalStyle from '../../../../../globalStyle/globalStyle';
import { COLORS, icons } from '../../../../../../resources/constants';
import { InputSelect } from '../../../../../components/Inputs/InputSelect';
import { InputField } from '../../../../../components/Inputs/InputField';
import Loader from '../../../../../components/Loader';

interface Props {
  item: string;
  index: string;
  values: any;
  onChange: any;
  onRemove: any;
  errors: any;
  showErrors: any;
  formatSelectData: any;
  country: any;
  type: string;
}

export const ListPosition = ({
  item,
  index,
  values,
  onChange,
  onRemove,
  errors,
  showErrors,
  formatSelectData,
  country,
  type,
}: Props) => {
  const {user} = useSelector(({auth}: any) => auth);

  const handleRemove = () => {
    onRemove(item);
  };

  // ----------------------------------------------------------------------
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {getProvince} = ZonnageService();

  // province management
  const [province, setProvince] = useState<any>([]);

  const getListProvince = (idCountry: string) => {
    setIsLoading(true);

    getProvince(user?.accessToken, idCountry)
      .then((res: any) => {
        setProvince(formatSelectData(res.data.items, 'name', 'id'));

        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (values[`country_${item}`]?.length) {
      getListProvince(values[`country_${item}`]);
    }
  }, [values[`country_${item}`]]);

  useEffect(() => {
    if (values[`country_${item}`]?.length) {
      getListProvince(values[`country_${item}`]);
    }
  }, []);

  // ----------------------------------------------------------------------

  return (
    <View style={[formsStyles.inputWrapBlueCreate, {paddingTop: 20}]}>
      <View style={styles.btnRemoveContainer}>
        <Text
          style={
            styles.btnRemoveTitle
          }>{`Localisation souhaitée ${index}`}</Text>

        {type !== 'read' && (
          <Buttons
            _style={[styles.btnRemove, globalStyle.elevationBlue]}
            onPress={handleRemove}
            title=""
            color=""
            styleBtnTxt={{color: COLORS.white}}
            icon={icons.moins}
            iconStyles={{margin: 5}}
          />
        )}
      </View>

      <View key={`desiredPosition-${item}`}>
        {/** Country */}
        <View
          style={[
            styles.inputWrap,
            {
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white,
            },
          ]}>
          <InputSelect
            label={TitleLabels.CreationCV.country}
            required
            name={`country_${item}`}
            value={values[`country_${item}`]}
            onChange={onChange}
            error={errors[`country_${item}`]}
            showError={true}
            isEditable={type !== 'read'}
            data={country}
          />
        </View>

        {/** Province */}
        <View
          style={[
            styles.inputWrap,
            {
              backgroundColor:
                type === 'read'
                  ? COLORS.disableGray
                  : values[`country_${item}`] !== ''
                  ? COLORS.white
                  : COLORS.disableGray,
            },
          ]}>
          <InputSelect
            label={TitleLabels.CreationCV.province}
            required
            name={`province_${item}`}
            value={values[`province_${item}`]}
            onChange={onChange}
            error={errors[`province_${item}`]}
            showError={true}
            isEditable={type !== 'read' && values[`country_${item}`] !== ''}
            data={province}
          />
        </View>

        {/** Zone */}
        <View
          style={[
            styles.inputWrap,
            {
              backgroundColor:
                type === 'read'
                  ? COLORS.disableGray
                  : values[`province_${item}`] !== ''
                  ? COLORS.white
                  : COLORS.disableGray,
            },
          ]}>
          <InputField
            label={TitleLabels.CreationCV.zone}
            required={values[`province_${item}`] !== ''}
            value={values['zone_' + item]}
            name={'zone_' + item}
            onChange={onChange}
            error={errors['zone_' + item]}
            showError={true}
            isEditable={type !== 'read' && values[`province_${item}`] !== ''}
            maxLength={50}
          />
        </View>
      </View>
      {isLoading ? <Loader /> : <View />}
    </View>
  );
};
