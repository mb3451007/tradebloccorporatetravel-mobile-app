/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {Icons} from '@src/assets';
import colors from '@src/constants/colors';
import LinearGradient from 'react-native-linear-gradient';

interface ProfileTravelBookingDetailsProps {
  topLeftIcon?: any;
  topLeftText?: any;
  topRightText?: any;
  middleLeftIcon?: any;
  middleLeftKeyText?: any;
  middleLeftValueText?: any;
  middleRightIcon?: any;
  middleRightKeyText?: any;
  middleRightValuText?: any;
  paymentStatus: any;
  price: any;
  onPress?: any;
}

const ProfileTravelBookingDetails = (
  props: ProfileTravelBookingDetailsProps,
) => {
  const {
    topLeftIcon,
    topLeftText,
    topRightText,
    middleLeftIcon,
    middleLeftKeyText,
    middleLeftValueText,
    middleRightIcon,
    middleRightKeyText,
    middleRightValuText,
    paymentStatus,
    price,
    onPress,
  } = props;
  return (
    <View style={styles.flightContainerStyle}>
      {/* Location Code container */}
      <View style={styles.bookingDateContainerStyle}>
        <View style={styles.calendarImgContainerStyle}>
          <Image
            style={styles.calendarLogoStyle}
            tintColor={colors.color_0094E6}
            source={topLeftIcon}
          />
          <Text style={styles.bookingDateTextStyle}>{topLeftText}</Text>
        </View>
        <Text style={styles.bookingDateStyle}>{topRightText}</Text>
      </View>
      {/* Seprate line view */}
      <View style={styles.separateLineStyle} />

      <View style={styles.flightDetailsContainerStyle}>
        {/* View 1 */}
        <View style={styles.flightDetailsViewStyle}>
          <View style={styles.locationDepContainerStyle}>
            <Image
              style={styles.locationImgStyle}
              tintColor={colors.color_0094E6}
              source={middleLeftIcon}
            />
            <Text style={styles.locationStyle}>{middleLeftKeyText}</Text>
          </View>
          <Text style={styles.locationTextStyle}>{middleLeftValueText}</Text>
          <Text style={styles.costStatusTextStyle}>cost</Text>
          <Text style={styles.priceTextStyle}>{price}</Text>
        </View>
        {/* View 2 */}
        <View style={styles.flightDetailsViewStyle}>
          <View style={styles.DepDateContainerStyle}>
            {middleRightIcon && (
              <Image
                style={styles.locationImgStyle}
                source={middleRightIcon}
                tintColor={colors.color_0094E6}
              />
            )}
            <Text style={styles.departureDateTextStyle}>
              {middleRightKeyText}
            </Text>
          </View>
          <Text style={styles.bookingDateStyle}>{middleRightValuText}</Text>
          <Text style={styles.costStatusTextStyle}>Status</Text>
          <Text style={styles.paymentTextStyle}>{paymentStatus}</Text>
        </View>
      </View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.viewDetailsLinearStyle}
        colors={[colors.color_43BCFF, colors.color_0094E6]}>
        <TouchableOpacity
          style={styles.viewDetailsButtonContainerStyle}
          onPress={onPress}>
          <Image tintColor={colors.color_fff} source={Icons.SHOWEYE_LOGO} />
          <Text style={styles.viewDetailsTextStyle}>View Details</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default ProfileTravelBookingDetails;
