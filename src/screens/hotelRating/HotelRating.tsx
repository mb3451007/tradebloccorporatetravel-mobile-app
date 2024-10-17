/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {hotelButtonData} from '@src/utility/staticData/staticData';
import styles from './styles';
import HotelButtonComponent from '@src/components/HotelButtonComponent/HotelButtonComponent';
import {back, navigate} from '@src/navigation/navigationMethods';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHotelRooms from '@src/components/customHotelRoom/customhotelRoom';
import CustomHotelDetails from '@src/components/customHotelDetails/CustomHotelDetails';
import CustomHotelSummary from '@src/components/customHotelSummary/CustomHotelSummary';
import HotelSlider from '@src/components/customHotelSlider/customHotelSlider';
import commonMethods from '@src/utility/commonMethods';
import {
  fetchroomReserve,
  hotelRoomReserveData,
} from './slice/hotelRoomReserveSlice';
import customHooks from '@src/utility/customHooks';
import appConstants, {
  sessionOutConstants,
  statusCode,
} from '@src/constants/appConstants';
import navigationConstants from '@src/constants/navigationConstants';
import CustomLoader from '@src/components/customLoader/customLoader';
import colors from '@src/constants/colors';
import CustomModal from '@src/components/customModal/customModal';
import {Icons} from '@src/assets';
import { clearhotelDetailsData, hotelListData } from '../hotelList/slice/hotelDetailsSlice';

const HotelRating = (props: any) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [err, setErr] = useState('');

  const fetchedHotelRoomData: any = useSelector(
    (state: RootState) => state?.hotelDetailsData?.hotelListNavData,
  );
  console.log(fetchedHotelRoomData, 'fetchedHotelRoomData');

  const roomReserveData: any = useSelector(
    (state: RootState) => state.roomReserveData.roomReserveData,
  );
  const prevDataHotelsData: any = customHooks.usePrevious(roomReserveData);
  const roomRatesResult: any = useSelector(
    (state: RootState) => state.roomRatesData?.roomRatesData?.data,
  );

  const hotelDetailsResult: any = useSelector(
    (state: RootState) => state.hotelDetailsData?.hotelDetailsData?.data,
  );
console.log(hotelDetailsResult,'hjotyrlerf');

  const {
    getRoomData,
    hotelImages,
    hotelInoformation,
    hotelRoomsInoformation,
    roomEndPrice,
    hotelImagesSlider,
    hotelFilteredData,
  } = commonMethods.findHotelInfo(hotelDetailsResult, roomRatesResult);
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);

  const isCarousel: any = React.useRef(null);
  const handleOnBackIconPress = () => {
    back();
    dispatch(hotelListData(''));
  };

  // Hook to hide the bottom tab bar
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: styles.tabBarStyle,
      });
  }, [navigation]);

  const [hotelSummary, setHotelSummary] = useState(false);
  const [hotelDetails, setHotelDetails] = useState(false);
  const [hotelRoomRates, setHotelRoomRates] = useState(true);

  const [buttonID, setButtonID] = useState(3);

  const handleHotelButtons = (id: any) => {
    setButtonID(id);
    if (id === 3) {
      setHotelRoomRates(true);
      setHotelDetails(false);
      setHotelSummary(false);
    } else if (id === 2) {
      setHotelRoomRates(false);
      setHotelDetails(true);
      setHotelSummary(false);
    } else if (id === 1) {
      setHotelRoomRates(false);
      setHotelDetails(false);
      setHotelSummary(true);
    }
  };
  const [completePayload, setCompletePayload] = useState('');

  const handleHotelReserve = (RPlan: any, RType: any, BookingCode: any) => {
    let AddKey = {
      bookingCode: BookingCode,
      guests: [],
      ratePlan: RPlan,
      roomType: RType,
    };
    const updatedRooms = fetchedHotelRoomData?.filteredObject?.rooms?.map(
      (obj: any) => {
        const {id, ...rest} = obj;
        return {
          ...rest,
          ...AddKey,
        };
      },
    );

    const updatedFilteredObject = {
      ...fetchedHotelRoomData?.filteredObject,
      rooms: updatedRooms,
    };
    delete updatedFilteredObject.filters;
    delete updatedFilteredObject.hotelName;
    delete updatedFilteredObject.contents;
    const data: any = {
      id: roomRatesResult?.id,
      details: updatedFilteredObject,
    };
    setCompletePayload(data);
    dispatch(fetchroomReserve(data));
  };

  // Loader for the hotel data
  const roomReserveLoader: any = useSelector(
    (state: RootState) => state.roomReserveData.isLoading,
  );
  const [sessionExpire, setSessionExpire] = useState(false);
  const navigteOnHotelList = () => {
    setSessionExpire(false);
    navigate(navigationConstants.HOTEL_LIST);
  };
  // Hook for hotel loader..
  useEffect(() => {
    setIsLoading(roomReserveLoader);
  }, [roomReserveLoader]);
  // hook to navigate on hotel reserve screen..
  useEffect(() => {
    if (roomReserveData !== prevDataHotelsData) {
      if (roomReserveData.statusCode === statusCode.Code_200) {
        setIsLoading(false);
        if (roomReserveData?.data?.hotelPricing?.['soap:Fault']) {
          setSessionExpire(true);
          setErr(sessionOutConstants.priceChangedforHotel);
        } 
        // else if (
        //   roomReserveData?.data?.hotelPricing?._EchoToken === 'Pricing'
        // ) {
        //   setIsFailure(true);
        //   setErr(appConstants.roomNotAvailable);
        // } 
        else if (roomReserveData.data) {
          const rooms = fetchedHotelRoomData?.rooms;
          navigate(
            navigationConstants?.HOTEL_RESERVE,
            //   {
            //   rooms,
            //   completePayload,
            // }
          );
          const updatedCompletePayload = JSON.parse(JSON.stringify(completePayload));
          dispatch(hotelRoomReserveData({completePayload:updatedCompletePayload,rooms}));
        }
      }
    }
  }, [roomReserveData]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = (data: any) => {
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
    <>
      <ScrollView style={styles.scrollViewContainer}>
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

        <View style={styles.circleButtonStyle}>
          {hotelButtonData?.map((obj, ind) => {
            return (
              <HotelButtonComponent
                title={obj.title}
                handleHotelButtons={() => {
                  handleHotelButtons(obj.id);
                }}
                buttonID={buttonID}
                buttonindex={ind + 1}
              />
            );
          })}
        </View>
        {isFailure ? (
          <CustomModal label={err} onPress={() => setIsFailure(false)} />
        ) : (
          ''
        )}
        {sessionExpire ? (
          <CustomModal label={err} onPress={() => navigteOnHotelList()} />
        ) : (
          ''
        )}

        <View style={styles.secondView}>
          {hotelRoomRates && (
            <CustomHotelRooms
              setIndex={setIndex}
              index={index}
              isCarousel={isCarousel}
              hotelRoomsInoformation={hotelRoomsInoformation}
              getRoomData={getRoomData}
              handleHotelReserve={handleHotelReserve}
            />
          )}
          {hotelDetails && (
            <CustomHotelDetails
              getRoomData={getRoomData}
              hotelInoformation={hotelInoformation}
            />
          )}
          {hotelSummary && (
            <CustomHotelSummary
              hotelFilteredData={hotelFilteredData}
              hotelImages={hotelImages}
            />
          )}
        </View>
      </ScrollView>
      {isLoading && (
        <CustomLoader
          loaderColor={colors.color_0094E6}
          isLoading={isLoading}
          customLoaderStyle={styles.loaderStyle}
        />
      )}
    </>
  );
};

export default HotelRating;
