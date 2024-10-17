/* eslint-disable prettier/prettier */

import {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {Icons} from '@src/assets';
import appConstants from '@src/constants/appConstants';
import React from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import {FlatList} from 'react-native-gesture-handler';
interface hotelReserveProp {
  completeRoomStaysData: any;
  isDropDownImg: any;
  toggleDropDown: any;
  setIsDropDownImg: any;
}

const CustomHotelReserve = (props: hotelReserveProp) => {
  const {completeRoomStaysData} = props;
  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState(
    Array(completeRoomStaysData.length).fill(false),
  );
  const toggleShowData = (index: any) => {
    setSelectedOption((prevState: any) => {
      const newOption = [...prevState];
      newOption[index] = !newOption[index];
      return newOption;
    });
  };

  // Hook to hide the bottom tab bar
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
  }, [navigation]);

  const {width} = useWindowDimensions();

  const renderItem = ({item, index}: any) => {
    return (
      <View>
        <View style={styles.firstView}>
          <View style={styles.secondViewDiff}>
            <TouchableOpacity onPress={() => toggleShowData(index)}>
              <View style={styles.refundableView}>
                <Text style={styles.dropDownTxt} numberOfLines={4}>
                  {Array.isArray(
                    item?.RoomRates?.RoomRate?.RoomRateDescription?.Text,
                  )
                    ? item?.RoomRates?.RoomRate?.RoomRateDescription?.Text[0][
                        '#text'
                      ]
                    : item?.RoomRates?.RoomRate?.RoomRateDescription?.Text[
                        '#text'
                      ]}
                </Text>

                <Image
                  source={
                    selectedOption[index] ? Icons.Drop_Up : Icons.Drop_Down
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {selectedOption[index] && (
          <View style={styles.firstOpenView}>
            <View style={styles.secondViewDiff}>
              <View style={styles.refundableView}>
                <Text style={styles.dropDownTxt} numberOfLines={4}>
                  {Array.isArray(
                    item?.RoomRates?.RoomRate?.RoomRateDescription?.Text,
                  )
                    ? item?.RoomRates?.RoomRate?.RoomRateDescription?.Text[0][
                        '#text'
                      ]
                    : item?.RoomRates?.RoomRate?.RoomRateDescription?.Text[
                        '#text'
                      ]}
                </Text>
              </View>
              <View style={styles.lineFull} />
              <Text style={[styles.specialTxt, styles.marginDetailTxt]}>
                {appConstants.special}
              </Text>
              <View style={styles.iconsView}>
                <View style={styles.hotelServicesIcon}>
                  <Text style={styles.serviceText} numberOfLines={1}>
                    {appConstants.roomOnly}
                  </Text>
                </View>
              </View>
              {item?.RatePlans?.RatePlan?.CancelPenalties?.CancelPenalty.hasOwnProperty(
                'Deadline',
              ) ? (
                <View style={styles.cancellationTimeView}>
                  <Text style={styles.cancellationDateTxt}>
                    {appConstants?.freeCancellation}{' '}
                    {moment(
                      item?.RatePlans?.RatePlan?.CancelPenalties?.CancelPenalty
                        ?.Deadline?._AbsoluteDeadline,
                    ).format('dddd D MMMM YYYY')}{' '}
                  </Text>
                </View>
              ) : (
                <View style={styles.marginTop}>
                  <View style={styles.refundableView}>
                    <Text style={styles.cancellationTxt}>
                      {' '}
                      {appConstants?.cancellationFee}
                    </Text>
                    <View style={styles.refundableBtn}>
                      <Text style={styles.refundableTxt}>
                        {' '}
                        {appConstants?.nonRefendable}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.pricetxt}>
                    {
                      item?.RatePlans?.RatePlan?.CancelPenalties?.CancelPenalty
                        ?.AmountPercent?._Amount
                    }{' '}
                    {
                      item?.RatePlans?.RatePlan?.CancelPenalties?.CancelPenalty
                        ?.AmountPercent?._CurrencyCode
                    }
                  </Text>
                </View>
              )}
              <View style={styles.dotBulletView}>
                <Text style={styles.textStyle1}>
                  {Array.isArray(
                    item?.RatePlans?.RatePlan?.AdditionalDetails
                      ?.AdditionalDetail?.DetailDescription?.Text,
                  )
                    ? item?.RatePlans?.RatePlan?.AdditionalDetails?.AdditionalDetail?.DetailDescription?.Text.map(
                        (obj: any) => (
                          <RenderHTML
                            contentWidth={width}
                            source={{
                              html: obj,
                            }}
                          />
                        ),
                      )
                    : item?.RatePlans?.RatePlan?.AdditionalDetails
                        ?.AdditionalDetail?.DetailDescription?.Text}
                </Text>
              </View>
              <View style={styles.rateSummary}>
                <Text style={styles.dropDownTxt}>
                  {appConstants?.rateSummary}
                </Text>
              </View>
              <Text style={styles.textStyle}>
                {appConstants?.priceforStay} {item?.TimeSpan?._Start}{' '}
                {appConstants.to} {item?.TimeSpan?._End}
              </Text>
              <Text style={styles.textStyle}>
                {appConstants?.includeFeeTaxes} {item?.Total?._AmountAfterTax}{' '}
                {item?.Total?._CurrencyCode}
              </Text>
              <View style={styles.rateSummary}>
                <Text style={styles.dropDownTxt}>
                  {appConstants?.roomOccupy}
                </Text>
              </View>
              {Array.isArray(
                item?.RoomRates?.RoomRate?.GuestCounts?.GuestCount,
              ) ? (
                <View>
                  <Text style={styles.textStyle}>
                    {
                      item?.RoomRates?.RoomRate?.GuestCounts?.GuestCount[0]
                        ?._Count
                    }{' '}
                    {appConstants.adult}
                  </Text>
                  <Text style={styles.textStyle}>
                    {
                      item?.RoomRates?.RoomRate?.GuestCounts?.GuestCount[1]
                        ?._Count
                    }{' '}
                    {appConstants.child}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.textStyle}>
                    {item?.RoomRates?.RoomRate?.GuestCounts?.GuestCount?._Count}{' '}
                    {appConstants.adult}
                  </Text>
                </View>
              )}
              <View style={styles.rateSummary}>
                <Text style={styles.dropDownTxt}>
                  {appConstants?.specialExtra}
                </Text>
              </View>

              <View style={styles.iconsView}>
                <View style={styles.hotelServicesIcon}>
                  <Text style={styles.serviceText} numberOfLines={1}>
                    {appConstants.roomOnly}
                  </Text>
                </View>
              </View>
              <View style={styles.rateSummary}>
                <Text style={styles.dropDownTxt}>
                  {appConstants?.paymentPolicy}
                </Text>
              </View>
              <Text style={styles.textStyle}>
                {appConstants?.paymentCard}{' '}
                {Array.isArray(
                  item?.RoomRates?.RoomRate?.Rates?.Rate?.PaymentPolicies
                    ?.GuaranteePayment?.AcceptedPayments?.AcceptedPayment,
                )
                  ? item?.RoomRates?.RoomRate?.Rates?.Rate?.PaymentPolicies?.GuaranteePayment?.AcceptedPayments?.AcceptedPayment?.map(
                      (obj: any) => obj?.PaymentCard?._Remark,
                    ).join(', ')
                  : item?.RoomRates?.RoomRate?.Rates?.Rate?.PaymentPolicies
                      ?.GuaranteePayment?.AcceptedPayments?.AcceptedPayment
                      ?.PaymentCard?._Remark}
              </Text>
              <Text style={styles.textStyle}>
                {appConstants?.paymentType}{' '}
                {
                  item?.RoomRates?.RoomRate?.Rates?.Rate?.PaymentPolicies
                    ?.GuaranteePayment?._GuaranteeType
                }
              </Text>
              <View style={styles.rateSummary}>
                <Text style={styles.dropDownTxt}>
                  {appConstants?.roomRateDescription}
                </Text>
              </View>
              <Text style={styles.textStyle}>
                {Array.isArray(
                  item?.RoomRates?.RoomRate?.RoomRateDescription?.Text,
                )
                  ? item?.RoomRates?.RoomRate?.RoomRateDescription?.Text[0][
                      '#text'
                    ]
                  : item?.RoomRates?.RoomRate?.RoomRateDescription?.Text[
                      '#text'
                    ]}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.detalsTxt}>{appConstants.roomsDetails}</Text>
      <FlatList
        data={completeRoomStaysData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CustomHotelReserve;
