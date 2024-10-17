/* eslint-disable prettier/prettier */
//======================custom hotel summary======
import React, {useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import appConstants from '@src/constants/appConstants';
import styles from './styles';

const {height} = Dimensions.get('window');

interface hotelSummaryProps {
  hotelFilteredData: any;
  hotelImages: any;
}

const CustomHotelSummary = (props: hotelSummaryProps) => {
  const {hotelFilteredData, hotelImages} = props;

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.facilitiesTxt}>{appConstants.facilities}</Text>
        <View style={styles.hotelServicesIconMainView}>
          {hotelFilteredData?.map((obj: any) => {
            return (
              <View style={styles.hotelServicesIcon}>
                <Text style={styles.serviceText} >
                  {obj?.shText}
                </Text>
              </View>
            );
          })}
        </View>
        <Text style={[styles.facilitiesTxt, {marginTop: height / 20}]}>
          {appConstants.information}
        </Text>
        {hotelImages[0]?.hasOwnProperty('Text') ? (
          <Text style={styles.hotelSummaryTxt}>
            {hotelImages[0]?.Text['#text']}
          </Text>
        ) : (
          ''
        )}
        {hotelImages[1]?.hasOwnProperty('Text') ? (
          <Text style={styles.hotelSummaryTxt} numberOfLines={5}>
            {hotelImages[1]?.Text['#text']}
          </Text>
        ) : (
          ''
        )}
        {/* <Text style={[styles.locationTxt, styles.marginTop]}>{appConstants.policies}</Text> */}
      </View>
    </>
  );
};

export default CustomHotelSummary;
