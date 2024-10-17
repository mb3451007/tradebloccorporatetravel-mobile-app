/* eslint-disable prettier/prettier */
import appConstants from '@src/constants/appConstants';
import {FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CustomButton from '../customButton/customButton';
import styles from './styles';
import {SLIDES} from '@src/utility/staticData/staticData';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {facilitiesCodes} from '@src/utility/enums/HotelFacilities';
import CustomCancellationModal from '../customCancellationModal/CustomCancellationModal';
const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.95);

interface customHotelRoomProp {
  setIndex: any;
  isCarousel: any;
  hotelRoomsInoformation: any;
  index: any;
  getRoomData: any;
  handleHotelReserve: any;
}

const CustomHotelRooms = (props: customHotelRoomProp) => {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  const openModal = (object: any) => {
    setSelectedObject(object);
    setCancelModalOpen(true);
  };

  const {
    setIndex,
    isCarousel,
    hotelRoomsInoformation,
    index,
    getRoomData,
    handleHotelReserve,
  } = props;

  ////////////////////////////////////////////////////////////////

  const bedTypeCode: any = {
    1: 'Double',
    2: 'Futon',
    3: 'King',
    4: 'Murphy bed',
    5: 'Queen',
    6: 'Sofa bed',
    7: 'Tatami mats',
    8: 'Twin',
    9: 'Single',
    10: 'Full',
    11: 'Run of the house',
    12: 'Dorm bed',
    13: 'Water bed',
  };
  const room_types: any = {
    H: 'ACCESSIBLE',
    I: 'BUDGET',
    B: 'BUSINESS',
    G: 'COMFORT',
    D: 'DELUXE',
    X: 'DUPLEX',
    E: 'EXECUTIVE',
    C: 'EXECUTIVE SUITE',
    F: 'FAMILY',
    S: 'JUNIOR SUITE',
    P: 'PENTHOUSE',
    R: 'RESIDENTIAL APARTMENT',
    M: 'STANDARD',
    L: 'STUDIO',
    A: 'SUPERIOR',
    V: 'VILLA',
  };

  const bed_types: any = {
    K: 'KING',
    Q: 'QUEEN',
    D: 'DOUBLE',
    P: 'SOFA',
    S: 'SINGLE',
    T: 'TWIN',
    W: 'WATERBED',
  };

  const typeOfRooms = [
    'classic',
    'standard',
    'budget',
    'deluxe',
    'penthouse',
    'superiror',
    'villa',
    'studio',
    'executive',
    'duplex',
    'residential',
    'business',
    'comfort',
    'junior',
    'accessible',
    'double',
    'single',
    'suite',
    'room',
  ];
  const sortDescriptions = (text: any) => {
    const description = text.Description['#text'];
    return description;
  };
  function comparePrice(a: any, b: any): any {
    if (a.room.Total._AmountAfterTax < b.room.Total._AmountAfterTax) {
      return -1;
    }
    if (a.room.Total._AmountAfterTax > b.room.Total._AmountAfterTax) {
      return 1;
    }
    return 0;
  }

  const sortedMedias = (medias: any[]) => {
    return medias?.map(media => {
      const imageDataArray = Array.isArray(media?.ImageFormat)
        ? media?.ImageFormat
        : Object.values(media?.ImageFormat);

      const fulImage = imageDataArray?.filter((m: any) => {
        const _url = m?.URL?.split('');
        if (_url?.length > 2) {
          return _url[_url?.length - 6] === 'J';
        } else {
          return _url;
        }
      });
      const uri = fulImage[0]?.URL;
      return {
        url: uri,
        caption: media?.Description?._Caption,
        category: media?._Category,
      };
    });
  };
  const getIsArray = (source: any) => {
    return source ? (Array.isArray(source) ? source : [source]) : [];
  };
  let contents: any = {};
  const roomsData = getRoomData?.FacilityInfo?.GuestRooms;

  if (roomsData?.GuestRoom && roomsData?.GuestRoom?.length > 0) {
    contents.rooms = roomsData?.GuestRoom?.map((room: any) => {
      const roomData: any = {};
      if (room.MultimediaDescriptions) {
        const roomMedias = getIsArray(
          room.MultimediaDescriptions?.MultimediaDescription,
        );
        if (roomMedias?.length > 0) {
          const _roomMedia = roomMedias
            ?.map(
              m =>
                m?.ImageItems &&
                sortedMedias(getIsArray(m?.ImageItems?.ImageItem)),
            )
            ?.filter(a => a)[0];
          if (_roomMedia && _roomMedia?.length > 0) {
            roomData.medias = _roomMedia;
          }
          const _roomdesc = roomMedias
            ?.map(t => t?.TextItems && sortDescriptions(t.TextItems.TextItem))
            ?.filter(a => a) as string[];
          if (_roomdesc && _roomdesc?.length > 0) {
            roomData.descriptions = _roomdesc;
          }
        }
      }
      if (room?.TypeRoom?._BedTypeCode) {
        roomData.bedTypeCode = {
          code: room.TypeRoom?._BedTypeCode,
          title: bedTypeCode[room?.TypeRoom?._BedTypeCode],
        };
      }

      if (room?.TypeRoom?._RoomTypeCode) {
        roomData.roomTypeCode = room?.TypeRoom?._RoomTypeCode;
      }

      return {
        roomName: room?.TypeRoom?._Name,
        standardNoBeds: room?.TypeRoom?._StandardNumBeds,
        ...roomData,
      };
    });
  }
  let totalDescriptiveRooms: any = [];

  const roomsWithDetails = hotelRoomsInoformation
    ?.map((room: any) => {
      const discriptiveRooms =
        contents.rooms &&
        contents.rooms?.filter((_room: any) => {
          if (!room?.RoomTypes?.RoomType?._RoomType) {
            return;
          }
          const types = (room?.RoomTypes?.RoomType?._RoomType).split('');
          const typeofRoom = typeOfRooms.find(e =>
            _room?.roomName?.toLowerCase()?.includes(e),
          );

          const roomType = (
            typeofRoom === room_types[types[0]]?.toLowerCase()
              ? room_types[types[0]]
              : typeofRoom + ' ' + types[1] + ' ' + bed_types[types[2]]
          )
            ?.toLowerCase()
            ?.split(' ');

          const desc = (
            (_room?.roomName || '') +
            ' ' +
            (_room?.standardNoBeds || '') +
            ' ' +
            (_room?.bedTypeCode?.title || '')
          )?.toLowerCase();
          return roomType?.every((e: any) => desc?.includes(e));
        });

      return {
        details: discriptiveRooms && discriptiveRooms[0],
        room,
      };
    })
    ?.filter((a: any) => a)
    ?.sort(comparePrice) as any;

  if (roomsWithDetails) {
    totalDescriptiveRooms = [...totalDescriptiveRooms, ...roomsWithDetails];
  }
  const hotelDetails = {
    ...hotelRoomsInoformation,
    rooms: totalDescriptiveRooms,
  };

  //////////////////////////////////////////////////////

  const renderItemm = ({item}: any) => {
    return (
      <Image
        source={{uri: item?.url}}
        style={styles.imageRactangle}
        resizeMode="cover"
      />
    );
  };
  const renderItem = ({item}: any) => {
    console.log(item, 'item');

    const roomServices: any =
      item?.room?.RoomRates?.RoomRate?.Features?.Feature;
    const hotelServicedata: any = Array.isArray(roomServices)
      ? roomServices?.map(
          (data: any) => facilitiesCodes[data?._RoomAmenity - 1],
        )
      : facilitiesCodes[roomServices?._RoomAmenity - 1];
    let RoomImagesSlider: any;
    if (item?.details !== undefined) {
      if (item?.details?.hasOwnProperty('medias')) {
        RoomImagesSlider = item?.details?.medias;
      } else {
        RoomImagesSlider = SLIDES;
      }
    } else {
      RoomImagesSlider = SLIDES;
    }
    const RefundablePayment = item?.room?.RatePlans?.RatePlan?.CancelPenalties
      ?.CancelPenalty
      ? Array.isArray(
          item?.room?.RatePlans?.RatePlan?.CancelPenalties?.CancelPenalty,
        )
        ? item?.room?.RatePlans?.RatePlan?.CancelPenalties?.CancelPenalty
        : Object?.values(
            item?.room?.RatePlans?.RatePlan?.CancelPenalties?.CancelPenalty ||
              {},
          )
      : [];

    const refundedPayment = RefundablePayment?.find(
      (el: any) => el?._AbsoluteDeadline || el?.hasOwnProperty('Deadline'),
    );

    const refundedAmount = RefundablePayment?.find((el: any) => el?._Amount);

    return (
      <View style={styles.borderCardView}>
        <View style={styles.ractangleCrouselView}>
          <Carousel
            layout="tinder"
            layoutCardOffset={9}
            ref={isCarousel}
            data={RoomImagesSlider}
            renderItem={renderItemm}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(ind: any) => setIndex(ind)}
            useScrollView={true}
          />
          <View style={styles.paginationStyle}>
            <Pagination
              dotsLength={RoomImagesSlider?.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={styles.dotStyle}
              inactiveDotOpacity={0.4}
              inactiveDotScale={1}
              tappableDots={true}
            />
          </View>
        </View>
        <View style={styles.txtView}>
          <Text style={styles.parkingTxt} numberOfLines={4}>
            {
              item?.room?.RoomRates?.RoomRate?.RoomRateDescription?.Text[0][
                '#text'
              ]
            }
          </Text>
          {hotelServicedata === undefined ? (
            <View style={styles.iconsView}>
              <View style={styles.hotelServicesIcon}>
                <Text style={styles.serviceText}>{appConstants.roomOnly}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.iconsView}>
              {Array.isArray(hotelServicedata) ? (
                hotelServicedata?.map((obj: any) => {
                  return (
                    <View style={styles.hotelServicesIcon}>
                      <Text style={styles.serviceText}>{obj?.text}</Text>
                    </View>
                  );
                })
              ) : (
                <View style={styles.hotelServicesIcon}>
                  <Text style={styles.serviceText}>
                    {hotelServicedata?.text}
                  </Text>
                </View>
              )}
              {/* <View style={styles.wifiIconView}>
               <Image style={styles.wifiIcon} source={Icons.YELLOW_WIFI} />
             </View>
             <View style={styles.wifiIconView}>
               <Image style={styles.wifiIcon} source={Icons.COFFEE_MUG} />
             </View>
             <Image style={styles.wifiIcon} source={Icons.DOT_IMG} /> */}
            </View>
          )}
          {refundedPayment !== undefined ? (
            <View style={styles.cancellationTimeView}>
              <Text style={styles.cancellationDateTxt}>
                {appConstants?.freeCancellation}{' '}
                {moment(
                  refundedPayment?.Deadline
                    ? refundedPayment?.Deadline?._AbsoluteDeadline
                    : refundedPayment?._AbsoluteDeadline,
                ).format('dddd D MMMM YYYY')}{' '}
              </Text>
            </View>
          ) : (
            <View style={styles.cancellationTimeView}>
              <Text style={styles.cancellationDateTxt}>
                {appConstants?.nonRefundablefee} {refundedAmount?._Amount}{' '}
                {refundedAmount?._CurrencyCode}
              </Text>
            </View>
          )}
          {/* {RefundablePayment.map((obj: any, i: any) => {
            switch (true) {
              case obj?._AbsoluteDeadline && obj?._Amount:
                return (
                  <View style={styles.cancellationTimeView} key={i}>
                    <Text style={styles.cancellationDateTxt}>
                      {appConstants?.freeCancellation}{' '}
                      {moment(obj?._AbsoluteDeadline).format(
                        'dddd D MMMM YYYY',
                      )}{' '}
                    </Text>
                  </View>
                );
              case obj?.hasOwnProperty('_AbsoluteDeadline') &&
                !obj?.hasOwnProperty('_Amount'):
                return (
                  <View style={styles.cancellationTimeView} key={index}>
                    <Text style={styles.cancellationDateTxt}>
                      {appConstants?.freeCancellation}{' '}
                      {moment(obj?._AbsoluteDeadline).format(
                        'dddd D MMMM YYYY',
                      )}{' '}
                    </Text>
                  </View>
                );
              case obj?.hasOwnProperty('_Amount') &&
                !obj?.hasOwnProperty('_AbsoluteDeadline'):
                return (
                  <View style={styles.cancellationTimeView} key={index}>
                    <Text style={styles.cancellationDateTxt}>
                      {appConstants?.nonRefundablefee} {obj?._Amount}{' '}
                      {obj?._CurrencyCode}
                    </Text>
                  </View>
                );
              case obj?.hasOwnProperty('Deadline'):
                return (
                  <View style={styles.cancellationTimeView} key={index}>
                    <Text style={styles.cancellationDateTxt}>
                      {appConstants?.freeCancellation}{' '}
                      {moment(obj?.Deadline?._AbsoluteDeadline).format(
                        'dddd D MMMM YYYY',
                      )}{' '}
                    </Text>
                  </View>
                );
              default:
                return null;
            }
          })} */}
          <View style={styles.pricesView}>
            <View>
              <Text style={styles.priceTxt}>
                {appConstants.dollerSign}
                {item?.room?.RoomRates?.RoomRate?.Total?.hasOwnProperty(
                  '_AmountIncludingMarkup',
                )
                  ? item?.room?.RoomRates?.RoomRate?.Total
                      ?._AmountIncludingMarkup
                  : item?.room?.RoomRates?.RoomRate?.Total?._AmountAfterTax}
              </Text>
              <TouchableOpacity onPress={() => openModal(item)}>
                <Text style={styles.cancellationTxt}>
                  {appConstants.seeCancellation}
                </Text>
                {cancelModalOpen && (
                  <CustomCancellationModal
                    setCancelModalOpen={setCancelModalOpen}
                    selectedObject={selectedObject}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.line} />
            </View>
            <View>
              <CustomButton
                label={appConstants.reserve}
                buttonStyle={styles.buttonStyle}
                labelStyle={styles.labelStyle}
                gradientStyle={styles.buttonStyle}
                customButtonStyle={styles.buttonStyle}
                onPress={() => {
                  handleHotelReserve(
                    item?.room?.RoomRates?.RoomRate?._RatePlanCode,
                    item?.room?.RoomRates?.RoomRate?._RoomTypeCode,
                    item?.room?.RoomRates?.RoomRate?._BookingCode,
                  );
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={hotelDetails?.rooms}
      renderItem={renderItem}
      keyExtractor={(item, i) => i.toString()}
    />
  );
};
export default CustomHotelRooms;
