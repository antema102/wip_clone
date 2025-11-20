import React from 'react'
import { TouchableOpacity, Image, View, Dimensions, Text } from 'react-native';
import globalStyle from '../../../globalStyle/globalStyle';
import { COLORS, icons } from '../../../../resources/constants';
import { Tooltip } from 'primereact/tooltip';

type FixedButtonProps = {
    activeTooltip?: boolean,
    tooltipValue?: any,
    iconImage?: any,
    handleNavigate: any
    styles?: any
}

const FixedButtonCircle = ({ handleNavigate, iconImage, styles, activeTooltip = false, tooltipValue }: FixedButtonProps) => {
    const winHeight = Dimensions.get('window').height;
    const tooltipActive = (<Tooltip target=".custom-tooltip-btn" position="top" mouseTrack mouseTrackLeft={10}>
        <Text style={{color: 'white'}}>{tooltipValue}</Text>
    </Tooltip>)
    return (<>
        {activeTooltip && tooltipActive}
        <View style={styles ? styles : {
            height: 400,
            flex: 1,
            position: 'absolute',
            top: winHeight - 600,
            justifyContent: 'center',
            right: 60,
        }}>
            <div className="custom-tooltip-btn">
                <TouchableOpacity
                    onPress={handleNavigate}
                    style={[
                        {
                            marginRight: 22,
                            width: 48,
                            height: 48,
                            borderRadius: 26,
                            backgroundColor: COLORS.secondary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'fixed'
                        },
                        globalStyle.shadowButtonCircular,
                    ]}>
                    <Image
                        source={iconImage ? iconImage : icons.plus}
                        style={{ justifyContent: 'center', width: 18, height: 18 }}
                    />
                </TouchableOpacity>
            </div>
        </View>
    </>
    )
}

export default FixedButtonCircle