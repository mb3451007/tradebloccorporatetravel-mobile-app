/* eslint-disable prettier/prettier */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import colors from '@src/constants/colors';

interface handleButtonProps {
  handleHotelButtons:Function,
  title:any,
  buttonID:any,
  buttonindex:any,
}
const HotelButtonComponent = (props: handleButtonProps) => {
  const {handleHotelButtons, title, buttonID,buttonindex} = props;

  return (
    <TouchableOpacity style={[styles.hotelButton , {
      backgroundColor: buttonID === buttonindex ? colors.color_7B5039 : colors.color_fff }]} onPress={()=>handleHotelButtons()}>
      <Text style={[styles.titleTextStyle , {
      color: buttonID === buttonindex ? colors.color_fff : colors.color_000 }]} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default HotelButtonComponent;
