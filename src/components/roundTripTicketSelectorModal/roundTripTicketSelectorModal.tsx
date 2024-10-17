/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import {Icons} from '@src/assets';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import appConstants, {
  carriersURL,
  statusCode,
} from '@src/constants/appConstants';
import commonMethods from '@src/utility/commonMethods';
import commonStyles from '@src/utility/commonStyles';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import colors from '@src/constants/colors';
import CustomFlightInfoBox from '../customFlightInfoBox/customFlightInfoBox';
import {fetchCheckout} from '@src/screens/checkOut/slice/checkoutSlice';
import CustomLoader from '../customLoader/customLoader';
import {navigate} from '@src/navigation/navigationMethods';
import customHooks from '@src/utility/customHooks';
import navigationConstants from '@src/constants/navigationConstants';
import CustomModal from '../customModal/customModal';
import {clearSeatMap} from '@src/screens/checkOut/slice/seatMapSlice';
import {checkoutScreenData} from '@src/redux/appSlice/appSlice';

interface RoundtripTicketSelectorModalProps {
  particularSegmentData: any;
  particularItinerary: any;
  particularIndex: any;
  particularCabinClass: any;
  locations: any;
  setIsTicketSelected: any;
  adultCount: any;
  childCount: any;
  infantCount: any;
  roundTripData: any;
}

