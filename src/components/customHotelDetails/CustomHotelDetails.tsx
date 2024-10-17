/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {View, Text, Dimensions, Image, useWindowDimensions} from 'react-native';
import {Icons} from '@src/assets';
import {useNavigation} from '@react-navigation/native';
import appConstants from '@src/constants/appConstants';
import styles from './styles';
import RenderHTML from 'react-native-render-html';
import {serviceText} from '@src/utility/enums/HotelServices';
import {CardCode} from '@src/utility/enums/staticEnums';
import colors from '@src/constants/colors';

const {height} = Dimensions.get('window');

interface hotelDetailsProp {
  getRoomData: any;
  hotelInoformation: any;
}

const CustomHotelDetails = (props: hotelDetailsProp) => {
  const {getRoomData, hotelInoformation} = props;

  const {width} = useWindowDimensions();

  const navigation = useNavigation();

  let maxStarValue = 5;
  let result: any = [];
  let poliCyData: any;
  let foundGuaranteePaymentPolicy: any;
  if (getRoomData.hasOwnProperty('Policies')) {
    foundGuaranteePaymentPolicy = Array.isArray(getRoomData?.Policies?.Policy)
      ? getRoomData?.Policies?.Policy?.filter((obj: any) =>
          obj?.hasOwnProperty('GuaranteePaymentPolicy'),
        )
      : '';

    const findPolicyDataforCards =
      foundGuaranteePaymentPolicy === ''
        ? ''
        : foundGuaranteePaymentPolicy[0]?.GuaranteePaymentPolicy
            ?.GuaranteePayment?.AcceptedPayments?.AcceptedPayment;

    findPolicyDataforCards === ''
      ? ''
      : findPolicyDataforCards?.map((obj: any) => {
          CardCode.find(ele => {
            if (ele._CardCode === obj.PaymentCard?._CardCode) {
              result.push(ele._CardName);
            }
          });
        });

    poliCyData = Array.isArray(getRoomData?.Policies?.Policy)
      ? getRoomData?.Policies?.Policy?.filter((obj: any) =>
          obj?.hasOwnProperty('PolicyInfo'),
        )
      : Object.values(getRoomData?.Policies?.Policy);
  }
  const safetyFeature =
    getRoomData?.HotelInfo?.Descriptions?.MultimediaDescriptions?.MultimediaDescription?.filter(
      (obj: any) =>
        obj?._AdditionalDetailCode === '34' && obj?._InfoCode === '1',
    );

  const taxInformation =
    getRoomData?.HotelInfo?.Descriptions?.MultimediaDescriptions?.MultimediaDescription?.filter(
      (obj: any) =>
        obj?._AdditionalDetailCode === '10' && obj?._InfoCode === '1',
    );

  const diningFacilities =
    getRoomData?.HotelInfo?.Descriptions?.MultimediaDescriptions?.MultimediaDescription?.filter(
      (obj: any) => obj?._InfoCode === '10',
    );

  const filterDinningFacility = diningFacilities.filter((obj: any) =>
    obj.hasOwnProperty('TextItems'),
  );
  const additionalInfo =
    getRoomData?.HotelInfo?.Descriptions?.MultimediaDescriptions?.MultimediaDescription?.filter(
      (obj: any) => obj?._InfoCode === '3',
    );
  let serviceArray: any = [];
  const hotelServiceArray = getRoomData?.HotelInfo?.Services?.Service;
  const getServiesdata = hotelServiceArray?.filter((obj: any) => {
    Object?.entries(serviceText).map(([key, value]) => {
      if (key === obj?._Code) {
        serviceArray.push(value);
        return serviceArray;
      }
    });
  });
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.firstView}>
          <View>
            <Text style={styles.locationTxt}>Location</Text>
            <Text numberOfLines={3} style={styles.address}>
              {hotelInoformation?.BasicPropertyInfo?.Address?.AddressLine}
              {','} {hotelInoformation?.BasicPropertyInfo?.Address?.CityName}
            </Text>

            <View style={styles.secondView}>
              <Text style={styles.voiceTxt}>{appConstants.latitude}</Text>
              <Text style={styles.numTxt}>
                {getRoomData?.HotelInfo?.Position?._Latitude}
              </Text>
            </View>
            <View style={styles.secondView}>
              <Text style={styles.voiceTxt}>{appConstants.longitude}</Text>
              <Text style={styles.numTxt}>
                {getRoomData?.HotelInfo?.Position?._Longitude}
              </Text>
            </View>
          </View>
          <View style={styles.marginView}>
            <View style={styles.secondView}>
              <Text style={styles.voiceTxt}>{appConstants.voice}</Text>
              <Text style={styles.numTxt}>
                {Array.isArray(
                  getRoomData?.ContactInfos?.ContactInfo?.Phones?.Phone,
                )
                  ? getRoomData?.ContactInfos?.ContactInfo?.Phones?.Phone[0]
                      ?._PhoneNumber
                  : getRoomData?.ContactInfos?.ContactInfo?.Phones?.Phone
                      ?._PhoneNumber}
              </Text>
            </View>
            <View style={styles.secondView}>
              <Text>{appConstants.fax}</Text>
              <Text style={styles.numTxt}>
                {Array.isArray(
                  getRoomData?.ContactInfos?.ContactInfo?.Phones?.Phone,
                )
                  ? getRoomData?.ContactInfos?.ContactInfo?.Phones?.Phone[1]
                      ?._PhoneNumber
                  : getRoomData?.ContactInfos?.ContactInfo?.Phones?.Phone
                      ?._PhoneNumber}
              </Text>
            </View>
          </View>
        </View>
        <Text style={[styles.locationTxt, {marginTop: height / 20}]}>
          {appConstants.Category}
        </Text>

        <View style={styles.firstView}>
          <View style={styles.secondView}>
            <Text style={styles.voiceTxt}>{appConstants.category}</Text>
            <Text style={styles.numTxt}>Standard</Text>
          </View>
          <View style={styles.secondView}>
            <Text style={styles.voiceTxt}>{appConstants.localStarRating}</Text>
            <View style={styles.ratingMainView}>
              {Array.from({
                length: hotelInoformation?.BasicPropertyInfo?.Award?._Rating,
              }).map((_, ind: any) => (
                <Image
                  style={styles.ratingImage}
                  key={ind}
                  source={Icons.HOTEL_RATING_STAR}
                />
              ))}

              {Array.from({
                length:
                  Math.floor(maxStarValue) -
                  hotelInoformation?.BasicPropertyInfo?.Award?._Rating,
              }).map((_, indx: any) => (
                <Image
                  style={styles.ratingImage}
                  key={indx}
                  source={Icons.HOTEL_RATING_EMPTYSTAR}
                />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.secondView}>
          <Text style={styles.voiceTxt}>{appConstants.type}</Text>
          <Text style={styles.numTxt}> Hotel</Text>
        </View>
        <View>
          <View style={styles.checkInOutView}>
            <Text style={styles.darkTxt}>{appConstants.checkInOut}</Text>
            {getRoomData.hasOwnProperty('Policies') ? (
              <View>
                <View style={styles.timeView}>
                  <Text style={styles.numTxt}>Check-in Time</Text>
                  <Text style={styles.numTxt}>
                    {poliCyData[0]?.hasOwnProperty('PolicyInfo')
                      ? poliCyData[0]?.PolicyInfo?._CheckInTime
                      : poliCyData[0]?._CheckInTime}
                  </Text>
                  <Text style={styles.numTxt}> - </Text>
                  <Text style={styles.numTxt}>Check-out Time</Text>
                  <Text style={styles.numTxt}>
                    {' '}
                    {poliCyData[0]?.hasOwnProperty('PolicyInfo')
                      ? poliCyData[0]?.PolicyInfo?._CheckOutTime
                      : poliCyData[0]?._CheckOutTime}
                  </Text>
                </View>
                <Text style={styles.checkInOutTxt}>{appConstants.guests}</Text>

                <View style={styles.bulletView}>
                  <Text style={[styles.numTxt, styles.checkInInstructions]}>
                    {' '}
                    {poliCyData[0]?.hasOwnProperty('PolicyInfo')
                      ? poliCyData[0]?.PolicyInfo?.Description?.Text[0]['#text']
                      : poliCyData[0]?.Description?.Text[0]['#text']}
                  </Text>
                </View>
                <View style={styles.dotBulletView}>
                  <RenderHTML
                    contentWidth={width}
                    tagsStyles={{
                      ul: {color: colors.color_B2B2B2},
                      ol: {color: colors.color_B2B2B2},
                      p: {color: colors.color_B2B2B2},
                    }}
                    source={{
                      html: poliCyData[0]?.hasOwnProperty('PolicyInfo')
                        ? poliCyData[0]?.PolicyInfo?.Description?.Text[1][
                            '#text'
                          ]
                        : poliCyData[0]?.Description?.Text[1]['#text'],
                    }}
                  />
                  <View style={styles.bulletView}>
                    <Text style={[styles.numTxt, styles.checkInInstructions]}>
                      {poliCyData[0]?.hasOwnProperty('PolicyInfo')
                        ? poliCyData[0]?.PolicyInfo?.Description?.Text[2][
                            '#text'
                          ]
                        : poliCyData[0]?.Description?.Text[2]['#text']}
                    </Text>
                  </View>
                  <View style={styles.bulletView}>
                    <Text style={[styles.numTxt, styles.checkInInstructions]}>
                      {' '}
                      {poliCyData[0]?.hasOwnProperty('PolicyInfo')
                        ? poliCyData[0]?.PolicyInfo?.Description?.Text[3][
                            '#text'
                          ]
                        : poliCyData[0]?.Description?.Text[3]['#text']}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.locationTxt,
                    styles.guaranteeTxt,
                    styles.darkTxt,
                  ]}>
                  {appConstants.guaranteeAndPayment}
                </Text>

                {result.length > 0
                  ? result?.map((obj: any) => {
                      return (
                        <View style={styles.CardStyles}>
                          <Text style={styles.cardTxt} numberOfLines={3}>
                            {obj},{' '}
                          </Text>
                        </View>
                      );
                    })
                  : ''}
                <Text style={styles.cardTxt} numberOfLines={3}>
                  {
                    foundGuaranteePaymentPolicy[0]?.GuaranteePaymentPolicy
                      ?.GuaranteePayment?.Description?.Text['#text']
                  }
                </Text>
              </View>
            ) : (
              ''
            )}
            <Text style={[styles.locationTxt, styles.checkInInstructions]}>
              {appConstants.facilities}
            </Text>
            <Text
              style={[styles.locationTxt, styles.guaranteeTxt, styles.darkTxt]}>
              {appConstants.hotelServices}
            </Text>
            {serviceArray?.map((obj: any) => {
              return (
                <View style={styles.dotBulletView}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.starBullet}>{'\u25CF'} </Text>
                    <Text style={styles.numTxt}>{obj}</Text>
                  </View>
                </View>
              );
            })}

            <Text style={[styles.locationTxt, styles.marginTop]}>
              {appConstants.taxInformation}
            </Text>
            <View style={styles.dotBulletView}>
              <RenderHTML
                contentWidth={width}
                tagsStyles={{
                  ul: {color: colors.color_B2B2B2},
                  ol: {color: colors.color_B2B2B2},
                  p: {color: colors.color_B2B2B2},
                }}
                source={{
                  html: taxInformation[0]?.TextItems?.TextItem?.Description[
                    '#text'
                  ],
                }}
              />
            </View>
            <Text style={[styles.locationTxt, styles.marginTop]}>
              {appConstants.safetyFeatures}
            </Text>
            {Array?.isArray(
              safetyFeature[0]?.TextItems?.TextItem?.Description,
            ) ? (
              safetyFeature[0]?.TextItems?.TextItem?.Description?.map(
                (obj: any) => {
                  return (
                    <Text
                      style={[styles.numTxt, styles.safetyDiscription]}
                      numberOfLines={4}>
                      {obj['#text']}
                    </Text>
                  );
                },
              )
            ) : (
              <Text
                style={[styles.numTxt, styles.safetyDiscription]}
                numberOfLines={4}>
                {safetyFeature[0]?.TextItems?.TextItem?.Description['#text']}
              </Text>
            )}
            {}
            <Text style={[styles.locationTxt, styles.marginTop]}>
              {appConstants.diningFacilities}
            </Text>
            <Text
              style={[styles.numTxt, styles.safetyDiscription]}
              numberOfLines={4}>
              {
                filterDinningFacility[0]?.TextItems?.TextItem?.Description[
                  '#text'
                ]
              }
            </Text>

            <Text style={[styles.locationTxt, styles.marginTop]}>
              {appConstants.additionalInformation}
            </Text>
            <View style={styles.dotBulletView}>
              <RenderHTML
                contentWidth={width}
                tagsStyles={{
                  ul: {color: colors.color_B2B2B2},
                  ol: {color: colors.color_B2B2B2},
                  p: {color: colors.color_B2B2B2},
                }}
                source={{
                  html: additionalInfo[0]?.TextItems?.TextItem?.Description[
                    '#text'
                  ],
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default CustomHotelDetails;
