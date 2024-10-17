/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {Icons} from '@src/assets';
import appConstants from '@src/constants/appConstants';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

// interface for the header..
interface MultipleSelectorHeaderProps {
  content: any;
  onPress: any;
  header: any;
}

const MultipleSelectorHeader = (props: MultipleSelectorHeaderProps) => {
  const {content, header, onPress} = props;
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={appConstants.activeOpacity}
        style={[
          styles.openingButtonContainerStyle,
          {borderWidth: content ? responsiveWidth(0) : responsiveWidth(0.5)},
          {width: content ? responsiveWidth(85) : responsiveWidth(95)},
          {borderRadius: content ? responsiveWidth(0) : responsiveWidth(4)},
          {marginTop: content ? responsiveHeight(0) : responsiveHeight(2)},
        ]}>
        <Text
          style={[
            styles.openingButtonTextStyle,
            {
              marginLeft:
                content === false ? responsiveWidth(2) : responsiveWidth(0),
            },
          ]}>
          {header}
        </Text>
        <Image source={content ? Icons.DROPDUP_ARROW : Icons.DROPDOWN_ARROW} />
      </TouchableOpacity>
    </>
  );
};

export default MultipleSelectorHeader;
