/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Modal,
  Image,
  Platform,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Icons, Images} from '@src/assets';
import CustomHeader from '../customHeader/customHeader';
import appConstants, {seatCodes} from '@src/constants/appConstants';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import colors from '@src/constants/colors';
import SelectedSeatModal from '../selectedSeatModal/selectedSeatModal';
import CustomModal from '../customModal/customModal';
import {fetchSeatMap} from '@src/screens/checkOut/slice/seatMapSlice';
import CustomLoader from '../customLoader/customLoader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface OnewaySeatMapProps {
  setOnewaySeatMap: any;
  totalPassengerCount: any;
  segmentData: any;
  selectedSeats: any;
  setSelectedSeats: any;
  currentIndex: any;
  setCurrentIndex: any;
  cabinDetails: any;
  setCabinDetails: any;
  rowDetails: any;
  setRowDetails: any;
  rowCharacterSticks: any;
  setRowCharacterSticks: any;
  seatCharacterSticks: any;
  setSeatCharacterSticks: any;
  seatRowNumber: any;
  setSeatRowNumber: any;
  selectedSeatModal: any;
  setSelectedSeatModal: any;
  flightIndex: any;
  setFlightIndex: any;
  isAlreadySelectedSeat: any;
  setIsAlreadySelectedSeat: any;
  seatmapLoader: any;
  setSeatmapLoader: any;
  checkoutData: any;
  seatDetailsModal: any;
  setSeatDetailsModal: any;
  flightId: any;
  setFlightId: any;
}

