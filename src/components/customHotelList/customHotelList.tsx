/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import styles from './styles';
import {Icons, Images} from '@src/assets';
import CustomButton from '../customButton/customButton';
import appConstants from '@src/constants/appConstants';
import {useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import {facilitiesCodes} from '@src/utility/enums/HotelFacilities';
import CustomLoader from '../customLoader/customLoader';
import colors from '@src/constants/colors';

interface hotelListProp {
  handleViewDetailsOfRoom: Function;
  isLoading: boolean;
}

const CustomHotelList = (props: hotelListProp) => {
  const {handleViewDetailsOfRoom, isLoading} = props;
  const hotelsResult: any = useSelector(
    (state: RootState) => state.hotelSearch.hotelsData?.data,
  );

  const getRoomDetails = (data: any) => {
    return data.map((el: any, ind: any) => {
      return hotelsResult?.hotelsData?.rooms?.[el];
    });
  };

  const renderItem = ({item}: any) => {
    const {BasicPropertyInfo} = item;

    const roomCount = item?._RoomStayRPH?.split(' ').length;
    const gotRoomData = getRoomDetails(item?._RoomStayRPH?.split(' '));
    const roomStartingPrice = gotRoomData[0];
    const roomEndPriceIndex = gotRoomData.length - 1;
    const roomEndPrice = gotRoomData[roomEndPriceIndex];

    let maxStarValue = 5;

    const HotelServicesCodeArray = BasicPropertyInfo?.HotelAmenity;

    const hotelServicedata: any = Array.isArray(HotelServicesCodeArray)
      ? HotelServicesCodeArray?.map(data => facilitiesCodes[data?._Code])
      : facilitiesCodes[HotelServicesCodeArray?._code];

    const hotelFilteredData: any = hotelServicedata?.filter(
      (data: any) => data !== undefined,
    );

    const imageSource =
      BasicPropertyInfo?.VendorMessages?.VendorMessage?.SubSection?.Paragraph[4]
        ?.URL;
    return (
      <View style={styles.mainView}>
        <View style={styles?.hotelListFirstView}>
          <View>
            <Image
              source={imageSource ? {uri: imageSource} : Images.HOTEL_IMAGE}
              defaultSource={Images.HOTEL_IMAGE}
              style={styles.hotelImage}
            />
          </View>
          <View style={styles.hotelDescription}>
            <Text style={styles.hotelTitle} numberOfLines={1}>
              {BasicPropertyInfo?._HotelName}
            </Text>
            <View style={styles.locationView}>
              <Image source={item?.locationlogo} style={styles.locationlogo} />
              <Text style={styles.hotelLocationText} numberOfLines={1}>
                {BasicPropertyInfo?.Address?.AddressLine}
                {','}
                {BasicPropertyInfo?.Address?.CityName}
                {','}
                {BasicPropertyInfo?.Address?.CountryName?._Code}
              </Text>
            </View>
            <View style={styles.ratingMainView}>
              {Array.from({length: BasicPropertyInfo?.Award?._Rating}).map(
                (_, index) => (
                  <Image
                    style={styles.ratingImage}
                    key={index}
                    source={Icons.HOTEL_RATING_STAR}
                  />
                ),
              )}

              {Array.from({
                length:
                  Math.floor(maxStarValue) - BasicPropertyInfo?.Award?._Rating,
              }).map((_, index) => (
                <Image
                  style={styles.ratingImage}
                  key={index}
                  source={Icons.HOTEL_RATING_EMPTYSTAR}
                />
              ))}
            </View>
            <View style={styles.hotelServicesIconMainView}>
              {hotelFilteredData?.slice(0, 2)?.map((obj: any) => {
                return (
                  <View style={styles.hotelServicesIcon}>
                    <Text style={styles.serviceText} numberOfLines={1}>
                      {obj?.shText}
                    </Text>
                  </View>
                );
              })}
              <View style={styles.hotelServicesIcon}>
                <Text style={styles.noOfServices}>
                  {' '}
                  +{hotelFilteredData?.length - 2}
                </Text>
              </View>
            </View>

            {/* <Image
                source={Icons.WIFI_LOGO}
                style={styles.hotelServicesIcon}
              />
              <Image
                style={styles.hotelServicesIcon}
                source={Icons.COFFEE_LOGO}
              />
              <Image style={styles.hotelServicesIcon} source={Icons.BED_LOGO} />
              <Image
                style={styles.hotelServicesIcon}
                source={Icons.CAR_ICON_LOGO}
              />
              <Image
                style={styles.hotelServicesIcon}
                source={Icons.SAVER_LOGO}
              /> */}
          </View>
        </View>
        <View style={styles.hotelListSecondView}>
          <View style={styles.priceView}>
            <View style={styles.dottedLine}>
              <View style={styles.hotelListSecondinnerView}>
                <View>
                  <Text style={styles.totalRooms}>{roomCount} total rooms</Text>
                  <Text style={styles.roomPrice}>
                    {roomStartingPrice?.RoomRates?.RoomRate?.Total?.hasOwnProperty(
                      '_AmountIncludingMarkup',
                    )
                      ? roomStartingPrice?.RoomRates?.RoomRate?.Total
                          ?._AmountIncludingMarkup
                      : roomStartingPrice?.RoomRates?.RoomRate?.Total
                          ?._AmountAfterTax}{' '}
                    {'-'}
                    {roomEndPrice?.RoomRates?.RoomRate?.Total?.hasOwnProperty(
                      '_AmountIncludingMarkup',
                    )
                      ? roomEndPrice?.RoomRates?.RoomRate?.Total
                          ?._AmountIncludingMarkup
                      : roomEndPrice?.RoomRates?.RoomRate?.Total
                          ?._AmountAfterTax}{' '}
                    {''}{' '}
                    {
                      roomStartingPrice?.RoomRates?.RoomRate?.Total
                        ?._CurrencyCode
                    }
                  </Text>
                </View>
                <View>
                  <CustomButton
                    label={appConstants.viewDeals}
                    buttonStyle={styles.buttonStyle}
                    labelStyle={styles.labelStyle}
                    gradientStyle={styles.buttonStyle}
                    customButtonStyle={styles.buttonStyle}
                    onPress={() =>
                      handleViewDetailsOfRoom(
                        BasicPropertyInfo?._HotelCode,
                        BasicPropertyInfo?._ChainCode,
                        BasicPropertyInfo?._HotelCodeContext,
                      )
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={hotelsResult?.hotelsData?.hotels}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default CustomHotelList;
