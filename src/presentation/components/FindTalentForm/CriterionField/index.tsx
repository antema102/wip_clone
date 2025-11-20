import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

import { SwitchComponent } from '../../Switch';
import { InputSelect } from '../../Inputs/InputSelect';
import { InputField } from '../../Inputs/InputField';
import { InputDatePicker } from '../../Inputs/InputDatePicker';
import { criterionLevel } from '../../../../data/constants/enum';
import { formsStyles } from '../../../globalStyle/formStyles';
import { COLORS, SIZES } from '../../../../resources/constants';
import { TitleLabels } from '../titleLabels';
import { TitleLabels_en } from '../titleLabels_en';
import { useLang } from '../../../../data/translation';

interface Props {
    label: string;
    levelLabel?: string;
    required?: boolean;
    name: string;
    values: any;
    onChange: any;
    data?: any;
    level?: number;
    isEditable: any;
    onChangeEditable?: any;
    style?: any;
    type?: string;
    status?: boolean;
    onBlur?: any;
    errors?: any;
    showErrors?: any;
    errorSalary?: string;
    necessary?: boolean;
    reset?: boolean;
    resetProvince?: boolean;
    noSwitch?: boolean,
}

export default ({
    label,
    levelLabel = 'Niveau de Priorisation critère',
    required = false,
    name,
    values,
    onChange,
    onBlur,
    data,
    level = 10,
    isEditable,
    onChangeEditable,
    style = {},
    type = 'select',
    status = true,
    errors,
    showErrors,
    errorSalary,
    necessary = false,
    reset,
    resetProvince,
    noSwitch = false,
}: Props) => {
    useEffect(() => {
        initValue(isEditable[name]);
    }, [isEditable[name]]);
    useEffect(() => {
        if (typeof onChangeEditable !== 'function') {
            initValue(isEditable[name]);
        }
    }, []);

    const initValue = (editable: string) => {
        if (!necessary) {
            if (editable) {
                if (type === 'salary') {
                    values[`${name}min`] = '';
                    values[`${name}max`] = '';
                } else {
                    values[name] = '';
                }

                onChange(`${name}_level`, '5', true);
            } else {
                if (type === 'salary') {
                    delete values[`${name}min`];
                    delete values[`${name}max`];
                } else {
                    delete values[name];
                }
                delete values[`${name}_level`];
            }
        } else {
            if (type === 'salary') {
                values[`${name}min`] = '';
                values[`${name}max`] = '';
            } else {
                values[name] = '';
            }

            onChange(`${name}_level`, '5', true);
        }
    };

    const { lang } = useLang();
    const activeString = lang === 'fr' ? TitleLabels : TitleLabels_en;
    return (
        <View style={[styles.defaultCriterion]}>

            <View style={noSwitch ? styles.withoutSwitch : styles.alignSwitch}>
                <Text style={styles.titleGroup}>{label}</Text>
                {typeof onChangeEditable === 'function' && !noSwitch ? (
                    <SwitchComponent
                        onChangeValue={() => {
                            onChangeEditable(name);
                            if (reset) {
                                delete values.adrsProvince;
                            }
                            if (resetProvince) {
                                delete values.jobProvince;
                            }
                        }}
                        value={isEditable[name]}
                    />
                ) : null}
            </View>

            {(isEditable[name] || noSwitch) && (
                <View style={styles.contentChamp}>
                    {/** Study Level */}
                    <View
                        style={[
                            formsStyles.inputWrap,
                            { backgroundColor: status ? COLORS.white : COLORS.disableGray },
                        ]}>
                        {type === 'select' ? (
                            <InputSelect
                                label={label}
                                required={required}
                                name={name}
                                value={values[name]}
                                onChange={onChange}
                                isEditable={status}
                                data={data}
                                error={errors[name]}
                                showError={showErrors[name]}
                            />
                        ) : type === 'text' ? (
                            <InputField
                                label={label}
                                required={required}
                                value={values[name]}
                                name={name}
                                onChange={onChange}
                                maxLength={50}
                                isEditable={status}
                                error={errors[name]}
                                showError={showErrors[name]}
                            />
                        ) : type === 'salary' ? (
                            <View>
                                <InputField
                                    label={`${label} minimum`}
                                    required={required}
                                    value={values[`${name}min`]}
                                    name={`${name}min`}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    maxLength={50}
                                    isEditable={status}
                                    error={errors[`${name}min`]}
                                    showError
                                    type={'numeric'}
                                />
                                <InputField
                                    label={`${label} maximum`}
                                    required={required}
                                    value={values[`${name}max`]}
                                    name={`${name}max`}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    maxLength={50}
                                    isEditable={status}
                                    error={errors[`${name}max`]}
                                    showError
                                    type={'numeric'}
                                />
                            </View>
                        ) : type === 'date' ? (
                            <InputDatePicker
                                value={values[name]}
                                required
                                label={label}
                                name={name}
                                onChange={onChange}
                                isEditable={status}
                                type={'date'}
                                dateMax={
                                    new Date(
                                        new Date().getFullYear() - 15,
                                        new Date().getMonth(),
                                        new Date().getDate(),
                                    )
                                }
                            />
                        ) : (
                            ''
                        )}
                    </View>
                    <Text style={{ color: 'red', marginTop: 5 }}>{errorSalary}</Text>

                    {/** Priorisation Critera */}
                    {label == activeString.FindCriteria.Accommodated ||
                        label == activeString.FindCriteria.recommend ||
                        label == 'Poste recherché' ||
                        label == 'Poste souhaité' ||
                        label == activeString.FindCriteria.candidate_search
                        ? null : (
                            <View
                                style={[
                                    formsStyles.inputWrap,
                                    {
                                        backgroundColor: status ? COLORS.white : COLORS.disableGray,
                                        marginTop: SIZES.padding4,

                                    },
                                ]}>
                                <InputSelect
                                    label={activeString.FindOffer.levelLab}
                                    required={required}
                                    name={`${name}_level`}
                                    value={values[`${name}_level`]}
                                    onChange={onChange}
                                    isEditable={status}
                                    data={criterionLevel}
                                    error={errors[`${name}_level`]}
                                    showError
                                />
                            </View>
                        )}
                </View>
            )}
        </View>
    );
};
