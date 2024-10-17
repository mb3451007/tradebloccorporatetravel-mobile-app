/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react';
import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import commonMethods from '@src/utility/commonMethods';
import commonStyles from '@src/utility/commonStyles';
import appConstants, {carriersURL} from '@src/constants/appConstants';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Icons} from '@src/assets';
import styles from './styles';
import colors from '@src/constants/colors';
import {StatusBar} from 'react-native';
import CustomFlightInfoBox from '../customFlightInfoBox/customFlightInfoBox';

interface CustomTicketSelectorModalProps {
  segmentData: any;
  item: any;
  index: any;
  isTicketSelectorModal: any;
  oneWayData: any;
  cabinClass: any;
}

const CustomTicketSelectorModal = (props: CustomTicketSelectorModalProps) => {
  const {
    segmentData,
    item,
    index,
    isTicketSelectorModal,
    oneWayData,
    cabinClass,
  } = props;
  const {locations} = oneWayData?.data;
  const [heightInc, setHeightInc] = useState('');
  const operatingCarriers = commonMethods.tripOperatingCarrier(
    segmentData.flights,
  );
  const marketingCarriers = commonMethods.tripMarketingCarrier(
    segmentData.flights,
  );
  const carrierName = commonMethods.findCarrierName(segmentData.airlines);
  // Get airport name
  const getAirportName = useCallback(
    (airportCode: string) => {
      return locations[airportCode];
    },
    [locations],
  );
  return (
    <Modal visible={isTicketSelectorModal} transparent={true}>
      <StatusBar backgroundColor={colors.color_rgba50_50_50_09} />
      <View style={styles.selectTicketModalContainerStyle}>
        <View key={index} style={[commonStyles.ticketContainer_1]}>
          <View style={commonStyles.codeStyle}>
            <Text style={commonStyles.codeTextStyle}>
              {segmentData.departure?.airportCode}
            </Text>
            <Text style={commonStyles.codeTextStyle}>
              {segmentData.arrival?.airportCode}
            </Text>
          </View>
          <View style={commonStyles.cityNamesStyle}>
            <Text
              style={[
                commonStyles.cityTextStyle,
                commonStyles.airportDepartureTextStyle,
              ]}>
              {segmentData.departureAirportName?.cityName}
            </Text>
            <Text
              style={[
                commonStyles.cityTextStyle,
                commonStyles.cityTimeTextStyle,
              ]}>
              {commonMethods.getDuration(segmentData?.durationInMinutes)}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                commonStyles.cityTextStyle,
                commonStyles.arrivalCityTextStyle,
              ]}>
              {segmentData.arrivalAirportName?.cityName}
            </Text>
          </View>
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
            style={[
              commonStyles.roundView,
              commonStyles.subRoundViewStyle,
              styles.selectedLeftRoundView,
            ]}
          />
          <View
            style={[commonStyles.roundView, styles.selectedRightRoundViewStyle]}
          />
          <Image
            style={commonStyles.lineStyle}
            source={Icons.TICKETBOTTOM_LINE}
          />
          {heightInc !== index ? (
            <TouchableOpacity
              onPress={() => setHeightInc(index)}
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
        <View style={styles.selectedBottomBar} />
        <View style={styles.flightInfoContainerStyle}>
          <CustomFlightInfoBox />
        </View>
      </View>
    </Modal>
  );
};

export default CustomTicketSelectorModal;
