/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import commonMethods from '@src/utility/commonMethods';
import commonStyles from '@src/utility/commonStyles';
import appConstants, {
  carriersURL,
  statusCode,
} from '@src/constants/appConstants';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Icons} from '@src/assets';
import styles from './styles';
import colors from '@src/constants/colors';
import CustomFlightInfoBox from '../customFlightInfoBox/customFlightInfoBox';
import {navigate} from '@src/navigation/navigationMethods';
import navigationConstants from '@src/constants/navigationConstants';
import {
  clearCheckout,
  fetchCheckout,
} from '@src/screens/checkOut/slice/checkoutSlice';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoader from '../customLoader/customLoader';
import {RootState} from '@src/redux/store';
import customHooks from '@src/utility/customHooks';
import CustomModal from '../customModal/customModal';
import {clearSeatMap} from '@src/screens/checkOut/slice/seatMapSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {checkoutScreenData} from '@src/redux/appSlice/appSlice';

interface CustomTicketSelectorModalProps {
  segmentData: any;
  item: any;
  indexs: any;
  oneWayData: any;
  cabinClass: any;
  setIsTicketSelectorModal: any;
  trip: any;
  adultCount: any;
  childCount: any;
  infantCount: any;
}

const CustomTicketSelectorModal = (props: CustomTicketSelectorModalProps) => {
  const {
    segmentData,
    item,
    indexs,
    oneWayData,
    cabinClass,
    setIsTicketSelectorModal,
    trip,
    adultCount,
    childCount,
    infantCount,
  } = props;

  const dispatch = useDispatch();
  // Distruct data of the one way trip API
  const {locations, fareFamilies, itineraries, segments, carriers} =
    oneWayData?.data;

  // Logic for finding the farefamily with the navigated data and API response
  const findedFareFamilies: any =
    fareFamilies[item.fareFamilies.length > 0 ? item.fareFamilies[0] : []];

  // States of the screen.
  const [particularItinerary, setParticularItinerary] = useState<any>([]);
  const [heightInc, setHeightInc] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const [fareSelected, setFareSelected] = useState<any>(
    findedFareFamilies?.name,
  );
  const [isFailure, setIsFailure] = useState(false);
  const [err, setErr] = useState(undefined);

  // Getting data to store in previos state hook
  const oneWayCheckoutData = useSelector((state: RootState) => state.checkout);

  // Custom hook for storing the oneway checkout data.
  const previousOneWayCheckoutData: any =
    customHooks.usePrevious(oneWayCheckoutData);

  // Navigate to checkout screen..
  useEffect(() => {
    if (
      oneWayCheckoutData.searchedData !==
      previousOneWayCheckoutData?.searchedData
    ) {
      if (
        oneWayCheckoutData?.searchedData?.statusCode === statusCode.Code_200 &&
        fareSelected === findedFareFamilies?.name
      ) {
        setIsLoading(false);
        navigate(navigationConstants.CHECKOUT);
      } else if (
        oneWayCheckoutData?.searchedData?.statusCode === statusCode.Code_200 &&
        fareSelected !== findedFareFamilies?.name
      ) {
        setIsLoading(false);
        navigate(navigationConstants.CHECKOUT);
      }
    } else if (oneWayCheckoutData?.err?.statusCode === statusCode.Code_500) {
      setIsFailure(true);
      setErr(oneWayCheckoutData?.err?.errMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneWayCheckoutData]);

  // Common methods for finding the operating carrier.
  const operatingCarriers = commonMethods.tripOperatingCarrier(
    segmentData.flights,
  );

  // Common methods for finding the marketing carrier carrier.
  const marketingCarriers = commonMethods.tripMarketingCarrier(
    segmentData.flights,
  );

  // Common method to find the carrier name
  const carrierName = commonMethods.findCarrierName(segmentData.airlines);

  // oneway checkout loader
  const oneWayCheckoutLoader = useSelector(
    (state: RootState) => state.checkout.isLoading,
  );

  // Hook for one way checkout loader
  useEffect(() => {
    setIsLoading(oneWayCheckoutLoader);
  }, [oneWayCheckoutLoader]);

  // Get airport name
  const getAirportName = useCallback(
    (airportCode: string) => {
      return locations[airportCode];
    },
    [locations],
  );

  // Method to find the upsells and the down sells
  const findSells = () => {
    if (item.downsellRec.length > 0) {
      return item.downsellRec.map((it: any) => {
        return it;
      });
    } else if (item.upsellRec.length > 0) {
      return item.upsellRec.map((it: any) => {
        return it;
      });
    }
  };

  // Method to find the particular findItinery from upsells or down sells.
  const findItinery = () => {
    const sells = findSells();
    const data: any = [];
    sells?.map((it: any) => {
      return itineraries.forEach((ele: any) => {
        if (ele.id === it) {
          data.push({
            ...ele,
            price: ele.price.total,
          });
        }
      });
    });
    return data;
  };

  // Method to find the particular fare family from the upsells or downsells
  const findedSellsFareFamilies = () => {
    const findedItineray = findItinery();
    return findedItineray?.map((el: any) => {
      return {
        ...fareFamilies[el.fareFamilies],
        price: el.price,
        baggageFree: el.baggage,
        isRefundable: el.isRefundable,
        id: el.id,
      };
    });
  };

  // Variable storing other sells farefamilies data
  const otherSellsFareFamilies = findedSellsFareFamilies();

  // Get Airline name
  const getAirlineName = useCallback(
    (airline: string[]) => {
      const airlines = airline?.map((el: string) => {
        return carriers[el];
      });
      return airlines;
    },
    [carriers],
  );

  // Get Segment Data of flights for othersells itinerary data.
  const getSegmentsData = useCallback(
    (items: any, fareData: any) => {
      const findedSegment = commonMethods.findSegments(items, segments?.flat());
      const airlines = getAirlineName(findedSegment?.carriers);
      const arrivalAirportName = getAirportName(
        findedSegment?.arrival.airportCode,
      );
      const departureAirportName = getAirportName(
        findedSegment?.departure.airportCode,
      );

      const updatedSegments = {
        ...findedSegment,
        arrivalAirportName,
        departureAirportName,
        airlines,
        price: items.price,
        isRefundable: items.isRefundable,
        bookingClass: items?.bookingClass,
        fareFamilyName: fareData.name,
        segmentRef: items.segments,
        cabin: items?.cabin,
        fareFamiliy: items?.fareFamilies,
      };
      return setParticularItinerary(updatedSegments);
    },
    [getAirlineName, getAirportName, segments],
  );

  // Method to handle other selected fare family
  const handleOtherSelectedFareFamily = (data: any) => {
    const itinerary = findItinery();
    return itinerary.forEach((el: any) => {
      if (el.id === data.id) {
        return getSegmentsData(el, data);
      }
    });
  };

  // Method to get the formated segment data for api..
  const getFormatedSegmentData = useCallback(() => {
    if (fareSelected === findedFareFamilies?.name) {
      return segmentData?.flights?.map((el: any, index: number) => {
        return {
          departure_date: el?.departure.date,
          departure_time: el?.departure.time,
          arrival_date: el?.arrival.date,
          arrival_time: el?.arrival.time,
          boarding_airport: el?.departure.airportCode,
          off_airport: el?.arrival.airportCode,
          marketing_company: el?.marketingCarrier,
          operating_carrier: el?.operatingCarrier,
          flight_number: el?.flightOrtrainNumber,
          booking_class: item?.bookingClass,
          item_number: index + 1,
        };
      });
    } else {
      return particularItinerary?.flights?.map((el: any, index: number) => {
        return {
          departure_date: el?.departure.date,
          departure_time: el?.departure.time,
          arrival_date: el?.arrival.date,
          arrival_time: el?.arrival.time,
          boarding_airport: el?.departure.airportCode,
          off_airport: el?.arrival.airportCode,
          marketing_company: el?.marketingCarrier,
          operating_carrier: el?.operatingCarrier,
          flight_number: el?.flightOrtrainNumber,
          booking_class: particularItinerary?.bookingClass,
          item_number: index + 1,
        };
      });
    }
  }, [
    fareSelected,
    findedFareFamilies?.name,
    item?.bookingClass,
    particularItinerary?.bookingClass,
    particularItinerary?.flights,
    segmentData?.flights,
  ]);

  // Method to handle cancel button
  const handleCancelButton = () => {
    dispatch(clearCheckout());
    setIsTicketSelectorModal(false);
  };

  // Method for confirm button
  const handleConfirmButton = () => {
    dispatch(clearSeatMap());
    const gotFlightsData = getFormatedSegmentData();
    if (fareSelected === findedFareFamilies?.name || fareSelected) {
      const oneWayCheckoutApiData: any = {
        flights: gotFlightsData,
        fareFamilies: findedFareFamilies
          ? [
              {
                name: findedFareFamilies?.name,
                segRef: [0],
              },
            ]
          : [],
        cabin: item?.cabin,
        cabinProduct: item?.cabinProduct,
        adults: adultCount,
        children: childCount,
        infants: infantCount,
      };
      const dataToNav = {
        trip,
        segmentData,
        item,
        indexs,
        cabinClass,
        oneWayData,
        findedFareFamilies,
        adultCount,
        childCount,
        infantCount,
        setIsTicketSelectorModal,
      };
      dispatch(checkoutScreenData(dataToNav));
      dispatch(fetchCheckout(oneWayCheckoutApiData));
    } else {
      const oneWayCheckoutApiData: any = {
        flights: gotFlightsData,
        fareFamilies: particularItinerary
          ? [
              {
                name: particularItinerary.fareFamilyName,
                segRef: [0],
              },
            ]
          : [],
        cabin: particularItinerary?.cabin,
        cabinProduct: item?.cabinProduct,
        adults: adultCount,
        children: childCount,
        infants: infantCount,
      };
      const dataToNav = {
        trip,
        segmentData: particularItinerary,
        item,
        indexs,
        cabinClass,
        oneWayData,
        findedFareFamilies,
        adultCount,
        childCount,
        infantCount,
        setIsTicketSelectorModal,
      };
      dispatch(checkoutScreenData(dataToNav));
      dispatch(fetchCheckout(oneWayCheckoutApiData));
    }
  };

  return (
    <>
      <Modal transparent={true} animationType="fade">
        <KeyboardAwareScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{backgroundColor: 'rgba(50,50,50,.9)'}}>
          <View style={styles.selectTicketModalContainerStyle}>
            <View key={indexs} style={commonStyles.ticketContainer_1}>
              <View style={commonStyles.codeStyle}>
                <View style={commonStyles.codeStyleSubView}>
                  <Text style={commonStyles.codeTextStyle}>
                    {segmentData.departure?.airportCode}
                  </Text>
                </View>
                <View style={commonStyles.codeStyleSubView}>
                  <Text style={commonStyles.codeTextStyle}>
                    {segmentData.arrival?.airportCode}
                  </Text>
                </View>
              </View>

              <View style={commonStyles.cityNamesStyle}>
                <View style={commonStyles.codeStyleSubView}>
                  <Text
                    style={[
                      commonStyles.cityTextStyle,
                      commonStyles.airportDepartureTextStyle,
                    ]}>
                    {segmentData.departureAirportName?.cityName}
                  </Text>
                </View>
                <View style={commonStyles.codeStyleSubView}>
                  <Text
                    style={[
                      commonStyles.cityTextStyle,
                      commonStyles.cityTimeTextStyle,
                    ]}>
                    {commonMethods.getDuration(segmentData?.durationInMinutes)}
                  </Text>
                </View>
                <View style={commonStyles.codeStyleSubView}>
                  <Text
                    numberOfLines={1}
                    style={[
                      commonStyles.cityTextStyle,
                      commonStyles.arrivalCityTextStyle,
                    ]}>
                    {segmentData.arrivalAirportName?.cityName}
                  </Text>
                </View>
              </View>

              <View style={commonStyles.timeLineStyle}>
                <Text style={commonStyles.timeTextStyle}>
                  {commonMethods.getTimeFormat(segmentData.departure?.time)}
                </Text>
                <View style={commonStyles.timeLineContainer}>
                  <Image source={Icons.TICKET_TIMEDOT} />
                  <Image
                    style={commonStyles.ticketTimeLineStyle}
                    source={Icons.TICKET_TIMELINE}
                  />
                  <Image
                    style={commonStyles.ticketTimePlaneStyle}
                    source={Icons.TICKET_TIMELINEPLANE}
                  />
                  <Image source={Icons.TICKET_TIMEDOT} />
                </View>
                <Text style={commonStyles.timeTextStyle}>
                  {commonMethods.getTimeFormat(segmentData.arrival?.time)}
                </Text>
              </View>


              <View style={styles.ticketAirlinesContainer}>
                <Image
                  style={commonStyles.ticketAirwaysLogo}
                  source={{
                    uri: `${carriersURL.imgURL}${
                      marketingCarriers[0] || operatingCarriers[1]
                    }${carriersURL.png}`,
                  }}
                />
                <Text numberOfLines={1} style={commonStyles.airwaysTextStyle}>
                  {carrierName}
                </Text>
              </View>
              <View style={commonStyles.buttonContainer}>
                <View>
                  <Text
                    style={
                      commonStyles.priceTextStyle
                    }>{`${appConstants.usd} ${item?.price?.total}`}</Text>
                  <Text style={commonStyles.tripFareTextStyle}>
                    {appConstants.onewaytripfare}
                  </Text>
                </View>
              </View>
              {heightInc === indexs && (
                <>
                  {/* Arrival Details */}
                  <Image
                    style={styles.ticketDetailedLineStyle}
                    source={Icons.TICKETBOTTOM_LINE}
                  />
                  <Text
                    style={
                      commonStyles.departureTextStyle
                    }>{`${appConstants.to} ${segmentData.arrivalAirportName?.cityName}:`}</Text>
                  <Text
                    style={[
                      commonStyles.timeTextStyle,
                      commonStyles.departureTimeStyle,
                    ]}>
                    {commonMethods.getDuration(segmentData?.durationInMinutes)}
                  </Text>
                  <View style={[commonStyles.departureLineContainer]}>
                    <Image
                      style={[
                        commonStyles.ticketDepartureLineStyle,
                        {
                          height:
                            segmentData?.flights?.length === 1
                              ? responsiveHeight(30)
                              : segmentData?.flights?.length === 2
                              ? responsiveHeight(48)
                              : segmentData?.flights?.length === 3
                              ? responsiveHeight(71)
                              : responsiveHeight(10),
                        },
                      ]}
                      source={Icons.TICKET_DEPARTURELINE}
                    />
                  </View>

                  <View style={commonStyles.ticketCalendarContainer}>
                    <Image source={Icons.TICKET_DEPARTURECALENDAR} />
                    <Text style={commonStyles.dateTextStyle}>
                      {commonMethods.getMonthDayFormat(
                        segmentData?.departure?.date,
                      )}
                    </Text>
                  </View>

                  {/* Airport Details */}
                  {segmentData?.flights.map((el: any, elId: any) => {
                    const airportNameDeparture = getAirportName(
                      el.departure.airportCode,
                    );
                    const airportNameArrival = getAirportName(
                      el.arrival.airportCode,
                    );

                    return (
                      <View
                        key={elId}
                        style={commonStyles.flightStationContainer}>
                        <View style={commonStyles.busStationContainer}>
                          <Text style={commonStyles.stationTimeTextStyle}>
                            {commonMethods.getTimeFormat(el.departure.time)}
                          </Text>
                          <Image
                            style={commonStyles.downPlaneStyle}
                            source={Icons.TICKET_DEPARTUREDOWNPLANE}
                          />
                          <Text
                            numberOfLines={2}
                            style={commonStyles.stationTextStyle}>
                            {commonMethods.getAirportDetails(
                              airportNameDeparture,
                            )}
                          </Text>
                        </View>
                        <View style={commonStyles.cabinContainer}>
                          <Text style={commonStyles.cabinTextStyle}>
                            {cabinClass === appConstants.byPriceLowest
                              ? appConstants.economy
                              : cabinClass}
                          </Text>
                        </View>
                        <View style={commonStyles.flightContainer}>
                          <Image
                            style={commonStyles.flightLogoStyle}
                            source={{
                              uri: `${carriersURL.imgURL}${
                                el?.operatingCarrier || el?.marketingCarrier
                              }${carriersURL.png}`,
                            }}
                          />
                          <Image source={Icons.TICKET_DEPARTUREHORPLANE} />
                          {segmentData &&
                            segmentData.airlines?.map(
                              (air: any, airIndex: any) => {
                                return (
                                  <Text
                                    key={airIndex}
                                    style={commonStyles.flightTextStyle}>
                                    {air.name}
                                  </Text>
                                );
                              },
                            )}
                          <Text
                            style={
                              commonStyles.flightTextStyle
                            }>{`${appConstants.flights} ${el.flightOrtrainNumber}`}</Text>
                        </View>
                        <View style={commonStyles.busStationContainer}>
                          <Text style={commonStyles.stationTimeTextStyle}>
                            {commonMethods.getTimeFormat(el.arrival.time)}
                          </Text>
                          <Image
                            style={commonStyles.downPlaneStyle}
                            source={Icons.TICKET_DEPARTUREDOWNPLANE}
                          />
                          <Text
                            numberOfLines={2}
                            style={commonStyles.stationTextStyle}>
                            {commonMethods.getAirportDetails(
                              airportNameArrival,
                            )}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                  <View style={commonStyles.arriveDestinationContainer}>
                    <Image
                      style={commonStyles.ticketArriveLocationStyle}
                      source={Icons.TICKET_ARRIVELOCATION}
                    />
                    <View style={commonStyles.destinationTextContainer}>
                      <Text style={commonStyles.arriveAtDestiStyle}>
                        {appConstants.arriveAtDestination}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={commonStyles.destinationTextStyle}>
                        {segmentData.arrivalAirportName?.name}
                      </Text>
                    </View>
                  </View>
                </>
              )}
              <View
                style={[
                  commonStyles.roundView,
                  commonStyles.subRoundViewStyle,
                  styles.selectedLeftRoundView,
                ]}
              />
              <View
                style={[
                  commonStyles.roundView,
                  styles.selectedRightRoundViewStyle,
                ]}
              />
              <Image
                style={commonStyles.lineStyle}
                source={Icons.TICKETBOTTOM_LINE}
              />
              {heightInc !== indexs ? (
                <TouchableOpacity
                  onPress={() => setHeightInc(indexs)}
                  style={[commonStyles.ticketDropdownContainerStyle]}>
                  <Image
                    style={commonStyles.ticketDropdownStyle}
                    source={Icons.TICKET_DROPDOWN}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setHeightInc('')}
                  style={[commonStyles.ticketDropupContainerStyle]}>
                  <Image
                    style={commonStyles.ticketDropupStyle}
                    source={Icons.TICKET_DROPUPICON}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.selectedBottomBar}>
            <TouchableOpacity
              onPress={() => setFareSelected(findedFareFamilies?.name)}
              activeOpacity={appConstants.activeOpacity}
              style={[
                styles.bottomBarButtonOneStyle,
                {
                  backgroundColor:
                    fareSelected === findedFareFamilies?.name
                      ? colors.color_319ADF
                      : colors.color_fff,
                },
              ]}>
              <Text
                style={[
                  styles.bottomButtonTextStyle,
                  {
                    color:
                      fareSelected === findedFareFamilies?.name
                        ? colors.color_fff
                        : colors.color_000,
                  },
                ]}>
                {findedFareFamilies?.name}
              </Text>
              {fareSelected === findedFareFamilies?.name ? (
                <Image
                  style={styles.unSelectedCircleView}
                  source={Icons.greenRightTick}
                />
              ) : (
                <View style={styles.unSelectedCircleView} />
              )}
            </TouchableOpacity>
            {otherSellsFareFamilies.map((ele: any) => {
              return (
                <TouchableOpacity
                  key={ele.id}
                  onPress={() => {
                    setFareSelected(ele.desc);
                    handleOtherSelectedFareFamily(ele);
                  }}
                  activeOpacity={appConstants.activeOpacity}
                  style={[
                    styles.bottomBarButtonOneStyle,
                    {
                      backgroundColor:
                        fareSelected === ele?.desc
                          ? colors.color_319ADF
                          : colors.color_fff,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.bottomButtonTextStyle,
                      {
                        color:
                          fareSelected === ele?.desc
                            ? colors.color_fff
                            : colors.color_000,
                      },
                    ]}>
                    {ele.desc}
                  </Text>
                  {fareSelected === ele.desc ? (
                    <Image
                      style={styles.unSelectedCircleView}
                      source={Icons.greenRightTick}
                    />
                  ) : (
                    <View style={styles.unSelectedCircleView} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.flightInfoMainContainerStyle}>
            <View style={styles.flightInfoContainerStyle}>
              {fareSelected === findedFareFamilies?.name && (
                <View style={styles.flightInfoContainerScrollStyle}>
                  <View style={styles.boxSubContainerStyle}>
                    <CustomFlightInfoBox
                      headerTitle={appConstants.priceUSD}
                      customBoxStyle={styles.customBoxStyle}
                      subTitle={`$${item.price.total}`}
                    />
                    <CustomFlightInfoBox
                      headerTitle={appConstants.baggageFree}
                      customBoxStyle={styles.customBoxStyle}
                      subTitle={item.baggage.map((it: any) => it.amount)}
                    />
                    <CustomFlightInfoBox
                      headerTitle={appConstants.bagage}
                      customBoxStyle={styles.customBoxStyle}
                      subTitle={findedFareFamilies?.baggage?.map(
                        (it: any) => `${it.desc}\n`,
                      )}
                    />
                    <CustomFlightInfoBox
                      headerTitle={appConstants.snack}
                      customBoxStyle={styles.customBoxStyle}
                      subTitle={
                        findedFareFamilies?.snack?.length > 0
                          ? `${appConstants.availableSnack}`
                          : `${appConstants.underScore}`
                      }
                    />
                    <CustomFlightInfoBox
                      headerTitle={appConstants.seatAssignment}
                      customBoxStyle={styles.customBoxStyle}
                      subTitle={
                        findedFareFamilies?.seatAssignment.length > 0
                          ? findedFareFamilies?.seatAssignment?.map(
                              (it: any) => `${it.name}\n`,
                            )
                          : `${appConstants.underScore}`
                      }
                    />
                    <CustomFlightInfoBox
                      customBoxStyle={styles.customBoxStyle}
                      headerTitle={appConstants.others}
                      subTitle={findedFareFamilies?.other?.map(
                        (it: any) => `${it.desc}\n`,
                      )}
                    />
                  </View>
                  <View style={styles.boxSubContainerStyle}>
                    <CustomFlightInfoBox
                      headerTitle={appConstants.cabin}
                      customBoxStyle={styles.customBoxStyle}
                      subTitle={
                        cabinClass === appConstants.byPriceLowest
                          ? appConstants.economy
                          : cabinClass
                      }
                    />
                    <CustomFlightInfoBox
                      headerTitle={appConstants.fare}
                      customBoxStyle={styles.customBoxStyle}
                      subTitle={findedFareFamilies?.name}
                    />
                    <CustomFlightInfoBox
                      headerTitle={appConstants.meal}
                      customBoxStyle={styles.customBoxStyle}
                      subTitle={
                        findedFareFamilies?.meal?.length > 0
                          ? `${appConstants.availableMeal}`
                          : `${appConstants.underScore}`
                      }
                    />
                    <CustomFlightInfoBox
                      headerTitle={appConstants.drink}
                      customBoxStyle={styles.customBoxStyle}
                      subTitle={
                        findedFareFamilies?.drink?.length > 0
                          ? findedFareFamilies?.drink.map(
                              (it: any) => `${it.desc}\n`,
                            )
                          : `${appConstants.underScore}`
                      }
                    />
                    <CustomFlightInfoBox
                      headerTitle={appConstants.refundable}
                      customBoxStyle={styles.customBoxStyle}
                      subTitle={
                        !item.isRefundable
                          ? `${appConstants.underScore}`
                          : `${appConstants.refundableTicket}`
                      }
                    />
                  </View>
                </View>
              )}
              {otherSellsFareFamilies.map((el: any) => {
                if (fareSelected === el.desc) {
                  return (
                    <View style={styles.flightInfoContainerScrollStyle}>
                      <View style={styles.boxSubContainerStyle}>
                        <CustomFlightInfoBox
                          headerTitle={appConstants.priceUSD}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={`$${el.price}`}
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.baggageFree}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={el.baggageFree.map((it: any) => it.amount)}
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.bagage}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={el.baggage?.map(
                            (it: any) => `${it.desc}\n`,
                          )}
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.snack}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={
                            el.snack?.length > 0
                              ? `${appConstants.availableSnack}`
                              : `${appConstants.underScore}`
                          }
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.seatAssignment}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={
                            el.seatAssignment.length > 0
                              ? el.seatAssignment?.map(
                                  (it: any) => `${it.name}\n`,
                                )
                              : `${appConstants.underScore}`
                          }
                        />
                        <CustomFlightInfoBox
                          customBoxStyle={styles.customBoxStyle}
                          headerTitle={appConstants.others}
                          subTitle={el.other?.map((it: any) => `${it.desc}\n`)}
                        />
                      </View>
                      <View style={styles.boxSubContainerStyle}>
                        <CustomFlightInfoBox
                          headerTitle={appConstants.cabin}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={
                            cabinClass === appConstants.byPriceLowest
                              ? appConstants.economy
                              : cabinClass
                          }
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.fare}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={el.desc}
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.meal}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={
                            el.meal?.length > 0
                              ? `${appConstants.availableMeal}`
                              : `${appConstants.underScore}`
                          }
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.drink}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={
                            el?.drink?.length > 0
                              ? el.drink.map((it: any) => `${it.desc}\n`)
                              : `${appConstants.underScore}`
                          }
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.refundable}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={
                            !el.isRefundable
                              ? `${appConstants.underScore}`
                              : `${appConstants.refundableTicket}`
                          }
                        />
                      </View>
                    </View>
                  );
                }
              })}
            </View>
            <Image
              style={styles.lineStyle}
              source={Icons.SELECTEDTICKET_LINE}
            />
            <View style={styles.modalButtonsStyle}>
              <TouchableOpacity
                activeOpacity={appConstants.activeOpacity}
                onPress={handleCancelButton}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>
                  {appConstants.cancel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmButton}
                activeOpacity={appConstants.activeOpacity}
                style={[
                  styles.buttonStyle,
                  {backgroundColor: colors.color_319ADF},
                ]}>
                <Text
                  style={[styles.buttonTextStyle, {color: colors.color_fff}]}>
                  {appConstants.confirm}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>

        {isFailure && (
          <CustomModal
            label={err}
            onPress={() => {
              setIsFailure(false);
              setIsTicketSelectorModal(false);
            }}
          />
        )}
        {isLoading && (
          <CustomLoader
            loaderColor={colors.color_0094E6}
            isLoading={isLoading}
            customLoaderStyle={styles.customLoaderStyle}
          />
        )}
      </Modal>
    </>
  );
};

export default CustomTicketSelectorModal;
