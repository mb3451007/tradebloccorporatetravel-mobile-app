/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Modal, ScrollView} from 'react-native';
import styles from './styles';
import appConstants from '@src/constants/appConstants';
import CustomButton from '../customButton/customButton';
import CustomHeader from '../customHeader/customHeader';
import {navigate} from '@src/navigation/navigationMethods';
import {Icons} from '@src/assets';
import navigationConstants from '@src/constants/navigationConstants';
import moment from 'moment';
import {facilitiesCodes} from '@src/utility/enums/HotelFacilities';

interface customCancellationModalProps {
  setCancelModalOpen: any;
  selectedObject: any;
}

const CustomCancellationModal = (props: customCancellationModalProps) => {
  const {setCancelModalOpen, selectedObject} = props;

  const roomServices: any =
    selectedObject?.room?.RoomRates?.RoomRate?.Features?.Feature;
  const hotelServicedata: any = Array.isArray(roomServices)
    ? roomServices?.map((data: any) => facilitiesCodes[data?._RoomAmenity - 1])
    : facilitiesCodes[roomServices?._RoomAmenity - 1];

  const RefundablePayment = selectedObject?.room?.RatePlans?.RatePlan
    ?.CancelPenalties?.CancelPenalty
    ? Array.isArray(
        selectedObject?.room?.RatePlans?.RatePlan?.CancelPenalties
          ?.CancelPenalty,
      )
      ? selectedObject?.room?.RatePlans?.RatePlan?.CancelPenalties
          ?.CancelPenalty
      : Object?.values(
          selectedObject?.room?.RatePlans?.RatePlan?.CancelPenalties
            ?.CancelPenalty || {},
        )
    : [];

  const refundedPayment = RefundablePayment?.find(
    (el: any) => el?._AbsoluteDeadline || el?.hasOwnProperty('Deadline'),
  );

  const refundedAmount = RefundablePayment?.find((el: any) => el?._Amount);

  // Reserve  button
  const handleReserveButton = () => {
    navigate(navigationConstants.HOTEL_RESERVE);
  };
  return (
    <Modal transparent={true}>
      <View style={styles.mainContainer}>
        <CustomHeader
          leftIcon={Icons.BACK_LOGO}
          leftIconStyle={styles.backImageStyle}
          lefticonOnPress={() => setCancelModalOpen(false)}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalView}>
            <Text style={styles.accessibleTxt}>
              {Array.isArray(
                selectedObject?.room?.RoomRates?.RoomRate?.RoomRateDescription
                  ?.Text,
              )
                ? selectedObject?.room?.RoomRates?.RoomRate?.RoomRateDescription
                    ?.Text[0]['#text']
                : selectedObject?.room?.RoomRates?.RoomRate?.RoomRateDescription
                    ?.Text['#text']}
            </Text>
            <Text style={styles.accessibleTxt}>{appConstants.special}</Text>
            {hotelServicedata === undefined ? (
              <View style={styles.iconsView}>
                <View style={styles.feslitiesBtn}>
                  <Text style={styles.btnTxt} numberOfLines={1}>
                    {appConstants.roomOnly}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.iconsView}>
                {Array.isArray(hotelServicedata) ? (
                  hotelServicedata?.map((obj: any) => {
                    return (
                      <View style={styles.feslitiesBtn}>
                        <Text style={styles.btnTxt} numberOfLines={1}>
                          {obj?.text}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View style={styles.feslitiesBtn}>
                    <Text style={styles.btnTxt} numberOfLines={1}>
                      {hotelServicedata?.text}
                    </Text>
                  </View>
                )}
              </View>
            )}
            <View style={styles.line} />

            {refundedPayment !== undefined ? (
              <View style={styles.cancellationTimeView}>
                <Text style={styles.cancellationDateTxt}>
                  {appConstants?.freeCancellation}{' '}
                  {moment(
                    refundedPayment?.Deadline
                      ? refundedPayment?.Deadline?._AbsoluteDeadline
                      : refundedPayment?._AbsoluteDeadline,
                  ).format('dddd D MMMM YYYY')}{' '}
                </Text>
              </View>
            ) : (
              <View style={styles.cancellationTimeView}>
                <Text style={styles.cancellationDateTxt}>
                  {appConstants?.nonRefundablefee} {refundedAmount?._Amount}{' '}
                  {refundedAmount?._CurrencyCode}
                </Text>
              </View>
            )}
          </View>
          <Text style={[styles.accessibleTxt, styles.rateTxt]}>
            {appConstants.rateSummary}
          </Text>
          <Text>
            {appConstants?.priceforStay}{' '}
            {selectedObject?.room?.TimeSpan?._Start} {appConstants.to}{' '}
            {selectedObject?.room?.TimeSpan?._End}
          </Text>
          <View style={styles.stayView}>
            <Text style={[styles.accessibleTxt, styles.greyTxt]}>
              {appConstants.includeFeeTaxes}
            </Text>
            <Text style={styles.dateTxt}>
              {selectedObject?.room?.Total?._AmountIncludingMarkup}{' '}
              {selectedObject?.room?.Total?._CurrencyCode}
            </Text>
          </View>
          <Text style={[styles.accessibleTxt, styles.rateTxt]}>
            {appConstants.roomOccupy}
          </Text>
          {Array.isArray(
            selectedObject?.room?.RoomRates?.RoomRate?.GuestCounts?.GuestCount,
          ) ? (
            <View>
              <Text>
                {
                  selectedObject?.room?.RoomRates?.RoomRate?.GuestCounts
                    ?.GuestCount[0]?._Count
                }{' '}
                {appConstants.adult}
              </Text>
              <Text>
                {
                  selectedObject?.room?.RoomRates?.RoomRate?.GuestCounts
                    ?.GuestCount[1]?._Count
                }{' '}
                {appConstants.child}
              </Text>
            </View>
          ) : (
            <View>
              <Text>
                {
                  selectedObject?.room?.RoomRates?.RoomRate?.GuestCounts
                    ?.GuestCount?._Count
                }{' '}
                {appConstants.adult}
              </Text>
            </View>
          )}
          <Text style={[styles.accessibleTxt, styles.rateTxt]}>
            {appConstants.specialExtra}
          </Text>
          <View style={styles.marginStart}>
            {hotelServicedata === undefined ? (
              <View style={styles.iconsView}>
                <View style={styles.feslitiesBtn}>
                  <Text style={styles.btnTxt} numberOfLines={1}>
                    {appConstants.roomOnly}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.iconsView}>
                {Array.isArray(hotelServicedata) ? (
                  hotelServicedata?.map((obj: any) => {
                    return (
                      <View style={styles.feslitiesBtn}>
                        <Text style={styles.btnTxt} numberOfLines={1}>
                          {obj?.text}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View style={styles.feslitiesBtn}>
                    <Text style={styles.btnTxt} numberOfLines={1}>
                      {hotelServicedata?.text}
                    </Text>
                  </View>
                )}
              </View>
            )}
            <Text style={[styles.accessibleTxt, styles.rateTxt]}>
              {appConstants.paymentPolicy}
            </Text>
            <View style={styles.stayView}>
              <Text style={[styles.accessibleTxt, styles.greyTxt]}>
                {appConstants.paymentCard}
              </Text>
              <Text style={styles.dateTxt}>
                {Array.isArray(
                  selectedObject?.room?.RoomRates?.RoomRate?.Rates?.Rate
                    ?.PaymentPolicies?.GuaranteePayment?.AcceptedPayments
                    ?.AcceptedPayment,
                )
                  ? selectedObject?.room?.RoomRates?.RoomRate?.Rates?.Rate?.PaymentPolicies?.GuaranteePayment?.AcceptedPayments?.AcceptedPayment?.map(
                      (obj: any) => obj?.PaymentCard?._Remark,
                    ).join(', ')
                  : selectedObject?.room?.RoomRates?.RoomRate?.Rates?.Rate
                      ?.PaymentPolicies?.GuaranteePayment?.AcceptedPayments
                      ?.AcceptedPayment?.PaymentCard?._Remark}
              </Text>
            </View>
            <View style={styles.stayView}>
              <Text style={[styles.accessibleTxt, styles.greyTxt]}>
                {appConstants.paymentType}{' '}
                {
                  selectedObject?.room?.RoomRates?.RoomRate?.Rates?.Rate
                    ?.PaymentPolicies?.GuaranteePayment?._GuaranteeType
                }
              </Text>
            </View>
            <Text style={[styles.accessibleTxt, styles.rateTxt]}>
              {appConstants.roomRateDescription}
            </Text>
            <Text style={[styles.accessibleTxt, styles.rateTxt]}>
              {Array.isArray(
                selectedObject?.room?.RoomRates?.RoomRate?.RoomRateDescription
                  ?.Text,
              )
                ? selectedObject?.room?.RoomRates?.RoomRate?.RoomRateDescription
                    ?.Text[0]['#text']
                : selectedObject?.room?.RoomRates?.RoomRate?.RoomRateDescription
                    ?.Text['#text']}
            </Text>
            <View style={styles.line} />
          </View>
          <CustomButton
            gradientStyle={styles.buttonStyle}
            label={appConstants.reserve}
            buttonStyle={styles.gradientStyle}
            onPress={handleReserveButton}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default CustomCancellationModal;
