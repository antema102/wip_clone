import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../resources/constants';

export const styles = StyleSheet.create({
    Container:{
        flex:1,
        padding:14,
        backgroundColor:'white'
    },
    Title:{
        fontSize:SIZES.h3,
        fontWeight:'bold',
        paddingBottom:16
    },
    Body:{
        fontSize:16,
    }
});