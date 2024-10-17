/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {Icons, Images} from '@src/assets';
import commonStyles from '@src/utility/commonStyles';
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import CustomHeader from '@src/components/customHeader/customHeader';
import appConstants from '@src/constants/appConstants';
import OneWayTripData from '@src/components/oneWayTripData/oneWayTripData';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import moment from 'moment';
import colors from '@src/constants/colors';
import RoundTripData from '@src/components/roundTripData/roundTripData';
import {back} from '@src/navigation/navigationMethods';
import FilterModal from '@src/components/filterModal/filterModal';
import {buttons} from '@src/utility/enums/staticEnums';
import LinearGradient from 'react-native-linear-gradient';
import filterModal from '@src/components/filterModal/filterModal';
import commonMethods from '@src/utility/commonMethods';
import {useNavigation} from '@react-navigation/native';
import {
  ImageBackground,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import {
  clearFilter,
  currentFilter,
  currentSorting,
} from '@src/redux/appSlice/appSlice';
import {
  oneWayAirportFilter,
  oneWayLocationsFilter,
  oneWayStopsFilter,
} from '../flight/slice/oneWayFlightSlice';
import {
  roundTripAirportFilter,
  roundTripLocationsFilter,
  roundTripStopsFilter,
} from '../flight/slice/roundTripFlightSlice';

const FlightSearch = (props: any) => {
  const navigation = useNavigation();
  const oneWayTrip = props?.route?.params?.radio;
  const fromLocation = props?.route?.params?.fromLocation;
  const tooLocation = props?.route?.params?.toLocation;
  const origin = props?.route?.params?.origin;
  const destination = props?.route?.params?.destination;
  const oneWayDepDate = props?.route?.params?.oneWaydepartureDate;
  const roundTripDepDate = props?.route?.params?.roundTripDepDate;
  const cabinClasses = props?.route?.params?.cabinItems;
  const adult_count = props?.route?.params?.adult;
  const child_count = props?.route?.params?.children;
  const infant_count = props?.route?.params?.infants;

  const dispatch = useDispatch();
  const time_12am = 0;
  const time_1159pm = 2359;
  const [isTicketSelectorModal, setIsTicketSelectorModal] =
    useState<any>(false);

  // fetching one way flight data.
  const oneWayFlightData = useSelector(
    (state: RootState) => state?.onewayFlightSearch.searchedData,
  );

  // fetching the round trip data.
  const roundTripFlightData = useSelector(
    (state: RootState) => state?.roundTripFlightSearch?.searchedRoundTripData,
  );
  const {minPrice, maxPrice, maxDuration, minDuration} =
    oneWayTrip === 1 ? oneWayFlightData?.data : roundTripFlightData?.data;

  // Fetching the filter values.
  const filterValue = useSelector((state: RootState) => state.app.sorting);
  const filtersState = useSelector(
    (state: RootState) => state.onewayFlightSearch,
  );
  const roundTripFilterState = useSelector(
    (state: RootState) => state.roundTripFlightSearch,
  );

  // One Way states...
  const [isIncludeAllAirline, setIsIncludeAllAirline]: any = useState(true);
  const [isIncludeAllLocation, setIsIncludeAllLocation]: any = useState(true);
  const [panHandlerPriceValue, setPanHandlerPriceValue]: any = useState({
    values: [minPrice, maxPrice],
  });
  const [panHandlerDurationValue, setPanHandlerDurationValue]: any = useState({
    values: [minDuration, maxDuration],
  });
  const [panHandlerDepTime, setPanHandlerDepTime]: any = useState({
    values: [time_12am, time_1159pm],
  });
  const [panHandlerArrTime, setPanHandlerArrTime] = useState({
    values: [time_12am, time_1159pm],
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectButton, setSelectButton] = useState(filterValue);
  const [price, setPrice] = useState([]);
  const [duration, setDuration] = useState([]);
  const [depTime, setDeptime] = useState([]);
  const [arrivalTime, setArrivalTime] = useState([]);

  // Round Trip states
  const [isRoundTripIncludeAllLocation, setIsRoundTripIncludeAllLocation]: any =
    useState(true);
  const [isRoundTripIncludeAllAirline, setIsRoundTripIncludeAllAirline]: any =
    useState(true);
  const [panHandlerRoundTripPriceValue, setPanHandlerRoundTripPriceValue]: any =
    useState({values: [minPrice, maxPrice]});
  const [
    panHandlerRoundTripDurationValue,
    setPanHandlerRoundTripDurationValue,
  ]: any = useState({values: [minDuration, maxDuration]});
  const [inBoundDepartureTime, setInBoundDepartureTime]: any = useState({
    values: [time_12am, time_1159pm],
  });
  const [inBoundArrivalTime, setInboundArrivalTime] = useState({
    values: [time_12am, time_1159pm],
  });
  const [outBoundDepartureTime, setOutBoundDepartureTime]: any = useState({
    values: [time_12am, time_1159pm],
  });
  const [outBoundArrivalTime, setOutboundArrivalTime] = useState({
    values: [time_12am, time_1159pm],
  });
  const [roundTripPrice, setRoundTripPrice] = useState([]);
  const [roundTripDuration, setRoundTripDuration] = useState([]);
  const [inBoundDepTimeValue, setInBoundDepTimeValue] = useState([]);
  const [inBoundArrivalTimeValue, setInBoundArrivalTimeValue] = useState([]);
  const [outBoundDepTimeValue, setOutBoundDepTimeValue] = useState([]);
  const [outBoundArrTimeValue, setOutBoundArrTimeValue] = useState([]);
  const [bounds, setBounds] = useState(true);

  // hoook for back press
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackHandlerPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackHandlerPress);
  }, []);

  // Hook for on focus state change
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsTicketSelectorModal(false);
    });
    return unsubscribe;
  }, [navigation]);

  // Handle one way Trips Filter from Api
  useEffect(() => {
    if (oneWayTrip === 1) {
      // Getting airport filter
      const carriers = oneWayFlightData?.data?.carriers;
      const locations = oneWayFlightData?.data?.locations;
      const itineraries = oneWayFlightData?.data?.itineraries;
      const segments = oneWayFlightData?.data?.segments.flat();

      let data: any = [
        {
          key: 0,
          value: appConstants.nonStop,
          open: true,
        },
      ];

      const airportData = Object.keys(carriers).map(item => {
        const resp = carriers[item];
        return {
          key: resp.id,
          value: resp.name,
          open: false,
        };
      });
      dispatch(oneWayAirportFilter(airportData));

      // Getting locations filter
      const locationsData = Object.keys(locations).map(item => {
        const result = locations[item];
        return {
          key: result.code,
          value: result.name,
          open: false,
        };
      });
      dispatch(oneWayLocationsFilter(locationsData));

      // Getting Filter Stops
      itineraries.forEach((item: any) => {
        const findedSegment = commonMethods.findSegments(item, segments);
        const stop = commonMethods.isStop(findedSegment);
        if (
          stop > 0 &&
          !data.find((el: any) => {
            return el.key === stop;
          })
        ) {
          const stops = {
            key: stop,
            value: `Stop ${stop}`,
            open: true,
          };
          data.push(stops);
        }
      });

      dispatch(oneWayStopsFilter(data));
      // dispatch(oneWayPriceFilter({min:minPricevalue,max:maxPriceValue}));
    }
  }, []);

  // Handle Round Trip filter from Api
  useEffect(() => {
    if (oneWayTrip === 2) {
      const carriers = roundTripFlightData?.data.carriers;
      const locations = roundTripFlightData?.data.locations;
      const itineraries = roundTripFlightData?.data.itineraries;
      const segments = roundTripFlightData?.data.segments;

      let data: any = [
        {
          key: 0,
          value: appConstants.nonStop,
          open: true,
        },
      ];

      // Getting Filter Stops
      itineraries.forEach((item: any) => {
        const [firstSegId] = item?.segments;
        const [segFirst] = segments;
        const findedSegmentOne = commonMethods.findRoundTripSegments(
          firstSegId,
          segFirst,
        );
        const stop = commonMethods.isStop(findedSegmentOne);
        if (
          stop > 0 &&
          !data.find((el: any) => {
            return el.key === stop;
          })
        ) {
          const stops = {
            key: stop,
            value: `Stop ${stop}`,
            open: true,
          };
          data.push(stops);
        }
      });
      dispatch(roundTripStopsFilter(data));

      const airportData = Object.keys(carriers).map(item => {
        const resp = carriers[item];
        return {
          key: resp.id,
          value: resp.name,
          open: false,
        };
      });
      dispatch(roundTripAirportFilter(airportData));

      // Getting locations filter
      const locationsData = Object.keys(locations).map(item => {
        const result = locations[item];
        return {
          key: result.code,
          value: result.name,
          open: false,
        };
      });
      dispatch(roundTripLocationsFilter(locationsData));
    }
  }, []);

  // method for back button
  const onBackHandlerPress = () => {
    dispatch(currentSorting(appConstants.cheapest));
    dispatch(clearFilter());
    back();
    return true;
  };

  // Method to handle the filter modal for one way and trip flights.
  const handleFilterModal = useCallback(() => {
    if (oneWayTrip === 1) {
      dispatch(clearFilter());
      setShowFilterModal(true);
    } else {
      dispatch(clearFilter());
      setShowFilterModal(true);
    }
  }, [filterModal]);

  // Method to handle the filter Apply button for round trip and one way trip flights.
  const onFilterApply = () => {
    if (oneWayTrip === 1) {
      const data = {
        stops: filtersState.oneWayStopsFilter,
        carriers: filtersState.oneWayAirportFilter,
        filter: true,
        locations: filtersState.oneWayLocationsFilter,
        price: {
          min: price[0],
          max: price[1],
        },
        duration: {
          min: duration[0],
          max: duration[1],
        },
        oneWayDepartureTime: {
          min: depTime[0],
          max: depTime[1],
        },
        oneWayArrivalTime: {
          min: arrivalTime[0],
          max: arrivalTime[1],
        },
        inBoundDepartureTime: {
          min: 0,
          max: 0,
        },
        inBoundArrivalTime: {
          min: 0,
          max: 0,
        },
        outBoundDepartureTime: {
          min: 0,
          max: 0,
        },
        outBoundArrivalTime: {
          min: 0,
          max: 0,
        },
      };
      dispatch(currentFilter(data));
    }
    if (oneWayTrip === 2) {
      const data = {
        stops: roundTripFilterState.roundTripStopsFilter,
        carriers: roundTripFilterState.roundTripAirportFilter,
        filter: true,
        locations: roundTripFilterState.roundTripLocationsFilter,
        price: {
          min: roundTripPrice[0],
          max: roundTripPrice[1],
        },
        duration: {
          min: roundTripDuration[0],
          max: roundTripDuration[1],
        },
        oneWayDepartureTime: {
          min: 0,
          max: 0,
        },
        oneWayArrivalTime: {
          min: 0,
          max: 0,
        },
        inBoundDepartureTime: {
          min: inBoundDepTimeValue[0],
          max: inBoundDepTimeValue[1],
        },
        inBoundArrivalTime: {
          min: inBoundArrivalTimeValue[0],
          max: inBoundArrivalTimeValue[1],
        },
        outBoundDepartureTime: {
          min: outBoundDepTimeValue[0],
          max: outBoundDepTimeValue[1],
        },
        outBoundArrivalTime: {
          min: outBoundArrTimeValue[0],
          max: outBoundArrTimeValue[1],
        },
      };
      dispatch(currentFilter(data));
    }
    setShowFilterModal(false);
  };

  // Method to handle clear all filter for round trip and one way trip flights
  const handleClearAllFilter = () => {
    // Clear All For One Way Flights
    if (oneWayTrip === 1) {
      const itineraries = oneWayFlightData?.data?.itineraries;
      const segments = oneWayFlightData?.data?.segments.flat();
      const carriers = oneWayFlightData?.data?.carriers;
      const locations = oneWayFlightData?.data?.locations;

      dispatch(clearFilter());
      setIsIncludeAllAirline(true);
      setIsIncludeAllLocation(true);
      let data: any = [
        {
          key: 0,
          value: appConstants.nonStop,
          open: true,
        },
      ];

      // Getting Filter Stops
      itineraries.forEach((item: any) => {
        const findedSegment = commonMethods.findSegments(item, segments);
        const stop = commonMethods.isStop(findedSegment);
        if (
          stop > 0 &&
          !data.find((el: any) => {
            return el.key === stop;
          })
        ) {
          const stops = {
            key: stop,
            value: `Stop ${stop}`,
            open: true,
          };
          data.push(stops);
        }
      });
      dispatch(oneWayStopsFilter(data));

      const airportData = Object.keys(carriers).map(item => {
        const resp = carriers[item];
        return {
          key: resp.id,
          value: resp.name,
          open: false,
        };
      });
      dispatch(oneWayAirportFilter(airportData));
      // Getting locations filter
      const locationsData = Object.keys(locations).map(item => {
        const result = locations[item];
        return {
          key: result.code,
          value: result.name,
          open: false,
        };
      });
      dispatch(oneWayLocationsFilter(locationsData));
      setPrice([]);
      setDuration([]);
      setDeptime([]);
      setArrivalTime([]);
      setPanHandlerArrTime({values: [time_12am, time_1159pm]});
      setPanHandlerDepTime({values: [time_12am, time_1159pm]});
      setPanHandlerPriceValue({values: [minPrice, maxPrice]});
      setPanHandlerDepTime({values: [time_12am, time_1159pm]});
      setPanHandlerArrTime({values: [time_12am, time_1159pm]});
      setPanHandlerDurationValue({values: [minDuration, maxDuration]});
    }

    // Clear All filter of round Trip
    if (oneWayTrip === 2) {
      dispatch(clearFilter());
      const carriers = roundTripFlightData?.data.carriers;
      const locations = roundTripFlightData?.data.locations;
      const itineraries = roundTripFlightData?.data.itineraries;
      const segments = roundTripFlightData?.data.segments;

      let data: any = [
        {
          key: 0,
          value: appConstants.nonStop,
          open: true,
        },
      ];

      // Getting All false value of stops
      itineraries.forEach((item: any) => {
        const [firstSegId] = item?.segments;
        const [segFirst] = segments;
        const findedSegmentOne = commonMethods.findRoundTripSegments(
          firstSegId,
          segFirst,
        );
        const stop = commonMethods.isStop(findedSegmentOne);
        if (
          stop > 0 &&
          !data.find((el: any) => {
            return el.key === stop;
          })
        ) {
          const stops = {
            key: stop,
            value: `Stop ${stop}`,
            open: true,
          };
          data.push(stops);
        }
      });
      dispatch(roundTripStopsFilter(data));

      // Getting all false for airline clear all
      const airportData = Object.keys(carriers).map(item => {
        const resp = carriers[item];
        return {
          key: resp.id,
          value: resp.name,
          open: false,
        };
      });
      dispatch(roundTripAirportFilter(airportData));

      // Getting locations false value for location clear All
      const locationsData = Object.keys(locations).map(item => {
        const result = locations[item];
        return {
          key: result.code,
          value: result.name,
          open: false,
        };
      });
      dispatch(roundTripLocationsFilter(locationsData));
      setIsRoundTripIncludeAllLocation(true);
      setIsRoundTripIncludeAllAirline(true);
      setPanHandlerRoundTripPriceValue({values: [minPrice, maxPrice]});
      setPanHandlerRoundTripDurationValue({values: [minDuration, maxDuration]});
      setInBoundDepartureTime({values: [time_12am, time_1159pm]});
      setInboundArrivalTime({values: [time_12am, time_1159pm]});
      setOutboundArrivalTime({values: [time_12am, time_1159pm]});
      setOutBoundDepartureTime({values: [time_12am, time_1159pm]});
      setInBoundArrivalTimeValue([]);
      setInBoundDepTimeValue([]);
      setOutBoundArrTimeValue([]);
      setOutBoundDepTimeValue([]);
      setRoundTripPrice([]);
      setRoundTripDuration([]);
    }
  };

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={
          !isTicketSelectorModal
            ? colors.color_0094E6
            : colors.color_rgba50_50_50_09
        }
      />

      <Image
        style={[
          styles.flightBackground,
          Platform.OS === 'ios' && styles.iosPlatformFlightBackground,
        ]}
        source={Images.APP_FLIGHT_SEARCHBG}
      />
      <View style={styles.flightBackgroundContent}>
        <CustomHeader
          leftIcon={Icons.BACK_LOGO}
          headerLabel={appConstants.selectFlights}
          leftIconStyle={styles.headerLeftIconStyle}
          headerLabelStyle={styles.headerLabelStyle}
          lefticonOnPress={onBackHandlerPress}
        />
        <View style={styles.headerDashedLineContainer}>
          <ImageBackground
            style={styles.brownPlaneBgStyle}
            source={Icons.BROWNPLANE_BG}>
            <Image
              style={styles.brownPlaneStyle}
              source={Icons.BROWNPLANE_LOGO}
            />
          </ImageBackground>
          <Image
            style={styles.headerDashedLineStyle}
            source={Icons.HEADERDASHEDLINE}
          />
        </View>
        <View style={styles.headerLocationsLabelContainer}>
          <Text style={styles.locationLabelsStyle}>{fromLocation}</Text>
          <Text style={styles.locationLabelsStyle}>{tooLocation}</Text>
        </View>
        <View style={styles.headerCodesLabelContainer}>
          <Text style={styles.headerCodesStyle}>{origin}</Text>
          <Text style={[styles.headerCodesStyle, styles.customDateStyle]}>
            {oneWayDepDate
              ? moment(oneWayDepDate).format(appConstants.MMDDYYY)
              : moment(roundTripDepDate).format(appConstants.MMDDYYY)}
          </Text>
          <Text style={[styles.headerCodesStyle, styles.tooCodeTextStyle]}>
            {destination}
          </Text>
        </View>
      </View>
      {/* <FlightFilterBar /> */}
      <View style={styles.filterContainer}>
        {buttons.map(item => {
          return (
            <LinearGradient
              key={item.id}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.selectionButtonGradientStyle}
              colors={
                selectButton === item.title
                  ? [colors.color_0094E6, colors.color_43BCFF]
                  : [colors.color_fff, colors.color_fff]
              }>
              <TouchableOpacity
                style={[
                  styles.selectionButtonStyle,
                  selectButton !== item.title && styles.unSelectedButtonStyle,
                ]}
                onPress={() => {
                  if (oneWayTrip === 1) {
                    dispatch(currentSorting(item.title));
                    setSelectButton(item.title);
                  } else {
                    dispatch(currentSorting(item.title));
                    setSelectButton(item.title);
                  }
                }}
                key={item.id}>
                <Text
                  style={[
                    styles.selectionButtonTextStyle,
                    selectButton !== item.title && styles.unselectedButtonText,
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          );
        })}
        <TouchableOpacity
          onPress={handleFilterModal}
          style={styles.filterButton}>
          <Image source={Icons.FILTER_LOGO} />
          <Text style={styles.filterTextStyle}>{appConstants.filter}</Text>
          <Image style={styles.greenDotStyle} source={Icons.GREEN_DOT} />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          commonStyles.keyboardAwareStyle,
          styles.keyboardAwareCustomStyle,
        ]}>
        {/* component for tickets of one way and round trip */}
        {oneWayTrip === 1 ? (
          <OneWayTripData
            oneWayData={oneWayFlightData}
            cabinClass={cabinClasses}
            trip={oneWayTrip}
            isTicketSelectorModal={isTicketSelectorModal}
            setIsTicketSelectorModal={setIsTicketSelectorModal}
            adultCount={adult_count}
            childCount={child_count}
            infantCount={infant_count}
          />
        ) : (
          <RoundTripData
            roundTripData={roundTripFlightData}
            cabinClass={cabinClasses}
            adultCount={adult_count}
            childCount={child_count}
            infantCount={infant_count}
          />
        )}
      </KeyboardAwareScrollView>
      {/*filter Modal for one way trip */}
      {showFilterModal && oneWayTrip === 1 && (
        <FilterModal
          trip={1}
          clearAllFilter={handleClearAllFilter}
          flightData={oneWayFlightData}
          stopsFilterData={filtersState.oneWayStopsFilter}
          airlineFilterData={filtersState.oneWayAirportFilter}
          locationsFilterData={filtersState.oneWayLocationsFilter}
          setShowFilterModal={setShowFilterModal}
          onApplyClicked={onFilterApply}
          price={setPrice}
          duration={setDuration}
          departureTime={setDeptime}
          arrivalTime={setArrivalTime}
          isIncludeAllAirline={isIncludeAllAirline}
          setIsIncludeAllAirline={setIsIncludeAllAirline}
          setIsIncludeAllLocation={setIsIncludeAllLocation}
          isIncludeAllLocation={isIncludeAllLocation}
          panHandlerPriceValue={panHandlerPriceValue}
          setPanHandlerPriceValue={setPanHandlerPriceValue}
          panHandlerDurationValue={panHandlerDurationValue}
          setPanHandlerDurationValue={setPanHandlerDurationValue}
          panHandlerDepTime={panHandlerDepTime}
          setPanHandlerDepTime={setPanHandlerDepTime}
          panHandlerArrTime={panHandlerArrTime}
          setPanHandlerArrTime={setPanHandlerArrTime}
        />
      )}
      {/* Filter modal for round trip */}
      {showFilterModal && oneWayTrip === 2 && (
        <FilterModal
          trip={2}
          bounds={bounds}
          setBounds={setBounds}
          clearAllFilter={handleClearAllFilter}
          flightData={roundTripFlightData}
          stopsFilterData={roundTripFilterState.roundTripStopsFilter}
          airlineFilterData={roundTripFilterState.roundTripAirportFilter}
          locationsFilterData={roundTripFilterState.roundTripLocationsFilter}
          setShowFilterModal={setShowFilterModal}
          onApplyClicked={onFilterApply}
          price={setRoundTripPrice}
          duration={setRoundTripDuration}
          departureTime={setInBoundDepTimeValue}
          arrivalTime={setInBoundArrivalTimeValue}
          isIncludeAllAirline={isRoundTripIncludeAllAirline}
          setIsIncludeAllAirline={setIsRoundTripIncludeAllAirline}
          isIncludeAllLocation={isRoundTripIncludeAllLocation}
          setIsIncludeAllLocation={setIsRoundTripIncludeAllLocation}
          panHandlerPriceValue={panHandlerRoundTripPriceValue}
          setPanHandlerPriceValue={setPanHandlerRoundTripPriceValue}
          panHandlerDurationValue={panHandlerRoundTripDurationValue}
          setPanHandlerDurationValue={setPanHandlerRoundTripDurationValue}
          panHandlerDepTime={inBoundDepartureTime}
          setPanHandlerDepTime={setInBoundDepartureTime}
          panHandlerArrTime={inBoundArrivalTime}
          setPanHandlerArrTime={setInboundArrivalTime}
          panHandlerOutBoundDepTime={outBoundDepartureTime}
          setPanHandlerOutBoundDepTime={setOutBoundDepartureTime}
          pandHandlerOutBoundArrTime={outBoundArrivalTime}
          setPanHandlerOutBoundArrTime={setOutboundArrivalTime}
          inBoundDepTimeValue={setInBoundDepTimeValue}
          inBoundArrivalTimeValue={setInBoundArrivalTimeValue}
          outBoundDepTimeValue={setOutBoundDepTimeValue}
          outBoundArrTimeValue={setOutBoundArrTimeValue}
        />
      )}
    </>
  );
};

export default FlightSearch;
