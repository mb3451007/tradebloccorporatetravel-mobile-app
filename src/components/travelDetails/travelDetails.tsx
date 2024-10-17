/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {Icons} from '@src/assets';
import colors from '@src/constants/colors';

interface ProfileTravelBookingDetailsProps {
  topLeftIcon?: any;
  topLeftText?: any;
  bookingId?: any;
}

const TravelDetails = (props: ProfileTravelBookingDetailsProps) => {
  const {topLeftIcon, topLeftText, bookingId} = props;
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
        <Text style={styles.bookingDateStyle}>{bookingId}</Text>
      </View>

      <View style={styles.viewDetailsLinearStyle}>
        <View style={styles.viewDetailsButtonContainerStyle}>
          <Text style={styles.viewDetailsTextStyle}>PASSENGER (S) Details</Text>
          <Text style={styles.viewDetailsTextStyle}>Jummy (Adult)</Text>
        </View>
      </View>
      <View style={styles.DetailsContainerStyle}>
        <View>
          <Text style={styles.noTextStyle}>No</Text>
          <Text style={styles.noTextValue}>1</Text>
          <View style={styles.separateLineStyle} />
          <View style={styles.detailsLogoImgContainerStyle}>
            <Image style={styles.calendarLogoStyle} source={Icons.CALL} />
            <Text style={styles.phonenoTextStyle}>Phone No</Text>
          </View>
          <Text style={styles.noTextValue}>(919) 302-4676</Text>
          <View style={styles.separateLineStyle} />
          <View style={styles.detailsLogoImgContainerStyle}>
            <Image style={styles.calendarLogoStyle} source={Icons.passport} />
            <Text style={styles.phonenoTextStyle}>Passport</Text>
          </View>
          <Text style={styles.noTextValue}>7700225VH</Text>
          <View style={styles.separateLineStyle} />
        </View>
        <View>
          <View style={styles.detailsLogoImgContainerStyle}>
            <Image style={styles.calendarLogoStyle} source={Icons.gender} />
            <Text style={styles.phonenoTextStyle}>Gender</Text>
          </View>
          <Text style={styles.noTextValue}>Female</Text>
          <View style={styles.separateLineStyle} />
          <View style={styles.detailsLogoImgContainerStyle}>
            <Image style={styles.calendarLogoStyle} source={Icons.Email_LOGO} />
            <Text style={styles.phonenoTextStyle}>Email</Text>
          </View>
          <Text style={styles.noTextValue}>anujt@chetu.com</Text>
          <View style={styles.separateLineStyle} />
          <View style={styles.detailsLogoImgContainerStyle}>
            <Image
              style={styles.calendarLogoStyle}
              source={Icons.CALENDER_LOGO}
            />
            <Text style={styles.phonenoTextStyle}>DOB</Text>
          </View>
          <Text style={styles.noTextValue}>09-10-2023</Text>
          <View style={styles.separateLineStyle} />
        </View>
      </View>
      <View style={styles.flightDateViewStyle}>
        <Text style={styles.noTextStyle}>Trip to (DEL), India</Text>
        <Text style={styles.noTextValue}>
          October We, 2023 - October We, 2023
        </Text>
      </View>
    </View>
  );
};

export default TravelDetails;
