/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, Text, Modal, ScrollView, Switch} from 'react-native';
import styles from './styles';
import CustomHeader from '../customHeader/customHeader';
import {Icons} from '@src/assets';
import appConstants from '@src/constants/appConstants';
import colors from '@src/constants/colors';
import CustomMulitipleSelector from '../customMultipleSelector/customMultipleSelector';
import MultipleSelectorHeader from '../customMultipleSelector/multipleSelectorHeader';
import CustomButton from '../customButton/customButton';
import CustomRatingBar from '../customRatingStar/customRating';
import CustomRadioButtonSelectorforHotel from '../customRadioButtons/customRadioButtonforHotelFilter';
import {Platform} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import CustomLoader from '../customLoader/customLoader';
import commonStyles from '@src/utility/commonStyles';
import GooglePropertyName from '../hotelPropertyName/googlePropertyName';

interface FilterModalProps {
  setShowFilterModal: any;
  hotelCategoryData: any;
  byAreaData: any;
  facilitiesData: any;
  mealPlanData: any;
  budgetFilter: any;
  byRatingFilter: any;
  healthSafetyFilter: any;
  isEnabledforBudget: any;
  isEnabledforSafety: any;
  toggleSwitchforBudget: any;
  toggleSwitchforhealth: any;
  handleMealPlanFilterData: any;
  handleCategoryFilterData: any;
  handlebyAreaFilterData: any;
  handlefacilitiesFilterData: any;
  minmaxvalue: any;
  multiSliderValuesChange: any;
  ratingFunction: any;
  healthSafetyFunction: any;
  budgetFunction: any;
  handlApplyButton: any;
  selectedValue: any;
  defaultRating: any;
  maxRating: any;
  ratingCountFunction: any;
  isLoading: boolean;
  clearAllData:any;
  selectedPropertyValue:any;
  handlePlaceSelected:any;
  hotelLatLong:any;
  handleSearchProperetyClear:any;
}
// create a component
const HotelFilterModal = (props: FilterModalProps) => {
  const {
    setShowFilterModal,
    hotelCategoryData,
    byAreaData,
    facilitiesData,
    mealPlanData,
    budgetFilter,
    byRatingFilter,
    healthSafetyFilter,
    isEnabledforBudget,
    isEnabledforSafety,
    toggleSwitchforBudget,
    toggleSwitchforhealth,
    handleMealPlanFilterData,
    handleCategoryFilterData,
    handlebyAreaFilterData,
    handlefacilitiesFilterData,
    minmaxvalue,
    multiSliderValuesChange,
    healthSafetyFunction,
    budgetFunction,
    handlApplyButton,
    selectedValue,
    defaultRating,
    maxRating,
    ratingFunction,
    ratingCountFunction,
    isLoading,
    clearAllData,
    selectedPropertyValue,
    handlePlaceSelected,
    hotelLatLong,
    handleSearchProperetyClear,
  } = props;

  // const [isLoading, setIsLoading] = useState(true);

  return (
    <>
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
            rightIconOnPress={clearAllData}
          />
        </View>
        <ScrollView style={styles.filterContainer}>
          <View style={styles.filterButton}>
            <CustomButton
              label={appConstants.apply}
              onPress={handlApplyButton}
              buttonStyle={styles.buttonStyle}
              labelStyle={styles.labelStyle}
              gradientStyle={styles.buttonStyle}
              customButtonStyle={styles.buttonStyle}
            />
          <GooglePropertyName
          handlePlaceSelected={handlePlaceSelected}
          selectedPropertyValue={selectedPropertyValue}
          hotelLatLong={hotelLatLong}
          handleSearchProperetyClear={handleSearchProperetyClear}
          />
           <View style={budgetFilter && commonStyles.filterHeaderContainerStyle}>
           <MultipleSelectorHeader
              header={appConstants.budget}
              content={budgetFilter}
              onPress={budgetFunction}
            />
            {budgetFilter && (
              <View style={styles.boundContainerStyle}>
                <View style={styles.toggleSwitchView}>
                  <Switch
                    trackColor={{
                      false: colors.color_767577,
                      true: colors.color_00A7E1,
                    }}
                    thumbColor={
                      isEnabledforBudget ? colors?.color_fff : colors?.color_fff
                    }
                    ios_backgroundColor={colors.color_3e3e3e}
                    onValueChange={toggleSwitchforBudget}
                    value={isEnabledforBudget}
                    style={styles.toggleSwitch}
                  />
                  <Text style={styles.toggleText}>
                    {appConstants?.togglebestrate}
                  </Text>
                </View>
                <MultiSlider
                  values={[minmaxvalue.values[0], minmaxvalue.values[1]]}
                  sliderLength={responsiveScreenWidth(80)}
                  selectedStyle={styles.lineStyle}
                  onValuesChange={multiSliderValuesChange}
                  markerStyle={{
                    ...Platform.select({
                      android: styles.selectedStyle,
                    }),
                  }}
                  min={0}
                  max={5000}
                  step={1}
                />
                <View style={styles.subTextContainerStyle}>
                  <Text style={styles.subTextStyle}>
                    ${minmaxvalue?.values[0]}
                  </Text>
                  <Text style={styles.subTextStyle}>
                    ${minmaxvalue?.values[1]}
                  </Text>
                </View>
              </View>
            )}
           </View>
            <CustomRadioButtonSelectorforHotel
              mockData={mealPlanData}
              selectedValue={selectedValue}
              handleMealPlanFilterData={handleMealPlanFilterData}
              header={appConstants.mealPlan}
            />
             <View style={byRatingFilter && commonStyles.filterHeaderContainerStyle}>
            <MultipleSelectorHeader
              header={appConstants.byRating}
              content={byRatingFilter}
              onPress={ratingFunction}
            />
            {byRatingFilter && (
              <View style={styles.ratingFilterView}>
                <Text style={styles.localStarRatingText}>
                  {appConstants?.localStarRating}
                </Text>
                <CustomRatingBar
                  ratingCountFunction={ratingCountFunction}
                  defaultRating={defaultRating}
                  maxRating={maxRating}
                />
              </View>
            )}
            </View>
            <CustomMulitipleSelector
              mockData={hotelCategoryData}
              setMockData={handleCategoryFilterData}
              header={appConstants.hotelcatergory}
            />
            <CustomMulitipleSelector
              mockData={byAreaData}
              setMockData={handlebyAreaFilterData}
              header={appConstants.byArea}
            />

            <MultipleSelectorHeader
              header={appConstants.healthandnSafety}
              content={healthSafetyFilter}
              onPress={healthSafetyFunction}
            />
            {healthSafetyFilter && (
              <View style={styles.boundContainerStyle}>
                <View style={styles.toggleSwitchView}>
                  <Switch
                    trackColor={{
                      false: colors.color_767577,
                      true: colors.color_00A7E1,
                    }}
                    thumbColor={
                      isEnabledforSafety ? colors?.color_fff : colors?.color_fff
                    }
                    ios_backgroundColor={colors.color_3e3e3e}
                    onValueChange={toggleSwitchforhealth}
                    value={isEnabledforSafety}
                    style={styles.toggleSwitch}
                  />
                  <Text style={styles.toggleText}>
                    {appConstants?.heathAndSafeData}
                  </Text>
                </View>
              </View>
            )}
            <CustomMulitipleSelector
              mockData={facilitiesData}
              setMockData={handlefacilitiesFilterData}
              header={appConstants.facility}
            />
          </View>
        </ScrollView>
        {isLoading && (
          <CustomLoader
            loaderColor={colors.color_0094E6}
            customLoaderStyle={styles.loaderStyle}
            isLoading={isLoading}
          />
        )}
      </Modal>
    </>
  );
};

export default memo(HotelFilterModal);
