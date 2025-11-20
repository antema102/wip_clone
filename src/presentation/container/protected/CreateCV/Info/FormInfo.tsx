import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';

import {useForm} from './useFormInfo';
import {Validation} from './validationInfo';

import styles from '../styles';
import { ZonnageService } from '../../../../../service/applicatif/Zonnage.sa';
import { getDynamicListByKey } from '../../../../../service/technique/dynamicService';
import { COLORS, FONTS, icons } from '../../../../../resources/constants';
import { InputField } from '../../../../components/Inputs/InputField';
import { InputDatePicker } from '../../../../components/Inputs/InputDatePicker';
import { InputSelect } from '../../../../components/Inputs/InputSelect';
import { formsStyles } from '../../../../globalStyle/formStyles';
import { SwitchComponent } from '../../../../components/Switch';
import Loader from '../../../../components/Loader';
import globalStyle from '../../../../globalStyle/globalStyle';
import { CustomInputDatePicker } from '../../../../components/Inputs/CustomInputDatePicker';

import {TitleLabels} from '../titleLabels';
import { TitleLabels_en } from '../titleLabels_en';
import { useLang } from '../../../../../data/translation';

interface dataModel {
  label: string;
  value: string;
}
export const FormInfo = (props: any) => {
  const {user} = useSelector(({auth}: any) => auth);
  const {
    onSubmitForm,
    changeComplete,
    data,
    onChangeDataStore,
    type,
    setValues,
  } = props;
  const {
    handleChange,
    handleSubmit,
    noError,
    dataInfo,
    errors,
    showErrors,
    dto,
    showError,
  } = useForm(data.info, Validation, handleSave, setValues);

  function handleSave() {
    onSubmitForm(dto.dataInfo);
  }

  useEffect(() => {
    changeComplete(previousState => ({
      ...previousState,
      info: data.info?.firstname ? noError() : false,
    }));
  }, [errors]);

  //-----------------------------------------------------------------------
  const {lang} = useLang();
  const activeString = lang === 'fr' ? TitleLabels : TitleLabels_en;

  // ----------------------------------------------------------------------
  // zonnage management begin here
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transportList, setTransportList] = useState<any>();
  const [petList, setPetList] = useState<any>();
  const [situationList, setSituationList] = useState<any>();
  const [housed, setHoused] = useState(dataInfo.loger || false);
  const {getCountry, getProvince} = ZonnageService();

  const formatSelectData = (data, label, value) => {
    const dataList: dataModel[] = [];
    data?.map(element => {
      dataList.push({
        label: element[label],
        value: element[value],
      });
    });
    return dataList;
  };

  // country management
  const [country, setCountry] = useState<any>([]);

  const getListCountry = async () => {
    const data = await localStorage.getItem('dynamic');
    const dataJSON = JSON.parse(data);
    const transport = getDynamicListByKey('transports', dataJSON);
    const pet = getDynamicListByKey('pets', dataJSON);
    const situation = getDynamicListByKey('situations', dataJSON);
    setSituationList(situation);
    setTransportList(transport);
    setPetList(pet);
    if (!country.lenth) {
      setIsLoading(true);

      getCountry(user?.accessToken)
        .then((res: any) => {
          setCountry(formatSelectData(res.data.items, 'name', 'id'));

          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getListCountry();
  }, []);

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
    if (dataInfo?.country?.length) {
      getListProvince(dataInfo.country);
    }
  }, [dataInfo.country]);

  // ----------------------------------------------------------------------
  return (
    <View>
      <View>
        {/** Name field */}
        <View
          style={[
            styles.inputWrap,
            {
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white,
            },
          ]}>
          <InputField
            label={activeString.CreationCV.name}
            required
            value={dataInfo.name}
            name="name"
            onChange={handleChange}
            error={errors.name}
            showError={showErrors.name}
            maxLength={50}
            isEditable={type !== 'read'}
          />
        </View>

        {/** Firstname field */}
        <View
          style={[
            styles.inputWrap,
            {
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white,
            },
          ]}>
          <InputField
            label={activeString.CreationCV.firstname}
            required
            value={dataInfo.firstname}
            name="firstname"
            onChange={handleChange}
            error={errors.firstname}
            showError={showErrors.firstname}
            maxLength={50}
            isEditable={type !== 'read'}
          />
        </View>

              {/** Type Date here */}
              <View
                  style={[
                      styles.inputWrap,
                      {
                          backgroundColor:
                              type === 'read' ? COLORS.disableGray : COLORS.white,
                      },
                  ]}>
                  <CustomInputDatePicker
                      value={dataInfo.birthdate}
                      required
                      label={activeString.CreationCV.birthdate}
                      name={'birthdate'}
                      onChange={handleChange}
                      isEditable={type !== 'read'}
                      type={'date'}
                      error={errors.birthdate}
                      showError={showErrors.birthdate}
                      dateMax={
                          new Date(
                              new Date().getFullYear() - 18,
                              new Date().getMonth(),
                              new Date().getDate(),
                          ).toISOString()
                      }
                  />
              </View>

        {/** Type Select Civil Status */}
        {situationList && (
          <View
            style={[
              styles.inputWrap,
              {
                backgroundColor:
                  type === 'read' ? COLORS.disableGray : COLORS.white,
              },
            ]}>
            <InputSelect
              label={activeString.CreationCV.civilstatus}
              required
              name="civilstatus"
              value={dataInfo.civilstatus}
              onChange={handleChange}
              error={errors.civilstatus}
              showError={showErrors.civilstatus}
              isEditable={type !== 'read'}
              data={situationList}
            />
          </View>
        )}

        {/** Number of child */}
        <View
          style={[
            styles.inputWrap,
            {
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white,
            },
          ]}>
          <InputField
            label={activeString.CreationCV.child}
            required
            type="numeric"
            value={dataInfo.child}
            name="child"
            onChange={handleChange}
            error={errors.child}
            showError={showErrors.child}
            maxLength={50}
            isEditable={type !== 'read'}
          />
        </View>

        {/** Phone number */}
        <View
          style={[
            styles.inputWrap,
            {
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white,
            },
          ]}>
          <InputField
            label={activeString.CreationCV.phone}
            required
            type="numeric"
            value={dataInfo.phone}
            name="phone"
            onChange={handleChange}
            error={errors.phone}
            showError={showErrors.phone}
            maxLength={50}
            isEditable={type !== 'read'}
          />
        </View>

        {/** Means of transport */}
        {transportList && (
          <View
            style={[
              styles.inputWrap,
              {
                backgroundColor:
                  type === 'read' ? COLORS.disableGray : COLORS.white,
              },
            ]}>
            <InputSelect
              label={activeString.CreationCV.transport}
              required
              name="transport"
              value={dataInfo.transport}
              onChange={handleChange}
              error={errors.transport}
              showError={showErrors.transport}
              isEditable={type !== 'read'}
              data={transportList}
            />
          </View>
        )}

        {/** List of pets */}
        {petList && (
          <View
            style={[
              styles.inputWrap,
              {
                backgroundColor:
                  type === 'read' ? COLORS.disableGray : COLORS.white,
              },
            ]}>
            <InputSelect
              label={activeString.CreationCV.pet}
              required
              name="pet"
              value={dataInfo.pet}
              onChange={handleChange}
              error={errors.pet}
              showError={showErrors.pet}
              isEditable={type !== 'read'}
              data={petList}
            />
          </View>
        )}

        <View style={{marginTop: 20}}>
          <View style={formsStyles.inputWrapBlue}>
            <View style={styles.alignSwitch}>
              <Text style={styles.titleGroup}>Est ce que vous êtes logé?</Text>
              <SwitchComponent
                onChangeValue={
                  type === 'read'
                    ? () => null
                    : () => {
                        setHoused(!housed);
                        handleChange('loger', !housed, false);
                      }
                }
                value={housed}
              />
            </View>
          </View>
        </View>

        {/** Résidence Actuel */}
        <View style={styles.currentResidence}>
          <Text style={{...FONTS.h3Black}}>Résidence Actuelle</Text>
          {/** Users Province */}
          <View
            style={[
              styles.inputWrap,
              {
                backgroundColor:
                  type === 'read' ? COLORS.disableGray : COLORS.white,
              },
            ]}>
            <InputSelect
              label={activeString.CreationCV.country}
              required
              name="country"
              value={dataInfo.country}
              onChange={handleChange}
              error={errors.country}
              showError={showErrors.country}
              isEditable={type !== 'read'}
              data={country}
            />
          </View>

          {/** Users Region */}
          <View
            style={[
              styles.inputWrap,
              {
                backgroundColor:
                  type === 'read' || !dataInfo?.country?.length
                    ? COLORS.disableGray
                    : COLORS.white,
              },
            ]}>
            <InputSelect
              label={activeString.CreationCV.province}
              required={dataInfo?.country !== ''}
              name="province"
              value={dataInfo.province}
              onChange={handleChange}
              error={errors.province}
              showError={showErrors.province}
              isEditable={type !== 'read' && dataInfo?.country !== ''}
              data={province}
            />
          </View>

          {/** Users Zone */}
          <View
            style={[
              styles.inputWrap,
              {
                backgroundColor:
                  type === 'read' || !dataInfo?.province?.length
                    ? COLORS.disableGray
                    : COLORS.white,
              },
            ]}>
            <InputField
              label={activeString.CreationCV.zone}
              required={dataInfo?.region !== ''}
              name="zone"
              value={dataInfo.zone}
              onChange={handleChange}
              error={errors.zone}
              showError={showErrors.zone}
              isEditable={type !== 'read' && dataInfo?.province !== ''}
            />
          </View>
        </View>
      </View>

      {isLoading ? <Loader /> : <View />}

      {/** Submit buttons */}
      <View>
        {type !== 'read' && (
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submitJob]}>
            <Text style={styles.textButton}>Job</Text>
            <Image
              source={icons.action}
              style={{
                width: 16,
                height: 15,
                resizeMode: 'cover',
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
