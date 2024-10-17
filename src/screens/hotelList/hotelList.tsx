/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useState} from 'react';
import {Icons} from '@src/assets';
import CustomHeader from '@src/components/customHeader/customHeader';
import {Image, Text, View} from 'react-native';
import {back} from '@src/navigation/navigationMethods';

import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import CustomHotelList from '@src/components/customHotelList/customHotelList';
import appConstants, {
  errorMessage,
  statusCode,
} from '@src/constants/appConstants';
import CustomButton from '@src/components/customButton/customButton';
import HotelFilterModal from '@src/components/filterModalForHotel/HotelFilterModal';
import {
  byAreaEnum,
  facilitiesEnum,
  hotelCategoryEnum,
  mealPlanEnum,
} from '@src/utility/enums/staticEnums';
import moment from 'moment';
import {clearHotel, fetchHotels} from '../hotel/slice/hotelSlice';
import {RootState} from '@src/redux/store';
import customHooks from '@src/utility/customHooks';
import CustomModal from '@src/components/customModal/customModal';
import {navigate} from '@src/navigation/navigationMethods';
import navigationConstants from '@src/constants/navigationConstants';
import {clearroomRatesData, fetchroomRates} from './slice/hotelListSlice';
import {
  clearhotelDetailsData,
  fetchhotelDetails,
  hotelListData,
} from './slice/hotelDetailsSlice';
import {clearroomReserveData} from '../hotelRating/slice/hotelRoomReserveSlice';
import CustomLoader from '@src/components/customLoader/customLoader';
import colors from '@src/constants/colors';

