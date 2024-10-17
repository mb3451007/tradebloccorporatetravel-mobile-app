/* eslint-disable prettier/prettier */

import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import React from 'react';
import { Icons } from '@src/assets';

interface RatingProp {
defaultRating:any;
maxRating:any;
ratingCountFunction:any
}

const CustomRatingBar = (props: RatingProp) => {
    const {
      defaultRating,
      maxRating,
      ratingCountFunction,
    } = props;
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item:any) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => ratingCountFunction(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? Icons.HOTEL_RATING_STAR
                    : Icons.HOTEL_RATING_EMPTYSTAR
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
export default CustomRatingBar;
