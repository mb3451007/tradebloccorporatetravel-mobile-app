/* eslint-disable prettier/prettier */
//import liraries
import React from 'react';
import {View, Text, Modal, Image} from 'react-native';
import styles from './styles';
import CustomHeader from '../customHeader/customHeader';
import {Icons, Images} from '@src/assets';
import appConstants from '@src/constants/appConstants';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import {navigate} from '@src/navigation/navigationMethods';
import navigationConstants from '@src/constants/navigationConstants';
import {clearhotelPayment} from '@src/screens/hotelPayment/slice/hotelPaymentSlice';

// create a component
const HotelPaymentFailureModal = () => {
  const paymentDataFailure = useSelector(
    (state: RootState) => state.hotelPayment?.err,
  );

  const dispatch = useDispatch();
  return (
    <Modal>
      <View>
        <View>
          <CustomHeader
            leftIconStyle={styles.leftIconStyle}
            leftIcon={Icons.BACK_LOGO}
            lefticonOnPress={() => {
              navigate(navigationConstants.HOTEL);
              dispatch(clearhotelPayment());
            }}
          />
          <Image
            style={styles.thankYouImageStyle}
            source={Images.BookedFlight}
          />
          <Text style={styles.thankyouTextStyle}>{appConstants.oops}</Text>
          <Text style={styles.detailsTextStyle}>
            {paymentDataFailure?.errMsg}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default HotelPaymentFailureModal;