const HotelList = (props: any) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchedHotelData: any = useSelector(
    (state: RootState) => state?.hotelSearch?.hotelDataToNav,
  );

  console.log(fetchedHotelData, 'fetchedHotelData');

  const [filteredObject, setFilteredObject] = useState({
    chainCode: '',
    cityCode: fetchedHotelData?.origin,
    contents: [6, 19, 22, 15, 23],
    currency: 'USD',
    // dateEnd: moment(startDate).format(appConstants.YYYYMD),
    // dateStart: moment(endDate).format(appConstants.YYYYMD),
    dateStart: moment(fetchedHotelData?.startDate).format(appConstants.YYYYMD),
    dateEnd: moment(fetchedHotelData?.endDate).format(appConstants.YYYYMD),
    filters: {},
    hotelCode: '',
    hotelContext: '',
    hotelName: '',
    rooms:
      fetchedHotelData?.rooms === undefined
        ? [{adults: 1, children: 0, childrenAge: 7}]
        : fetchedHotelData?.rooms,
  });
  const [showHotelFilterModal, setShowHotelFilterModal] = useState(false);

  const handleOnBackIconPress = () => {
    back();
    dispatch(clearHotel());
    dispatch(clearroomRatesData());
    dispatch(clearhotelDetailsData());
    // navigate.goBack();
    // setTimeout(() => {
    //   dispatch(clearHotel());
    // }, 400);
  };
  const handleOnSubmit = () => {
    setHotelcodedata('');
    setShowHotelFilterModal(true);
  };

  const [selectedPropertyValue, setSelectedPropertyValue] = useState('');

  const handlePlaceSelected = useCallback((data: any) => {
    console.log(data, 'filterhoteldata');
    if (data?.structured_formatting?.main_text !== '') {
      setSelectedPropertyValue(data?.structured_formatting?.main_text);
      setFilteredObject(prevState => ({
        ...prevState,
        hotelName: data?.structured_formatting?.main_text,
        filters: {
          ...prevState.filters,
          budget: {
            max: minmaxvalue?.values[1],
          },
        },
      }));
    } else {
      setSelectedPropertyValue('');
      setFilteredObject(prevState => {
        const {bestRate, ...rest}: any = prevState;
        return {
          ...prevState,
          hotelName: '',
          filters: rest,
        };
      });
    }
  }, []);

  const [hotelCategoryData, setHotelCategoryData] = useState(hotelCategoryEnum);
  const [byAreaData, setByAreaData] = useState(byAreaEnum);

  const [facilitiesData, setFacilitiesData] = useState(facilitiesEnum);
  const [mealPlanData, setMealPlanData] = useState(mealPlanEnum);

  const [budgetFilter, setBudgetFilter]: any = useState(false);
  const [byRatingFilter, setByRatingFilter]: any = useState(false);
  const [healthSafetyFilter, setHealthSafetyFilter]: any = useState(false);

  //for budget
  const [isEnabledforBudget, setIsEnabledforBudget] = useState(false);

  const toggleSwitchforBudget = (value: boolean) => {
    setIsEnabledforBudget(value);

    if (value) {
      if (minmaxvalue?.values[0] === 0) {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            bestRate: value,
            budget: {
              max: minmaxvalue?.values[1],
            },
          },
        }));
      } else {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            bestRate: value,
          },
        }));
      }
    } else {
      setFilteredObject(prevState => {
        const {bestRate, ...rest}: any = prevState.filters;
        return {
          ...prevState,
          filters: rest,
        };
      });
    }
  };

  // /********************** for meal plan filter ************************ */
  const [selectedValue, setSelectedValue] = useState('');
  const handleMealPlanFilterData = (item: any) => {
    setSelectedValue(item);
    if (item) {
      if (minmaxvalue?.values[0] === 0) {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            mealPlan: {
              code: item,
            },
            budget: {
              max: minmaxvalue?.values[1],
            },
          },
        }));
      } else {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            mealPlan: {
              code: item,
            },
          },
        }));
      }
    }
  };

  //function for handle hotel category filter data
  const [handleHotelCategoryCodes, setHandleHotelCategoryCodes] = useState<any>(
    [],
  );
  const handleCategoryFilterData = (result: any, code: string) => {
    setHotelCategoryData(result);
    const findData = handleHotelCategoryCodes?.find((obj: any) => obj === code);
    if (findData) {
      if (handleHotelCategoryCodes.indexOf(code) !== -1) {
        handleHotelCategoryCodes.splice(
          handleHotelCategoryCodes.indexOf(code),
          1,
        );
      }
    } else {
      handleHotelCategoryCodes.push(code);
    }
    if (handleHotelCategoryCodes.length >= 1) {
      if (minmaxvalue?.values[0] === 0) {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            hotelCategory: {
              codes: handleHotelCategoryCodes,
            },
            budget: {
              max: minmaxvalue?.values[1],
            },
          },
        }));
      } else {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            hotelCategory: {
              codes: handleHotelCategoryCodes,
            },
          },
        }));
      }
    } else {
      setFilteredObject(prevState => {
        const {hotelCategory, ...rest}: any = prevState.filters;
        return {
          ...prevState,
          filters: rest,
        };
      });
    }
  };

  ///**********************function for handle by area filter *************************** */
  const [handlebyAreaCodes, setHandlebyAreaCodes] = useState<any>([]);

  const handlebyAreaFilterData = (result: any, cod: any) => {
    setByAreaData(result);

    const findData = handlebyAreaCodes?.find((obj: any) => obj === cod);
    if (findData) {
      if (handlebyAreaCodes.indexOf(cod) !== -1) {
        handlebyAreaCodes.splice(handlebyAreaCodes.indexOf(cod), 1);
      }
    } else {
      handlebyAreaCodes.push(cod);
    }
    if (handlebyAreaCodes.length >= 1) {
      if (minmaxvalue?.values[0] === 0) {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            area: {
              codes: handlebyAreaCodes,
            },
            budget: {
              max: minmaxvalue?.values[1],
            },
          },
        }));
      } else {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            area: {
              codes: handlebyAreaCodes,
            },
          },
        }));
      }
    } else {
      setFilteredObject(prevState => {
        const {area, ...rest}: any = prevState.filters;
        return {
          ...prevState,
          filters: rest,
        };
      });
    }
  };

  ///***********************funtion for handle facilities filter ************************/
  const [handlefacilitiesCodes, setHandlefacilitiesCodes] = useState([]);

  const handlefacilitiesFilterData = (result: any, cod: any) => {
    setFacilitiesData(result);
    const findData: any = handlefacilitiesCodes?.find(
      (obj: any) => obj?.code === cod,
    );
    const object = {category: 'hotelAmenity', code: cod};
    const newData: any = findData
      ? handlefacilitiesCodes.filter((obj: any) => obj?.code !== findData?.code)
      : [...handlefacilitiesCodes, object];
    setHandlefacilitiesCodes(newData);
    if (newData.length >= 1) {
      if (minmaxvalue?.values[0] === 0) {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            facility: {
              facilities: newData,
            },
            budget: {
              max: minmaxvalue?.values[1],
            },
          },
        }));
      } else {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            facility: {
              facilities: newData,
            },
          },
        }));
      }
    } else {
      setFilteredObject(prevState => {
        const {facility, ...rest}: any = prevState.filters;
        return {
          ...prevState,
          filters: rest,
        };
      });
    }
  };

  //for health and safety toggle button
  const [isEnabledforSafety, setIsEnabledforSafety] = useState<any>(false);
  const toggleSwitchforhealth = (value: boolean) => {
    setIsEnabledforSafety(value);

    const findData: any = handlefacilitiesCodes?.find(
      (obj: any) => obj?.code === 352,
    );
    const newObj = {category: 'hotelAmenity', code: 352};
    const newData: any = findData
      ? handlefacilitiesCodes.filter((obj: any) => obj?.code !== findData?.code)
      : [...handlefacilitiesCodes, newObj];
    setHandlefacilitiesCodes(newData);
    if (newData.length >= 1) {
      if (minmaxvalue?.values[0] === 0) {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            facility: {
              facilities: newData,
            },
            budget: {
              max: minmaxvalue?.values[1],
            },
          },
        }));
      } else {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            facility: {
              facilities: newData,
            },
          },
        }));
      }
    } else {
      setFilteredObject(prevState => {
        const {facility, ...rest}: any = prevState.filters;
        return {
          ...prevState,
          filters: rest,
        };
      });
    }
  };

  //**********************slider for max or min price data for filter *********** */

  const [minmaxvalue, setMinmaxValue] = useState({values: [0, 5000]});
  const multiSliderValuesChange = (values: any) => {
    setMinmaxValue({
      values,
    });

    if (values[0] > 0) {
      setFilteredObject(prevState => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          budget: {
            max: values[1],
            min: values[0],
          },
        },
      }));
    } else if (values?.[0] === 0) {
      setFilteredObject((prevState: any) => {
        return {
          ...prevState,
          filters: {
            ...prevState.filters,
            budget: {
              max: values[1],
            },
          },
        };
      });
    }
  };

  //*********filter for rating ************ */
  const [defaultRating, setDefaultRating] = useState(0);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const ratingFunction = () => {
    setByRatingFilter(!byRatingFilter);
  };
  const ratingCountFunction = (item: any) => {
    setDefaultRating(item);
    if (item > 0) {
      if (minmaxvalue?.values[0] === 0) {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            award: {
              ratings: [{provider: 'LSR', value: item.toString()}],
            },
            budget: {
              max: minmaxvalue?.values[1],
            },
          },
        }));
      } else {
        setFilteredObject(prevState => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            award: {
              ratings: [{provider: 'LSR', value: item.toString()}],
            },
          },
        }));
      }
    }
  };
  const healthSafetyFunction = () => {
    setHealthSafetyFilter(!healthSafetyFilter);
  };

  const budgetFunction = () => {
    setBudgetFilter(!budgetFilter);
  };

  const handleSearchProperetyClear = () => {
    setFilteredObject(prevState => ({
      ...prevState,
      hotelName: '',
    }));
    let newData = filteredObject;
    // newData.hotelName = '';
    newData.hotelName = '';
  };

  const handlApplyButton = () => {
    let newData = filteredObject;
    // newData.hotelName = '';
    newData.chainCode = '';
    newData.hotelCode = '';
    newData.hotelContext = '';
    console.log(newData,'newdata');
    
    dispatch(fetchHotels({details: newData, session: false}));
  };
  const hotelsData: any = useSelector(
    (state: RootState) => state.hotelSearch.hotelsData,
  );

  const hotelErr: any = useSelector(
    (state: RootState) => state.hotelSearch.err,
  );

  const roomRatesError: any = useSelector(
    (state: RootState) => state.roomRatesData.err,
  );

  const prevDataHotelsData: any = customHooks.usePrevious(hotelsData);

  const [hotelcodedata, setHotelcodedata] = useState('');

  const roomRatesData: any = useSelector(
    (state: RootState) => state.roomRatesData.roomRatesData,
  );
  const prevDataroomRatesData: any = customHooks.usePrevious(roomRatesData);
  useEffect(() => {
    const matchHotelCode = hotelsData?.data?.hotelsData?.hotels.find(
      (obj: any) => obj?.BasicPropertyInfo?._HotelCode === hotelcodedata,
    );
    if (matchHotelCode?.BasicPropertyInfo?._HotelCode === hotelcodedata) {
      console.log('firstreserve');

      if (
        roomRatesData.data !== prevDataroomRatesData?.data &&
        roomRatesData?.statusCode === statusCode.Code_200
      ) {
        const rooms = fetchedHotelData?.rooms;
        const hotelFilter = JSON.parse(JSON.stringify(filteredObject));
        dispatch(hotelListData({filteredObject: hotelFilter, rooms}));
        setIsLoading(false);
        navigate(navigationConstants.HOTEL_RATING);
      }
      if (roomRatesError?.statusCode === statusCode.Code_500) {
        setIsFailure(true);
        setErr(roomRatesError?.errMsg);
      }
    } else {
      console.log('secondreserve');

      if (
        hotelsData.data !== prevDataHotelsData?.data &&
        hotelsData?.statusCode === statusCode.Code_200
      ) {
        setIsLoading(false);
        setShowHotelFilterModal(false);
      }
      if (hotelErr?.statusCode === statusCode.Code_500) {
        setShowHotelFilterModal(false);
        setIsFailure(true);
        if (hotelErr?.errMsg === 'API Failure!') {
          if (hotelErr?.error?.hasOwnProperty('Errors')) {
            setErr(hotelErr?.error?.Errors?.Error?._ShortText);
          } else {
            setErr(errorMessage.errorText);
          }
        }
        // setErr(
        //   hotelErr?.errMsg === 'API Failure!'
        //     ? hotelErr?.error?.Errors?.Error?._ShortText
        //     : errorMessage?.errorText,
        // );
      }
    }
  }, [
    roomRatesData.data,
    roomRatesData?.statusCode,
    hotelErr,
    hotelcodedata,
    hotelsData,
    prevDataroomRatesData?.data,
    prevDataHotelsData?.data,
    roomRatesError?.statusCode,
    roomRatesError?.errMsg,
    roomRatesError?.error?.Errors?.Error?._ShortText,
  ]);
  // Loader for hotel data
  const hotelLoader: any = useSelector(
    (state: RootState) => state.hotelSearch.isLoading,
  );
  //Loader for hotel details
  const roomRatesLoader: any = useSelector(
    (state: RootState) => state.roomRatesData.isLoading,
  );

  const [isFailure, setIsFailure] = useState(false);
  // const [isFailureforRoomRates, setIsFailureforRoomRates] = useState(false);

  const [err, setErr] = useState(undefined);

  useEffect(() => {
    const matchHotelCode =
      hotelsData?.data?.hotelsData?.hotels[0]?.BasicPropertyInfo?._HotelCode;
    if (hotelcodedata) {
      setIsLoading(roomRatesLoader);
    } else {
      setIsLoading(hotelLoader);
    }
  }, [
    hotelLoader,
    roomRatesLoader,
    hotelsData?.data?.hotelsData?.hotels,
    hotelcodedata,
    hotelsData,
  ]);

  const clearAllData = useCallback(() => {
    setIsEnabledforBudget(false);
    setByRatingFilter(false);
    setIsEnabledforSafety(false);
    setDefaultRating(0);
    setSelectedValue('');
    setSelectedPropertyValue('');
    setMinmaxValue({values: [0, 5000]});
    // hotelcategorydata clear state //
    const hotelCategorydataClear = hotelCategoryData.map(obj => ({
      ...obj,
      open: false,
    }));

    setHotelCategoryData(hotelCategorydataClear);

    // byAreadata clear state //
    const byAreadataClear = byAreaData.map(obj => ({
      ...obj,
      open: false,
    }));

    setByAreaData(byAreadataClear);

    // facilitydata clear state //
    const facilitiesdataClear = facilitiesData.map(obj => ({
      ...obj,
      open: false,
    }));

    setFacilitiesData(facilitiesdataClear);
    let newData = filteredObject;
    newData.filters = {};
    newData.hotelName = '';
    newData.chainCode = '';
    newData.hotelCode = '';
    newData.hotelContext = '';

    setFilteredObject(newData);

    dispatch(fetchHotels({details: newData, session: false}));
  }, [byAreaData, dispatch, facilitiesData, filteredObject, hotelCategoryData]);

  // const [hotelDetail, setHotelDetail] = useState();
  const handleViewDetailsOfRoom = (
    hotelCode: any,
    chaincode: any,
    hotelcontext: any,
  ) => {
    if (hotelCode) {
      let newData = filteredObject;
      newData.hotelCode = hotelCode;
      newData.chainCode = chaincode;
      newData.hotelContext = hotelcontext;
      newData.hotelName = '';
      newData.filters = {};
      console.log(newData, 'newdata');

      setFilteredObject(newData);
      dispatch(fetchroomRates({details: newData, session: true}));
    }
    setHotelcodedata(hotelCode);
    const hotelDetqailsObject: any = [
      {
        HotelCode: hotelCode,
        affiliationInfo: {SendAwards: true, SendLoyalPrograms: true},
        areaInfo: {
          SendAttractions: true,
          SendRecreations: true,
          SendRefPoints: true,
        },
        contactInfo: {SendData: true},
        contentInfos: {Name: 'SecureMultimediaURLs'},
        facilityInfo: {
          SendGuestRooms: true,
          SendMeetingRooms: true,
          SendRestaurants: true,
        },
        hotelInfo: {SendData: true},
        multimediaObjects: {SendData: true},
        policies: {SendPolicies: true},
      },
    ];
    dispatch(fetchhotelDetails({hotels: hotelDetqailsObject}));
    dispatch(clearroomReserveData());

    // navigate(navigationConstants.HOTEL_RATING);
  };
  return (
    <View>
      <CustomHeader
        leftIcon={Icons.FILTERBACK_ICON}
        lefticonOnPress={handleOnBackIconPress}
        leftIconStyle={styles.headerLeftIconStyle}
        headerLabel={appConstants.hotelSearch}
        headerLabelStyle={styles.headerLabelStyle}
      />
      <View style={styles?.dateLocationView}>
        <View style={styles.location}>
          <Image source={Icons?.LOCATION_LOGO} style={styles.locationlogo} />
          <Text style={styles.locationText}>
            {fetchedHotelData?.hotelLocation}
          </Text>
        </View>
        <View style={styles.location}>
          <Image source={Icons?.CALENDER_LOGO} style={styles.locationlogo} />
          <Text style={styles.locationText}>
            {`${moment(fetchedHotelData?.checkInDate).format(
              appConstants.MMDDYYY,
            )} ${'-'} ${moment(fetchedHotelData?.checkoutDate).format(
              appConstants.MMDDYYY,
            )}`}
          </Text>
        </View>
      </View>
      <View style={styles.filterButton}>
        <CustomButton
          label={appConstants.filter}
          onPress={handleOnSubmit}
          buttonStyle={styles.buttonStyle}
          labelStyle={styles.labelStyle}
          gradientStyle={styles.buttonStyle}
          customButtonStyle={styles.buttonStyle}
        />
      </View>
      {showHotelFilterModal && (
        <HotelFilterModal
          setShowFilterModal={setShowHotelFilterModal}
          hotelCategoryData={hotelCategoryData}
          byAreaData={byAreaData}
          facilitiesData={facilitiesData}
          mealPlanData={mealPlanData}
          budgetFilter={budgetFilter}
          byRatingFilter={byRatingFilter}
          healthSafetyFilter={healthSafetyFilter}
          isEnabledforBudget={isEnabledforBudget}
          isEnabledforSafety={isEnabledforSafety}
          toggleSwitchforBudget={toggleSwitchforBudget}
          toggleSwitchforhealth={toggleSwitchforhealth}
          handleMealPlanFilterData={handleMealPlanFilterData}
          handleCategoryFilterData={handleCategoryFilterData}
          handlebyAreaFilterData={handlebyAreaFilterData}
          handlefacilitiesFilterData={handlefacilitiesFilterData}
          minmaxvalue={minmaxvalue}
          selectedValue={selectedValue}
          multiSliderValuesChange={multiSliderValuesChange}
          ratingFunction={ratingFunction}
          healthSafetyFunction={healthSafetyFunction}
          budgetFunction={budgetFunction}
          handlApplyButton={handlApplyButton}
          defaultRating={defaultRating}
          maxRating={maxRating}
          ratingCountFunction={ratingCountFunction}
          isLoading={isLoading}
          clearAllData={clearAllData}
          handlePlaceSelected={handlePlaceSelected}
          selectedPropertyValue={selectedPropertyValue}
          hotelLatLong={fetchedHotelData?.hotelLatLong}
          handleSearchProperetyClear={handleSearchProperetyClear}
        />
      )}
      {isFailure ? (
        <CustomModal label={err} onPress={() => setIsFailure(false)} />
      ) : (
        <CustomHotelList
          handleViewDetailsOfRoom={handleViewDetailsOfRoom}
          isLoading={isLoading}
        />
      )}
      {isLoading && (
        <CustomLoader
          loaderColor={colors.color_0094E6}
          customLoaderStyle={styles.loaderStyle}
          isLoading={isLoading}
        />
      )}
    </View>
  );
};

export default HotelList;
