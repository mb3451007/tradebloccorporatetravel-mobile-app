/* eslint-disable prettier/prettier */
import React from 'react';
import {Icons} from '@src/assets';
import {View, Text, Image} from 'react-native';
import appConstants from '@src/constants/appConstants';
import CustomButton from '../customButton/customButton';
import styles from './styles';

interface FlightBottomPriceBarProps {
  checkoutFetchedData: any;
  priceInArray: any;
  clubAccess: any;
  label: any;
  onPress: any;
}

const FlightBottomPriceBar = (props: FlightBottomPriceBarProps) => {
  const {checkoutFetchedData, priceInArray, clubAccess, label, onPress} = props;
  return (
    <View style={styles.priceDetailsContainerStyle}>
      <View style={styles.priceSubContainerStyle}>
        <Text style={styles.bottomPriceTextStyle}>
          {appConstants.bookingPrice}
        </Text>
        <Text style={styles.bottomPriceTextStyle}>
          {Array.isArray(checkoutFetchedData)
            ? priceInArray.reduce((a: any, b: any) => a + b, 0)?.toFixed(2)
            : checkoutFetchedData?.price?.toFixed(2)}
        </Text>
      </View>
      <Image source={Icons.SELECTEDTICKET_LINE} />
      <View style={styles.priceSubContainerStyle}>
        <Text style={styles.bottomPriceTextStyle}>
          {appConstants.clubAccess}
        </Text>
        <Text style={styles.bottomPriceTextStyle}>{clubAccess}</Text>
      </View>
      <View style={styles.priceSubContainerStyle}>
        <View style={styles.mainPriceContainer}>
          <Text style={styles.mainPriceSubTextStyle}>
            {appConstants.bookflightfor}
          </Text>
          <Text style={styles.mainPriceTextStyle}>
            {Array.isArray(checkoutFetchedData)
              ? (
                  priceInArray.reduce((a: any, b: any) => a + b, 0) + clubAccess
                ).toFixed(2)
              : (checkoutFetchedData?.price + clubAccess).toFixed(2)}{' '}
            {appConstants.usd}
          </Text>
        </View>
        <CustomButton
          gradientStyle={styles.priceNextButtonStyle}
          buttonStyle={styles.priceNextButtonStyle}
          btnStyle={styles.priceNextButtonStyle}
          label={label}
          onPress={onPress}
          labelStyle={styles.labelStyle}
        />
      </View>
    </View>
  );
};

export default FlightBottomPriceBar;
