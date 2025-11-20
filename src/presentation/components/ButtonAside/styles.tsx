import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../../resources/constants';

export default StyleSheet.create({
    containerButton: {
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    buttonIcon: {
        width: 28,
        height: 24,
        resizeMode:'contain',
    },
    buttonTitle: {
        fontSize: 14,
    },
    buttonIcon2: {
        width: 10,
        height: 10,
        resizeMode:'contain',
        tintColor:COLORS.blueInput,
    },
});