/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity, Image, FlatList} from 'react-native';
import barOptions from './barOptions';
import styles from './styles';
import colors from '@src/constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {currentTabSelected} from '@src/redux/appSlice/appSlice';
import {RootState} from '@src/redux/store';

const CustomBar = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector((state: RootState) => state.app.selectedTab);

  // function to select id for display data..
  const handleBarOptions = (barId: any) => {
    dispatch(currentTabSelected(barId));
  };
  return (
    <FlatList
      contentContainerStyle={styles.barContainer}
      data={barOptions}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.barLabelContainer,
              {
                borderColor:
                  item.id === currentTab
                    ? colors.color_0094E6
                    : colors.color_E9E9E9,
              },
            ]}
            onPress={() => handleBarOptions(item.id)}>
            <Image style={styles.imageStyle} source={item.image} />
            <Text style={styles.barLabelsStyle}>{item.title}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default CustomBar;
