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
import {clearSubmit} from '@src/screens/payment/slice/submitSlice';

// create a component
const PaymentSuccessModal = () => {
  const paymentData = useSelector((state: RootState) => state.submit.resposne);
  const dispatch = useDispatch();
  return (
    <Modal>
      <View>
        <View>
          <CustomHeader
            leftIconStyle={styles.leftIconStyle}
            leftIcon={Icons.BACK_LOGO}
            lefticonOnPress={() => {
              navigate(navigationConstants.FLIGHT);
              dispatch(clearSubmit());
            }}
          />
          <Image
            style={styles.thankYouImageStyle}
            source={Images.THANKYOU_IMG}
          />
          <Text style={styles.thankyouTextStyle}>{appConstants.thankyou}</Text>
          <Text style={styles.detailsTextStyle}>
            {paymentData?.data?.message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentSuccessModal;
