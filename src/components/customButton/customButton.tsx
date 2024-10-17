/* eslint-disable prettier/prettier */
import appConstants from '@src/constants/appConstants';
import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@src/constants/colors';

// types of properties used in button.
interface CustomButtonProps {
  label: string;
  buttonStyle?: StyleProp<ViewStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  gradientColors?: any;
  gradientStyle?: any;
  customButtonStyle?: any;
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    label,
    buttonStyle,
    labelStyle,
    onPress,
    gradientStyle,
    customButtonStyle,
  } = props;
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[colors.color_43BCFF, colors.color_0094E6]}
      style={[
        styles.submitButtongradientStyle,
        buttonStyle,
        {...gradientStyle},
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.buttonStyle, {...customButtonStyle}]}
        activeOpacity={appConstants.activeOpacity}>
        <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CustomButton;
