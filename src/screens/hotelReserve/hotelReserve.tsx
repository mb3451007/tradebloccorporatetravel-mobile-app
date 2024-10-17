/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import appConstants from '@src/constants/appConstants';
import React from 'react';
import styles from './styles';
import HotelSlider from '@src/components/customHotelSlider/customHotelSlider';
import commonMethods from '@src/utility/commonMethods';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import {back, navigate} from '@src/navigation/navigationMethods';
import {useNavigation} from '@react-navigation/native';
import HotelConfirmationBar from '@src/components/customBarforhotelConfirmation/customBarforhotelConfirmation';
import {clearroomReserveData} from '../hotelRating/slice/hotelRoomReserveSlice';
import CustomHotelReserve from '@src/components/customHotelReserve/CustomHotelReserve';
import navigationConstants from '@src/constants/navigationConstants';
import {Icons, Images} from '@src/assets';
import CustomButton from '@src/components/customButton/customButton';

const HotelReserve = (props: {route: {params: any}}) => {
  console.log(props.route.params, 'safdsafasfafafasfsa');
  const parentScreen = props?.route?.params?.parentScreen;

  const hotelroomReserveData: any = useSelector(
    (state: RootState) => state.roomReserveData.hotelRoomData,
  );
  console.log(hotelroomReserveData, 'hotelroomReserveData');
  const [isDropDownImg, setIsDropDownImg] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const paymentData = useSelector(
    (state: RootState) => state.hotelPayment?.response,
  );
  console.log(paymentData, 'paymentdata-=-=');

  //======== dropDown change =========
  const toggleDropDown = () => {
    setIsDropDownImg(!isDropDownImg);
  };
  const roomRatesResult: any = useSelector(
    (state: RootState) => state.roomRatesData?.roomRatesData?.data,
  );

  const hotelDetailsResult: any = useSelector(
    (state: RootState) => state.hotelDetailsData?.hotelDetailsData?.data,
  );

  const roomReserveData: any = useSelector(
    (state: RootState) => state.roomReserveData.roomReserveData,
  );

  const {
    hotelInoformation,
    hotelRoomsInoformation,
    roomEndPrice,
    hotelImagesSlider,
    hotelFilteredData,
    hotelImages,
  } = commonMethods.findHotelInfo(hotelDetailsResult, roomRatesResult);

  const handleOnBackIconPress = () => {
    dispatch(clearroomReserveData());
    back();
  };

  // Hook to hide the bottom tab bar

  // useEffect(() => {
  //   // {Object.keys(paymentData).length != 0 ? }
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: 'none',
  //     },
  //   });
  //   return () =>
  //     navigation.getParent()?.setOptions({
  //       tabBarStyle: styles.tabBarStyle,
  //     });
  // }, [navigation]);

  const roomReserveCompleteData = roomReserveData?.data?.hotelPricing;

  const roomStaysData = roomReserveCompleteData?.RoomStays;

  const completeRoomStaysData = roomStaysData?.RoomStay
    ? Array.isArray(roomStaysData?.RoomStay)
      ? roomStaysData?.RoomStay
      : [roomStaysData?.RoomStay]
    : [];

  const completeRoomStaysPrice = roomStaysData?.RoomStay
    ? Array.isArray(roomStaysData?.RoomStay)
      ? roomStaysData?.RoomStay
      : [roomStaysData?.RoomStay]
    : [];
  console.log(roomStaysData, 'roomStaysData');
  console.log(completeRoomStaysData, 'cpmpete');
  console.log(completeRoomStaysPrice, 'completeRoomStaysPrice');

  const RoomPrice = completeRoomStaysPrice?.reduce(
    (total: any, obj: any) =>
      total +
      parseFloat(
        obj?.RoomRates?.RoomRate?.Total?.hasOwnProperty(
          '_AmountIncludingMarkup',
        )
          ? obj?.RoomRates?.RoomRate?.Total?._AmountIncludingMarkup
          : obj?.RoomRates?.RoomRate?.Total?._AmountAfterTax,
      ),
    0,
  );
  const roomPrice = parseFloat(RoomPrice).toFixed(2);
  console.log(roomPrice, 'roomprice');

  const confirmBooking = () => {
    const rooms = hotelroomReserveData?.rooms;
    const completePayload = hotelroomReserveData?.completePayload;
    navigate(navigationConstants?.HOTEL_CHECKOUT, {
      rooms,
      completePayload,
      roomPrice,
    });
  };
 
  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = () => {
    setModalOpen(true);
  };
  const renderModalItem = (item: any) => {
    return (
      <View>
        <Image
          source={{uri: item?.item?.URL}}
          style={styles.Modalimage}
          resizeMode="cover"
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.scrollViewContent}>
        <HotelSlider
          hotelImagesSlider={hotelImagesSlider}
          hotelRoomsInoformation={hotelRoomsInoformation}
          hotelInoformation={hotelInoformation}
          roomEndPrice={roomEndPrice}
          handleOnBackIconPress={handleOnBackIconPress}
          handleModal={handleModal}
          showBackButton={true}
        />
        {modalOpen && (
          <Modal>
            <SafeAreaView>
              <TouchableOpacity
                onPress={() => setModalOpen(false)}
                style={styles.closeButton}>
                <Image source={Icons.CLOSE_LOGO} />
              </TouchableOpacity>
              <FlatList data={hotelImagesSlider} renderItem={renderModalItem} />
            </SafeAreaView>
          </Modal>
        )}
        <CustomHotelReserve
          completeRoomStaysData={completeRoomStaysData}
          toggleDropDown={toggleDropDown}
          isDropDownImg={isDropDownImg}
          setIsDropDownImg={setIsDropDownImg}
        />
        <View style={styles.secondView}>
          <Text style={[styles.detalsTxt, styles.marginDetailTxt]}>
            {appConstants.hotelFecilities}
          </Text>
          <View style={styles.hotelServicesIconMainView}>
            {hotelFilteredData?.map((obj: any) => {
              return (
                <View style={styles.hotelServicesIcon}>
                  <Text style={styles.serviceText}>{obj?.shText}</Text>
                </View>
              );
            })}
          </View>
          {/* <View style={styles.iconViews}>
            <Image
              style={[styles.tintColorStyle, styles.iconStyle]}
              source={Icons.YELLOW_WIFI}
            />
            <Image
              style={[styles.tintColorStyle, styles.iconStyle]}
              source={Icons.COFFEE_MUG}
            />
            <Image style={styles.iconStyle} source={Icons.BAD_IMG} />
            <Image style={styles.iconStyle} source={Icons.CAR_IMG} />
            <Image source={Icons.SHOWER_IMG} />
          </View> */}

         
          <Text style={[styles.detalsTxt, styles.informationTxt]}>
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
        </View>
      </ScrollView>
        <HotelConfirmationBar
          roomPrice={roomPrice}
          confirmBooking={confirmBooking}
        />
    </View>
  );
};

export default HotelReserve;
