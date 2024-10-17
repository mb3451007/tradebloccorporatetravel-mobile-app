/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {Icons} from '@src/assets';
import colors from '@src/constants/colors';

interface CustomDropdownProps {
  onDropdownItemPress: Function;
  locationsData: any;
  animating?: any;
}

const CustomDropdown = (props: CustomDropdownProps) => {
  const {onDropdownItemPress, locationsData, animating} = props;
  return (
    <>
      {locationsData ? (
        <View style={styles.dropDownContainer}>
          <FlatList
            nestedScrollEnabled={true}
            data={locationsData}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    onDropdownItemPress(item.name, item.code, item.location)
                  }
                  style={styles.dropDownContent}>
                  {item ? (
                    <>
                      <Image
                        style={styles.dropIcons}
                        source={
                          item.type === 'city'
                            ? Icons.LOCATION_LOGO
                            : Icons.PLANE_LOGO
                        }
                      />
                      <Text style={styles.dropListName}>{item.name}</Text>
                      <Text style={styles.dropListCode}>{item.code}</Text>
                    </>
                  ) : (
                    <ActivityIndicator animating={animating} />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <View>
          <ActivityIndicator
            color={colors.color_0094E6}
            size={'large'}
            animating={animating}
          />
        </View>
      )}
    </>
  );
};
export default CustomDropdown;
