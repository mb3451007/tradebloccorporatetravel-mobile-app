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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import CustomTicketSelectorModal from '../oneWayTicketSelectorModal/oneWayTicketSelectorModal';
import {clearCheckout} from '@src/screens/checkOut/slice/checkoutSlice';

const OneWayTripData = ({
  oneWayData,
  cabinClass,
  trip,
  isTicketSelectorModal,
  setIsTicketSelectorModal,
  adultCount,
  childCount,
  infantCount,
}: any) => {
  const {carriers, itineraries, locations, segments} = oneWayData?.data;
  const [heightInc, setHeightInc] = useState('');
  const [flightData, setFlightData] = useState<any>([]);
  const [filterFlightData, setFilterFlightData] = useState<any>([]);
  const dispatch = useDispatch();
  const [selectItem, setSelectItem] = useState<any>();
  const [modalSegment, setModalSegment] = useState<any>();
  const [modalIndex, setModalIndex] = useState<any>();
  const selectedFilterButton = useSelector(
    (state: RootState) => state.app.sorting,
  );

  const filter = useSelector((state: RootState) => state.app.filter);

  // Hook for cheapest and quikest data.
  useEffect(() => {
    const response = addDurationInItineraries();
    setFlightData(response);

    if (selectedFilterButton === appConstants.cheapest) {
      const result = addDurationInItineraries();
      setFilterFlightData(result);
    }
    if (selectedFilterButton === appConstants.quickest) {
      const result = quickestFlights();
      setFilterFlightData(result);
    }
  }, [selectedFilterButton]);

  // //Hook for filtering the data
  useEffect(() => {
    if (filter.filter) {
      handleFilters();
    }
  }, [filter, selectedFilterButton]);

  // Metthod to handle the cheapest data
  const addDurationInItineraries = () => {
    const cheapestSegmentData = itineraries?.map((item: any) => {
      const findedSegment = commonMethods.findSegments(item, segments?.flat());
      const stop = commonMethods.isStop(findedSegment);
      const carriersCode = findCarriersCode(findedSegment);
      const marketingCarrier = commonMethods.tripMarketingCarrier(
        findedSegment.flights,
      );
      const operatingCarrier = commonMethods.tripOperatingCarrier(
        findedSegment.flights,
      );
      const arrivalLocationsCode = arrivalLocationCode(findedSegment.flights);
      const departureLocationsCode = departureLocationCode(
        findedSegment.flights,
      );
      const flightDeparture = flightDepartureTime(findedSegment.flights);
      const flightArrival = flightArrivalTime(findedSegment.flights);
      return {
        ...item,
        durationInMinutes: findedSegment.durationInMinutes,
        stops: stop,
        carriersCode: carriersCode,
        marketingCarrier,
        operatingCarrier,
        locationsCode: arrivalLocationsCode,
        departureLocationsCode,
        flightDeparture,
        flightArrival,
      };
    });
    return cheapestSegmentData;
  };

  // Quickest Flights sorting..
  const quickestFlights = () => {
    const flightDataCopy: any = [...flightData];
    const data = flightDataCopy.sort((a: any, b: any) => {
      const keyA = a.durationInMinutes;
      const keyB = b.durationInMinutes;
      if (keyA < keyB) {
        return -1;
      }

      if (keyA > keyB) {
        return 1;
      }
    });
    return data;
  };

  // TO get the stops checked value..
  const getStops: any = () => {
    return filter.stops.map((item: any) => item);
  };

  // To get the airlines checked value..
  const getAirline: any = () => {
    return filter?.carriers?.filter((item: any) => item?.open === true);
  };

  // To get the locations checked value..
  const getLocation: any = () => {
    return filter?.locations?.filter((item: any) => item?.open === true);
  };

  // Method to filter the stops
  const handleFilteredStops = (result: any) => {
    const stopsToFilter = getStops();
    const allStops = stopsToFilter.flat();
    const checkEveryStop = allStops.every((it: any) => {
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
          if (el.key === item.stops && el.open === true) {
            return item;
          }
        });
      });
    }
  };

  // Method to filter the airlines..
  const filteredAirlines = (data: any) => {
    const car = getAirline();
    if (car.length > 0) {
      return data?.filter((item: any) => {
        return car.some((el: any) => {
          if (
            item.carriersCode.includes(el.key) ||
            item.operatingCarrier.includes(el.key) ||
            item.marketingCarrier.includes(el.key)
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
  const filteredLocations = (data: any) => {
    const filLocations = getLocation();
    if (filLocations.length > 0) {
      return data?.filter((item: any) => {
        return filLocations.some(
          (el: any) =>
            item.locationsCode.includes(el.key) ||
            item.departureLocationsCode.includes(el.key),
        );
      });
    } else {
      return data;
    }
  };

  // Method to filter the price
  const filteredPriceData = (result: any) => {
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

  //Method to filter departure bound time
  const filterdepartureDurationBound = (value: any) => {
    const {min, max} = filter.oneWayDepartureTime;
    if (
      commonMethods.isNullUndefined(min) &&
      commonMethods.isNullUndefined(max)
    ) {
      return value;
    } else {
      return value.filter((item: any) => {
        const depTime = item.flightDeparture;
        if (depTime >= min && depTime <= max) {
          return item;
        }
      });
    }
  };

  //Method to filter Arrival bound time
  const filterArrivalDurationBound = (value: any) => {
    const {min, max} = filter.oneWayArrivalTime;
    if (
      commonMethods.isNullUndefined(min) &&
      commonMethods.isNullUndefined(max)
    ) {
      return value;
    } else {
      return value.filter((item: any) => {
        const arrTime = item.flightArrival;
        if (arrTime >= min && arrTime <= max) {
          return item;
        }
      });
    }
  };

  // Method to filter the duration
  const filteredDurationData = (result: any) => {
    const {min, max} = filter.duration;
    if (
      commonMethods.isNullUndefined(min) &&
      commonMethods.isNullUndefined(max)
    ) {
      return result;
    } else {
      return result.filter((item: any) => {
        const duration = item.durationInMinutes;
        if (duration >= min && duration <= max) {
          return item;
        }
      });
    }
  };

  // Method to filter the stops..
  const handleFilters = () => {
    if (selectedFilterButton === appConstants.cheapest) {
      const result = addDurationInItineraries();
      const stopsResult = handleFilteredStops(result);
      const airlineResult = filteredAirlines(stopsResult);
      const locationResult = filteredLocations(airlineResult);
      const priceResult = filteredPriceData(locationResult);
      const departureBoundResult = filterdepartureDurationBound(priceResult);
      const arrivalBoundResult =
        filterArrivalDurationBound(departureBoundResult);
      const durationResult = filteredDurationData(arrivalBoundResult);
      setFilterFlightData(durationResult);
    }
    if (selectedFilterButton === appConstants.quickest) {
      const result = quickestFlights();
      const stopsResult = handleFilteredStops(result);
      const airlineResult = filteredAirlines(stopsResult);
      const locationResult = filteredLocations(airlineResult);
      const priceResult = filteredPriceData(locationResult);
      const departureBoundResult = filterdepartureDurationBound(priceResult);
      const arrivalBoundResult =
        filterArrivalDurationBound(departureBoundResult);
      const durationResult = filteredDurationData(arrivalBoundResult);
      setFilterFlightData(durationResult);
    }
  };

  // method to open ticket details..
  const handleTicketHeight = (index: any) => {
    setHeightInc(index);
  };

  // method to close ticket details..
  const handleCloseTicketHeight = () => {
    setHeightInc('');
  };

  // Get airport name
  const getAirportName = useCallback(
    (airportCode: string) => {
      return locations[airportCode];
    },
    [locations],
  );

  // Get Airline na me
  const getAirlineName = useCallback(
    (airline: string[]) => {
      const airlines = airline?.map((el: string) => {
        return carriers[el];
      });
      return airlines;
    },
    [carriers],
  );

  // Carriers code for airline filter..
  const findCarriersCode = (item: any) => {
    const findedCarrier = getAirlineName(item.carriers);
    const data = findedCarrier.map(el => {
      return el.id;
    });
    return data;
  };

  // To find particular arrival location code..
  const arrivalLocationCode = (item: any) => {
    const locData = item.map((it: any) => {
      return it.arrival.airportCode;
    });
    return locData;
  };

  // To find particular departure location code..
  const departureLocationCode = (value: any) => {
    const arrLocData = value.map((it: any) => {
      return it.departure.airportCode;
    });
    return arrLocData;
  };

  // To find particular departure flight time..
  const flightDepartureTime = (item: any) => {
    const departureTime = item.map((it: any) => {
      return it.departure.time;
    });

    return departureTime;
  };

  // To find particular arrival flight time..
  const flightArrivalTime = (item: any) => {
    const arrivalTime = item.map((it: any) => {
      return it.arrival.time;
    });

    return arrivalTime;
  };

  // Get Segment Data of flights
  const getSegmentsData = useCallback(
    (item: any) => {
      const findedSegment = commonMethods.findSegments(item, segments?.flat());
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
      };
      return updatedSegments;
    },
    [getAirlineName, getAirportName, segments],
  );

  // Method to set the state of ticket selector modal
  const handleTicketSelectorModal = (
    item: any,
    segmentData: any,
    index: any,
  ) => {
    setIsTicketSelectorModal(true);
    setSelectItem(item);
    setModalSegment(segmentData);
    setModalIndex(index);
  };

  // Render Items of flatList
  const renderItems = ({item, index}: any) => {
    const segmentData = getSegmentsData(item);
    const operatingCarriers = commonMethods.tripOperatingCarrier(
      segmentData.flights,
    );
    const marketingCarriers = commonMethods.tripMarketingCarrier(
      segmentData.flights,
    );
    const carrierName = commonMethods.findCarrierName(segmentData.airlines);
    return (
      <>
        <View key={index} style={[commonStyles.ticketContainer_1]}>
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

          {/* City names */}
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

          {/* Flight time section */}
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
            <CustomButton
              label={appConstants.select}
              labelStyle={commonStyles.buttonTextStyle}
              gradientStyle={commonStyles.selectButtonGradientStyle}
              customButtonStyle={commonStyles.selectButtonGradientStyle}
              onPress={() => {
                handleTicketSelectorModal(item, segmentData, index);
                dispatch(clearCheckout());
              }}
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
                  <View key={elId} style={commonStyles.flightStationContainer}>
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
                        segmentData.airlines?.map((air: any, airIndex: any) => {
                          return (
                            <Text
                              key={airIndex}
                              style={commonStyles.flightTextStyle}>
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
                    {segmentData.arrivalAirportName?.name}
                  </Text>
                </View>
              </View>
            </>
          )}
          <View
            style={[commonStyles.roundView, commonStyles.subRoundViewStyle]}
          />
          <View style={commonStyles.roundView} />
          <Image
            style={commonStyles.lineStyle}
            source={Icons.TICKETBOTTOM_LINE}
          />
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
      {filterFlightData.length > 0 ? (
        <FlatList
          keyExtractor={(_item, index) => `${index}`}
          data={filterFlightData}
          renderItem={renderItems}
        />
      ) : (
        <View style={styles.noDataFoundStyle}>
          <Text style={styles.noDataTextStyle}>{appConstants.noDataFound}</Text>
        </View>
      )}

      {/* oneway ticket selector modal on select button */}
      {isTicketSelectorModal && (
        <CustomTicketSelectorModal
          indexs={modalIndex}
          segmentData={modalSegment}
          item={selectItem}
          setIsTicketSelectorModal={setIsTicketSelectorModal}
          oneWayData={oneWayData}
          cabinClass={cabinClass}
          trip={trip}
          adultCount={adultCount}
          childCount={childCount}
          infantCount={infantCount}
        />
      )}
    </>
  );
};

export default OneWayTripData;
