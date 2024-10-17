/* eslint-disable prettier/prettier */
import React from 'react';
import {View, FlatList, Image, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import {flagURL} from '@src/constants/appConstants';

interface NationalityDropDownProps {
  data: any;
  onPress: any;
}

const NationalityDropDown = (props: NationalityDropDownProps) => {
  const {data, onPress} = props;
  return (
    <View style={styles.countryPickerContainerStyle}>
      <FlatList
        data={data}
        scrollEnabled={true}
        renderItem={({item}: any) => {
          return (
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={styles.countryNameContainerStyle}>
              <Image
                style={styles.flagImageStyle}
                source={{
                  uri: `${flagURL.flaghhtp}${item?.code.toLowerCase()}${
                    flagURL.wedp
                  }`,
                }}
              />
              <View style={styles.countryNameViewStyle}>
                <Text style={styles.contryNameTextStyle}>{item?.name}</Text>
              </View>
              <Text style={styles.countryCodeTextStyle}>{item?.code}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default NationalityDropDown;
