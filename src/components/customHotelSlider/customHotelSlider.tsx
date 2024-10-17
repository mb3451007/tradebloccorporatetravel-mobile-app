/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, FlatList, Image, Pressable, TouchableOpacity} from 'react-native';
import colors from '@src/constants/colors';
import {Icons} from '@src/assets';
import {useNavigation} from '@react-navigation/native';
import {SLIDES} from '@src/utility/staticData/staticData';
import styles from './styles';
import CustomHeader from '@src/components/customHeader/customHeader';
import {back} from '@src/navigation/navigationMethods';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux/store';

const {width} = Dimensions.get('window');
const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.95);

interface hotelSliderProps {
  hotelImagesSlider: any;
  hotelRoomsInoformation: any;
  hotelInoformation: any;
  roomEndPrice: any;
  handleOnBackIconPress: any;
  handleModal:any;
  showBackButton:boolean;
}

const HotelSlider = (props: hotelSliderProps) => {
  const {
    hotelImagesSlider,
    hotelInoformation,
    hotelRoomsInoformation,
    roomEndPrice,
    handleOnBackIconPress,
    handleModal,
    showBackButton,
  } = props;
  const navigation = useNavigation();
  const paymentData = useSelector(
    (state: RootState) => state.hotelPayment?.response,
  );
  let maxStarValue = 5;

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    // scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((e: {id: any}) => e.id, []),
    getItemLayout: useCallback(
      (_: any, index: number) => ({
        index,
        length: width,
        offset: index * width,
      }),
      [],
    ),
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnViewableItemsChanged = ({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfigCallbackPairs: any = useRef([
    {handleOnViewableItemsChanged},
  ]);

  const carouselSlide = ({item}: any) => {
    return (
      <>
        <Image
          source={{uri: item?.URL}}
          style={styles.image}
          resizeMode="cover"
        />
        {showBackButton ? <View style={styles.backButton}>
          <CustomHeader
            leftIcon={Icons.BACK_LOGO}
            lefticonOnPress={handleOnBackIconPress}
            leftIconStyle={styles.headerLeftIconStyle}
            headerLabelStyle={styles.headerLabelStyle}
          />
        </View> : ''}
        <View style={styles.textContainer}>
          <Text style={styles.locationTextStyle} numberOfLines={1}>
            {hotelInoformation?.BasicPropertyInfo?.Address?.AddressLine}
            {','} {hotelInoformation?.BasicPropertyInfo?.Address?.CityName}
          </Text>
          <View style={styles.location}>
            <Image source={Icons?.LOCATION_LOGO} style={styles.locationlogo} />
            <Text style={styles.locationText} numberOfLines={1}>
              {hotelInoformation?.BasicPropertyInfo?._HotelName}
            </Text>
          </View>
          <View style={styles.ratingMainView}>
            {Array.from({
              length: hotelInoformation?.BasicPropertyInfo?.Award?._Rating,
            }).map((_, ind: any) => (
              <Image
                style={styles.ratingImage}
                key={ind}
                source={Icons.HOTEL_RATING_STAR}
              />
            ))}

            {Array.from({
              length:
                Math.floor(maxStarValue) -
                hotelInoformation?.BasicPropertyInfo?.Award?._Rating,
            }).map((_, indx: any) => (
              <Image
                style={styles.ratingImage}
                key={indx}
                source={Icons.HOTEL_RATING_EMPTYSTAR}
              />
            ))}
          </View>
        </View>

        <View style={styles.imageBoxContainer}>
          {hotelImagesSlider.map((el:any, i:any) => {
            if (i < 3) {
              return (
                <Pressable key={i}>
                  <Image
                    source={{uri: el.URL}}
                    style={i === 2 ? styles.tintImage : styles.imageBox}
                  />
                  {i === 2 && (
                    <TouchableOpacity style={styles.thirdImage} onPress={()=>{
                      handleModal(item?.URL);
                    }}>
                      <Text style={styles.imageTextStyle}>
                        +{hotelImagesSlider?.length - 2}
                      </Text>
                    </TouchableOpacity>
                  )}
                </Pressable>
              );
            }
          })}
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.roomPrice}>
            {
              hotelRoomsInoformation[0]?.RoomRates?.RoomRate?.Rates?.Rate?.Base
                ?._AmountIncludingMarkup
            }{' '}
            {'-'}{' '}
            {
              roomEndPrice?.RoomRates?.RoomRate?.Rates?.Rate?.Base
                ?._AmountIncludingMarkup
            }
          </Text>
          <View style={styles.roomDescView}>
            <Text style={styles.roomPrice}>
              {' '}
              {
                hotelRoomsInoformation[0]?.RoomRates?.RoomRate?.Rates?.Rate
                  ?.Base?._CurrencyCode
              }
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={styles.carouselView}>
        <FlatList
          data={hotelImagesSlider}
          renderItem={carouselSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          viewabilityConfig={{
            itemVisiblePercentThreshold: 60,
          }}
          {...flatListOptimizationProps}
        />

        <View style={styles.triangle} />
        <View style={styles.indicatorContainer}>
          {hotelImagesSlider?.slice(0, 2)?.map((_item: any, i: number) => {
            const currentValue = currentIndex === i;
            return (
              <View
                style={[
                  styles.circleIndicatorView,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    width: currentValue ? 20 : 10,
                    backgroundColor: currentValue
                      ? colors.color_fff
                      : colors.color_rgba00007,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </>
  );
};

export default HotelSlider;
