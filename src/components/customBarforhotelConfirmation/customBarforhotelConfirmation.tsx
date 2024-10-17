/* eslint-disable prettier/prettier */
import appConstants from '@src/constants/appConstants';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomButton from '../customButton/customButton';
import styles from './styles';
interface confirmationProp {
  roomPrice:any;
  confirmBooking:any;
}
const HotelConfirmationBar = (props: confirmationProp) => {
  const {roomPrice, confirmBooking} = props;
  return (
    <View style={styles.refundableViewInfo}>
      <View>
      <TouchableOpacity
        style={styles.custombuttonStyle}
        activeOpacity={appConstants.activeOpacity}>
            <Text style={styles.labelStyle1}>Book room for</Text>
        <Text style={styles.labelStyle2}>{roomPrice} {' '}{ appConstants.usd}</Text>
      </TouchableOpacity>
      </View>
      <View>
        <CustomButton
          label={appConstants.confirm}
          buttonStyle={[styles.buttonStyle, styles.buttonStyle]}
          labelStyle={styles.labelStyle}
          gradientStyle={styles.buttonStyle}
          customButtonStyle={styles.buttonStyle}
          onPress={confirmBooking}
        />
      </View>
    </View>
  );
};

export default HotelConfirmationBar;
