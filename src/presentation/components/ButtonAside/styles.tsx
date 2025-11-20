;
import { COLORS, SIZES } from '../../../resources/constants';

export default ({
    containerButton: {
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center'},
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10},
    buttonIcon: {
        width: 28,
        height: 24,
        objectFit: 'contain' as const},
    buttonTitle: {
        fontSize: 14},
    buttonIcon2: {
        width: 10,
        height: 10,
        objectFit: 'contain' as const,
        tintColor:COLORS.blueInput}});