/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Icons} from '@src/assets';
import styles from './styles';
import appConstants from '@src/constants/appConstants';
import colors from '@src/constants/colors';

interface CustomRadioButtonsProps {
  handleRadioBtn: Function;
}
const CustomRadioButtons = (props: CustomRadioButtonsProps) => {
  const {handleRadioBtn} = props;
  const [isCheck, setIsCheck] = useState(1);

  // function to get data according to id selected...
  const handleOneWay = () => {
    setIsCheck(1);
    handleRadioBtn(1); // function from home screen..
  };

  // function to get data according to id selected...
  const handleRoundTrip = () => {
    setIsCheck(2);
    handleRadioBtn(2); // function from home screen..
  };
  return (
    // Oneway option of home screen
    <View style={styles.radioContainer}>
      <TouchableOpacity
        onPress={handleOneWay}
        style={[
          styles.radioStyle,
          {
            backgroundColor:
              isCheck === 1 ? colors.color_darkBlue : colors.color_fff,
          },
        ]}>
        <View
          style={[
            styles.roundTripLogoContainer,
            {
              backgroundColor:
                isCheck === 1 ? colors.color_80C7EF : colors.color_F5F5F5,
            },
          ]}>
          <Image
            style={[
              styles.imageStyle,
              {tintColor: isCheck === 1 ? colors.color_fff : colors.color_000},
            ]}
            source={Icons.RIGHTAROOW_LOGO}
          />
        </View>
        <Text
          style={[
            styles.radioLabelStyle,
            {color: isCheck === 1 ? colors.color_fff : colors.color_000},
          ]}>
          {appConstants.oneway}
        </Text>
      </TouchableOpacity>

      {/* round trip option of home screen */}
      <TouchableOpacity
        onPress={handleRoundTrip}
        style={[
          styles.radioStyle,
          {
            backgroundColor:
              isCheck === 2 ? colors.color_0094E6 : colors.color_fff,
          },
        ]}>
        <View
          style={[
            styles.roundTripLogoContainer,
            {
              backgroundColor:
                isCheck === 2 ? colors.color_80C7EF : colors.color_F5F5F5,
            },
          ]}>
          <Image
            style={[
              styles.imageStyle,
              {tintColor: isCheck === 2 ? colors.color_fff : colors.color_000},
            ]}
            source={Icons.ROUNDTRIP_LOGO}
          />
        </View>
        <Text
          style={[
            styles.radioLabelStyle,
            {
              color: isCheck === 2 ? colors.color_fff : colors.color_000,
            },
          ]}>
          {appConstants.roundTrip}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomRadioButtons;
