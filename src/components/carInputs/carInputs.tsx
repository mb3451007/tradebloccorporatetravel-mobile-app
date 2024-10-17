/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import appConstants from '@src/constants/appConstants';

interface CarInputsProps {
  headerLabel: string;
  leftIcon: any;
  value: string;
  customInputContainerStyle?: any;
  customHeaderLabelTextStyle?: any;
  customValueImgContainerStyle?: any;
  customLeftIconImgStyle?: any;
  customValueTextStyle?: any;
}

const CarInputs = (props: CarInputsProps) => {
  const {
    headerLabel,
    leftIcon,
    value,
    customInputContainerStyle,
    customHeaderLabelTextStyle,
    customValueImgContainerStyle,
    customLeftIconImgStyle,
    customValueTextStyle,
  } = props;
  return (
    <>
      <TouchableOpacity
        activeOpacity={appConstants.activeOpacity}
        style={[styles.inputContainerStyle, {...customInputContainerStyle}]}>
        <Text
          style={[
            styles.headerLabelTextStyle,
            {...customHeaderLabelTextStyle},
          ]}>
          {headerLabel}
        </Text>
        <View
          style={[
            styles.valueImgContainerStyle,
            {...customValueImgContainerStyle},
          ]}>
          <Image
            style={[styles.leftIconImgStyle, {...customLeftIconImgStyle}]}
            source={leftIcon}
          />
          <Text style={[styles.valueTextStyle, {...customValueTextStyle}]}>
            {value}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CarInputs;
