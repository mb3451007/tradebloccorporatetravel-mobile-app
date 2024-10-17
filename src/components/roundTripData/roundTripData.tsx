/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Icons} from '@src/assets';
import CustomButton from '../customButton/customButton';
import appConstants, {carriersURL} from '@src/constants/appConstants';
import commonMethods from '@src/utility/commonMethods';
import commonStyles from '@src/utility/commonStyles';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import RoundtripTicketSelectorModal from '../roundTripTicketSelectorModal/roundTripTicketSelectorModal';
import {clearCheckout} from '@src/screens/checkOut/slice/checkoutSlice';

interface RoundTripDataProps {
  roundTripData: any;
  cabinClass: any;
  adultCount: any;
  childCount: any;
  infantCount: any;
}

const RoundTripData = (props: RoundTripDataProps) => {
  const {roundTripData, cabinClass, adultCount, childCount, infantCount} =
    props;

  const dispatch = useDispatch();
  const {carriers, itineraries, locations, segments}: any = roundTripData?.data;
  const [heightInc, setHeightInc]: any = useState('');
  const [roundTripItinerariesData, setRoundTripItinerariesData] = useState<any>(
    [],
  );
  const [roundTripItinerariesFilterData, setRoundTripItinerariesFilterData] =
    useState<any>([]);

  const [particularItinerary, setParticularItinerary] = useState();
  const [particularTicketSegment, setParticularTicketSegment] = useState();
  const [particularTicketIndex, setParticularTicketIndex] = useState();
  const [isTicketSelected, setIsTicketSelected] = useState(false);

  //useSelector to get data from redux
  const roundTripSelectedButton: any = useSelector(
    (state: RootState) => state.app.sorting,
  );
  const filter: any = useSelector((state: RootState) => state.app.filter);

  const getRoundTripItineraries: any = () => {
    const gotCheapestData = itineraries?.map((item: any) => {
      const [firstSegId, secondSegId] = item?.segments;
      const [segFirst, segSecond] = segments;
      const segmentOne = commonMethods.findRoundTripSegments(
        firstSegId,
        segFirst,
      );
      const segmentSecond = commonMethods.findRoundTripSegments(
        secondSegId,
        segSecond,
      );
      const roundTripStops = commonMethods.isStop(segmentOne);
      const segmentSecStops = commonMethods.isStop(segmentSecond);
      const roundTripAirline = findRoundTripCarriersCode(segmentOne);
      const segmentSecAirline = findRoundTripCarriersCode(segmentSecond);
      const segOneMarketingCarrier = commonMethods.tripMarketingCarrier(
        segmentOne.flights,
      );
      const segOneOperatingCarrier = commonMethods.tripOperatingCarrier(
        segmentOne.flights,
      );
      const segSecOperatingCarrier = commonMethods.tripOperatingCarrier(
        segmentSecond.flights,
      );
      const segSecMarketingCarrier = commonMethods.tripMarketingCarrier(
        segmentSecond.flights,
      );
      const roundTripDepartureLocationCode = findRoundTripDepartureLocationCode(
        segmentOne.flights,
      );
      const segmentSecDepartureLocationCode =
        findRoundTripDepartureLocationCode(segmentSecond.flights);
      const roundTripArrivalLocationCode = findRoundTripArrivalLocationCode(
        segmentOne.flights,
      );
      const segmentSecArrivalLocationCode = findRoundTripArrivalLocationCode(
        segmentSecond.flights,
      );
      const inBoundDepartureTime = handleFlightDepartureInBoundTime(
        segmentOne.flights,
      );
      const inBoundArrivalTime = handleFlightArrivalInBoundTime(
        segmentOne.flights,
      );
      const outBoundDepartureTime = handleFlightDepartureOutBoundTime(
        segmentSecond.flights,
      );
      const outBoundArrivalTime = handleFlightArrivalOutBoundTime(
        segmentSecond.flights,
      );
      return {
        ...item,
        segmentOneDurations: segmentOne.durationInMinutes,
        segmentSecDurations: segmentSecond.durationInMinutes,
        roundTripStops,
        segmentSecStops,
        roundTripAirline,
        segmentSecAirline,
        segOneMarketingCarrier,
        segOneOperatingCarrier,
        segSecMarketingCarrier,
        segSecOperatingCarrier,
        roundTripArrivalLocationCode,
        segmentSecArrivalLocationCode,
        segmentSecDepartureLocationCode,
        roundTripDepartureLocationCode,
        inBoundDepartureTime,
        inBoundArrivalTime,
        outBoundDepartureTime,
        outBoundArrivalTime,
      };
    });
    return gotCheapestData;
  };

  // Method to sort Quickest data...
  const quickestSorting: any = () => {
    const sortData: any = [...roundTripItinerariesData];
    const segmentOneSortedData = sortData.sort((a: any, b: any) => {
      const durA = a.segmentOneDurations;
      const durB = b.segmentOneDurations;
      if (durA < durB) {
        return -1;
      }

      if (durA > durB) {
        return 1;
      }
    });
    return quickSortingSegmentSecond(segmentOneSortedData);
  };

  // Sorting the second segment data from one segment data.
  const quickSortingSegmentSecond = (data: any) => {
    const seg = data.sort((a: any, b: any) => {
      const durA = a.segmentSecDurations;
      const durB = b.segmentSecDurations;
      if (durA < durB) {
        return -1;
      }

      if (durA > durB) {
        return 1;
      }
    });
    return seg;
  };

  // Hook for cheapest and quickest button
  useEffect(() => {
    const flightResponse = getRoundTripItineraries();
    setRoundTripItinerariesData(flightResponse);

    if (roundTripSelectedButton === appConstants.cheapest && !filter.filter) {
      const gotCheapestResult = getRoundTripItineraries();
      setRoundTripItinerariesFilterData(gotCheapestResult);
    }
    if (roundTripSelectedButton === appConstants.quickest && !filter.filter) {
      const gotQuickestData = quickestSorting();
      setRoundTripItinerariesFilterData(gotQuickestData);
    }
  }, [roundTripSelectedButton]);

  // Hook for filters
  useEffect(() => {
    if (filter.filter) {
      handleRoundTripFilter();
    }
  }, [filter, roundTripSelectedButton]);

  // TO get the stops checked value..
  const getRoundTripStops: any = () => {
    return filter.stops.map((item: any) => item);
  };

  // To get the airlines checked value..
  const getRoundTripAirline: any = () => {
    return filter?.carriers?.filter((item: any) => item?.open === true);
  };

  // To get the locations checked value..
  const getRoundTripLocation: any = () => {
    return filter?.locations?.filter((item: any) => item?.open === true);
  };

  // Method to filter the stops
  const handleFilteredStops = (result: any) => {
    const stopsToFilter = getRoundTripStops();
    const getAllStops = stopsToFilter.flat();
    const checkEveryStop = getAllStops.every((it: any) => {
      if (it.open === true) {
        return true;
      } else {
        return false;
      }
    });
    if (checkEveryStop === true) {
      return result;
    } else {
      return result.filter((item: any) => {
        return stopsToFilter.some((el: any) => {
          if (el.key === item.roundTripStops && el.open === true) {
            return handleSegmentSecFilterStops(el.key, item);
          }
        });
      });
    }
  };

  //Method to filter second segment stops
  const handleSegmentSecFilterStops = (key: any, data: any) => {
    return key === data.segmentSecStops;
  };

  // Method to filter the airlines..
  const handleFilteredAirlines = (data: any) => {
    const car = getRoundTripAirline();

    if (car.length > 0) {
      return data?.filter((item: any) => {
        return car.some((el: any) => {
          // return item.roundTripAirline.includes(el.key);
          if (
            item.roundTripAirline.includes(el.key) ||
            item.segOneMarketingCarrier.includes(el.key) ||
            item.segOneOperatingCarrier.includes(el.key) ||
            item.segSecMarketingCarrier.includes(el.key) ||
            item.segSecOperatingCarrier.includes(el.key)
          ) {
            return item;
          }
        });
      });
    } else {
      return data;
    }
  };

  // Method to filter the locations...
  const handleFilteredLocations = (data: any) => {
    const filLocations = getRoundTripLocation();
    if (filLocations.length > 0) {
      return data?.filter((item: any) => {
        return filLocations.some((el: any) => {
          if (
            item.roundTripArrivalLocationCode.includes(el.key) ||
            item.roundTripDepartureLocationCode.includes(el.key) ||
            item.segmentSecArrivalLocationCode.includes(el.key) ||
            item.segmentSecArrivalLocationCode.includes(el.key)
          ) {
            return item;
          }
        });
      });
    } else {
      return data;
    }
  };

  // Method to filter the price
  const handleFilteredPriceData = (result: any) => {
    const {min, max} = filter.price;
    if (
      commonMethods.isNullUndefined(min) &&
      commonMethods.isNullUndefined(max)
    ) {
      return result;
    } else {
      return result.filter((item: any) => {
        const price = parseFloat(item.price.total);
        if (price >= min && price <= max) {
          return item;
        }
      });
    }
  };

  // Method to filter Departure in bound time
  const handleInBoundDepartureFilter = (value: any) => {
    const {min, max} = filter.inBoundDepartureTime;
    if (
      commonMethods.isNullUndefined(min) &&
      commonMethods.isNullUndefined(max)
    ) {
      return value;
    } else {
      return value.filter((item: any) => {
        const depTime = item.inBoundDepartureTime.filter((el: any) => {
          return el >= min;
        });
        if (depTime >= min && depTime <= max) {
          return item;
        }
      });
    }
  };

  // Method to filter Arrival in bound time
  const handleInBoundArrivalFilter = (value: any) => {
    const {min, max} = filter.inBoundArrivalTime;
    if (
      commonMethods.isNullUndefined(min) &&
      commonMethods.isNullUndefined(max)
    ) {
      return value;
    } else {
      return value.filter((item: any) => {
        const depTime = item.inBoundArrivalTime;

        if (depTime.pop() >= min && depTime <= max) {
          return item;
        }
      });
    }
  };
  // Method to filter the duration
  const handleFilteredDurationData = (result: any) => {
    const {min, max} = filter.duration;
    if (
      commonMethods.isNullUndefined(min) &&
      commonMethods.isNullUndefined(max)
    ) {
      return result;
    } else {
      return result.filter((item: any) => {
        const oneDuration = item.segmentOneDurations;
        const secDuration = item.segmentSecDurations;

        const checkDur = Math.min(oneDuration, secDuration);

        if (checkDur >= min) {
          return item;
        }
      });
    }
  };

  // Method to filter departure out bound time
  const handleOutBoundDepartureFilter = (value: any) => {
    const {min, max} = filter.outBoundDepartureTime;
    if (
      commonMethods.isNullUndefined(min) &&
      commonMethods.isNullUndefined(max)
    ) {
      return value;
    } else {
      return value.filter((item: any) => {
        const depTime = item.outBoundDepartureTime;
        if (depTime >= min && depTime <= max) {
          return item;
        }
      });
    }
  };

  // Method to filter arrival out bound time
  const handleOutBoundArrivalFilter = (value: any) => {
    const {min, max} = filter.outBoundArrivalTime;
    if (
      commonMethods.isNullUndefined(min) &&
      commonMethods.isNullUndefined(max)
    ) {
      return value;
    } else {
      return value.filter((item: any) => {
        const depTime = item.outBoundArrivalTime;
        if (depTime.pop() >= min && depTime <= max) {
          return item;
        }
      });
    }
  };

  // Method to handle the round trip filter
  const handleRoundTripFilter = () => {
    if (roundTripSelectedButton === appConstants.cheapest) {
      const gotResult = getRoundTripItineraries();

      const roundTripStopResult = handleFilteredStops(gotResult);

      const roundTripFlightResult = handleFilteredAirlines(roundTripStopResult);

      const roundTripLocationResult = handleFilteredLocations(
        roundTripFlightResult,
      );

      const roundTripPriceResult = handleFilteredPriceData(
        roundTripLocationResult,
      );

      const inBoundDepartureResult =
        handleInBoundDepartureFilter(roundTripPriceResult);

      const inBoundArrivalResult = handleInBoundArrivalFilter(
        inBoundDepartureResult,
      );

      const outBoundDepartureResult =
        handleOutBoundDepartureFilter(inBoundArrivalResult);

      const outBoundArrivalResult = handleOutBoundArrivalFilter(
        outBoundDepartureResult,
      );

      const roundTripDurations = handleFilteredDurationData(
        outBoundArrivalResult,
      );

      setRoundTripItinerariesFilterData(roundTripDurations);
    }

    if (roundTripSelectedButton === appConstants.quickest) {
      const gotResult = quickestSorting();
      const roundTripStopResult = handleFilteredStops(gotResult);
      const roundTripFlightResult = handleFilteredAirlines(roundTripStopResult);
      const roundTripLocationResult = handleFilteredLocations(
        roundTripFlightResult,
      );
      const roundTripPriceResult = handleFilteredPriceData(
        roundTripLocationResult,
      );
      const inBoundDepartureResult =
        handleInBoundDepartureFilter(roundTripPriceResult);
      const inBoundArrivalResult = handleInBoundArrivalFilter(
        inBoundDepartureResult,
      );
      const outBoundDepartureResult =
        handleOutBoundDepartureFilter(inBoundArrivalResult);
      const outBoundArrivalResult = handleOutBoundArrivalFilter(
        outBoundDepartureResult,
      );

      const roundTripDurations = handleFilteredDurationData(
        outBoundArrivalResult,
      );
      setRoundTripItinerariesFilterData(roundTripDurations);
    }
  };

  // Carriers code for airline filter..
  const findRoundTripCarriersCode = (item: any) => {
    const findedCarrier = getAirlineName(item.carriers);
    const data = findedCarrier.map(el => {
      return el.id;
    });
    return data;
  };

  // To find particular arrival location code..
  const findRoundTripArrivalLocationCode = (item: any) => {
    const locData = item.map((it: any) => {
      return it.arrival.airportCode;
    });
    return locData;
  };

  // To find particular departure location code..
  const findRoundTripDepartureLocationCode = (value: any) => {
    const arrLocData = value.map((it: any) => {
      return it.departure.airportCode;
    });
    return arrLocData;
  };

  // To find particular departure flight time..
  const handleFlightDepartureInBoundTime = (item: any) => {
    const departureTime = item.map((it: any) => {
      return it.departure.time;
    });

    return departureTime;
  };

  // To find particular arrival flight time..
  const handleFlightArrivalInBoundTime = (item: any) => {
    const arrivalTime = item.map((it: any) => {
      return it.arrival.time;
    });

    return arrivalTime;
  };

  // To find the outBound departure time
  const handleFlightDepartureOutBoundTime = (item: any) => {
    const departureTime = item.map((it: any) => {
      return it.departure.time;
    });

    return departureTime;
  };

  // To find particular outBound arrival time..
  const handleFlightArrivalOutBoundTime = (item: any) => {
    const arrivalTime = item.map((it: any) => {
      return it.arrival.time;
    });

    return arrivalTime;
  };

  // Get airport name
  const getAirportName = useCallback(
    (airportCode: string) => {
      return locations[airportCode];
    },
    [locations],
  );

  // Get first carrier Airline name
  const getAirlineName = useCallback(
    (airline: string[]) => {
      const firstAirlines = airline.map((el: string) => {
        return carriers[el];
      });
      return firstAirlines;
    },
    [carriers],
  );

  // Get Segment Data of flights
  const getRoundTripSegmentsData = useCallback(
    (item: any) => {
      const [roundTripsegmentIdFirst, roundTripSegmentIdSecond] = item.segments;
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
      };
      return updatedSegments;
    },
    [getAirlineName, getAirportName, segments],
  );

  // Method to find the particular carrier name
  const findCarrierName = (data: any) => {
    const gotName = data.map((el: any) => {
      return el.name;
    });
    return gotName[0];
  };

  // Flatlist render item
  const renderItems = ({item, index}: any) => {
    const segmentData = getRoundTripSegmentsData(item);
    const operatingCarriers = commonMethods.tripOperatingCarrier(
      segmentData.firstTrip.flights,
    );
    const marketingCarriers = commonMethods.tripMarketingCarrier(
      segmentData.firstTrip.flights,
    );
    const carrierName = findCarrierName(segmentData.firstAirlines);
    // method to open ticket details..
    const handleTicketHeight = (val: any) => {
      setHeightInc(val);
    };

    const handleCloseTicketHeight = () => {
      setHeightInc('');
    };

    // Method to handle the select button.
    const handleTicketSelectButton = (iti: any, seg: any, ind: any) => {
      dispatch(clearCheckout());
      setParticularItinerary(iti);
      setParticularTicketSegment(seg);
      setParticularTicketIndex(ind);
      setIsTicketSelected(true);
    };

    return (
      <>
        <View style={[commonStyles.ticketContainer_1]}>
          {/* Airport departure and arrival code */}
          <View style={commonStyles.codeStyle}>
            <View style={commonStyles.codeStyleSubView}>
              <Text style={commonStyles.codeTextStyle}>
                {segmentData.firstTrip?.departure.airportCode}
              </Text>
            </View>
            <View style={commonStyles.codeStyleSubView}>
              <Text style={commonStyles.codeTextStyle}>
                {segmentData.secondTrip?.departure.airportCode}
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
                {segmentData.firstTripdepartureAirportName?.cityName}
              </Text>
            </View>
            <View style={commonStyles.codeStyleSubView}>
              <Text
                style={[
                  commonStyles.cityTextStyle,
                  commonStyles.cityTimeTextStyle,
                ]}>
                {commonMethods.getDuration(
                  segmentData?.firstTrip.durationInMinutes,
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
                {segmentData.secTripDepartureAirportName?.cityName}
              </Text>
            </View>
          </View>

          {/* trip departure and arrival time in AM or PM */}
          <View style={commonStyles.timeLineStyle}>
            <Text style={commonStyles.timeTextStyle}>
              {commonMethods.getTimeFormat(
                segmentData.firstTrip?.departure.time,
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
              {commonMethods.getTimeFormat(segmentData.firstTrip?.arrival.time)}
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
                }>{`${appConstants.usd} ${item?.price?.total}`}</Text>
              <Text style={commonStyles.tripFareTextStyle}>
                {appConstants.roundTripFare}
              </Text>
            </View>
            <CustomButton
              label={appConstants.select}
              labelStyle={commonStyles.buttonTextStyle}
              gradientStyle={commonStyles.selectButtonGradientStyle}
              customButtonStyle={commonStyles.selectButtonGradientStyle}
              onPress={() => handleTicketSelectButton(item, segmentData, index)}
            />
          </View>

          {heightInc === index && (
            <>
              {/* Arrival Details */}
              <Image
                style={styles.ticketDetailedLineStyle}
                source={Icons.TICKETBOTTOM_LINE}
              />
              <Text
                style={
                  commonStyles.departureTextStyle
                }>{`To ${segmentData.firstTripArrivalAirportName?.cityName}:`}</Text>
              <Text
                style={[
                  commonStyles.timeTextStyle,
                  commonStyles.departureTimeStyle,
                ]}>
                {commonMethods.getDuration(
                  segmentData?.firstTrip.durationInMinutes,
                )}
              </Text>

              {/* container for background dot line */}
              <View style={commonStyles.departureLineContainer}>
                <Image
                  style={[
                    commonStyles.ticketDepartureLineStyle,
                    {
                      height:
                        segmentData?.firstTrip?.flights?.length === 1
                          ? responsiveHeight(30)
                          : segmentData?.firstTrip?.flights?.length === 2
                          ? responsiveHeight(48)
                          : segmentData?.firstTrip?.flights?.length === 3
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
                    segmentData?.firstTrip.departure?.date,
                  )}
                </Text>
              </View>

              {/* out bound flights Details */}
              {segmentData?.firstTrip?.flights.map((el: any) => {
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
                        {commonMethods.getAirportDetails(airportNameDeparture)}
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
                        segmentData.firstAirlines?.map((air: any) => {
                          return (
                            <Text style={commonStyles.flightTextStyle}>
                              {air.name}
                            </Text>
                          );
                        })}
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
                        {commonMethods.getAirportDetails(airportNameArrival)}
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
                    {segmentData.firstTripArrivalAirportName?.name}
                  </Text>
                </View>
              </View>

              {/* Round Trip details */}
              <Text
                style={[
                  commonStyles.departureTextStyle,
                  styles.roundTripTodestination,
                ]}>{`${appConstants.to} ${segmentData.secTripArrivalAirportName?.cityName}:`}</Text>
              <Text
                style={[
                  commonStyles.timeTextStyle,
                  commonStyles.departureTimeStyle,
                ]}>
                {commonMethods.getDuration(
                  segmentData?.secondTrip.durationInMinutes,
                )}
              </Text>

              {/* in bound dot line container */}
              <View style={styles.roundTripLineContainer}>
                <Image
                  style={[
                    commonStyles.ticketDepartureLineStyle,
                    {
                      height:
                        segmentData?.secondTrip?.flights?.length === 1
                          ? responsiveHeight(30)
                          : segmentData?.secondTrip?.flights?.length === 2
                          ? responsiveHeight(48)
                          : segmentData?.secondTrip?.flights?.length === 3
                          ? responsiveHeight(100)
                          : responsiveHeight(10),
                    },
                    {
                      top:
                        segmentData?.firstTrip?.flights?.length === 1
                          ? responsiveHeight(2)
                          : segmentData?.firstTrip?.flights?.length === 2
                          ? responsiveHeight(22)
                          : segmentData?.firstTrip?.flights?.length === 3
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
                    segmentData?.secondTrip.departure?.date,
                  )}
                </Text>
              </View>

              {/* in bound flights details container */}
              {segmentData?.secondTrip.flights.map((el: any) => {
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
                        {commonMethods.getAirportDetails(airportNameDeparture)}
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
                        segmentData.firstAirlines?.map((air: any) => {
                          return (
                            <Text style={commonStyles.flightTextStyle}>
                              {air.name}
                            </Text>
                          );
                        })}
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
                        {commonMethods.getAirportDetails(airportNameArrival)}
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
                    {segmentData.secTripArrivalAirportName?.name}
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* side roundview one*/}
          <View
            style={[commonStyles.roundView, commonStyles.subRoundViewStyle]}
          />

          {/* side roundview second*/}
          <View style={commonStyles.roundView} />

          <Image
            style={commonStyles.lineStyle}
            source={Icons.TICKETBOTTOM_LINE}
          />

          {/* ticket close and open button */}
          {heightInc !== index ? (
            <TouchableOpacity
              onPress={() => handleTicketHeight(index)}
              style={[commonStyles.ticketDropdownContainerStyle]}>
              <Image
                style={commonStyles.ticketDropdownStyle}
                source={Icons.TICKET_DROPDOWN}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleCloseTicketHeight}
              style={[commonStyles.ticketDropupContainerStyle]}>
              <Image
                style={commonStyles.ticketDropupStyle}
                source={Icons.TICKET_DROPUPICON}
              />
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  };
  return (
    <>
      {roundTripItinerariesFilterData.length > 0 ? (
        <FlatList
          data={roundTripItinerariesFilterData}
          renderItem={renderItems}
        />
      ) : (
        <View style={styles.noDataFoundStyle}>
          <Text style={styles.noDataTextStyle}>{appConstants.noDataFound}</Text>
        </View>
      )}
      {isTicketSelected && (
        <RoundtripTicketSelectorModal
          particularItinerary={particularItinerary}
          particularSegmentData={particularTicketSegment}
          particularIndex={particularTicketIndex}
          particularCabinClass={cabinClass}
          locations={locations}
          setIsTicketSelected={setIsTicketSelected}
          adultCount={adultCount}
          infantCount={infantCount}
          childCount={childCount}
          roundTripData={roundTripData}
        />
      )}
    </>
  );
};

export default RoundTripData;
