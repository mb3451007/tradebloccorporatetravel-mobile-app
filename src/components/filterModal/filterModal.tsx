/* eslint-disable prettier/prettier */
import React, {useState, memo} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  GestureResponderEvent,
  Image,
} from 'react-native';
import styles from './styles';
import CustomHeader from '../customHeader/customHeader';
import {Icons} from '@src/assets';
import appConstants from '@src/constants/appConstants';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@src/constants/colors';
import CustomMulitipleSelector from '../customMultipleSelector/customMultipleSelector';
import CustomPanHandler from '../customPanHandler/customPanHandler';
import MultipleSelectorHeader from '../customMultipleSelector/multipleSelectorHeader';
import commonStyles from '@src/utility/commonStyles';
import {useDispatch} from 'react-redux';
import commonMethods from '@src/utility/commonMethods';
import {
  oneWayAirportFilter,
  oneWayLocationsFilter,
  oneWayStopsFilter,
} from '@src/screens/flight/slice/oneWayFlightSlice';
import {
  roundTripAirportFilter,
  roundTripLocationsFilter,
  roundTripStopsFilter,
} from '@src/screens/flight/slice/roundTripFlightSlice';

interface FilterModalProps {
  setShowFilterModal: any;
  trip: any;
  clearAllFilter: any;
  flightData?: any;
  roundTripData?: any;
  stopsFilterData: any;
  airlineFilterData: any;
  locationsFilterData: any;
  onApplyClicked: (event: GestureResponderEvent) => void;
  price: Function;
  duration: Function;
  departureTime: any;
  arrivalTime: any;
  isIncludeAllAirline: any;
  setIsIncludeAllAirline: any;
  isIncludeAllLocation: any;
  setIsIncludeAllLocation: any;
  panHandlerPriceValue: any;
  setPanHandlerPriceValue: any;
  panHandlerDurationValue: any;
  setPanHandlerDurationValue: any;
  panHandlerDepTime: any;
  setPanHandlerDepTime: any;
  panHandlerArrTime: any;
  setPanHandlerArrTime: any;
  panHandlerOutBoundDepTime?: any;
  setPanHandlerOutBoundDepTime?: any;
  pandHandlerOutBoundArrTime?: any;
  setPanHandlerOutBoundArrTime?: any;
  inBoundDepTimeValue?: any;
  inBoundArrivalTimeValue?: any;
  outBoundDepTimeValue?: any;
  outBoundArrTimeValue?: any;
  bounds?: any;
  setBounds?: any;
}
// create a component
const FilterModal = (props: FilterModalProps) => {
  const dispatch = useDispatch();

  const {
    setShowFilterModal,
    trip,
    clearAllFilter,
    flightData,
    stopsFilterData,
    airlineFilterData,
    locationsFilterData,
    price,
    duration,
    onApplyClicked,
    isIncludeAllAirline,
    setIsIncludeAllAirline,
    isIncludeAllLocation,
    setIsIncludeAllLocation,
    panHandlerPriceValue,
    setPanHandlerPriceValue,
    panHandlerDurationValue,
    setPanHandlerDurationValue,
    panHandlerDepTime,
    setPanHandlerDepTime,
    departureTime,
    panHandlerArrTime,
    setPanHandlerArrTime,
    arrivalTime,
    panHandlerOutBoundDepTime,
    setPanHandlerOutBoundDepTime,
    pandHandlerOutBoundArrTime,
    setPanHandlerOutBoundArrTime,
    inBoundDepTimeValue,
    inBoundArrivalTimeValue,
    outBoundDepTimeValue,
    outBoundArrTimeValue,
    bounds,
    setBounds,
  } = props;

  // const [location, setLocation]: any = useState([]);
  const [priceFilter, setPriceFilter]: any = useState(true);
  const [timeFilter, setTimeFilter]: any = useState(true);
  const [durationFilter, setDurationFilter]: any = useState(true);
  const {minPrice, maxPrice, maxDuration, minDuration} = flightData.data;
  const time_12am = 0;
  const time_1159pm = 2359;
  // Method to handle airport filter data
  const handleAirportData = (result: any) => {
    if (trip === 1) {
      dispatch(oneWayAirportFilter(result));
    }
    if (trip === 2) {
      dispatch(roundTripAirportFilter(result));
    }
  };

  // Method to handle locations filter data
  const handleLocationsData = (result: any) => {
    if (trip === 1) {
      dispatch(oneWayLocationsFilter(result));
    }
    if (trip === 2) {
      dispatch(roundTripLocationsFilter(result));
    }
  };

  // Method to handle stops filter data
  const handleStopsData = (result: any) => {
    if (trip === 1) {
      dispatch(oneWayStopsFilter(result));
    }
    if (trip === 2) {
      dispatch(roundTripStopsFilter(result));
    }
  };

  // Method to handle maximum and minimum  price
  const handleMaxMinPrice = (maxMinValues: any) => {
    if (trip === 1) {
      price(maxMinValues);
    }
    if (trip === 2) {
      price(maxMinValues);
    }
  };

  //Method to handle duration time
  const handleMaxMinDuration = (maxMinValues: any) => {
    if (trip === 1) {
      duration(maxMinValues);
    }
    if (trip === 2) {
      duration(maxMinValues);
    }
  };

  //Method to handle departure bound time
  const handleDepartureBoundTime = (maxMinValues: any) => {
    if (trip === 1) {
      const data = maxMinValues.map((num: any) => {
        if (num < 100) {
          return `00${num}`;
        } else if (num < 1000 && num > 99) {
          return `0${num}`;
        } else if (num < 10) {
          return `000${num}`;
        } else if (num === 0) {
          return `000${num}`;
        } else {
          return `${num}`;
        }
      });

      departureTime(data);
    }
    if (trip === 2) {
      const roundTripData = maxMinValues.map((num: any) => {
        if (num < 100) {
          return `00${num}`;
        } else if (num < 1000 && num > 99) {
          return `0${num}`;
        } else if (num < 10) {
          return `000${num}`;
        } else if (num === 0) {
          return `000${num}`;
        } else {
          return `${num}`;
        }
      });

      inBoundDepTimeValue(roundTripData);
    }
  };

  // Mehtod to handle Arrival bound time..
  const handleArrivalBoundTime = (maxMinValues: any) => {
    if (trip === 1) {
      const data = maxMinValues.map((num: any) => {
        if (num < 100) {
          return `00${num}`;
        } else if (num < 1000 && num > 99) {
          return `0${num}`;
        } else if (num < 10) {
          return `000${num}`;
        } else if (num === 0) {
          return `000${num}`;
        } else {
          return `${num}`;
        }
      });
      arrivalTime(data);
    }
    if (trip === 2) {
      const roundTripData = maxMinValues.map((num: any) => {
        if (num < 100) {
          return `00${num}`;
        } else if (num < 1000 && num > 99) {
          return `0${num}`;
        } else if (num < 10) {
          return `000${num}`;
        } else if (num === 0) {
          return `000${num}`;
        } else {
          return `${num}`;
        }
      });
      inBoundArrivalTimeValue(roundTripData);
    }
  };

  // Round Trip Out Bound Departure
  const handleOutBoundDeparture = (maxMinValues: any) => {
    const data = maxMinValues.map((num: any) => {
      if (num < 100) {
        return `00${num}`;
      } else if (num < 1000 && num > 99) {
        return `0${num}`;
      } else if (num < 10) {
        return `000${num}`;
      } else if (num === 0) {
        return `000${num}`;
      } else {
        return `${num}`;
      }
    });
    outBoundDepTimeValue(data);
  };

  // Round Trip out bound arrival time
  const handleOutBoundArrival = (maxMinValues: any) => {
    const data = maxMinValues.map((num: any) => {
      if (num < 100) {
        return `00${num}`;
      } else if (num < 1000 && num > 99) {
        return `0${num}`;
      } else if (num < 10) {
        return `000${num}`;
      } else if (num === 0) {
        return `000${num}`;
      } else {
        return `${num}`;
      }
    });
    outBoundArrTimeValue(data);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={styles.modalContainer}>
      <View style={styles.filterButtonContainerStyle}>
        <CustomHeader
          leftIcon={Icons.FILTERBACK_ICON}
          leftIconStyle={styles.headerLeftIconStyle}
          lefticonOnPress={() => setShowFilterModal(false)}
          headerLabel={appConstants.filter}
          headerLabelStyle={styles.headerLabelStyle}
          rightIcon={Icons.CLEARALL_ICON}
          rightIconOnPress={clearAllFilter}
        />
        <View style={styles.selectionButtonContainer}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.selectionButtonGradientStyle}
            colors={[colors.color_0094E6, colors.color_43BCFF]}>
            <TouchableOpacity
              style={styles.selectionButtonStyle}
              onPress={onApplyClicked}>
              <Text style={styles.selectionButtonTextStyle}>
                {appConstants.apply}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      <ScrollView style={styles.filterContainer}>
        <CustomMulitipleSelector
          header={appConstants.stops}
          setMockData={handleStopsData}
          mockData={stopsFilterData}
          stop={true}
        />
        <CustomMulitipleSelector
          header={appConstants.airline}
          setMockData={handleAirportData}
          mockData={airlineFilterData}
          include={true}
          isIncludeAll={isIncludeAllAirline}
          setIsIncludeAll={setIsIncludeAllAirline}
        />
        <CustomMulitipleSelector
          header={appConstants.locations}
          setMockData={handleLocationsData}
          mockData={locationsFilterData}
          include={true}
          isIncludeAll={isIncludeAllLocation}
          setIsIncludeAll={setIsIncludeAllLocation}
        />
        <View style={priceFilter && commonStyles.filterHeaderContainerStyle}>
          <MultipleSelectorHeader
            header={appConstants.price}
            content={priceFilter}
            onPress={() => setPriceFilter(!priceFilter)}
          />
          {priceFilter && (
            <CustomPanHandler
              panHandlerValue={panHandlerPriceValue}
              setPanHandlerValue={setPanHandlerPriceValue}
              min={minPrice}
              max={maxPrice}
              handleMaxMin={handleMaxMinPrice}
              subText_1={`$${minPrice}`}
              subText_2={`$${maxPrice}`}
            />
          )}
        </View>

        <View style={timeFilter && commonStyles.filterHeaderContainerStyle}>
          <MultipleSelectorHeader
            header={appConstants.time}
            content={timeFilter}
            onPress={() => setTimeFilter(!timeFilter)}
          />
          {timeFilter && trip === 1 && (
            <View style={styles.boundContainerStyle}>
              <CustomPanHandler
                customPanHeaderTextStyle={styles.customPanHeaderTextStyle}
                panHeader={appConstants.departure}
                subText_1={appConstants.am_12}
                subText_2={appConstants.pm_11_59}
                panHandlerValue={panHandlerDepTime}
                setPanHandlerValue={setPanHandlerDepTime}
                min={0}
                max={2359}
                handleMaxMin={handleDepartureBoundTime}
                oneWayBound={true}
              />
              <CustomPanHandler
                customPanHeaderTextStyle={styles.customPanHeaderTextStyle}
                panHeader={appConstants.arrival}
                subText_1={appConstants.am_12}
                subText_2={appConstants.pm_11_59}
                min={time_12am}
                max={time_1159pm}
                panHandlerValue={panHandlerArrTime}
                setPanHandlerValue={setPanHandlerArrTime}
                oneWayBound={true}
                handleMaxMin={handleArrivalBoundTime}
              />
            </View>
          )}

          {timeFilter && trip === 2 && (
            <>
              <View style={styles.outInBoundContainerStyle}>
                <TouchableOpacity
                  onPress={() => setBounds(true)}
                  activeOpacity={appConstants.activeOpacity}
                  style={
                    bounds ? styles.activeBoundStyle : styles.inActiveBoundStyle
                  }>
                  <Text
                    style={[
                      styles.boundTextStyle,
                      {color: !bounds ? colors.color_A18D8D : colors.color_fff},
                    ]}>
                    {appConstants.inBound}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setBounds(false)}
                  activeOpacity={appConstants.activeOpacity}
                  style={
                    !bounds
                      ? styles.activeBoundStyle
                      : styles.inActiveBoundStyle
                  }>
                  <Text
                    style={[
                      styles.boundTextStyle,
                      {color: bounds ? colors.color_A18D8D : colors.color_fff},
                    ]}>
                    {appConstants.outBound}
                  </Text>
                </TouchableOpacity>
              </View>
              <Image source={Icons.TIME_BOUNDLINE} />
              {bounds ? (
                <View style={styles.boundContainerStyle}>
                  <CustomPanHandler
                    customPanHeaderTextStyle={styles.customPanHeaderTextStyle}
                    panHeader={appConstants.departure}
                    subText_1={appConstants.am_12}
                    subText_2={appConstants.pm_11_59}
                    panHandlerValue={panHandlerDepTime}
                    setPanHandlerValue={setPanHandlerDepTime}
                    min={0}
                    max={2359}
                    handleMaxMin={handleDepartureBoundTime}
                    oneWayBound={true}
                  />
                  <CustomPanHandler
                    customPanHeaderTextStyle={styles.customPanHeaderTextStyle}
                    panHeader={appConstants.arrival}
                    subText_1={appConstants.am_12}
                    subText_2={appConstants.pm_11_59}
                    min={time_12am}
                    max={time_1159pm}
                    panHandlerValue={panHandlerArrTime}
                    setPanHandlerValue={setPanHandlerArrTime}
                    oneWayBound={true}
                    handleMaxMin={handleArrivalBoundTime}
                  />
                </View>
              ) : (
                <View style={styles.boundContainerStyle}>
                  <CustomPanHandler
                    customPanHeaderTextStyle={styles.customPanHeaderTextStyle}
                    panHeader={appConstants.departure}
                    subText_1={appConstants.am_12}
                    subText_2={appConstants.pm_11_59}
                    panHandlerValue={panHandlerOutBoundDepTime}
                    setPanHandlerValue={setPanHandlerOutBoundDepTime}
                    min={0}
                    max={2359}
                    handleMaxMin={handleOutBoundDeparture}
                    oneWayBound={true}
                  />
                  <CustomPanHandler
                    customPanHeaderTextStyle={styles.customPanHeaderTextStyle}
                    panHeader={appConstants.arrival}
                    subText_1={appConstants.am_12}
                    subText_2={appConstants.pm_11_59}
                    min={time_12am}
                    max={time_1159pm}
                    panHandlerValue={pandHandlerOutBoundArrTime}
                    setPanHandlerValue={setPanHandlerOutBoundArrTime}
                    oneWayBound={true}
                    handleMaxMin={handleOutBoundArrival}
                  />
                </View>
              )}
            </>
          )}
        </View>

        <View style={durationFilter && commonStyles.filterHeaderContainerStyle}>
          <MultipleSelectorHeader
            header={appConstants.duration}
            content={durationFilter}
            onPress={() => setDurationFilter(!durationFilter)}
          />
          {durationFilter && (
            <CustomPanHandler
              min={minDuration}
              max={maxDuration}
              dur={true}
              panHandlerValue={panHandlerDurationValue}
              setPanHandlerValue={setPanHandlerDurationValue}
              handleMaxMin={handleMaxMinDuration}
              subText_1={`${commonMethods.getDuration(minDuration)}`}
              subText_2={`${commonMethods.getDuration(maxDuration)}`}
            />
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default memo(FilterModal);
