/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import { Icons } from '@src/assets';

// types of props used..
interface CustomBackButtonProps {
  onPress: any;
}
// custom back button..
const CustomBackButton = (props: CustomBackButtonProps) => {
  const {onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={Icons.BACK_LOGO} />
    </TouchableOpacity>
  );
};

export default CustomBackButton;
