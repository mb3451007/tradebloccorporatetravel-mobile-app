/* eslint-disable prettier/prettier */
import { Fonts } from '@src/assets';
import colors from '@src/constants/colors';
import { Platform, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
export default StyleSheet.create({
    hotelButton: {
        width: responsiveWidth(25),
        height: responsiveHeight(12),
        borderRadius: Platform.OS === 'ios' ? 70 : 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderColor: colors.color_D9D9D9,
        borderWidth: 2,
        borderStyle: 'dotted',
    },
    titleTextStyle: {
        transform: [{ rotate: '-18deg' }],
        // color: colors.color_fff,
        textAlign: 'center',
        fontWeight: '500',
        textTransform: 'uppercase',
        fontFamily: Fonts.ROBOTO_REGULAR,
    },
    hotelButtonchange
        : {
        width: responsiveWidth(25),
        height: responsiveHeight(12),
        borderRadius: 50,
        backgroundColor: colors.color_fff,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderColor: colors.color_fff,
        borderWidth: 5,
    },
    titleTextStylechange: {
        transform: [{ rotate: '-18deg' }],
        color: colors.color_000,
        textAlign: 'center',
        fontWeight: '500',
        textTransform: 'uppercase',
    },
});
