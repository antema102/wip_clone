import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import styles from '../../styles';
import { useNavigate } from 'react-router-dom';
import { formsStyles } from '../../../../../globalStyle/formStyles';
import Buttons from '../../../../../components/Button/button';
import CustomButtons from '../../../../../components/Button/button';
import globalStyle from '../../../../../globalStyle/globalStyle';
import { COLORS, icons } from '../../../../../../resources/constants';
import { InputField } from '../../../../../components/Inputs/InputField';
import FileUploader from '../../../../../components/FileUploader';
import { PDFViewerScreen } from '../../../PDFVIewerScreen';

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

export const ListOfRecommandation = ({
    item,
    index,
    values,
    onChange,
    onRemove,
    errors,
    showErrors,
    type,
}: Props) => {
    const [fileName, setFileName] = useState('Regarder le fichier');
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState(
        values[`file_${item}`] ? values[`file_${item}`] : '',
    );
    const navigation = useNavigate();
    const handleRemove = () => {
        onRemove(item);
    };
    const showPDFViewer = () => {
        setVisible(true);
    };

    const namePDF = (name: string) => {
        if (!name.endsWith('.pdf')) {
            return (name += '.pdf');
        } else {
            return name;
        }
    };

    const pickAndEncodePDF = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event?.target?.files[0];

            if (file) {
                const fileReader = new FileReader();

                fileReader.onload = (e) => {
                    const content = e?.target?.result?.split(',')[1];
                    setFile(content);
                    onChange(`file_${item}`, content, true);
                };

                fileReader.readAsDataURL(file);
                setFileName(file.name ? namePDF(file.name.slice(0, 15)) : '');
            }
        } catch (error) {
        }
    };

    return (<>
        <PDFViewerScreen visible={visible} setVisible={setVisible} data={file} isDownloadAllowed={false} />
        <View style={[formsStyles.inputWrapBlueCreate, { paddingTop: 20 }]}>
            <View style={styles.btnRemoveContainer}>
                <Text style={styles.btnRemoveTitle}>{`Recommandation ${index}`}</Text>

                {type !== 'read' && (
                    <Buttons
                        _style={[styles.btnRemove, globalStyle.elevationBlue]}
                        onPress={handleRemove}
                        title=""
                        color=""
                        styleBtnTxt={{ color: COLORS.white }}
                        icon={icons.moins}
                        iconStyles={{ margin: 5 }}
                    />
                )}
            </View>

            <View key={`recommandation-${item}`}>
                <View
                    style={[
                        styles.inputWrap,
                        {
                            backgroundColor:
                                type === 'read' ? COLORS.disableGray : COLORS.white,
                        },
                    ]}>
                    <InputField
                        label={'Nom de la Recommandation'}
                        required
                        value={values[`name_${item}`]}
                        name={`name_${item}`}
                        onChange={onChange}
                        error={errors[`name_${item}`]}
                        showError={true}
                        isEditable={type !== 'read'}
                        maxLength={50}
                    />
                </View>

                <View
                    style={[
                        styles.inputWrap,
                        {
                            backgroundColor:
                                type === 'read' ? COLORS.disableGray : COLORS.white,
                        },
                    ]}>
                    <InputField
                        label={'Référence'}
                        required
                        value={values[`reference_${item}`]}
                        name={`reference_${item}`}
                        onChange={onChange}
                        error={errors[`reference_${item}`]}
                        showError={true}
                        isEditable={type !== 'read'}
                        maxLength={50}
                    />
                </View>

                {/* <View style={{marginVertical: 20}}>
          <CustomButtons
            onPress={async () => await pickAndEncodePDF(item)}
            title={'Import PDF'}
            _style={[globalStyle.elevationBlue, globalStyle.buttonHomeDisplay]}
            color={'red'}
            icon={icons.filetext}
            styleBtnTxt={globalStyle.bigBtnTxt}
            isDisable={type === 'read'}
          />
        </View> */}

                <View style={{ marginVertical: 20 }}>
                    <FileUploader accept=".pdf" handleFileChange={pickAndEncodePDF} disable={type === 'read'} fileName={'Importer PDF'} icon={icons.filetext} color={COLORS.secondary}/>
                </View>
                {file ? (
                    <View style={{ marginVertical: 20 }}>
                        <CustomButtons
                            onPress={async () => await showPDFViewer()}
                            title={fileName}
                            _style={[globalStyle.elevationBlue, globalStyle.buttonHomeExport]}
                            color={'red'}
                            icon={icons.filetext}
                            styleBtnTxt={globalStyle.bigBtnTxt}
                        />
                    </View>
                ) : null}
            </View>
        </View>
    </>
    );
};