const SeatMap = (props: OnewaySeatMapProps) => {
  const dispatch = useDispatch();
  const {
    setOnewaySeatMap,
    segmentData,
    selectedSeats,
    setSelectedSeats,
    currentIndex,
    setCurrentIndex,
    cabinDetails,
    setCabinDetails,
    rowDetails,
    setRowDetails,
    rowCharacterSticks,
    setRowCharacterSticks,
    seatCharacterSticks,
    setSeatCharacterSticks,
    seatRowNumber,
    setSeatRowNumber,
    selectedSeatModal,
    setSelectedSeatModal,
    flightIndex,
    setFlightIndex,
    isAlreadySelectedSeat,
    setIsAlreadySelectedSeat,
    seatmapLoader,
    setSeatmapLoader,
    checkoutData,
    seatDetailsModal,
    setSeatDetailsModal,
    flightId,
    setFlightId,
  } = props;

  const oneWaySeatMap = useSelector(
    (state: RootState) => state.seatMaps.response,
  );

  const seatLoader = useSelector(
    (state: RootState) => state?.seatMaps?.isLoading,
  );

  // const [seatCoumn, setSeatColumn] = useState();

  // Loader for the seat map
  useEffect(() => {
    setSeatmapLoader(seatLoader);
  }, [currentIndex, seatLoader, setSeatmapLoader]);

  // Hook for fetch data from seat map endpoint
  useEffect(() => {
    const cabinData =
      oneWaySeatMap[`${currentIndex}`]?.data?.seatmapInformation?.cabin
        ?.compartmentDetails?.columnDetails;
    const rowData =
      oneWaySeatMap[`${currentIndex}`]?.data?.seatmapInformation?.row;
    setCabinDetails(cabinData);
    setRowDetails(rowData);
  }, [currentIndex, oneWaySeatMap, setCabinDetails, setRowDetails]);

  // Header back button...
  const handleSeatModalCancelButton = () => {
    setSelectedSeatModal(false);
  };

  // Method to change the seat occupaition value from F to S
  const changeSeatOccupationDetails = useCallback(
    (seatId: string, rowNumber: any, seatColumn: any, rowData = rowDetails) => {
      console.log(selectedSeats, 'select =>>>>>>>>>>>>>>>>>>>>');
      // const value = selectedSeats.find(
      //   (seat: {flightDist: any}) => seat.flightDist === currentIndex,
      // );
      // if (value === undefined && selectedSeats.length > 0) {
      //   return rowDetails;
      // }
      const updatedRow = rowData.map((item: any) => {
        if (item.rowDetails.seatRowNumber === rowNumber) {
          const seatOccupationData =
            item?.rowDetails?.seatOccupationDetails?.map((el: any) => {
              if (el?.seatColumn === seatColumn) {
                return {
                  ...el,
                  seatOccupation: seatId,
                };
              } else {
                return el;
              }
            });
          return {
            rowDetails: {
              ...item?.rowDetails,
              seatOccupationDetails: seatOccupationData,
            },
          };
        } else {
          return item;
        }
      });
      return updatedRow;
    },
    [rowDetails, selectedSeats],
  );

  useEffect(() => {
    const seatOccupationDeatils = oneWaySeatMap[
      `${currentIndex}`
    ]?.data?.seatmapInformation?.row?.map((el: any) => {
      if (el?.rowDetails?.seatOccupationDetails === undefined) {
        return undefined;
      } else {
        return el?.rowDetails?.seatOccupationDetails;
      }
    });
    seatOccupationDeatils?.map((el: any) => {
      if (el === undefined || cabinDetails === undefined) {
        setSeatDetailsModal(true);
      }
      if (Array.isArray(el?.length)) {
        if (el.length !== cabinDetails?.length) {
          setSeatDetailsModal(true);
        } else {
          setSeatDetailsModal(false);
        }
      }
    });

    const NoCabinData =
      oneWaySeatMap[`${currentIndex}`]?.data?.seatmapInformation?.cabin;
    const noRowData =
      oneWaySeatMap[`${currentIndex}`]?.data?.seatmapInformation?.row;
    if (NoCabinData === undefined || noRowData === undefined) {
      setSeatDetailsModal(true);
    } else {
      setSeatDetailsModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneWaySeatMap]);

  useEffect(() => {
    if (oneWaySeatMap[flightIndex]?.data) {
      setCurrentIndex(flightIndex);

      setSeatmapLoader(false);
    }
  }, [oneWaySeatMap, flightIndex, setCurrentIndex, setSeatmapLoader]);

  const getOverwingDetails = useCallback(() => {
    if (
      oneWaySeatMap[`${currentIndex}`]?.data?.seatmapInformation?.cabin
        ?.compartmentDetails?.overwingSeatRowRange
    ) {
      const overWingFullData =
        oneWaySeatMap[`${currentIndex}`]?.data?.seatmapInformation?.cabin
          ?.compartmentDetails?.overwingSeatRowRange?.number;
      const rowData =
        oneWaySeatMap[currentIndex]?.data?.seatmapInformation?.row;
      const getAllSeats = rowData?.map(
        (el: any) => el?.rowDetails?.seatRowNumber,
      );
      const firstOverwingIndex = getAllSeats?.indexOf(overWingFullData[0]);
      const secondOverwingIndex = getAllSeats?.indexOf(overWingFullData[1]);
      const getParticularOverwing = getAllSeats?.slice(
        firstOverwingIndex,
        secondOverwingIndex + 1,
      );
      return getParticularOverwing;
    }
  }, [currentIndex, oneWaySeatMap]);

  const handleSeatModalSelectButton = useCallback(() => {
    setSelectedSeats((prevState: any) => {
      return [
        ...prevState,
        {
          count: prevState?.count ? prevState?.count + 1 : 0 + 1,
          seatNumber: seatRowNumber,
          seatColumn: seatCharacterSticks?.seatColumn,
          seatOccupation: seatCharacterSticks?.seatOccupation,
          flightId: flightId,
          flightDist: currentIndex,
        },
      ];
    });
    setRowDetails(
      changeSeatOccupationDetails(
        seatCodes.S,
        seatRowNumber,
        seatCharacterSticks?.seatColumn,
      ),
    );

    setSelectedSeatModal(false);
  }, [
    changeSeatOccupationDetails,
    currentIndex,
    flightId,
    seatCharacterSticks?.seatColumn,
    seatCharacterSticks?.seatOccupation,
    seatRowNumber,
    setRowDetails,
    setSelectedSeatModal,
    setSelectedSeats,
  ]);

  const getSeatCount = useCallback(() => {
    return selectedSeats.filter(
      (item: {flightDist: any}) => item.flightDist === currentIndex,
    ).length;
  }, [currentIndex, selectedSeats]);

  useEffect(() => {
    // Comment totalCount

    const totalSeatsCount = selectedSeats.reduce((a: any, el: any) => {
      return a + Number(el.count);
    }, 0);

    if (totalSeatsCount <= props.totalPassengerCount[currentIndex].totalCount) {
      selectedSeats?.forEach((el: any) => {
        // if (el.flightDist === currentIndex) {
        setRowDetails((prevState: any) => {
          console.log(prevState, 'previousRowDetails');
          return changeSeatOccupationDetails(
            seatCodes.S,
            el.seatNumber,
            el.seatColumn,
            prevState,
          );
        });
        // }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneWaySeatMap]);

  useEffect(() => {
    const flId = segmentData?.flights?.[currentIndex];
    setFlightId(
      `${flId?.departure?.airportCode}_${flId?.arrival?.airportCode}-${flId?.flightOrtrainNumber}`,
    );
  }, [currentIndex, segmentData?.flights, setFlightId]);

  const getSeatDetails = useCallback(
    (rowCh: any, seatCh: any, seatRowNum: any) => {
      // Comment totalCount

      const totalSeatsCount = selectedSeats.reduce((a: any, el: any) => {
        return a + Number(el.count);
      }, 0);

      console.log(selectedSeats, 'selectedSeats');
      if (seatCh?.seatOccupation === seatCodes.S) {
        setSelectedSeats((prevState: any) => {
          const prev = prevState.filter((item: any) => {
            if (
              Number(item.seatNumber) === Number(seatRowNum) &&
              item.flightDist === currentIndex
            ) {
              return seatCh?.seatColumn !== item.seatColumn;
            } else {
              return item;
            }
          });
          console.log(prev, 'prev');

          return prev;
        });

        setRowDetails(
          changeSeatOccupationDetails(
            seatCodes.F,
            seatRowNum,
            seatCh?.seatColumn,
          ),
        );
        return;
      }

      const seatCount = selectedSeats.filter(
        (item: {flightDist: any}) => item.flightDist === currentIndex,
      );

      console.log(seatCount, 'seatCount');

      if (
        totalSeatsCount < props.totalPassengerCount[currentIndex].totalCount
      ) {
        if (seatCh?.seatOccupation === seatCodes.F) {
          setRowCharacterSticks(rowCh);
          setSeatCharacterSticks(seatCh);
          setSeatRowNumber(seatRowNum);
          setSelectedSeatModal(true);
        }
      } else {
        setIsAlreadySelectedSeat(true);
      }
    },
    [
      changeSeatOccupationDetails,
      currentIndex,
      getSeatCount,
      props.totalPassengerCount,
      selectedSeats,
      setIsAlreadySelectedSeat,
      setRowCharacterSticks,
      setRowDetails,
      setSeatCharacterSticks,
      setSeatRowNumber,
      setSelectedSeatModal,
      setSelectedSeats,
    ],
  );

  const renderCabinData = useCallback(
    ({item, index}: any) => {
      const spacing =
        item.description === seatCodes.A &&
        cabinDetails[index + 1]?.description === seatCodes.A
          ? 30
          : 8;
      return (
        <View>
          <Text style={styles.seatColumnTextStyle}>{item?.seatColumn}</Text>
          <View style={{marginHorizontal: spacing}} />
        </View>
      );
    },
    [cabinDetails],
  );

  const fetchSeatCharacteristicOfArray = (it: any) => {
    if (Array.isArray(it?.seatCharacteristic)) {
      return it?.seatCharacteristic?.filter((el: any) => el === seatCodes.CH);
    }
  };

  // Method to render the seats.
  const renderSeats = useCallback(
    (items: any, row: any) => {
      const {item, index} = items;
      const spacing =
        cabinDetails?.[index]?.description === seatCodes.A &&
        cabinDetails?.[index + 1]?.description === seatCodes.A
          ? 30
          : 8;
      const seatArray = fetchSeatCharacteristicOfArray(item);
      // console.log(item,seatArray,'Array');

      return (
        <TouchableOpacity
          style={styles.seatStyles}
          activeOpacity={appConstants.activeOpacity}
          onPress={() =>
            getSeatDetails(
              row.rowCharacteristicDetails,
              item,
              row.seatRowNumber,
            )
          }>
          {console.log(item, 'item')}
          {item?.seatOccupation === seatCodes.F &&
          item?.seatCharacteristic !== seatCodes.CH &&
          seatArray?.[0] !== seatCodes.CH &&
          item?.seatCharacteristic !== seatCodes._8 ? (
            <Image
              style={styles.seatImageStyle}
              tintColor={colors.color_17C954}
              source={Icons.SEAT}
            />
          ) : item?.seatOccupation === seatCodes.O ? (
            <Image style={styles.seatImageStyle} source={Icons.SEAT} />
          ) : item?.seatOccupation === seatCodes.Z ? (
            <Image source={Icons.SEAT} style={styles.seatImageStyle} />
          ) : item?.seatOccupation === seatCodes.S ? (
            <Image
              tintColor={colors.color_yellow}
              source={Icons.SEAT}
              style={styles.seatImageStyle}
            />
          ) : item?.seatCharacteristic === seatCodes.CH &&
            item?.seatOccupation === seatCodes.F ? (
            <Image source={Icons.SEAT} style={styles.seatImageStyle} />
          ) : item?.seatCharacteristic === '8' ? (
            <Image tintColor={colors.color_fff} source={Icons.SEAT} />
          ) : (
            <Image source={Icons.SEAT} />
          )}
          <View style={{marginHorizontal: spacing}} />
          {spacing === 30 && (
            <View style={styles.seatNumberStyle}>
              <Text style={styles.seatRowNumberTextStyle}>
                {row?.seatRowNumber}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [cabinDetails, getSeatDetails],
  );

  // Method to render the row data.
  const renderRowData = useCallback(
    ({item}: any) => {
      const row = item?.rowDetails;
      const overwing = getOverwingDetails();
      const itemLength = overwing !== undefined ? overwing.length : 0;

      return (
        <>
          {row?.seatRowNumber === overwing?.[0] && (
            <View
              style={[
                styles.wingOneStyle,
                {
                  height: itemLength * 30 + itemLength * 35,
                },
              ]}
            />
          )}
          {row?.rowCharacteristicDetails?.rowCharacteristic === seatCodes.E && (
            <View style={styles.exitViewOne} />
          )}
          <View style={styles.seatRowContainerStyle}>
            <FlatList
              data={row?.seatOccupationDetails}
              renderItem={(it: any) => renderSeats(it, row)}
              horizontal
              contentContainerStyle={styles.seatsStyle}
            />
          </View>
          {row?.seatRowNumber === overwing?.[0] && (
            <View
              style={[
                styles.wingTwoStyle,
                {
                  height: itemLength * 30 + itemLength * 35,
                },
              ]}
            />
          )}
          {row?.rowCharacteristicDetails?.rowCharacteristic === seatCodes.E && (
            <View style={styles.exitViewTwo} />
          )}
        </>
      );
    },
    [getOverwingDetails, renderSeats],
  );

  const handleParticularFlightSeatmap = (index: number, flightNum: any) => {
    setFlightIndex(index);
    setFlightId(flightNum);
    const el = segmentData.flights[index];
    const dataToDispatch: any = {
      departure: {
        location: el?.departure?.airportCode,
        date: Number(el?.departure?.date),
      },
      arrival: {
        location: el?.arrival?.airportCode,
      },
      flightNumber: el?.flightOrtrainNumber,
      marketingCompany: el?.marketingCarrier,
      bookingClass: Array.isArray(checkoutData)
        ? checkoutData[currentIndex]?.flightIdnt[currentIndex]?.bookingClass
        : checkoutData?.flightIdnt[currentIndex]?.bookingClass,
    };
    dispatch(fetchSeatMap({result: dataToDispatch, key: index}));
  };
  const handleSeatErrorOkPress = () => {
    setOnewaySeatMap(false);
  };

  return (
    <>
      <Modal>
        <KeyboardAwareScrollView style={styles.mainContainerStyle}>
          <Image
            style={[
              styles.seatmapBackGroundImageStyle,
              Platform.OS === 'ios' && styles.iosPlatformFlightBackground,
            ]}
            source={Images.APP_FLIGHT_SEARCHBG}
          />
          <View style={styles.seatmapHeaderContainerStyle}>
            <CustomHeader
              leftIcon={Icons.BACK_LOGO}
              lefticonOnPress={() => setOnewaySeatMap(false)}
              leftIconStyle={styles.headerLeftIconStyle}
              headerLabel={appConstants.seatMap}
              headerLabelStyle={styles.headerLabelStyle}
            />
            <View style={styles.seatmapNumberContainer}>
              {segmentData?.flights?.map((el: any, index: any) => {
                return (
                  <TouchableOpacity
                    style={styles.seatmapButtonStyle}
                    onPress={() =>
                      handleParticularFlightSeatmap(
                        index,
                        `${el?.departure?.airportCode}_${el?.arrival?.airportCode}-${el?.flightOrtrainNumber}`,
                      )
                    }>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.flightCodesStyle,
                        {
                          color:
                            currentIndex === index
                              ? colors.color_fff
                              : colors.color_000,
                          textDecorationLine:
                            currentIndex === index ? 'underline' : 'none',
                        },
                      ]}>{`${el?.departure?.airportCode}_${el?.arrival?.airportCode}-${el?.flightOrtrainNumber}`}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Image
              style={styles.planeHeadImageStyle}
              source={Images.PLANE_BODYBG}
            />
          </View>
          {seatDetailsModal ? (
            <>
              <View style={styles.errorContainerStyle}>
                <Image source={Icons.SELECTED_SEAT} />

                <Text style={styles.errorTextStyle}>
                  {appConstants.welcome}
                </Text>

                <Text style={styles.detailedTextStyle} numberOfLines={3}>
                  {appConstants.seatsWillAssign}
                </Text>

                <View style={styles.buttonContainerStyle}>
                  <TouchableOpacity
                    activeOpacity={appConstants.activeOpacity}
                    onPress={handleSeatErrorOkPress}
                    style={[
                      styles.okButtonStyle,
                      {backgroundColor: colors.color_17C954},
                    ]}>
                    <Text style={styles.tryAgainTextStyle}>
                      {appConstants.ok}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.seatmapMainContainer}>
              <View style={styles.seatInfoDotsContainerStyle}>
                <View style={styles.dotContainerStyle}>
                  <Image source={Icons.GREYDOT} />
                  <Text style={styles.dotText}>{appConstants.not}</Text>
                  <Text>{appConstants.available}</Text>
                </View>
                <View style={styles.dotContainerStyle}>
                  <Image source={Icons.GREENDOT} />
                  <Text style={styles.dotText}>{appConstants.available}</Text>
                </View>
                <View style={styles.dotContainerStyle}>
                  <Image source={Icons.YELLOWDOT} />
                  <Text style={styles.dotText}>{appConstants.selected}</Text>
                </View>
              </View>
              <FlatList
                data={cabinDetails}
                horizontal
                renderItem={renderCabinData}
                contentContainerStyle={styles.cabinRowStyles}
                // style={styles.cabinRowStyles}
              />
              <View style={styles.lineStyle} />
              {/* {console.log(rowDetails, 'rowDetails')} */}
              <FlatList
                data={rowDetails}
                extraData={rowDetails}
                renderItem={renderRowData}
                contentContainerStyle={styles.rowStyles}
              />
            </View>
          )}
        </KeyboardAwareScrollView>
        {seatmapLoader && (
          <CustomLoader
            isLoading={seatmapLoader}
            loaderColor={colors.color_0094E6}
            customLoaderStyle={styles.seatLoaderStyle}
          />
        )}
        {selectedSeatModal && (
          <SelectedSeatModal
            seatRowNumber={seatRowNumber}
            seatCharacterSticks={seatCharacterSticks}
            rowCharacterSticks={rowCharacterSticks}
            onCancelPress={handleSeatModalCancelButton}
            onSelectPress={handleSeatModalSelectButton}
          />
        )}
        {isAlreadySelectedSeat && (
          <CustomModal
            label={appConstants.alreadySelectedSeat}
            onPress={() => setIsAlreadySelectedSeat(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default SeatMap;