const RoundtripTicketSelectorModal = (
  props: RoundtripTicketSelectorModalProps,
) => {
  const {
    particularItinerary,
    particularSegmentData,
    particularIndex,
    particularCabinClass,
    locations,
    setIsTicketSelected,
    adultCount,
    childCount,
    infantCount,
  } = props;
  const roundTripFlightData = useSelector(
    (state: RootState) => state?.roundTripFlightSearch?.searchedRoundTripData,
  );
  // fetching the round trip data.
  const {fareFamilies, itineraries, segments, carriers} =
    roundTripFlightData?.data;
  // oneway checkout loader
  const oneWayCheckoutLoader = useSelector(
    (state: RootState) => state.checkout.isLoading,
  );

  const checkoutData = useSelector((state: RootState) => state.checkout);

  // Custom hook for storing the oneway checkout data.
  const previousCheckoutData: any = customHooks.usePrevious(checkoutData);

  const [heightInc, setHeightInc] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [err, setErr] = useState<any>();

  const operatingCarriers = commonMethods.tripOperatingCarrier(
    particularSegmentData.firstTrip.flights,
  );
  const marketingCarriers = commonMethods.tripMarketingCarrier(
    particularSegmentData.firstTrip.flights,
  );

  const dispatch = useDispatch();

  // Hook for one way checkout loader
  useEffect(() => {
    setIsLoading(oneWayCheckoutLoader);
  }, [oneWayCheckoutLoader]);

  const getSellId = () => {
    if (particularItinerary?.downsellRec.length > 0) {
      return particularItinerary?.downsellRec?.map((idd: any) => {
        return idd;
      });
    } else if (particularItinerary?.upsellRec.length > 0) {
      return particularItinerary?.upsellRec?.map((idd: any) => {
        return idd;
      });
    }
  };

  // Get first carrier Airline name for round trip
  const getAirlineName = useCallback(
    (airline: string[]) => {
      const firstAirlines = airline.map((el: string) => {
        return carriers[el];
      });
      return firstAirlines;
    },
    [carriers],
  );

  useEffect(() => {
    if (checkoutData.searchedData !== previousCheckoutData?.searchedData) {
      if (checkoutData?.searchedData?.statusCode === statusCode.Code_200) {
        setIsLoading(false);
        // navigate(navigationConstants.CHECKOUT, {
        //   trip: 2,
        //   particularSegmentData: getRoundTripSegmentsData(),
        //   particularIndex,
        //   adultCount,
        //   childCount,
        //   infantCount,
        //   selectedFlight,
        //   setIsTicketSelected,
        //   roundTripFlightData,
        // });
        navigate(navigationConstants.CHECKOUT);
      }
    }
    if (checkoutData?.err?.statusCode === 500) {
      console.log('hey');

      setIsFailure(true);
      setErr(checkoutData?.err?.errMsg);
    } else {
      setIsFailure(false);
      console.log(checkoutData, 'checkoutdata');
      setErr('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutData]);

  const getSellItinerary = () => {
    const sellId = getSellId();
    const otherItinararies: any[] = [];
    sellId?.map((el: any) => {
      itineraries.forEach((it: any) => {
        if (el === it.id) {
          otherItinararies.push({...it});
        }
      });
    });
    return otherItinararies;
  };

  const singleItineraries = () => {
    const getSegementOne = segments[0][particularItinerary?.segments[0]];
    const getSegmentSec = segments[1][particularItinerary?.segments[1]];
    const mergeSegment = [
      getSegementOne?.flights,
      getSegmentSec?.flights,
    ].flat();
    return {
      ...fareFamilies[particularItinerary?.fareFamilies[1]],
      price: particularItinerary?.price?.total,
      baggageFree: particularItinerary?.baggage,
      bookingclass: particularItinerary?.bookingClass,
      flights: mergeSegment,
      cabinProduct: particularItinerary?.cabinProduct,
      cabin: particularItinerary?.cabin,
      segments: particularItinerary?.segments,
      departure: getSegementOne?.departure,
      arrival: getSegmentSec?.arrival,
    };
  };

  // Get Segment Data of flights
  const getRoundTripSegmentsData = () => {
    const [roundTripsegmentIdFirst, roundTripSegmentIdSecond] =
      selectedFlight.segments;
    const [roundTripFirst, roundTripSecond] = segments;
    const firstTrip = commonMethods.findRoundTripSegments(
      roundTripsegmentIdFirst,
      roundTripFirst,
    );
    const secondTrip = commonMethods.findRoundTripSegments(
      roundTripSegmentIdSecond,
      roundTripSecond,
    );
    const firstAirlines = getAirlineName(firstTrip.carriers);
    const secondAirlines = getAirlineName(secondTrip.carriers);

    const firstTripdepartureAirportName = getAirportName(
      firstTrip.departure.airportCode,
    );
    const firstTripArrivalAirportName = getAirportName(
      firstTrip.arrival.airportCode,
    );

    const secTripDepartureAirportName = getAirportName(
      secondTrip.departure.airportCode,
    );
    const secTripArrivalAirportName = getAirportName(
      secondTrip.arrival.airportCode,
    );
    const updatedSegments = {
      firstTrip: {
        ...firstTrip,
      },
      secondTrip: {
        ...secondTrip,
      },
      firstAirlines,
      secondAirlines,
      firstTripdepartureAirportName,
      firstTripArrivalAirportName,
      secTripDepartureAirportName,
      secTripArrivalAirportName,
      price: selectedFlight?.price,
      cabinClass: selectedFlight?.cabinclass,
    };
    return updatedSegments;
  };

  const getAllSellsFareFamilies = () => {
    const sellItineraries = getSellItinerary();
    return sellItineraries?.map((el: any) => {
      const getSegementOne = segments[0][el?.segments[0]];
      const getSegmentSec = segments[1][el?.segments[1]];
      const mergeSegment = [
        getSegementOne?.flights,
        getSegmentSec?.flights,
      ].flat();
      return {
        ...fareFamilies[el?.fareFamilies[1]],
        price: el?.price?.total,
        cabin: el?.cabin,
        baggageFree: el?.baggage,
        bookingclass: el?.bookingClass,
        flights: mergeSegment,
        cabinProduct: el?.cabinProduct,
        segments: el?.segments,
        departure: getSegementOne?.departure,
        arrival: getSegmentSec?.arrival,
      };
    });
  };
  const particularFareFamily = singleItineraries();
  const [selectedFareFamilyDesc, setSelectedFareFamilyDesc] = useState<any>(
    particularFareFamily?.desc,
  );
  const get = getAllSellsFareFamilies();
  const totalFareFamilies = get.concat(particularFareFamily);
  const [selectedFlight, setSelectedFlight] = useState<any>(
    totalFareFamilies[totalFareFamilies.length - 1],
  );
  const flightsDataToDispatch = () => {
    return selectedFlight?.flights?.map((el: any, ind: any) => {
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
        booking_class: selectedFlight?.bookingclass,
        item_number: ind + 1,
      };
    });
  };

  // Get airport name
  const getAirportName = useCallback(
    (airportCode: string) => {
      return locations[airportCode];
    },
    [locations],
  );
  // Method to find the particular carrier name
  const findCarrierName: any = (data: any) => {
    const gotName = data.map((el: any) => {
      return el.name;
    });
    return gotName[0];
  };

  // Method to handle cancel button
  const handleCancelButton = () => {
    setIsTicketSelected(false);
  };

  const handleConfirmButton = () => {
    dispatch(clearSeatMap());
    const checkoutApiData: any = {
      flights: flightsDataToDispatch(),
      fareFamilies:
        selectedFlight.name !== undefined
          ? [
              {
                name: selectedFlight?.name,
                segRef: [0, 1],
              },
            ]
          : [],
      cabin: selectedFlight?.cabin,
      cabinProduct: selectedFlight?.cabinProduct,
      adults: adultCount,
      children: childCount,
      infants: infantCount,
    };
    dispatch(fetchCheckout(checkoutApiData));
    const data = {
      trip: 2,
      particularSegmentData: getRoundTripSegmentsData(),
      particularIndex,
      adultCount,
      childCount,
      infantCount,
      selectedFlight,
      setIsTicketSelected,
      roundTripFlightData,
    };
    dispatch(checkoutScreenData(data));
  };

  const carrierName = findCarrierName(particularSegmentData.firstAirlines);
  return (
    <>
      <Modal>
        <KeyboardAwareScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{backgroundColor: 'rgba(50,50,50,.9)'}}>
          <View style={styles.selectTicketModalContainerStyle}>
            <View style={[commonStyles.ticketContainer_1]}>
              <View style={commonStyles.codeStyle}>
                <View style={commonStyles.codeStyleSubView}>
                  <Text style={commonStyles.codeTextStyle}>
                    {particularSegmentData.firstTrip?.departure.airportCode}
                  </Text>
                </View>
                <View style={commonStyles.codeStyleSubView}>
                  <Text style={commonStyles.codeTextStyle}>
                    {particularSegmentData.secondTrip?.departure.airportCode}
                  </Text>
                </View>
              </View>

              {/* Departure and arrival city name */}
              <View style={commonStyles.cityNamesStyle}>
                <View style={commonStyles.codeStyleSubView}>
                  <Text
                    style={[
                      commonStyles.cityTextStyle,
                      commonStyles.airportDepartureTextStyle,
                    ]}>
                    {
                      particularSegmentData.firstTripdepartureAirportName
                        ?.cityName
                    }
                  </Text>
                </View>
                <View style={commonStyles.codeStyleSubView}>
                  <Text
                    style={[
                      commonStyles.cityTextStyle,
                      commonStyles.cityTimeTextStyle,
                    ]}>
                    {commonMethods.getDuration(
                      particularSegmentData?.firstTrip.durationInMinutes,
                    )}
                  </Text>
                </View>
                <View style={commonStyles.codeStyleSubView}>
                  <Text
                    numberOfLines={1}
                    style={[
                      commonStyles.cityTextStyle,
                      commonStyles.arrivalCityTextStyle,
                    ]}>
                    {
                      particularSegmentData.secTripDepartureAirportName
                        ?.cityName
                    }
                  </Text>
                </View>
              </View>
              {/* trip departure and arrival time in AM or PM */}
              <View style={commonStyles.timeLineStyle}>
                <Text style={commonStyles.timeTextStyle}>
                  {commonMethods.getTimeFormat(
                    particularSegmentData.firstTrip?.departure.time,
                  )}
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
                  {commonMethods.getTimeFormat(
                    particularSegmentData.firstTrip?.arrival.time,
                  )}
                </Text>
              </View>

              {/* container of flight name and logo */}
              <View style={styles.ticketFlightNamesContainer}>
                <Image
                  style={commonStyles.ticketAirwaysLogo}
                  source={{
                    uri: `${carriersURL.imgURL}${
                      marketingCarriers[0] || operatingCarriers[1]
                    }${carriersURL.png}`,
                  }}
                />
                <Text style={commonStyles.airwaysTextStyle}>{carrierName}</Text>
              </View>

              {/* Container for select button and price of the ticket */}
              <View style={commonStyles.buttonContainer}>
                <View>
                  <Text
                    style={
                      commonStyles.priceTextStyle
                    }>{`${appConstants.usd} ${particularItinerary?.price?.total}`}</Text>
                  <Text style={commonStyles.tripFareTextStyle}>
                    {appConstants.roundTripFare}
                  </Text>
                </View>
              </View>

              {heightInc === particularIndex && (
                <>
                  {/* Arrival Details */}
                  <Image
                    style={styles.ticketDetailedLineStyle}
                    source={Icons.TICKETBOTTOM_LINE}
                  />
                  <Text
                    style={
                      commonStyles.departureTextStyle
                    }>{`To ${particularSegmentData.firstTripArrivalAirportName?.cityName}:`}</Text>
                  <Text
                    style={[
                      commonStyles.timeTextStyle,
                      commonStyles.departureTimeStyle,
                    ]}>
                    {commonMethods.getDuration(
                      particularSegmentData?.firstTrip.durationInMinutes,
                    )}
                  </Text>

                  {/* container for background dot line */}
                  <View style={commonStyles.departureLineContainer}>
                    <Image
                      style={[
                        commonStyles.ticketDepartureLineStyle,
                        {
                          height:
                            particularSegmentData?.firstTrip?.flights
                              ?.length === 1
                              ? responsiveHeight(30)
                              : particularSegmentData?.firstTrip?.flights
                                  ?.length === 2
                              ? responsiveHeight(48)
                              : particularSegmentData?.firstTrip?.flights
                                  ?.length === 3
                              ? responsiveHeight(100)
                              : responsiveHeight(10),
                        },
                      ]}
                      source={Icons.TICKET_DEPARTURELINE}
                    />
                  </View>

                  {/* container of calendar and date of out bound trip */}
                  <View style={commonStyles.ticketCalendarContainer}>
                    <Image source={Icons.TICKET_DEPARTURECALENDAR} />
                    <Text style={commonStyles.dateTextStyle}>
                      {commonMethods.getMonthDayFormat(
                        particularSegmentData?.firstTrip.departure?.date,
                      )}
                    </Text>
                  </View>

                  {/* out bound flights Details */}
                  {particularSegmentData?.firstTrip?.flights.map((el: any) => {
                    const airportNameDeparture = getAirportName(
                      el.departure.airportCode,
                    );
                    const airportNameArrival = getAirportName(
                      el.arrival.airportCode,
                    );

                    return (
                      // flights main container
                      <View style={commonStyles.flightStationContainer}>
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
                            {particularCabinClass === appConstants.byPriceLowest
                              ? appConstants.economy
                              : particularCabinClass}
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
                          {particularSegmentData &&
                            particularSegmentData.firstAirlines?.map(
                              (air: any) => {
                                return (
                                  <Text style={commonStyles.flightTextStyle}>
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

                  {/* reached destination view */}
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
                        {
                          particularSegmentData.firstTripArrivalAirportName
                            ?.name
                        }
                      </Text>
                    </View>
                  </View>

                  {/* Round Trip details */}
                  <Text
                    style={[
                      commonStyles.departureTextStyle,
                      styles.roundTripTodestination,
                    ]}>{`${appConstants.to} ${particularSegmentData.secTripArrivalAirportName?.cityName}:`}</Text>
                  <Text
                    style={[
                      commonStyles.timeTextStyle,
                      commonStyles.departureTimeStyle,
                    ]}>
                    {commonMethods.getDuration(
                      particularSegmentData?.secondTrip.durationInMinutes,
                    )}
                  </Text>

                  {/* in bound dot line container */}
                  <View style={styles.roundTripLineContainer}>
                    <Image
                      style={[
                        commonStyles.ticketDepartureLineStyle,
                        {
                          height:
                            particularSegmentData?.secondTrip?.flights
                              ?.length === 1
                              ? responsiveHeight(30)
                              : particularSegmentData?.secondTrip?.flights
                                  ?.length === 2
                              ? responsiveHeight(48)
                              : particularSegmentData?.secondTrip?.flights
                                  ?.length === 3
                              ? responsiveHeight(100)
                              : responsiveHeight(10),
                        },
                        {
                          top:
                            particularSegmentData?.firstTrip?.flights
                              ?.length === 1
                              ? responsiveHeight(2)
                              : particularSegmentData?.firstTrip?.flights
                                  ?.length === 2
                              ? responsiveHeight(22)
                              : particularSegmentData?.firstTrip?.flights
                                  ?.length === 3
                              ? responsiveHeight(100)
                              : responsiveHeight(10),
                        },
                      ]}
                      source={Icons.TICKET_DEPARTURELINE}
                    />
                  </View>

                  {/* in bound calendar image and date container */}
                  <View style={commonStyles.ticketCalendarContainer}>
                    <Image source={Icons.TICKET_DEPARTURECALENDAR} />
                    <Text style={commonStyles.dateTextStyle}>
                      {commonMethods.getMonthDayFormat(
                        particularSegmentData?.secondTrip.departure?.date,
                      )}
                    </Text>
                  </View>

                  {/* in bound flights details container */}
                  {particularSegmentData?.secondTrip.flights.map((el: any) => {
                    const airportNameDeparture = getAirportName(
                      el.departure.airportCode,
                    );
                    const airportNameArrival = getAirportName(
                      el.arrival.airportCode,
                    );

                    return (
                      <View style={commonStyles.flightStationContainer}>
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
                            {particularCabinClass === appConstants.byPriceLowest
                              ? appConstants.economy
                              : particularCabinClass}
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
                          {particularSegmentData &&
                            particularSegmentData.firstAirlines?.map(
                              (air: any) => {
                                return (
                                  <Text style={commonStyles.flightTextStyle}>
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
                        {particularSegmentData.secTripArrivalAirportName?.name}
                      </Text>
                    </View>
                  </View>
                </>
              )}

              {/* side roundview one*/}
              <View
                style={[
                  commonStyles.roundView,
                  commonStyles.subRoundViewStyle,
                  styles.viewColor,
                ]}
              />

              {/* side roundview second*/}
              <View style={[commonStyles.roundView, styles.viewColor]} />

              <Image
                style={commonStyles.lineStyle}
                source={Icons.TICKETBOTTOM_LINE}
              />

              {/* ticket close and open button */}
              {heightInc !== particularIndex ? (
                <TouchableOpacity
                  onPress={() => setHeightInc(particularIndex)}
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
            {totalFareFamilies?.map((el: any) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.bottomBarButtonStyle,
                    {
                      backgroundColor:
                        selectedFareFamilyDesc === el?.desc
                          ? colors.color_319ADF
                          : colors.color_fff,
                    },
                  ]}
                  onPress={() => {
                    setSelectedFareFamilyDesc(el.desc);
                    setSelectedFlight(el);
                  }}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.barButtonTextStyle,
                      {
                        color:
                          selectedFareFamilyDesc === el?.desc
                            ? colors.color_fff
                            : colors.color_000,
                      },
                    ]}>
                    {el.desc}
                  </Text>
                  {selectedFareFamilyDesc === el.desc ? (
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
          <View style={styles.fareInfoMainContainerStyle}>
            <View style={styles.fareInfoContainerStyle}>
              {totalFareFamilies?.map((el: any) => {
                if (el?.desc === selectedFareFamilyDesc) {
                  return (
                    <>
                      <View style={styles.boxSubContainerStyle}>
                        <CustomFlightInfoBox
                          headerTitle={appConstants.priceUSD}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={`$${el?.price}`}
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.baggageFree}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={el?.baggageFree.map(
                            (it: any) => it?.amount,
                          )}
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.bagage}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={el?.baggage?.map(
                            (it: any) => `${it?.desc}\n`,
                          )}
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.snack}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={
                            el?.snack?.length > 0
                              ? `${appConstants.availableSnack}`
                              : `${appConstants.underScore}`
                          }
                        />
                        <CustomFlightInfoBox
                          headerTitle={appConstants.seatAssignment}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={
                            el?.seatAssignment?.length > 0
                              ? el?.seatAssignment?.map(
                                  (it: any) => `${it?.name}\n`,
                                )
                              : `${appConstants.underScore}`
                          }
                        />
                        <CustomFlightInfoBox
                          customBoxStyle={styles.customBoxStyle}
                          headerTitle={appConstants.others}
                          subTitle={el?.other?.map(
                            (it: any) => `${it?.desc}\n`,
                          )}
                        />
                      </View>
                      <View style={styles.boxSubContainerStyle}>
                        <CustomFlightInfoBox
                          headerTitle={appConstants.cabin}
                          customBoxStyle={styles.customBoxStyle}
                          subTitle={
                            particularCabinClass === appConstants.byPriceLowest
                              ? appConstants.economy
                              : particularCabinClass
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
                    </>
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

        {isLoading && (
          <CustomLoader
            loaderColor={colors.color_0094E6}
            isLoading={isLoading}
            customLoaderStyle={styles.customLoaderStyle}
          />
        )}
        {isFailure && (
          <CustomModal
            label={err}
            onPress={() => {
              setIsFailure(false);
              setIsTicketSelected(false);
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default RoundtripTicketSelectorModal;
