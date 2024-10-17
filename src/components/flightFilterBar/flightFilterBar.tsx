/* eslint-disable prettier/prettier */
import appConstants from '@src/constants/appConstants';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import styles from './styles';
import {Icons} from '@src/assets';

const FlightFilterBar = () => {
  const filters = [
    {
      id: 2,
      filter: appConstants.price,
      imageBg: Icons.FILTERBAR_BG,
      image: Icons.PRICE_LOGO,
    },
    {
      id: 3,
      filter: appConstants.duration,
      imageBg: Icons.FILTERBAR_BG,
      image: Icons.CLOCK_LOGO,
    },
    {
      id: 4,
      filter: appConstants.flightDeparture,
      imageBg: Icons.FILTERBAR_BG,
      image: Icons.FLIGHTDEP_LOGO,
    },
  ];

  return (
    <View style={styles.filterBarContainer}>
      {filters.map(item => (
        <TouchableOpacity
          onPress={()=>Alert.alert(appConstants.inProgress)}
          key={item.id}
          style={styles.filterBarItemsContainer}>
          <ImageBackground
            style={styles.logoBackgroundStyle}
            source={item?.imageBg}>
            <Image style={styles.logoStyle} source={item.image} />
          </ImageBackground>
          <Text style={styles.textStyle}>{item.filter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FlightFilterBar;
