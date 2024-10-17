/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Modal,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Icons} from '@src/assets';
import appConstants, {seatCodes} from '@src/constants/appConstants';
import colors from '@src/constants/colors';

interface SelectedSeatModalProps {
  seatRowNumber: any;
  seatCharacterSticks: any;
  rowCharacterSticks: any;
  onCancelPress: any;
  onSelectPress: any;
}

const SelectedSeatModal = (props: SelectedSeatModalProps) => {
  const {
    seatRowNumber,
    seatCharacterSticks,
    rowCharacterSticks,
    onCancelPress,
    onSelectPress,
  } = props;
  return (
    <Modal transparent={true}>
      <View style={styles.mainContainerStyle}>
        <View style={styles.seatInfoContainerStyle}>
          <View style={styles.seatContainerStyle}>
            <View style={styles.seatTextContainerStyle}>
              <Image source={Icons.SELECTED_SEAT} />
              <View>
                <Text style={styles.selectedSeatTextStyle}>
                  {appConstants.selectedSeat}
                </Text>
                <Text
                  style={
                    styles.seatRowNumberStyle
                  }>{`${seatRowNumber} ${seatCharacterSticks?.seatColumn}`}</Text>
              </View>
            </View>
            <View style={styles.imagesContainerStyle}>
              <Image source={Icons.WASHROOM} />
              <Image source={Icons.WIFI} />
              <Image source={Icons.CHARGER} />
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.rowDetailsScrollViewStyle}>
            {rowCharacterSticks && (
              <View>
                <Text style={styles.chaTextStyle}>
                  {appConstants.rowCharacteristics}
                </Text>
                <Text style={styles.chaSubTextStyle}>
                  {rowCharacterSticks?.otherRowCharacteristic === seatCodes.K
                    ? appConstants.overwingRow
                    : ''}
                </Text>
                <Text style={styles.chaSubTextStyle}>
                  {rowCharacterSticks?.rowCharacteristic === seatCodes.E
                    ? appConstants.exitRow
                    : ''}
                </Text>
              </View>
            )}
            <View>
              <Text style={styles.chaTextStyle}>
                {appConstants.seatCharacteristics}
              </Text>
              {Array.isArray(seatCharacterSticks?.seatCharacteristic) ? (
                seatCharacterSticks?.seatCharacteristic?.map((el: any) => {
                  return (
                    <Text style={styles.chaSubTextStyle}>
                      {el === seatCodes.O
                        ? appConstants.preferentialBlockSeat
                        : el === seatCodes._1D
                        ? appConstants.restrictedReclineSeat
                        : el === seatCodes.E
                        ? appConstants.exitRowSeat
                        : el === seatCodes.K
                        ? appConstants.overwingSeat
                        : el === seatCodes._1 &&
                          appConstants.restrictedSeatGeneral}
                    </Text>
                  );
                })
              ) : (
                <Text>
                  {seatCharacterSticks?.seatCharacteristic === seatCodes.O
                    ? appConstants.preferentialBlockSeat
                    : seatCharacterSticks?.seatCharacteristic === seatCodes._1D
                    ? appConstants.restrictedReclineSeat
                    : seatCharacterSticks?.seatCharacteristic === seatCodes.E
                    ? appConstants.exitRow
                    : seatCharacterSticks?.seatCharacteristic === seatCodes.K
                    ? appConstants.overwingSeat
                    : seatCharacterSticks?.seatCharacteristic ===
                        seatCodes._1 && appConstants.restrictedSeatGeneral}
                </Text>
              )}
            </View>
          </ScrollView>
          <View style={styles.modalButtonsStyle}>
            <TouchableOpacity
              activeOpacity={appConstants.activeOpacity}
              onPress={onCancelPress}
              style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>{appConstants.cancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSelectPress}
              activeOpacity={appConstants.activeOpacity}
              style={[
                styles.buttonStyle,
                {backgroundColor: colors.color_319ADF},
              ]}>
              <Text style={[styles.buttonTextStyle, {color: colors.color_fff}]}>
                {appConstants.select}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectedSeatModal;
