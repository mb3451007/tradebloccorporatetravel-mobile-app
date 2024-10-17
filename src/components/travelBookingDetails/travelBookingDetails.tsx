/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, BackHandler, Modal} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '@src/components/customHeader/customHeader';
import {Icons, Images} from '@src/assets';
import appConstants from '@src/constants/appConstants';
import {navigate} from '@src/navigation/navigationMethods';
import navigationConstants from '@src/constants/navigationConstants';
import styles from './styles';
import TravelDetails from '../travelDetails/travelDetails';

interface TravelBookingDetailsProps {
  setViewDetails: any;
}

const TravelBookingDetails = (props: TravelBookingDetailsProps) => {
  const {setViewDetails} = props;
  const [profileDetails, setProfileDetails] = useState({
    phoneNumber: '',
    opnePhoneCodePicker: false,
    phoneCode: '+1',
    flagCode: '',
  });
  const handleBackDropPress: any = useCallback(() => {
    if (profileDetails.opnePhoneCodePicker) {
      setProfileDetails(prevState => {
        return {
          ...prevState,
          opnePhoneCodePicker: false,
        };
      });
    } else {
      navigate(navigationConstants.FLIGHT);
    }
  }, [profileDetails.opnePhoneCodePicker]);

  // hoook for back press
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackDropPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackDropPress);
  }, [handleBackDropPress]);

  return (
    <>
      <Modal animationType="fade">
        <View style={styles.containerStyle}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainerStyle}>
            <CustomHeader
              leftIcon={Icons.BACK_LOGO}
              lefticonOnPress={() => setViewDetails(false)}
              leftIconStyle={styles.headerLeftIconStyle}
              headerLabel={appConstants.travelBookings}
              headerLabelStyle={styles.headerLabelStyle}
            />
            <View style={styles.profileDetailsContainerStyle}>
              <Image
                style={styles.profileImageStyle}
                source={Images.travelBooking}
              />
              <Text style={styles.emailTextStyle}>Hi jummyd@chetu.com</Text>
              <Text style={styles.paymentStatus}>Your payment is failed</Text>
              <Text style={styles.paymentTextStyle}>
                We regret to inform you that your booking has been failed due to
                payment failure. below are your booking details.
              </Text>
            </View>
            <View style={styles.travelDetailsContainer}>
              <TravelDetails
                topLeftIcon={Icons.CALENDER_LOGO}
                topLeftText={'Booking ID'}
                bookingId={'89329838-f37c-4f4f-b23f-433d2d60802c'}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </>
  );
};
export default TravelBookingDetails;
