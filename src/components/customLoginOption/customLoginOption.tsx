/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {ImageSourcePropType} from 'react-native';
import styles from './styles';
import appConstants from '@src/constants/appConstants';

// types of props used..
interface CustomLoginOptionProps {
  label: string;
  source: ImageSourcePropType;
  onPress: any;
}

// custom facebook and google login options...
const CustomLoginOption = (props: CustomLoginOptionProps) => {
  const {label, source, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={appConstants.activeOpacity}>
      <Image style={styles.iconStyle} source={source} />
      <Text style={styles.textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomLoginOption;
