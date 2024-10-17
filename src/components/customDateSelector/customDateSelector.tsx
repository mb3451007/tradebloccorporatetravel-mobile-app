/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {Icons} from '@src/assets';
import colors from '@src/constants/colors';

// interfase types used..
interface CustomDateSelectorProps {
  containerCustomStyle?: any;
  date: any;
  heading: any;
  headingCustomStyle?: any;
  onPress: any;
  showRight?: any;
  showLeft?: any;
}

// custom date selector..
const CustomDateSelector = (props: CustomDateSelectorProps) => {
  const {
    containerCustomStyle,
    date,
    heading,
    headingCustomStyle,
    onPress,
    showRight,
    showLeft,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.container, {...containerCustomStyle}]}
      onPress={onPress}>
      <Text style={[styles.headingStyle, {...headingCustomStyle}]}>
        {heading}
      </Text>
      <View style={styles.inputContainer}>
        {showLeft && (
          <Image
            style={styles.calendarIconStyle}
            source={Icons.CALENDER_LOGO}
          />
        )}
        <Text style={styles.dateStyle}>{date}</Text>
        {showRight && (
          <Image
            style={[styles.calendarIconStyle, styles.rightIconStyle]}
            source={Icons.CALENDER_LOGO}
            tintColor={colors.color_BBBBBB}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomDateSelector;
