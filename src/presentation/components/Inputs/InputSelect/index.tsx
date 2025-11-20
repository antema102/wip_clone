import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, Modal, ScrollView, Dimensions } from 'react-native';
import { TitleLabel } from './TitleLabel';
import { COLORS, icons } from '../../../../resources/constants';
import styles from './styles';
import { formsStyles } from '../../../globalStyle/formStyles';
import CustomModal from '../../Modal';
interface ListElement {
    lable: string;
    value: string | number;
}
type ModalElementProps = {
    item?: any;
    onChange?: any;
    setModalVisible?: any;
};


export const initialData = {
    label: 'Choisir critère',
    value: '',
};

const ModalElement = ({ item, onChange, setModalVisible }: ModalElementProps) => {
    const handlePress = () => {
        setModalVisible(previousState => !previousState);
        onChange({ label: item?.label, value: item?.value });
    };
    return (
        <TouchableOpacity style={[styles.button]} onPress={handlePress}>
            <Text style={styles.textStyle}>{item.label}</Text>
        </TouchableOpacity>
    );
};

type InputSelectProps = {
    label: string;
    required: boolean;
    value: any;
    onChange: any;
    name: string;
    error: string;
    showError: boolean;
    isEditable: boolean;
    data: any;
    valueName?: string;
};
export const InputSelect = ({
    label,
    required,
    value,
    onChange,
    name,
    error,
    showError,
    isEditable = true,
    data,
    valueName,
}: InputSelectProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [dataActu, setDataActu] = useState<any>({ label: '', value: '' });

    const updateDataList = data => {
        return [initialData, ...data];
    };

    const [dataList, setDataList] = useState<any>(
        Array.isArray(data) ? updateDataList(data) : convertEnumToArray(data),
    );

    function convertEnumToArray(inputList) {
        const arrayObjects: any = [initialData];
        // Retrieve key and values using Object.entries() method.
        for (const [propertyKey, propertyValue] of Object.entries(inputList)) {
            // Add keys and values to array
            arrayObjects.push({ label: propertyValue, value: propertyKey });
        }
        return arrayObjects;
    }

    const handleChange = newItem => {
        setDataActu(newItem);
        onChange(name, newItem.value, dataList.label, newItem.label);
    };

    useEffect(() => {
        if (Array.isArray(data)) {
            setDataList(updateDataList(data));
        }
    }, [data]);

    const getDataActu = (dataList: ListElement[], value: string | number) => {
        const itemFiltered = dataList?.filter(item => item?.value === value);

        if (itemFiltered?.length) return itemFiltered[0];
        else return null;
    };

    useEffect(() => {
        const dataActuTmp = getDataActu(
            dataList,
            valueName ? value[valueName] : value,
        );

        if (dataActuTmp) setDataActu(dataActuTmp);
        else setDataActu(initialData);
    }, [value, dataList]);

    const handleOpenPicker = () => {
        if (isEditable) setModalVisible(!modalVisible);
    };

    const modalContent = (
        <View style={styles.modalView}>
            <ScrollView style={{ width: '100%', flex: 1 }}>
                {dataList.length || !Array.isArray(data) ? (
                    dataList.map((item, index) => (
                        <ModalElement
                            key={`${name}-${index}`}
                            item={item}
                            onChange={handleChange}
                            setModalVisible={setModalVisible}
                        />
                    ))
                ) : (
                    <Text>err</Text>
                )}
            </ScrollView>
        </View>);

    const windowWidth: number = Dimensions.get('window').width;


    return (
        <TouchableOpacity
            onPress={handleOpenPicker}
            style={{
                width: '100%',
                borderRadius: 40,
                paddingLeft: 5,
                backgroundColor: isEditable ? COLORS.white : COLORS.lightGray,
            }}>
            <TitleLabel label={label} required={required} />

            <CustomModal visible={modalVisible} setVisible={setModalVisible} content={modalContent}
                showHeader={false} style={windowWidth > 991
                    ? { width: '30%', maxHeight: '75%' }
                    : { width: '60%', maxHeight: '30%' }
                } isEditable={true} />

            <View
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    height: 45,
                    width: '100%',
                }}>
                <Text style={{ color: COLORS.black, marginTop: 10, fontWeight: 600 }}>
                    {dataActu.label}
                </Text>
                <View style={{ paddingTop: 10, paddingRight: 10 }}>
                    <Image style={[formsStyles.iconSelect]} source={icons.down} />
                </View>
            </View>

            {required && showError && !!error ? (
                <Text style={styles.textError}>{error}</Text>
            ) : null}
        </TouchableOpacity>
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
    data: PropTypes.any,
};

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
    isEditable: true,
};
